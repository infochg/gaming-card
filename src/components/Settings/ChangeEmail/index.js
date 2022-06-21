import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import TextField from '../../Common/TextField';
import Preloader from '../../Common/Preloader';
import Modal from '../../Common/Modal';
import CustButton from '../../Common/Button';
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

function ChangeEmail(props) {
  const { updateUserData, closeUpdateBlock, loading } = props;
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [emailValid, setEmailValid] = useState('');
  const [currentPasswordValid, setCurrentPasswordValid] = useState('');

  const [isConfOpen, setIsConfOpen] = useState(false);

  const changeField = e => {
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    } else if (e.target.name === 'currentPassword') {
      setCurrentPassword(e.target.value);
    }
  };

  try {
    const validateFields = () => {
      let isValidated = true;
      setEmailValid('');
      setCurrentPasswordValid('');

      if (email === '') {
        setEmailValid('Field is empty');
        isValidated = false;
      }

      if (!/.+@.+\..+/i.test(email)) {
        setEmailValid('Email is incorrect');
        isValidated = false;
      }

      if (currentPassword === '') {
        setCurrentPasswordValid('Field is empty');
        isValidated = false;
      }

      if (!/^(?=.*\d)(?=.*[\W]).{8,20}$/.test(currentPassword)) {
        setCurrentPasswordValid(
          'Your password must be at least 8 characters long, contain at least one uppercase, lowercase,number, and special chacter.'
        );
        isValidated = false;
      }

      return isValidated;
    };

    const handleSubmit = e => {
      e.preventDefault();
      if (validateFields()) {
        setIsConfOpen(true);
      }
    };

    // Confirmation Modal
    const updateEmail = () => {
      updateUserData({ email: email.trim(), currentPassword });
    };

    const handleCloseModal = () => {
      setIsConfOpen(false);
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
          Update your email
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="currentPassword"
              value={currentPassword}
              label="Password"
              onChange={changeField}
              variant="outlined"
              type="password"
              withToggle
              isVisible={false}
              fullWidth
              validation={currentPasswordValid}
            />
            <TextField
              name="email"
              value={email}
              label="New email"
              onChange={changeField}
              variant="outlined"
              fullWidth
              validation={emailValid}
            />
            {!loading ? (
              <CustButton type="submit" subclass={classes.btn}>
                Update Email
              </CustButton>
            ) : (
              <Preloader />
            )}
          </form>
        </div>
        <Modal
          isOpened={isConfOpen}
          title="Email updating."
          text={`Do you really want to change your Email to ${email}?`}
          callback={updateEmail}
          closeModal={handleCloseModal}
          loader={loading}
        />
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ChangeEmail.defaultProps = {
  updateUserData: undefined,
  loading: undefined,
  closeUpdateBlock: undefined
};

ChangeEmail.propTypes = {
  updateUserData: PropTypes.func,
  loading: PropTypes.bool,
  closeUpdateBlock: PropTypes.func
};

export default ChangeEmail;
