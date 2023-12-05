import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Typography, Container } from '@mui/material';
import { useSignup } from '../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const { signup } = useSignup();
  const validationSchema = Yup.object().shape({
    email: Yup.string().max(50, 'E-mail address must be at most 50 characters').email('Please enter a valid e-mail address').required('E-mail is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log(values.email, values.password);

    await signup(values.email, values.password);
    setSubmitting(false);
  };

  return (
    <div className="signup-form">
      <Container maxWidth="xs">
        <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Typography variant="h5" className="signup-form_title">
              Sign Up
            </Typography>
            <Field as={TextField} className="signup-form_email" label="Email" variant="outlined" fullWidth name="email" />
            <ErrorMessage name="email" component="div" className="signup-mail-error" />

            <Field as={TextField} className="signup-form_password" type="password" label="Password" variant="outlined" fullWidth name="password" />
            <ErrorMessage name="password" component="div" className="signup-password-error" />

            <Button className="signup-form_submit" variant="contained" color="primary" fullWidth type="submit">
              Sign Up
            </Button>

            <Typography variant="body2" className="login-form_signup-link">
              Already have an account?{' '}
              <Link className="link-style" to="/login">
                Login
              </Link>
            </Typography>
          </Form>
        </Formik>
      </Container>
    </div>
  );
};

export default Signup;
