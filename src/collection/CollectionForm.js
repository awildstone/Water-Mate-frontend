import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import UserContext from '../context/UserContext';
import useCollectionForm from './useCollectionForm';
import { addCollection } from '../requests';
import { editCollection } from '../requests';

const validationSchema = yup.object({
    name: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your collection.'),
});

const CollectionForm = ({ close, collection=null }) => {
    const { token } = useContext(UserContext);
    const [ error, handleSubmit ] = useCollectionForm();
    const [ message, setMessage ] = useState(null);

    const formik = useFormik({
        initialValues: {
          name: collection ? collection.name : '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let result;
            if (collection) {
                result = await handleSubmit(editCollection(token, collection.id, values));
            } else {
                result = await handleSubmit(addCollection(token, values));
            }
            if (result.success) setMessage(result.data.msg);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div>
                <TextField
                    variant="outlined"
                    margin="normal"
                    id="name"
                    name="name"
                    label="Collection Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                        onClick={() => collection ? close('edit-collection') : close('add-collection')}
                    >
                        Close
                    </Button>
                    :
                    <>
                    <Button 
                        color="success" 
                        sx={{ color: '#fff'}} 
                        variant="contained" 
                        size="large" 
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button 
                        onClick={() => collection ? close('edit-collection') : close('add-collection')} 
                        color="info" sx={{  color: '#fff'}} 
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

export default CollectionForm;