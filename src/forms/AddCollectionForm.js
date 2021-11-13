import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import UserContext from '../context/UserContext';
import { addCollection } from '../requests';

const validationSchema = yup.object({
    name: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your collection.'),
});

const AddCollectionForm = ({ close, handleAdd, handleRequest }) => {
    const [ error, setError ] = useState(null);
    const { token } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
          name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let request = addCollection(token, values);
            console.log(request);
            let result = await handleRequest(request);
            console.log(result);
            // let result = await handleAdd('collection', values);
            if (result.success) {
                close('add-collection');
            } else {
                setError(result.message);
            }  
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
                </div>
                <Stack direction="row" spacing={2} >
                <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                    Submit
                </Button>
                <Button onClick={() => close('add-collection')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
    </form>
    );
}

export default AddCollectionForm;