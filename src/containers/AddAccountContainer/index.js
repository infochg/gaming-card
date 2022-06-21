import React, { useContext, useEffect, useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '../../components/Common/Modal';
import PlaidModal from './PlaidModal';
import CustButton from '../../components/Common/Button';
import MicroDeposit from './MicroDeposit';

import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';
import { connectPlaidFinished, connectPlaidStart } from '../../utils/segment';
import {
  phConnectPlaidFinished,
  phConnectPlaidStart
} from '../../utils/posthog';

import close from '../../assets/img/close-ico.svg';
import connectedIcon from '../../assets/img/account-connected-ico.png';

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
  subTitle: {
    fontSize: '22px',
    color: theme.palette.text.primary,
    fontWeight: '900',
    marginBottom: '20px'
  },
  text: {
    fontSize: '18px',
    padding: '20px 0 30px 0'
  },
  addFundsWrapper: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    width: '100%',
    maxWidth: '566px'
  },
  regWrapper: {
    textAlign: 'center',
    alignItems: 'center',
    margin: '0 auto'
  },
  btn: {
    maxWidth: '400px',
    display: 'block',
    paddingTop: '20px',
    paddingBottom: '20px',
    marginBottom: '20px',
    '&:hover': {
      '& p': {
        color: '#fff'
      }
    }
  },
  btnTitle: {
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransfrom: 'uppercase',
    fontSize: '20px'
  },
  btnText: {
    fontSize: '12px',
    color: theme.palette.text.primary,
    textTransform: 'none'
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
  connectedIco: {
    margin: '20px auto',
    width: '90%',
    maxWidth: '182px'
  },
  center: {
    textAlign: 'center',
    margin: '0 auto',
    justifyContent: 'center'
  }
}));

let cb = { success: null, fail: null };

