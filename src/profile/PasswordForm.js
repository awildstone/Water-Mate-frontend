import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import useProfile, { editPassword } from './useProfile';
import UserContext from '../context/UserContext';

const validationSchema = yup.object({
    new_password: yup.string()
        .min(8, 'Your password must be greater than 7 characters.')
        .max(50, 'Too Long!')
        .required('You must enter a password.'),
    confirm_new_password: yup.string()
        .min(8)
        .when("new_password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: yup.string().oneOf([yup.ref("new_password")], "Password must match."),
        })
        .required('You must confirm your password.'),
    old_password: yup.string()
        .min(8, 'Your password must be greater than 7 characters.')
        .max(50, 'Too Long!')
        .required('You must enter your old password.'),
});

const EditPasswordForm = ({close, setEditPassword, user}) => {
    const { token } = useContext(UserContext);
    const [error, message, setMessage, handleProfileRequest] = useProfile();
    const [ isLoading, setIsLoading ] = useState(false);

    const formik = useFormik({
        initialValues: {
          new_password: '',
          confirm_new_password: '',
          old_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let result = await handleProfileRequest(editPassword(token, user.id, values));
            if (result.success) setMessage(result.message);
            setIsLoading(false); 
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div>
                <TextField
                    autoComplete="new-password"
                    variant="outlined"
                    margin="normal"
                    id="new_password"
                    name="new_password"
                    label="New Password"
                    type="password"
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                    helperText={formik.touched.new_password && formik.errors.new_password}
                />
            </div>
            <div>
                <TextField
                    autoComplete="confirm-new-password"
                    variant="outlined"
                    margin="normal"
                    id="confirm_new_password"
                    name="confirm_new_password"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirm_new_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirm_new_password && Boolean(formik.errors.confirm_new_password)}
                    helperText={formik.touched.confirm_new_password && formik.errors.confirm_new_password}
                />
            </div>
            <div>
                <TextField
                    autoComplete="old-password"
                    variant="outlined"
                    margin="normal"
                    id="old_password"
                    name="old_password"
                    label="Old Password"
                    type="password"
                    value={formik.values.old_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                    helperText={formik.touched.old_password && formik.errors.old_password}
                />
            </div>
            <div>
                { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                { message ? <Alert sx={{ mb: 1 }} severity="success">{message}</Alert> : '' }
            </div>
            <Stack direction="row" spacing={2} >
            { message ? 
                <Button 
                    color="success" 
                    sx={{ color: '#fff'}} 
                    variant="contained" 
                    size="large" 
                    onClick={() => close('edit-password')}
                >
                    Close
                </Button>
                :
                <>
                    { !isLoading ?
                            <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                                Submit
                            </Button>
                            :
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                            >
                                Saving
                            </LoadingButton>
                    }

                    <Button 
                        onClick={() => setEditPassword(false)} 
                        color="info" 
                        sx={{ color: '#fff'}} 
                        variant="contained"
                        size="large"
                    >
                        Cancel
                    </Button>
                </>
            }
            </Stack>
        </form>
    );
}

export default EditPasswordForm;
