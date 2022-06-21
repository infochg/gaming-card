import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import ErrorBoundary from '../../containers/ErrorBoundary';
import TFAContainer from '../../containers/TFAContainer';
import CustButton from '../../components/Common/Button';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import { segRegStart } from '../../utils/segment';
import { phRegStart } from '../../utils/posthog';

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: '46px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    '& a': {
      color: theme.palette.text.purple,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.darkPurple
      }
    }
  },
  form: {
    maxWidth: '400px',
    margin: '30px auto 60px auto',
    textAlign: 'center'
  },
  forgotText: {
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.text.purple,
      fontSize: '16px',
      '&:hover': {
        color: theme.palette.text.darkPurple
      }
    }
  },
  asLink: {
    textDecoration: 'none',
    color: theme.palette.text.purple,
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      color: theme.palette.text.darkPurple
    }
  },
  btn: {
    margin: '60px auto 30px auto',
    maxWidth: '400px'
  },
  loader: {
    margin: '30px auto'
  }
}));

function Signin() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');

  const { anonId, userData, userTokenDispatch, errorDispatch } = useContext(
    appContext
  );

  const history = useHistory();

  try {
    if (cookie.load('token') && !cookie.load('2fa')) {
      if (email !== '') {
        history.push('/overview');
      } else {
        cookie.remove('token');
      }
    }

    const validateFields = () => {
      let isValidated = true;
      setEmailValid('');
      setPasswordValid('');

      if (!/.+@.+\..+/i.test(email)) {
        setEmailValid('Email is incorrect');
        isValidated = false;
      }

      if (email === '') {
        setEmailValid('Email field is empty');
        isValidated = false;
      }

      if (password === '') {
        setPasswordValid('Password field is empty');
        isValidated = false;
      }

      return isValidated;
    };

    // Send Code Request
    const onSuccessCodeRequest = () => {
      setShowLoader(false);
      setIsCodeSent(true);
    };

    const onErrorCodeRequest = () => {
      setShowLoader(false);
      errorDispatch({
        type: 'SET_ERROR',
        payload: 'Something is wrong, please, try again.'
      });
    };

    const requestCode = () => {
      setShowLoader(true);
      fetchData(
        '/user/2fa/requestcode',
        'POST',
        onSuccessCodeRequest,
        onErrorCodeRequest
      );
    };

    // Sign in user
    const onError = payload => {
      setShowLoader(false);
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const signIn = e => {
      e.preventDefault();

      if (validateFields()) {
        const data = {};
        if (email !== '') {
          data.email = email.toLowerCase().trim();
        }
        if (password !== '') {
          data.password = password;
        }

        setShowLoader(true);

        const fetchLoginData = async () => {
          try {
            const resData = await fetch(
              `${process.env.REACT_APP_API_URL}/user/login`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data })
              }
            ).then(response => {
              if (
                (response.status >= 200 && response.status < 300) ||
                response.status === 'success' ||
                response.status === '2faVerification'
              ) {
                return response.json();
              }

              return null;
            });

            if ((resData === null || resData.status === 'failed') && onError) {
              onError(
                resData.message || 'Something is wrong, please try later.'
              );
            } else {
              if (resData.status === '2faVerification') {
                cookie.save('2fa', true, {
                  path: '/',
                  sameSite: 'Lax'
                });
              }

              setShowLoader(false);
              userTokenDispatch({ type: 'SET_USER_TOKEN', payload: resData });

              if (resData.status === '2faVerification') {
                requestCode();
              }
            }

            return null;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            onError('Something is wrong, please try later.');
          }

          return null;
        };

        fetchLoginData();
      }
    };

    const changeField = e => {
      if (e.target.name === 'email') {
        setEmail(e.target.value);
      } else if (e.target.name === 'password') {
        setPassword(e.target.value);
      }
    };

    const goToRegistration = () => {
      // Segment
      // eslint-disable-next-line
      segRegStart(undefined, userData ? userData._id : null, anonId);
      // PostHog
      phRegStart(undefined);

      history.push('/registration');
    };

    return (
      <React.Fragment>
        <Typography className={classes.h1}>Welcome to Mythia</Typography>
        <div className={classes.form}>
          <form onSubmit={signIn}>
            <TextField
              name="email"
              value={email}
              label="Email"
              onChange={changeField}
              variant="outlined"
              validation={emailValid}
              fullWidth
            />
            <TextField
              name="password"
              value={password}
              type="password"
              label="Password"
              onChange={changeField}
              variant="outlined"
              validation={passwordValid}
              fullWidth
              withToggle
              isVisible={false}
            />

            <Typography className={classes.forgotText}>
              <Link to="/forgotpassword">Forgot your password?</Link>
            </Typography>
            {!showLoader ? (
              <CustButton
                type="submit"
                btnstyle="system"
                subclass={classes.btn}
              >
                Log in
              </CustButton>
            ) : (
              <div className={classes.loader}>
                <Preloader />
              </div>
            )}
            <Typography
              className={classes.subtitle}
              style={{ display: 'none' }}
            >
              Don’t have an account?
              <br />
              <span
                className={classes.asLink}
                role="presentation"
                onClick={goToRegistration}
              >
                Register
              </span>
            </Typography>
          </form>
        </div>
        <TFAContainer isCodeSent={isCodeSent} setIsCodeSent={setIsCodeSent} />
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Signin;
