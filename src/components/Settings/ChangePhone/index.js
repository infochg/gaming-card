import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import TextField from '../../Common/TextField';
import Preloader from '../../Common/Preloader';
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
  btn: {
    maxWidth: '100%',
    margin: '20px 0'
  },
  loader: {
    margin: '30px auto'
  }
}));

function ChangePhone(props) {
  const { mobileNumber, updateUserData, closeUpdateBlock, loading } = props;
  const classes = useStyles();
  const [phone, setPhone] = useState(mobileNumber || '');

  const changeField = e => {
    const regex = /[^0-9]/;
    if (!regex.test(e.target.value) && e.target.value.length < 11) {
      setPhone(e.target.value);
    }
  };

  try {
    const handleSubmit = e => {
      e.preventDefault();
      updateUserData({ mobileNumber: phone });
    };

    return (
      <React.Fragment>
        <Typography className={classes.title}>
          {' '}
          <Icon
            icon="arrow-left"
            className={classes.arrowLeft}
            role="presentation"
            onClick={closeUpdateBlock}
          />{' '}
          Update your phone
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="phone"
              value={phone}
              label="Phone"
              onChange={changeField}
              variant="outlined"
              fullWidth
            />
            {!loading ? (
              <CustButton
                type="submit"
                subclass={classes.btn}
                disabled={phone === '' || phone.length !== 10}
              >
                Update Phone
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

ChangePhone.defaultProps = {
  mobileNumber: undefined,
  updateUserData: undefined,
  loading: undefined,
  closeUpdateBlock: undefined
};

ChangePhone.propTypes = {
  mobileNumber: PropTypes.string,
  updateUserData: PropTypes.func,
  loading: PropTypes.bool,
  closeUpdateBlock: PropTypes.func
};

export default ChangePhone;
