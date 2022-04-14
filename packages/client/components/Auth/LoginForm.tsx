import Router from 'next/router';
import { FC, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { login } from '~/config/api';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: yup.object({
      login: yup.string().required('Login is required'),
      password: yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const res = await login(values);
      if (res.message) {
        setError(res.message);
        setSuccessMessage(null);
      } else {
        setError(null);
        setSuccessMessage(`${res.msg}. Redirecting to dashboard.`);
        resetForm();

        setTimeout(() => {
          Router.push('/dashboard');
        }, 3000);
      }
    },
  });

  return (
    <>
      {error && (
        <Alert
          severity="error"
          color="error"
          sx={{
            margin: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert
          severity="success"
          color="info"
          sx={{
            margin: 2,
          }}
        >
          {successMessage}
        </Alert>
      )}

      <Typography variant="h5" component="h3" sx={{ marginBottom: 4 }}>
        Login
      </Typography>

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: 4,
        }}
      >
        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            fullWidth
            id="login"
            name="login"
            label="Login"
            variant="outlined"
            type="text"
            // formik stuff
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
        </Box>

        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            // formik stuff
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Button type="submit" variant="outlined" fullWidth>
          Login
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
