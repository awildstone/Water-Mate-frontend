import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';

const validationSchema = yup.object({
    name: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your collection.'),
});

const EditCollectionForm = ({ close, handleEdit, collection }) => {
    const [ error, setError ] = useState(null);

    const formik = useFormik({
        initialValues: {
          name: collection.name,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let result = await handleEdit('collection', collection.id, values);
            if(result.success) {
                close('edit-collection');
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
                <Button onClick={() => close('edit-collection')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
        </form>
    );
}

export default EditCollectionForm;