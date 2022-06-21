import React, { useContext, useState, useEffect } from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Typography } from '@material-ui/core';
import ReactPixel from 'react-facebook-pixel';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import SelectField from '../../components/Common/SelectField';
import CustButton from '../../components/Common/Button';
import Icon from '../../components/Common/Icon';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';

import successIco from '../../assets/img/success-ico.png';
import failIco from '../../assets/img/fail-ico.png';
import close from '../../assets/img/close-ico.svg';

import { segTransferFinished, segTransferStart } from '../../utils/segment';
import { phTransferFinished, phTransferStart } from '../../utils/posthog';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%',
    maxWidth: '566px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '20px'
    }
  },
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px'
  },
  amountTitle: {
    fontSize: '24px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    margin: '20px 0'
  },
  buttonDisabled: {},
  banksWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  bank: {
    padding: '15px',
    '& img': {
      width: '90px',
      margin: '15px auto 5px'
    }
  },
  asLink: {
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      opacity: '0.7'
    }
  },
  fromToText: {
    fontSize: '18px',
    opacity: '0.7'
  },
  bankName: {
    fontSize: '14px',
    opacity: '0.7'
  },
  alignLeft: {
    textAlign: 'left'
  },
  chooseAccTitle: {
    fontSize: '18px',
    opacity: '0.5',
    marginBottom: '15px'
  },
  accountItem: {
    display: 'inline-flex',
    padding: '5px 0',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all .2s',
    '& img': {
      marginRight: '10px',
      maxWidth: '45px',
      maxHeight: '45px'
    },
    '&:hover': {
      opacity: '0.7'
    }
  },
  accountName: {
    fontSize: '18px',
    fontWeight: '600'
  },
  resultIco: {
    margin: '0 auto -50px auto',
    width: '90%',
    maxWidth: '326px'
  },
  resultTitle: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    marginBottom: '20px',
    textAlign: 'center'
  },
  resultText: {
    fontSize: '18px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0 5px 0',
    cursor: 'pointer',
    '&:hover': {
      opacity: '0.9'
    }
  },
  buttonText: {
    fontSize: '18px',
    fontWeight: '600'
  },
  selectItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '16px'
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
  },
  addBtn: {
    marginTop: '20px',
    maxWidth: '100% !important'
  },
  comission: {
    fontSize: '16px',
    width: '100%',
    textAlign: 'center'
  },
  textCenter: {
    textAlign: 'center'
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
  goBackArrow: {
    height: '14px',
    cursor: 'pointer'
  }
}));

let cb = { success: null, fail: null };

