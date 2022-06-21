import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { Typography } from '@material-ui/core';
import zxcvbn from 'zxcvbn';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../../Common/Preloader';
import CustButton from '../../Common/Button';
import StrengthMeter from '../../Common/StrengthMeter';

function Step2(props) {
  const { classes, registerUser, showLoader, regError, resetRegForm } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);

  const recaptchaRef = React.useRef();

  // eslint-disable-next-line
  // console.log(isEmailValid, isPasswordValid);

  const changeField = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'password') {
      setPasswordScore(zxcvbn(e.target.value).score);
      setPassword(e.target.value);
    }
  };

  // Email validation
  useEffect(() => {
    if (email !== '') {
      if (/.+@.+\..+/i.test(email)) {
        setIsEmailValid(true);
      } else {
        setIsEmailValid(false);
      }
    } else {
      setIsEmailValid(false);
    }
  }, [email]);

  // Password validation
  useEffect(() => {
    if (password !== '') {
      // if (/^(?=.*\d)(?=.*[\W]).{8,20}$/.test(password)) {
      if (password.length > 7 && passwordScore > 1) {
        setIsPasswordValid(true);
      } else {
        setIsPasswordValid(false);
      }
    } else {
      setIsPasswordValid(false);
    }
  }, [password]);

  try {
    const handleSubmit = async e => {
      e.preventDefault();

      const token = await recaptchaRef.current.executeAsync();

      if (token) {
        const data = {};
        if (email !== '') {
          data.email = email.toLowerCase().trim();
        }
        if (password !== '') {
          data.password = password;
        }

        registerUser(data);
      }
    };

    let btn = (
      <CustButton
        disabled={!isPasswordValid || !isEmailValid}
        type="submit"
        btnstyle="system"
        fullWidth
        subclass={classes.btnWithMarg}
      >
        Continue
      </CustButton>
    );

    if (showLoader) {
      btn = <Preloader />;
    }

    if (regError) {
      btn = (
        <CustButton
          btnstyle="system"
          onClick={resetRegForm}
          fullWidth
          subclass={classes.btnWithMarg}
        >
          Try again
        </CustButton>
      );
    }

    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Set your email and password
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              disabled={!!regError}
              name="email"
              value={email}
              placeholder="Add your Email"
              label="Email"
              onChange={changeField}
              variant="outlined"
              fullWidth
            />
            <TextField
              disabled={!!regError}
              name="password"
              value={password}
              placeholder="Add your Password"
              label="Password"
              type="password"
              onChange={changeField}
              variant="outlined"
              fullWidth
              withToggle
              isVisible={false}
            />

            {password !== '' && (
              <StrengthMeter
                passwordScore={passwordScore}
                passwordLength={password.length}
              />
            )}

            {btn}

            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey="6Ld1rc0bAAAAANhEIwsDcACNmev2Rh8FaT24mRPc"
            />
          </form>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step2.defaultProps = {
  classes: undefined,
  registerUser: undefined,
  showLoader: undefined,
  regError: undefined,
  resetRegForm: undefined
};

Step2.propTypes = {
  classes: PropTypes.shape({
    btnWithMarg: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string
  }),
  registerUser: PropTypes.func,
  showLoader: PropTypes.bool,
  regError: PropTypes.bool,
  resetRegForm: PropTypes.func
};

export default Step2;
