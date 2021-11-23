import { useHistory } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container, TextField, Button } from '@mui/material';
import useAuth, {signupUser} from '../hooks/useAuth';

const validationSchema = yup.object({
    city: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your city for an accurate location.'),
    state: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    country: yup.string()
        .min(3, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your country for an accurate location.'),
    name: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter your name.'),
    email: yup.string()
        .email('Invalid email address.')
        .required('You must enter your email.'),
    username: yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('You must enter a username.'),
    password: yup.string()
        .min(8, 'Your password must be greater than 7 characters.')
        .max(50, 'Too Long!')
        .required('You must enter a password.'),
    confirm_password: yup.string()
        .min(8)
        .when("password", {
          is: (val) => (val && val.length > 0 ? true : false),
          then: yup.string().oneOf(
            [yup.ref("password")],
            "Password must match."
          ),
        })
        .required('You must confirm your password.'),
});

const SignupForm = ({signup, setToken}) => {
    const history = useHistory();
    const [error, handleAuthRequest] = useAuth();

    const formik = useFormik({
        initialValues: {
          city: '',
          state: '',
          country: '',
          name: '',
          email: '',
          username: '',
          password: '',
          confirm_password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { city, state, country, name, username, email, password } = values;
            let result = await handleAuthRequest(signupUser({city, state, country, name, username, email, password}));
            if (result.success) {
                setToken(result.userToken);
                history.push('/get-started');
            }
        },
    });
    
    return (
        <Container maxWidth="lg">
            <form onSubmit={formik.handleSubmit} autoComplete="off">
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="city"
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="state"
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="country"
                        name="country"
                        label="Country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
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
                        autoComplete="password"
                        variant="outlined"
                        size="small"
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
                    <TextField
                        fullWidth
                        autoComplete="confirm-password"
                        variant="outlined"
                        size="small"
                        margin="normal"
                        id="confirm_password"
                        name="confirm_password"
                        label="Confirm Password"
                        type="password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                    />
                </div>
                <div>
                    { error ? <Alert sx={{ mb: 1 }} severity="error">{error}</Alert> : '' }
                </div>
                <Button color="success" sx={{ color: '#fff'}} variant="contained" size="large" type="submit">
                    Signup
                </Button>
            </form>
        </Container>
    );
}

export default SignupForm;