function PaymentContainer() {
  const {
    anonId,
    // userDataDispatch,
    // errorDispatch,
    userData,
    isPaymentOpen,
    isPaymentOpenDispatch
  } = useContext(appContext);
  const classes = useStyles();

  const [curStep, setCurStep] = useState('chooseAccount');
  const [amount, setAmount] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [sourceAccount, setSourceAccount] = useState({});
  const [depositFrom, setDepositFrom] = useState('');

  const goBack = () => {
    isPaymentOpenDispatch({
      type: 'SET_IS_PAYMENT_OPEN',
      payload: { isOpen: false }
    });

    setCurStep('chooseAccount');
    setAmount('');
  };

  const closeModalSuccess = () => {
    goBack();

    if (cb.success) {
      cb.success();
      cb = { success: null, fail: null };
    }
  };

  useEffect(() => {
    if (
      userData &&
      userData.accountDetails &&
      userData.accountDetails.linkedAccounts &&
      userData.accountDetails.linkedAccounts.length > 0
    ) {
      setDepositFrom(
        userData.accountDetails.linkedAccounts[0].treasuryPrimeCounterpartyId
      );
      setSourceAccount(userData.accountDetails.linkedAccounts[0]);
    }
  }, [userData]);

  useEffect(() => {
    if (
      typeof isPaymentOpen.isOpen !== 'boolean' &&
      Object.keys(isPaymentOpen.isOpen).length > 0
    ) {
      setSourceAccount(isPaymentOpen.isOpen);
      setDepositFrom(isPaymentOpen.isOpen.treasuryPrimeCounterpartyId);
    }
  }, [isPaymentOpen, setSourceAccount, setCurStep]);

  useEffect(() => {
    if (isPaymentOpen.isOpen) {
      if (isPaymentOpen.onSuccess) {
        cb = { ...cb, success: isPaymentOpen.onSuccess };
      }

      if (isPaymentOpen.onFail) {
        cb = { ...cb, fail: isPaymentOpen.onFail };
      }
    }
  }, [isPaymentOpen]);

  // Choose bank
  const changeField = e => {
    if (e.target.name === 'amount') {
      const regex = /[^0-9.]/;
      if (!regex.test(e.target.value)) {
        setAmount(e.target.value);
      }
    } else if (e.target.name === 'depositFrom') {
      setDepositFrom(e.target.value);

      if (
        userData &&
        userData.accountDetails &&
        userData.accountDetails.linkedAccounts
      ) {
        setSourceAccount(
          userData.accountDetails.linkedAccounts.find(
            item => item.treasuryPrimeCounterpartyId === e.target.value
          )
        );
      }
    }
  };

  // add funds
  const onSuccessFunds = () => {
    setShowLoader(false);
    setCurStep('transferSuccess');

    // Segment
    segTransferFinished(
      { amount, transferFrequency: 'oneTime' },
      // eslint-disable-next-line
      userData ? userData._id : null,
      anonId
    );

    // PostHog
    phTransferFinished({ amount, transferFrequency: 'oneTime' });

    if (
      userData &&
      userData.transactions &&
      userData.transactions.length === 1
    ) {
      // FB Pixel
      ReactPixel.track('CompleteRegistration');

      // Snapchat Pixel
      // eslint-disable-next-line
      snaptr('track', 'START_CHECKOUT');

      // TikTok Pixel
      // eslint-disable-next-line
      ttq.track('Purchase');
    }

    // eslint-disable-next-line
    const event = new Event('update-userdata');
    window.dispatchEvent(event);
  };

  const onErrorFunds = payload => {
    setShowLoader(false);

    if (payload.indexOf('Transfer exceeds weekly deposit limit') !== -1) {
      setCurStep('limitReached');
    } else {
      setCurStep('transferFail');
    }
    // errorDispatch({ type: 'SET_ERROR', payload });
  };

  const addFunds = e => {
    e.preventDefault();
    setShowLoader(true);

    // Segment
    segTransferStart(
      { amount, transferFrequency: 'oneTime' },
      // eslint-disable-next-line
      userData ? userData._id : null,
      anonId
    );

    // PostHog
    phTransferStart({ amount, transferFrequency: 'oneTime' });

    fetchData('/money/createTransfer', 'POST', onSuccessFunds, onErrorFunds, {
      amount: Number(amount)
        .toFixed(2)
        .toString(),
      counterpartyId: sourceAccount.treasuryPrimeCounterpartyId || '',
      direction: isPaymentOpen.type === 'deposit' ? 'debit' : 'credit'
    });
  };

  const openIntercom = () => {
    if (window.Intercom) {
      window.Intercom('boot', {
        app_id: 'ckigeqdf',
        email: userData.accountDetails.email || '',
        phone: userData.accountDetails.mobileNumber || '',
        // eslint-disable-next-line
        user_id: userData ? userData._id : '',
        name: `${userData.accountDetails.firstName || ''} 
        ${userData.accountDetails.lastName || ''}`
      });
      window.Intercom('show');
    }
  };

  const steps = {
    chooseAccount: (
      <div className={classes.contentWrapper}>
        <div className={classes.naviBar}>
          <div role="presentation" onClick={goBack} className={classes.close}>
            <img src={close} alt="" />
          </div>
        </div>
        {userData &&
          userData.accountDetails &&
          userData.accountDetails.linkedAccounts &&
          userData.accountDetails.linkedAccounts.length > 0 && (
            <form onSubmit={addFunds}>
              <Typography className={classes.title}>
                {isPaymentOpen.type === 'deposit'
                  ? 'Deposit from'
                  : 'Withdraw to'}
              </Typography>
              <SelectField
                name="depositFrom"
                variant="outlined"
                type="text"
                onChange={changeField}
                fullWidth
                value={depositFrom}
                placeholder="Choose Account"
              >
                {userData.accountDetails.linkedAccounts
                  .filter(item => item.verified)
                  .map(item => {
                    return (
                      <MenuItem
                        key={shortid.generate()}
                        value={item.treasuryPrimeCounterpartyId}
                        className={classes.selectItem}
                      >
                        <span>
                          {item.name ||
                            `Account Ending in ${item.lastFour || 'XXXX'}`}
                        </span>{' '}
                        *** {item.lastFour || 'XXXX'}
                      </MenuItem>
                    );
                  })}
              </SelectField>
              <Typography className={classes.amountTitle}>Amount</Typography>
              <TextField
                name="amount"
                value={amount}
                onChange={changeField}
                variant="outlined"
                className={classes.amountField}
                placeholder="$0"
                fullWidth
              />
              {showLoader ? (
                <Preloader />
              ) : (
                <CustButton
                  disabled={Number(amount) === 0 || depositFrom === ''}
                  classes={{ disabled: classes.buttonDisabled }}
                  subclass={classes.addBtn}
                  type="submit"
                >
                  {isPaymentOpen.type === 'deposit' ? 'Deposit' : 'Withdraw'} $
                  {Number(amount).toFixed(2)}
                </CustButton>
              )}
            </form>
          )}
      </div>
    ),
    transferSuccess: (
      <div className={`${classes.contentWrapper} ${classes.textCenter}`}>
        <div className={classes.naviBar}>
          <Icon
            icon="arrow-left"
            className={classes.goBackArrow}
            role="presentation"
            onClick={goBack}
          />
          <div
            role="presentation"
            onClick={closeModalSuccess}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        </div>
        <img src={successIco} alt="" className={classes.resultIco} />
        <Typography className={classes.resultTitle}>Success</Typography>
        <Typography className={classes.resultText}>
          {amount ? `$${Number(amount).toFixed(2)}` : 'Your money'} will be
          deposited into your account within the next 3-5 business days.
        </Typography>
        <CustButton onClick={closeModalSuccess}>Ok</CustButton>
      </div>
    ),
    transferFail: (
      <div className={`${classes.contentWrapper} ${classes.textCenter}`}>
        <div className={classes.naviBar}>
          <Icon
            icon="arrow-left"
            className={classes.goBackArrow}
            role="presentation"
            onClick={goBack}
          />
          <div
            role="presentation"
            onClick={closeModalSuccess}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        </div>
        <img src={failIco} alt="" className={classes.resultIco} />
        <Typography className={classes.resultTitle}>Error</Typography>
        <Typography className={classes.resultText}>
          Something has gone wrong. Please try again. If you are still having
          issues please contact us.
        </Typography>
        <CustButton onClick={() => setCurStep('chooseAccount')}>
          Back
        </CustButton>
      </div>
    ),
    limitReached: (
      <div className={`${classes.contentWrapper} ${classes.textCenter}`}>
        <div className={classes.naviBar}>
          <Icon
            icon="arrow-left"
            className={classes.goBackArrow}
            role="presentation"
            onClick={goBack}
          />
          <div
            role="presentation"
            onClick={closeModalSuccess}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        </div>
        <img src={failIco} alt="" className={classes.resultIco} />
        <Typography className={classes.resultTitle}>Limit Reached</Typography>
        <Typography className={classes.resultText}>
          You&lsquo;ve reached the weekly deposit limit. Please contact customer
          support.
        </Typography>
        <CustButton onClick={openIntercom}>Contact customer support</CustButton>
      </div>
    )
  };

  return (
    <React.Fragment>{!!isPaymentOpen.isOpen && steps[curStep]}</React.Fragment>
  );
}

export default PaymentContainer;
