import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Typography } from '@material-ui/core';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../../Common/Preloader';
import CustButton from '../../Common/Button';
import { phoneMask } from '../../../utils/helpers';
import CodeInput from '../../Common/CodeInput';

function Step4(props) {
  const {
    classes,
    showLoader,
    submitNumber,
    phoneValid,
    setPhoneValid,
    isCodeSent,
    setIsCodeSent,
    submitCode,
    userData,
    codeValid,
    setCodeValid,
    resendCode
  } = props;
  const [mobileNumber, setMobileNumber] = useState(
    userData && userData.mobileNumber ? userData.mobileNumber : ''
  );
  const [code, setCode] = useState('');

  const changeField = e => {
    if (e.target.name === 'mobileNumber') {
      if (phoneValid !== '') {
        setPhoneValid('');
      }
      setMobileNumber(phoneMask(e.target.value));
    } else if (e.target.name === 'code') {
      if (!/[^0-9]/.test(e.target.value) && e.target.value.length < 7) {
        if (codeValid !== '') {
          setCodeValid('');
        }
        setCode(e.target.value);
      }
    }
  };

  const setCursor = e => {
    if (e.target) {
      setTimeout(() => {
        e.target.setSelectionRange(
          e.target.value.length,
          e.target.value.length
        );
      }, 100);
    }
  };

  try {
    const sendNumber = e => {
      e.preventDefault();
      const data = {};
      if (mobileNumber !== '') {
        data.mobileNumber = mobileNumber;
      }
      submitNumber(data);
    };

    const changeCode = data => {
      setCode(data);
    };

    const sendCode = e => {
      e.preventDefault();
      const data = {};
      if (code !== '') {
        data.code = code;
      }
      data.email = userData.email;
      data.password = cookie.load('token') || '';
      submitCode(data);
    };

    return !isCodeSent ? (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Enter your phone number
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Please enter your valid phone number.
          <br />
          We’ll send you verification code.
        </Typography>
        <div className={classes.form}>
          <form onSubmit={sendNumber}>
            <TextField
              name="mobileNumber"
              value={phoneMask(mobileNumber)}
              placeholder="(000) 000-0000"
              label="Phone number"
              onFocus={setCursor}
              onMouseDown={setCursor}
              onKeyDown={setCursor}
              onChange={changeField}
              variant="outlined"
              fullWidth
              validation={phoneValid}
            />
            {!showLoader ? (
              <CustButton
                disabled={mobileNumber === '' || mobileNumber.length !== 14}
                type="submit"
                btnstyle="system"
                fullWidth
                subclass={classes.btnWithMarg}
              >
                Continue
              </CustButton>
            ) : (
              <Preloader />
            )}
          </form>
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Verify your mobile number
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          We sent verification code to{' '}
          <span className={classes.purpleText}>{phoneMask(mobileNumber)}</span>
        </Typography>
        <div className={classes.form}>
          <form onSubmit={sendCode}>
            <CodeInput onChange={changeCode} />
            {codeValid ? (
              <Typography
                className={`${classes.subtext} ${classes.redtext} ${classes.center}`}
              >
                {codeValid}
              </Typography>
            ) : (
              ''
            )}
            <div className={classes.codeLinksWrapper}>
              <Typography
                className={classes.asLink}
                role="presentation"
                onClick={() => {
                  setIsCodeSent(false);
                }}
              >
                Change Phone Number
              </Typography>
              <Typography
                className={`${classes.asLink} ${classes.rightLink}`}
                role="presentation"
                onClick={resendCode}
              >
                Resend Code
              </Typography>
            </div>
            {!showLoader ? (
              <CustButton
                disabled={code === '' || code.length < 6}
                type="submit"
                btnstyle="system"
                fullWidth
                subclass={classes.btnWithMarg}
              >
                Continue
              </CustButton>
            ) : (
              <Preloader />
            )}
          </form>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step4.defaultProps = {
  classes: undefined,
  showLoader: undefined,
  submitNumber: undefined,
  phoneValid: undefined,
  setPhoneValid: undefined,
  isCodeSent: undefined,
  setIsCodeSent: undefined,
  submitCode: undefined,
  userData: undefined,
  codeValid: undefined,
  setCodeValid: undefined,
  resendCode: undefined
};

Step4.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string,
    purpleText: PropTypes.string,
    redtext: PropTypes.string,
    codeLinksWrapper: PropTypes.string,
    asLink: PropTypes.string,
    rightLink: PropTypes.string
  }),
  showLoader: PropTypes.bool,
  submitNumber: PropTypes.func,
  phoneValid: PropTypes.string,
  setPhoneValid: PropTypes.func,
  isCodeSent: PropTypes.bool,
  setIsCodeSent: PropTypes.func,
  submitCode: PropTypes.func,
  userData: PropTypes.shape({
    mobileNumber: PropTypes.string,
    email: PropTypes.string
  }),
  codeValid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  setCodeValid: PropTypes.func,
  resendCode: PropTypes.func
};

export default Step4;
