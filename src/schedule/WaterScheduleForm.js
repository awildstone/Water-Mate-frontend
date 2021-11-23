import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, FormGroup, FormControlLabel,Checkbox, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import useSchedule, { editSchedule } from './useSchedule';

const validationSchema = yup.object({
    manual_mode: yup.boolean(),
    manual_water_interval: yup.number()
        .min(1, 'Number of days between watering must be greater than 0.')
        .max(90, "Unless this plant is a cactus, you're going to kill it!")
        .when("manual_mode", {
            is: true,
            then: yup.number().required("You must provide a water interval when manual mode is enabled."),
          }),
    water_interval: yup.number()
        .min(1, 'Number of days between watering must be greater than 0.')
        .max(90, "Unless this plant is a cactus, you're going to kill it!")
        .when("manual_mode", {
            is: false,
            then: yup.number().required("You must provide a water interval (number of days)!"),
          }), 
});

const WaterScheduleForm = ({close, setEditSchedule, schedule}) => {
    const [ error, message, setMessage, handleScheduleRequest ] = useSchedule();

    const formik = useFormik({
        initialValues: {
            manual_mode: schedule.manual_mode,
            manual_water_interval: schedule.water_interval,
            water_interval: schedule.water_interval,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let result = await handleScheduleRequest(editSchedule(schedule.id, values));
            if (result.success) setMessage(result.message);
        },
    });
    
    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div>
                    <FormGroup>
                        <FormControlLabel 
                            control={<Checkbox checked={formik.values.manual_mode} onChange={formik.handleChange} name="manual_mode" />} 
                            label="Enable Manual Mode?" />
                        <TextField
                            disabled={!formik.values.manual_mode}
                            margin="normal"
                            id="manual_water_interval"
                            name="manual_water_interval"
                            label="Set manual watering interval (in days)"
                            value={formik.values.manual_water_interval}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.manual_water_interval && Boolean(formik.errors.manual_water_interval)}
                            helperText={formik.touched.manual_water_interval && formik.errors.manual_water_interval}
                        />
                        <p>To modify your plant's existing water interval, simply update the current water interval below and update changes.</p>
                        <TextField
                            disabled={formik.values.manual_mode}
                            margin="normal"
                            id="water_interval"
                            name="water_interval"
                            label="Modify current water interval (in days)"
                            value={formik.values.water_interval}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.water_interval && Boolean(formik.errors.water_interval)}
                            helperText={formik.touched.water_interval && formik.errors.water_interval}
                        />
                    </FormGroup>
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
                        onClick={() => close('edit-schedule')}
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
                            onClick={() => setEditSchedule(false)} 
                            color="info" sx={{ color: '#fff'}} 
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

export default WaterScheduleForm;
