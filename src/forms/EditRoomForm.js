import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';


const validationSchema = yup.object({
    name: yup.string()
        .min(1, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a name for your room.'),
});

const EditRoomForm = ({ close, handleEdit, room }) => {
    const [ error, setError ] = useState(null);

    const formik = useFormik({
        initialValues: {
          name: room.name,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            let result = await handleEdit('room', room.id, values);
            if(result.success) {
                close('edit-room');
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
                        label="Room Name"
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
                <Button onClick={() => close('edit-room')} color="info" sx={{ color: '#fff'}} variant="contained" size="large">
                    Cancel
                </Button>
                </Stack>
        </form>
    );
}

export default EditRoomForm;