function AddAccountContainer() {
  const classes = useStyles();

  const [linkToken, setLinkToken] = useState('');
  const [openPlaid, setOpenPlaid] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openMicroDeposit, setOpenMicroDeposit] = useState(false);
  const [microDepositStat, setMicroDepositStat] = useState('');

  const {
    anonId,
    errorDispatch,
    userData,
    userDataDispatch,
    isAddAccountOpen,
    isAddAccountOpenDispatch
  } = useContext(appContext);

  const goBack = () => {
    isAddAccountOpenDispatch({
      type: 'SET_IS_PAYMENT_OPEN',
      payload: { isOpen: false }
    });

    if (isAddAccountOpen.isRegistration) {
      if (cb.fail) {
        cb.fail();

        cb = { success: null, fail: null };
      }
    }
  };

  const closePostModal = () => {
    setOpenPostModal(false);

    if (!isAddAccountOpen.isRegistration) {
      window.location.reload();
    }
  };

  // Send public token to server
  const onSuccessToken = useCallback(payload => {
    userDataDispatch({
      type: 'SET_USER_DATA',
      payload: {
        ...userData,
        accountDetails: {
          ...userData.accountDetails,
          linkedAccounts: payload.linkedAccounts
        }
      }
    });

    // Segment
    connectPlaidFinished(
      // eslint-disable-next-line
      userData ? userData._id : null,
      anonId
    );

    // PostHog
    phConnectPlaidFinished();

    if (cb.success) {
      cb.success();

      cb = { success: null, fail: null };
    }
  }, []);

  const onErrorToken = useCallback(payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
    if (cb.fail) {
      cb.fail();

      cb = { success: null, fail: null };
    }
  }, []);

  const sendTokenToServer = data => {
    setOpenPlaid(false);
    setOpenPostModal(true);
    fetchData(
      '/money/addPlaidToken',
      'POST',
      onSuccessToken,
      onErrorToken,
      data
    );
  };

  // Get Token link from server
  const onSuccessLink = useCallback(payload => {
    setLinkToken(payload.linkToken);
  }, []);

  const onErrorLink = useCallback(payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
    if (cb.fail) {
      cb.fail();

      cb = { success: null, fail: null };
    }
  }, []);

  useEffect(() => {
    if (isAddAccountOpen && isAddAccountOpen.isOpen) {
      if (isAddAccountOpen.onSuccess) {
        cb = { ...cb, success: isAddAccountOpen.onSuccess };
      }

      if (isAddAccountOpen.onFail) {
        cb = { ...cb, fail: isAddAccountOpen.onFail };
      }

      // Segment
      connectPlaidStart(
        // eslint-disable-next-line
        userData ? userData._id : null,
        anonId
      );

      // PostHog
      phConnectPlaidStart();

      fetchData('/money/getPlaidLinkToken', 'GET', onSuccessLink, onErrorLink);
    }
  }, [isAddAccountOpen]);

  // Plaid
  const handleOpenPlaid = () => {
    setOpenPlaid(true);
  };

  const handleClosePlaid = status => {
    setOpenPlaid(false);

    if (status === 'success') {
      if (cb.success) {
        cb.success();
      }
    } else if (cb.fail) {
      cb.fail();
    }

    cb = { success: null, fail: null };
  };

  // MicroDeposit
  const handleOpenMicroDeposit = () => {
    setOpenMicroDeposit(true);
  };

  const onSuccessAddMicroDeposit = useCallback(payload => {
    setMicroDepositStat('success');
    userDataDispatch({
      type: 'SET_USER_DATA',
      payload: {
        ...userData,
        accountDetails: {
          ...userData.accountDetails,
          linkedAccounts: payload.linkedAccounts
        }
      }
    });
  }, []);

  const onErrorAddMicroDeposit = useCallback(payload => {
    setMicroDepositStat('');
    if (cb.fail) {
      cb.fail();

      cb = { success: null, fail: null };
    }
    errorDispatch({ type: 'SET_ERROR', payload });
  }, []);

  const sendMicroDepositData = data => {
    setMicroDepositStat('loading');
    fetchData(
      '/money/addAccountWithMicrodeposits',
      'POST',
      onSuccessAddMicroDeposit,
      onErrorAddMicroDeposit,
      data
    );
  };

  const closeAddAccount = () => {
    isAddAccountOpenDispatch({
      type: 'SET_IS_ADD_ACCOUNT_OPEN',
      payload: { isOpen: false }
    });
  };

  return (
    <React.Fragment>
      <div
        className={`${classes.addFundsWrapper} ${
          isAddAccountOpen.isRegistration ? classes.regWrapper : ''
        }`}
      >
        <div className={classes.naviBar}>
          <div role="presentation" onClick={goBack} className={classes.close}>
            <img src={close} alt="" />
          </div>
        </div>
        <Typography className={classes.title}>Add a bank account</Typography>
        {!openMicroDeposit ? (
          <React.Fragment>
            <Typography className={classes.text}>
              How would you like to connect your bank account?
            </Typography>
            <CustButton onClick={handleOpenPlaid} subclass={classes.btn}>
              <Typography className={classes.btnTitle}>
                Use your bank login
              </Typography>
              <Typography className={classes.btnText}>
                Usually the easiest option for most users
              </Typography>
            </CustButton>

            <CustButton onClick={handleOpenMicroDeposit} subclass={classes.btn}>
              <Typography className={classes.btnTitle}>
                Account and routing number
              </Typography>
              <Typography className={classes.btnText}>
                In case bank login doesn’t support your bank yet
              </Typography>
            </CustButton>
          </React.Fragment>
        ) : (
          <MicroDeposit
            sendMicroDepositData={sendMicroDepositData}
            microDepositStat={microDepositStat}
            closeAddAccount={closeAddAccount}
          />
        )}
      </div>
      {linkToken !== '' && openPlaid && (
        <PlaidModal
          linkToken={linkToken}
          sendTokenToServer={sendTokenToServer}
          handleClosePlaid={handleClosePlaid}
        />
      )}
      <Modal
        isOpened={openPostModal}
        content={
          <React.Fragment>
            <img src={connectedIcon} alt="" className={classes.connectedIco} />
            <Typography className={`${classes.title} ${classes.center}`}>
              Account Connected
            </Typography>
            <Typography className={classes.text}>
              You&lsquo;ll be able to make deposits from this account in 3
              minutes
            </Typography>
            <CustButton onClick={closePostModal}>Ok</CustButton>
          </React.Fragment>
        }
        noBtns
      />
    </React.Fragment>
  );
}

export default AddAccountContainer;
