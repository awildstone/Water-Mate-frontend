import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const validationSchema = yup.object({
    notes: yup.string()
        .max(200, 'Notes must be less than 200 characters in length.')
        .matches(/^(?=[a-zA-Z0-9~@#$^()_+=[\]|\\,.?:!' -]*$)(?!.*[<>"/;`%{}*])/, 'Characters not allowed: < > \" \/ \; { } ` % & *')
});

const NotesForm = ({ setNotes, notes, setShowForm, showForm }) => {
    const formik = useFormik({
        initialValues: {
            notes: notes ? notes : '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setNotes(values);
            setShowForm(!showForm);
        },
    });

    const clearFormNotes = (e, setFieldValue) => {
        e.preventDefault();
        setFieldValue('notes', '');
        setNotes(null);
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                id="notes"
                name="notes"
                label="Add Notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.notes && Boolean(formik.errors.notes)}
                helperText={formik.touched.notes && formik.errors.notes}
            />
            {notes ?
                <Tooltip title="Click to clear notes">
                    <Button variant="contained" type="reset" onClick={(e) => clearFormNotes(e, formik.setFieldValue)} size="small" color="secondary">
                        Clear
                    </Button>
                </Tooltip>
                :
                <Tooltip title="Click to add notes">
                    <Button variant="contained" type="submit" size="small" color="secondary">
                        Add
                    </Button>
                </Tooltip>
            }
        </form>
    );
}

export default NotesForm;
