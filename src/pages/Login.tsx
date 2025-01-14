import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().max(50, 'E-mail address must be at most 50 characters').email('Please enter a valid e-mail address').required('E-mail is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });
  const { login } = useLogin();

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    console.log(values.email, values.password);

    await login(values.email, values.password);
    setSubmitting(false);
  };

  return (
    <div className="login-form">
      <Container maxWidth="xs">
        <Formik initialValues={{ email: '', password: '' } as { email: string; password: string }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Typography variant="h5" className="login-form_title">
              Log in
            </Typography>
            <Field as={TextField} className="login-form_email" label="Email" variant="outlined" fullWidth name="email" />
            <ErrorMessage name="email" component="div" className="login-mail-error" />

            <Field as={TextField} className="login-form_password" type="password" label="Password" variant="outlined" fullWidth name="password" />
            <ErrorMessage name="password" component="div" className="login-password-error" />

            <Button className="login-form_submit" variant="contained" color="primary" fullWidth type="submit">
              Log in
            </Button>

            <Typography variant="body2" className="login-form_forgot-password">
              <Link className="link-style" to="/forgot-password">
                Forgotten password?
              </Link>
            </Typography>

            <Typography variant="body2" className="login-form_signup-link">
              Don't have an account?{' '}
              <Link className="link-style" to="/signup">
                Sign up
              </Link>
            </Typography>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
