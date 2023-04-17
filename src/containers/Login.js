import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography, LinearProgress } from '@mui/material';
import { login } from "features/user";
import "styles/Login.css";


const Login = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (values,  { setSubmitting }) => {
      const { email, password } = values;
      dispatch(login({email, password})).then((data) => {
        setShowErrorMessage(data['payload']['detail'])
        // console.log(data['payload']['detail'], 'data from dispatch')
        if(data['payload']['detail'] === 'No active account found with the given credentials'){
          setShowSuccessMessage(true)
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 6000);
        }
      })
      
    }
  });

  
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <>
    {loading && <LinearProgress color="success" />}
    {showSuccessMessage && (
        <div style={{backgroundColor:'red' ,color: "white" }}>{showErrorMessage}</div>
      )}
    <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                style={{
                  fontFamily:"GT Walsheim",
                  textAlign:'center'
                }}
                variant="h2"
              >
                Sign in
              </Typography>
            </Box>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
                style={{
                  fontFamily:"GT Walsheim" 
                }}
              >
                Login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              // helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              // helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                style={{
                  backgroundColor:'#2ca58d'
                }}
                disabled={ loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
                Forgot Password?
            </Typography>
          </form>
        </Container>
      </Box>
      </>

    // </Layout>
  );
};

export default Login;
