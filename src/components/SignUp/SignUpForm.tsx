import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AccountCircle, Lock, EmailRounded } from '@mui/icons-material';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from '../Popup/Popup';



const SignupForm: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'isim alanı çok kısa')
      .required('Lütfen isminizi giriniz'),
    email: Yup.string()
      .email('Geçerli bir e-posta adresi giriniz.')
      .required('E-posta alanı boş bırakılamaz.'),
    password: Yup.string()
      .min(8, 'Şifre en az 8 karakter olmalıdır.')
      .required('Şifre alanı boş bırakılamaz.'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values: any) => {
    // Bu kısımda sunucuya kayıt isteğinizi gönderebilirsiniz
    try {
      const response = await axios.post('http://localhost:3001/api/register', values);
      console.log('Response : ', response);

      if (response.status === 201) {
        console.log('Kayıt başarılı', values);

        setIsPopupOpen(true);

        // Kayıt olunduğunda kullanıcıyı login sayfasına yönlendirsin
        setTimeout(() => {
          setIsPopupOpen(false);
          navigate('/login');
        }, 2000);
      } else {
        // Sunucudan hata alındı
        console.error('Kayıt hatası:', response.data.error);
      }
    } catch (error) {
      console.error('İstek gönderme hatası:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="90vh">
      <Grid item xs={12} sm={6} lg={4}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              as={TextField}
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              style={{ marginTop: '20px' }}
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
            <ErrorMessage name="name" component="div" />

            <Field
              as={TextField}
              fullWidth
              label="E-posta"
              name="email"
              variant="outlined"
              style={{ marginTop: '20px' }}
              InputProps={{
                startAdornment: <EmailRounded />,
              }}
            />
            <ErrorMessage name="email" component="div" />

            <Field
              as={TextField}
              fullWidth
              type="password"
              label="Şifre"
              name="password"
              variant="outlined"
              style={{ marginTop: '20px' }}
              InputProps={{
                startAdornment: <Lock />,
              }}
            />
            <ErrorMessage name="password" component="div" />

            <Button type="submit" variant="contained" color="primary" fullWidth
              style={{ marginTop: '20px' }}>
              Kayıt Ol
            </Button>
            
            {isPopupOpen && (
            <Popup
              message="Başarılı bir şekilde kayıt oldunuz."
              onClose={() => {
                setIsPopupOpen(false);
                navigate('/login'); // Login sayfasına yönlendirin
              }}
            />
          )}

          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
