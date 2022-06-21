import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import zxcvbn from 'zxcvbn';
import history from '../../history';
import ErrorBoundary from '../../containers/ErrorBoundary';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import CustButton from '../../components/Common/Button';
import StrengthMeter from '../../components/Common/StrengthMeter';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';

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
    textAlign: 'center',
    maxWidth: '400px',
    margin: '40px auto 80px auto'
  },
  btns: {
    display: 'flex'
  },
  btn: {
    margin: '20px 0 20px 0'
  },
  backBtn: {
    margin: '20px 20px 20px 0'
  }
}));

function ForgotPassword() {
  const classes = useStyles();
  const [curStep, setCurStep] = useState('email');
  const [showLoader, setShowLoader] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');

  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [passwordRepValid, setPasswordRepValid] = useState('');

  const [passwordScore, setPasswordScore] = useState(0);

  const { errorDispatch } = useContext(appContext);

  try {
    if (cookie.load('token')) {
      history.push('/overview');
    }

    // Send email to get validation code
    const validateEmail = () => {
      let isValidated = true;
      setEmailValid('');

      if (!/.+@.+\..+/i.test(email)) {
        setEmailValid('Email is incorrect');
        isValidated = false;
      }

      if (email === '') {
        setEmailValid('Email field is empty');
        isValidated = false;
      }

      return isValidated;
    };

    const onSuccessCodeRequest = () => {
      setShowLoader(false);
      setCurStep('code');
    };

    const onErrorCodeRequest = () => {
      setShowLoader(false);
      errorDispatch({
        type: 'SET_ERROR',
        payload: 'Something is wrong, please, try again.'
      });
    };

    const CodeRequest = e => {
      e.preventDefault();
      if (validateEmail()) {
        setShowLoader(true);

        const data = {};
        if (email !== '') {
          data.email = email;
        }

        fetchData(
          '/user/forgotPassword',
          'POST',
          onSuccessCodeRequest,
          onErrorCodeRequest,
          data
        );
      }
    };

    // Send email, password and verification code
    const goToNewPass = e => {
      e.preventDefault();
      setCurStep('password');
    };

    const validatePassword = () => {
      let isValidated = true;

      setPasswordValid('');
      setPasswordRepValid('');

      if (password === '') {
        setPasswordValid('Field is empty');
        isValidated = false;
      }

      if (password.indexOf(' ') >= 0) {
        setPasswordValid('Password cannot contain spaces');
        isValidated = false;
      }

      if (password.length < 8) {
        setPasswordValid('Your password must be at least 8 characters long.');
        isValidated = false;
      }

      if (passwordScore < 2) {
        setPasswordValid(
          'Your password strength should be higher than "Weak".'
        );
        isValidated = false;
      }

      if (passwordRep === '') {
        setPasswordRepValid('Field is empty');
        isValidated = false;
      }

      if (passwordRep !== password) {
        setPasswordRepValid('Passwords are not match.');
        isValidated = false;
      }

      return isValidated;
    };

    const onSuccessPassRequest = () => {
      setShowLoader(false);
      setCurStep('success');
    };

    const onErrorPassRequest = payload => {
      setShowLoader(false);
      errorDispatch({
        type: 'SET_ERROR',
        payload
      });
    };

    const changePasswordRequest = e => {
      e.preventDefault();
      if (validatePassword()) {
        setShowLoader(true);

        const data = {};
        if (email !== '') {
          data.email = email;
        }
        if (code !== '') {
          data.code = code;
        }
        if (password !== '') {
          data.password = password;
        }

        fetchData(
          '/user/forgotPasswordVerifyCode',
          'POST',
          onSuccessPassRequest,
          onErrorPassRequest,
          data
        );
      }
    };

    const changeField = e => {
      if (e.target.name === 'email') {
        setEmail(e.target.value);
      } else if (e.target.name === 'code') {
        if (!/[^0-9]/.test(e.target.value) && e.target.value.length < 7) {
          setCode(e.target.value);
        }
      } else if (e.target.name === 'password') {
        setPassword(e.target.value);
        setPasswordScore(zxcvbn(e.target.value).score);
      } else if (e.target.name === 'passwordRep') {
        setPasswordRep(e.target.value);
      }
    };

    const steps = {
      email: (
        <React.Fragment>
          <Typography className={classes.h1}>Forgot your password?</Typography>
          <Typography className={classes.subtitle}>
            Don’t worry! Just fill in your email and we’ll send you a code to
            reset your password.
          </Typography>
          <div className={classes.form}>
            <form onSubmit={CodeRequest}>
              <TextField
                name="email"
                value={email}
                label="Email"
                onChange={changeField}
                variant="outlined"
                validation={emailValid}
                fullWidth
              />
              {!showLoader ? (
                <CustButton
                  type="submit"
                  subclass={classes.btn}
                  btnstyle="system"
                >
                  Send Code
                </CustButton>
              ) : (
                <Preloader />
              )}
            </form>
          </div>
        </React.Fragment>
      ),
      code: (
        <React.Fragment>
          <Typography className={classes.h1}>
            Check Your Email for a Code
          </Typography>
          <div className={classes.form}>
            <form onSubmit={goToNewPass}>
              <TextField
                name="code"
                value={code}
                label="Enter 6 Digit Code"
                onChange={changeField}
                variant="outlined"
                fullWidth
              />
              {!showLoader ? (
                <div className={classes.btns}>
                  <CustButton
                    type="submit"
                    btnstyle="system"
                    subclass={classes.backBtn}
                    onClick={() => {
                      setCurStep('email');
                    }}
                  >
                    Go Back
                  </CustButton>
                  <CustButton
                    type="submit"
                    btnstyle="system"
                    subclass={classes.btn}
                    disabled={code.length < 6}
                  >
                    Continue
                  </CustButton>
                </div>
              ) : (
                <Preloader />
              )}
            </form>
          </div>
        </React.Fragment>
      ),
      password: (
        <React.Fragment>
          <Typography className={classes.h1}>Set your new password</Typography>
          <div className={classes.form}>
            <form onSubmit={changePasswordRequest}>
              <TextField
                name="password"
                value={password}
                label="New password"
                onChange={changeField}
                variant="outlined"
                type="password"
                fullWidth
                withToggle
                isVisible={false}
                validation={passwordValid}
              />
              {password !== '' && (
                <StrengthMeter
                  passwordScore={passwordScore}
                  passwordLength={password.length}
                />
              )}
              <TextField
                name="passwordRep"
                value={passwordRep}
                label="Confirm password"
                onChange={changeField}
                variant="outlined"
                type="password"
                fullWidth
                withToggle
                isVisible={false}
                validation={passwordRepValid}
              />
              {!showLoader ? (
                <div className={classes.btns}>
                  <CustButton
                    onClick={() => {
                      setCurStep('code');
                    }}
                    btnstyle="system"
                    subclass={classes.backBtn}
                  >
                    Go Back
                  </CustButton>
                  <CustButton
                    type="submit"
                    btnstyle="system"
                    subclass={classes.btn}
                  >
                    Send
                  </CustButton>
                </div>
              ) : (
                <Preloader />
              )}
            </form>
          </div>
        </React.Fragment>
      ),
      success: (
        <React.Fragment>
          <Typography className={classes.h1}>
            You password has been changed.
          </Typography>
          <Typography className={classes.subtitle}>
            You can now log in with your new password.
          </Typography>
          <div className={classes.form}>
            <CustButton
              btnstyle="system"
              onClick={() => {
                history.push('/signin');
              }}
              subclass={classes.btn}
            >
              Go to Log in page
            </CustButton>
          </div>
        </React.Fragment>
      )
    };

    return steps[curStep];
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default ForgotPassword;
