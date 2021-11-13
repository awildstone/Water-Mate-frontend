import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, TextField, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const validationSchema = yup.object({
    username: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a username.'),
    password: yup.string()
        .min(8, 'Your password must be greater than 7 characters.')
        .max(50, 'Too Long!')
        .required('You must enter a password.'),
});

const LoginForm = ({login}) => {
    const history = useHistory();
    const [ error, setError ] = useState(null);

    const formik = useFormik({
        initialValues: {
          username: '',
          password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let result = await login(values);
            if(result.success) {
                history.push('/water-manager');
            } else {
                setError(result.message);
            }
        },
    });
    
    return (
        <Container>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                    Login
                </Button>
            </form>
        </Container>
    );
}

export default LoginForm;