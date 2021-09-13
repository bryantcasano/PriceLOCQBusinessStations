import React, { useState, useEffect } from 'react';
// Modules
import { NextPage } from 'next/types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
// MUI Core
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// axios
import axios from 'axios'

interface FormData {
  email: string;
  password: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    paddingTop: '100px'
  },
  loginForm: {
    backgroundColor: '#fff',
    padding: '2em',
    border: '2px solid #f0f0f0'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


const LoginPage: NextPage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
      setOpen(false);
  };
  const handleToggle = () => {
      setOpen(!open);
  };

  const { handleSubmit, register } = useForm<FormData>();

  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

    const onSubmit = handleSubmit(async ({email, password}) => {
      try {
          setOpen(true);
          const loginResponse = await axios.post("https://staging.api.locq.com/ms-profile/user/login", {
            email,
            password
          });

          localStorage.setItem("accessToken", loginResponse.data.data.AccessToken);
          setOpen(false);
          router.push("/dashboard");
        } catch (error) {
          setOpen(false);
          setLoginError(true);
          return error;
        }
    });

  return (
    <Container className={classes.container} maxWidth="xs">
      
      <form onSubmit={onSubmit} className={classes.loginForm}>
        <div>
          <Grid style={{ textAlign: 'center' }}>
              <img src="https://www.pricelocq.com/assets/locq-logo-2019.png" />
          </Grid>
          <div>
            <Grid style={{ textAlign: 'center', color: '#6127b7' }}>
              <h2>Business Stations</h2>
            </Grid>
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register('email', { required: true })}
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  style={{ borderRadius: '0px' }}
                  onClick={(e) => { setLoginError(false)}}
                  onBlur={(e) => { setLoginError(false)}}
                  onKeyUp={(e) => { setLoginError(false)}}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  {...register('password', { required: true })}
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  style={{ borderRadius: '0px' }}
                  onClick={(e) => { setLoginError(false)}}
                  onBlur={(e) => { setLoginError(false)}}
                  onKeyUp={(e) => { setLoginError(false)}}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained" style={{ borderRadius: '0px' }}>
              Log in
            </Button>
            <Backdrop className={classes.backdrop} open={open}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Grid>
          <Grid item xs={12} style={{textAlign: 'center'}}>
            <a href="#">Forgot Password?</a>
          </Grid>
        </Grid>
      </form>

      {loginError
      ? <div style={{ marginTop: '10px', padding: '1em'}} >
          <Alert severity="error">
            <AlertTitle>LOGIN ERROR</AlertTitle>
            <strong>Your username or password is incorrect.</strong>
          </Alert>
        </div>
      : ''}
    </Container>
  );
};

export default LoginPage;