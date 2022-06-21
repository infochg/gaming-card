import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import zxcvbn from 'zxcvbn';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import TextField from '../../Common/TextField';
import Preloader from '../../Common/Preloader';
import CustButton from '../../Common/Button';
import StrengthMeter from '../../Common/StrengthMeter';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center'
  },
  arrowLeft: {
    display: 'none !important',
    height: '14px',
    marginRight: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'inline-block !important'
    }
  },
  loader: {
    margin: '30px auto'
  },
  btn: {
    maxWidth: '100%',
    margin: '20px 0'
  }
}));

function ChangePassword(props) {
  const { updateUserData, closeUpdateBlock, loading } = props;
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRep, setPasswordRep] = useState('');

  const [currentPasswordValid, setCurrentPasswordValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [passwordRepValid, setPasswordRepValid] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);

  const changeField = e => {
    if (e.target.name === 'currentPassword') {
      setCurrentPassword(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
      setPasswordScore(zxcvbn(e.target.value).score);
    } else if (e.target.name === 'passwordRep') {
      setPasswordRep(e.target.value);
    }
  };

  try {
    const validateFields = () => {
      let isValidated = true;
      setCurrentPasswordValid('');
      setPasswordValid('');
      setPasswordRepValid('');

      if (currentPassword === '') {
        setCurrentPasswordValid('Field is empty');
        isValidated = false;
      }

      if (currentPassword.length < 8) {
        setCurrentPasswordValid(
          'Your password must be at least 8 characters long.'
        );
        isValidated = false;
      }

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

    const handleSubmit = e => {
      e.preventDefault();
      if (validateFields()) {
        updateUserData({ password, currentPassword });
      }
    };

    return (
      <React.Fragment>
        <Typography className={classes.title}>
          <Icon
            icon="arrow-left"
            className={classes.arrowLeft}
            role="presentation"
            onClick={closeUpdateBlock}
          />{' '}
          Update your password
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="currentPassword"
              value={currentPassword}
              label="Old password"
              onChange={changeField}
              variant="outlined"
              type="password"
              fullWidth
              withToggle
              isVisible={false}
              validation={currentPasswordValid}
            />
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
            {!loading ? (
              <CustButton type="submit" subclass={classes.btn}>
                Update Password
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

ChangePassword.defaultProps = {
  updateUserData: undefined,
  loading: undefined,
  closeUpdateBlock: undefined
};

ChangePassword.propTypes = {
  updateUserData: PropTypes.func,
  loading: PropTypes.bool,
  closeUpdateBlock: PropTypes.func
};

export default ChangePassword;
