import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import TextField from '../../components/Common/TextField';
import CustButton from '../../components/Common/Button';
import Preloader from '../../components/Common/Preloader';

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: '20px'
  },
  btn: {
    maxWidth: '100%',
    marginTop: '20px'
  },
  successText: {
    fontSize: '18px',
    padding: '20px 0 30px 0'
  },
  successTitle: {
    fontSize: '21px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    marginTop: '20px'
  },
  errorText: {
    fontSize: '13px',
    margin: '0 0 5px 0',
    padding: '8px 15px',
    borderRadius: '5px',
    color: theme.palette.text.darkRed,
    background: theme.palette.background.redWithOp,
    textAlign: 'left'
  }
}));

function MicroDeposit(props) {
  const { sendMicroDepositData, microDepositStat, closeAddAccount } = props;
  const [name, setName] = useState('');
  const [ach, setAch] = useState('');
  const [routingNum, setRoutingNum] = useState('');
  const [showRNError, setShowRNError] = useState(false);

  const classes = useStyles();

  const changeField = e => {
    const regex = /[^0-9.]/;
    if (e.target.name === 'nameOnAccount') {
      setName(e.target.value);
    } else if (e.target.name === 'ach') {
      if (!regex.test(e.target.value)) {
        setAch(e.target.value);
      }
    } else if (e.target.name === 'routingNum') {
      if (showRNError && e.target.value !== '026015053') {
        setShowRNError(false);
      }

      if (!regex.test(e.target.value)) {
        setRoutingNum(e.target.value);
      }
    }
  };

  const submit = e => {
    e.preventDefault();

    const data = {
      nameOnAccount: name,
      accountNumber: ach,
      routingNumber: routingNum
    };

    if (routingNum === '026015053') {
      setShowRNError(true);
    } else {
      sendMicroDepositData(data);
    }
  };

  const steps = {
    sendForm: (
      <form onSubmit={submit} className={classes.form}>
        <TextField
          name="nameOnAccount"
          value={name}
          onChange={changeField}
          label="Name on Account"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="ach"
          value={ach}
          onChange={changeField}
          label="Account Number (ACH)"
          variant="outlined"
          fullWidth
        />
        <TextField
          name="routingNum"
          value={routingNum}
          onChange={changeField}
          label="Routing Number"
          variant="outlined"
          fullWidth
        />

        {showRNError && (
          <Typography className={classes.errorText}>
            You can only link non-Mythia accounts
          </Typography>
        )}

        {microDepositStat === 'loading' ? (
          <Preloader />
        ) : (
          <CustButton
            type="submit"
            subclass={classes.btn}
            disabled={name === '' || ach === '' || routingNum === ''}
          >
            Continue
          </CustButton>
        )}
      </form>
    ),
    success: (
      <React.Fragment>
        <Typography className={classes.successTitle}>
          How to Verify Your Account
        </Typography>
        <Typography className={classes.successText}>
          You&lsquo;ll receive two small deposits in about 48 hours. All you
          need to do is type them into the Mythia app, and you&lsquo;re good to
          go!
        </Typography>
        <CustButton subclass={classes.btn} onClick={closeAddAccount}>
          Ok
        </CustButton>
      </React.Fragment>
    )
  };

  return steps[microDepositStat] || steps.sendForm;
}

MicroDeposit.propTypes = {
  sendMicroDepositData: PropTypes.func,
  microDepositStat: PropTypes.string,
  closeAddAccount: PropTypes.func
};

MicroDeposit.defaultProps = {
  sendMicroDepositData: undefined,
  microDepositStat: undefined,
  closeAddAccount: undefined
};

export default MicroDeposit;
