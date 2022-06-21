import React, { useContext, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CustButton from '../../components/Common/Button';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';

import close from '../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px'
  },
  text: {
    fontSize: '18px',
    padding: '20px 0 30px 0'
  },
  label: {
    fontFamily: 'Oswald',
    fontSize: '20px',
    color: theme.palette.text.darkPurple
  },
  naviBar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    marginBottom: '-40px'
  },
  close: {
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  btn: {
    maxWidth: '100%',
    margin: '20px 0'
  },
  amountField: {
    '& input': {
      border: 'none',
      textAlign: 'center',
      fontFamily: 'Oswald',
      fontWeight: '700',
      color: theme.palette.text.primary,
      background: theme.palette.background.gray
    }
  }
}));

function VerifyBankAccountContainer() {
  const classes = useStyles();
  const [deposit1, setDeposit1] = useState('');
  const [deposit2, setDeposit2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const {
    isVerifyBAOpen,
    isVerifyBAOpenDispatch,
    userData,
    userDataDispatch,
    errorDispatch
  } = useContext(appContext);

  const goBack = () => {
    isVerifyBAOpenDispatch({
      type: 'SET_IS_VERIFY_BA_OPEN',
      payload: { isOpen: false }
    });
  };

  const changeField = e => {
    const regex = /[^0-9.]/;
    if (!regex.test(e.target.value)) {
      if (e.target.name === 'deposit1') {
        setDeposit1(e.target.value);
      } else if (e.target.name === 'deposit2') {
        setDeposit2(e.target.value);
      }
    }
  };

  const onSuccess = payload => {
    setIsLoading(false);
    setIsVerified(true);
    userDataDispatch({
      type: 'SET_USER_DATA',
      payload: {
        ...userData,
        accountDetails: {
          ...userData.accountDetails,
          linkedAccounts: payload.data
        }
      }
    });
  };

  const onError = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
    setIsLoading(false);
  };

  const sendVerificationData = data => {
    fetchData('/money/verifyMicrodeposits', 'POST', onSuccess, onError, data);
  };

  const submit = e => {
    e.preventDefault();

    const data = {
      counterpartyId:
        isVerifyBAOpen.isOpen &&
        isVerifyBAOpen.isOpen.treasuryPrimeCounterpartyId
          ? isVerifyBAOpen.isOpen.treasuryPrimeCounterpartyId
          : '',
      deposit1,
      deposit2
    };
    setIsLoading(true);
    sendVerificationData(data);
  };

  return (
    <React.Fragment>
      <div className={classes.naviBar}>
        <div role="presentation" onClick={goBack} className={classes.close}>
          <img src={close} alt="" />
        </div>
      </div>
      {!isVerified ? (
        <React.Fragment>
          <Typography className={classes.title}>Verify bank account</Typography>
          <Typography className={classes.text}>
            We made 2 small deposits to your checking account. Please type the
            deposit amounts here to verify your account.
          </Typography>

          <form onSubmit={submit} className={classes.form}>
            <Typography className={classes.label}>Deposit #1:</Typography>
            <TextField
              name="deposit1"
              value={deposit1}
              onChange={changeField}
              variant="outlined"
              className={classes.amountField}
              placeholder="$0"
              fullWidth
            />
            <Typography className={classes.label}>Deposit #2:</Typography>
            <TextField
              name="deposit2"
              value={deposit2}
              onChange={changeField}
              variant="outlined"
              className={classes.amountField}
              placeholder="$0"
              fullWidth
            />
            {isLoading ? (
              <Preloader />
            ) : (
              <CustButton
                type="submit"
                subclass={classes.btn}
                disabled={deposit1 === '' || deposit2 === ''}
              >
                Continue
              </CustButton>
            )}
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.title}>
            Your Account is Verified
          </Typography>
          <Typography className={classes.text}>
            To get started, just make a deposit in your Mythia account.
          </Typography>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default VerifyBankAccountContainer;
