import React, { useContext, useState } from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import SettingsLayout from '../../layouts/SettingsLayout';
import CustButton from '../../components/Common/Button';
import CorneredBlock from '../../components/Common/CorneredBlock';
import Icon from '../../components/Common/Icon';
import PaymentContainer from '../../containers/PaymentContainer';
import AddAccountContainer from '../../containers/AddAccountContainer';
import VerifyBankAccountContainer from '../../containers/VerifyBankAccountContainer';
import Modal from '../../components/Common/Modal';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';

import placeholder from '../../assets/img/account-placeholder-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  lContentWrapper: {
    minWidth: '584px',
    [theme.breakpoints.down('md')]: {
      minWidth: '1px',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '30px'
    }
  },
  rContentWrapper: {
    width: '100%',
    marginLeft: '50px',
    paddingLeft: '50px',
    borderLeft: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: '2',
      width: 'calc(100% + 37px)',
      maxWidth: 'calc(100% + 37px)',
      height: '100%',
      top: '0',
      left: '0',
      padding: '0 0 0 36px',
      marginLeft: '-36px',
      border: '0',
      background: '#fff'
    }
  },
  innerWrapper: {
    display: 'flex'
  },
  corBlockClass: {
    margin: '20px 0',
    border: `1px solid ${theme.palette.border.default}`
  },
  btn: {
    maxWidth: '100%'
  },
  instItem: {
    display: 'inline-flex',
    width: '100%',
    padding: '15px',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all .2s',
    '& img': {
      marginRight: '30px',
      maxWidth: '67px',
      maxHeight: '67px'
    },
    '&:hover': {
      opacity: '0.7'
    }
  },
  selectedAccount: {
    background: theme.palette.background.grayWithOp
  },
  name: {
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple
  },
  desc: {
    fontSize: '14px',
    opacity: '0.7'
  },
  verified: {
    marginTop: '5px',
    color: theme.palette.text.blue,
    fontWeight: '700',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: '12px',
      marginRight: '5px'
    }
  },
  unverified: {
    marginTop: '5px',
    color: theme.palette.text.lightGray,
    fontWeight: '700',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      width: '12px',
      marginRight: '5px'
    }
  },
  grayscale: {
    filter: 'grayscale(100%)'
  },
  deleteIcon: {
    width: '26px',
    marginLeft: 'auto',
    marginRight: '15px',
    cursor: 'pointer',
    opacity: '1',
    transition: 'all .2s',
    '&:hover': {
      opacity: '0.5'
    }
  },
  confirmText: {
    margin: '30px auto 10px auto'
  }
}));

function LinkedAccounts() {
  const classes = useStyles();
  const {
    userData,
    userDataDispatch,
    isAddAccountOpen,
    isAddAccountOpenDispatch,
    isPaymentOpen,
    isPaymentOpenDispatch,
    isVerifyBAOpen,
    isVerifyBAOpenDispatch,
    errorDispatch
  } = useContext(appContext);

  const [showLoader, setShowLoader] = useState(false);

  // Confirm Modal
  const [itemData, setItemData] = useState(null);
  const closeConfirmModal = () => setItemData(null);

  try {
    const accounts = userData.accountDetails
      ? userData.accountDetails.linkedAccounts
      : [];

    // Add Account Modal
    const openAddAccount = () => {
      isAddAccountOpenDispatch({
        type: 'SET_IS_ADD_ACCOUNT_OPEN',
        payload: {
          isOpen: true
        }
      });

      isPaymentOpenDispatch({
        type: 'SET_IS_PAYMENT_OPEN',
        payload: { isOpen: false }
      });

      isVerifyBAOpenDispatch({
        type: 'SET_IS_VERIFY_BA_OPEN',
        payload: { isOpen: false }
      });
    };

    // Payment Modal
    // const openPayment = item => {
    //   isPaymentOpenDispatch({
    //     type: 'SET_IS_PAYMENT_OPEN',
    //     payload: { isOpen: item, type: 'deposit' }
    //   });
    //
    //   isAddAccountOpenDispatch({
    //     type: 'SET_IS_ADD_ACCOUNT_OPEN',
    //     payload: {
    //       isOpen: false
    //     }
    //   });
    //
    //   isVerifyBAOpenDispatch({
    //     type: 'SET_IS_VERIFY_BA_OPEN',
    //     payload: { isOpen: false }
    //   });
    // };

    // Verify Bank Account Modal
    const openVerifying = item => {
      isVerifyBAOpenDispatch({
        type: 'SET_IS_VERIFY_BA_OPEN',
        payload: { isOpen: item }
      });

      isPaymentOpenDispatch({
        type: 'SET_IS_PAYMENT_OPEN',
        payload: { isOpen: false }
      });

      isAddAccountOpenDispatch({
        type: 'SET_IS_ADD_ACCOUNT_OPEN',
        payload: {
          isOpen: false
        }
      });
    };

    // Delete Linked Account
    const onSuccessDelete = payload => {
      setShowLoader(false);
      closeConfirmModal();
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
    };

    const onErrorDelete = payload => {
      setShowLoader(false);
      closeConfirmModal();
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const deleteAccount = () => {
      setShowLoader(true);

      const data = {
        treasuryPrimeCounterpartyId: itemData.treasuryPrimeCounterpartyId
      };

      fetchData(
        `/money/deleteLinkedAccount`,
        'POST',
        onSuccessDelete,
        onErrorDelete,
        data
      );
    };

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <CustButton
              icon="plus"
              onClick={openAddAccount}
              subclass={classes.btn}
            >
              Add Bank Account
            </CustButton>

            {accounts.map(item => {
              let img = placeholder;
              if (item.logoImageBase64) {
                img = `data:image/jpeg;charset=utf-8;base64,${item.logoImageBase64}`;
              }

              return (
                <div key={shortid.generate()}>
                  <CorneredBlock subClass={classes.corBlockClass}>
                    <div className={classes.innerWrapper}>
                      <span
                        className={`${classes.instItem} ${
                          isPaymentOpen.isOpen.plaidItemId &&
                          isPaymentOpen.isOpen.plaidItemId === item.plaidItemId
                            ? classes.selectedAccount
                            : ''
                        }`}
                        role="presentation"
                        key={shortid.generate()}
                        onClick={() => {
                          // if (item.verified) {
                          //   openPayment(item);
                          // } else {
                          //   openVerifying(item);
                          // }
                          if (!item.verified) {
                            openVerifying(item);
                          }
                        }}
                      >
                        <img
                          src={img}
                          alt=""
                          className={`${
                            !item.verified ? classes.grayscale : ''
                          }`}
                        />
                        <span>
                          <Typography className={classes.name}>
                            {item.name ||
                              `Account Ending in ${item.lastFour || 'XXXX'}`}
                          </Typography>
                          <Typography className={classes.desc}>
                            {item.source === 'microdeposit'
                              ? 'Microdeposit'
                              : `Account Ending in ${item.lastFour || 'XXXX'}`}
                          </Typography>
                          {item.verified ? (
                            <Typography className={classes.verified}>
                              <Icon icon="verified" /> Verified Bank Account
                            </Typography>
                          ) : (
                            <Typography className={classes.unverified}>
                              <Icon icon="unverified" /> Unverified Bank Account
                            </Typography>
                          )}
                        </span>
                      </span>
                      <Icon
                        icon="trash"
                        className={classes.deleteIcon}
                        role="presentation"
                        onClick={() => setItemData(item)}
                      />
                    </div>
                  </CorneredBlock>
                </div>
              );
            })}
          </div>
          {isAddAccountOpen.isOpen && (
            <div className={classes.rContentWrapper}>
              <AddAccountContainer />
            </div>
          )}
          {!!isPaymentOpen.isOpen && (
            <div className={classes.rContentWrapper}>
              <PaymentContainer />
            </div>
          )}
          {!!isVerifyBAOpen.isOpen && (
            <div className={classes.rContentWrapper}>
              <VerifyBankAccountContainer />
            </div>
          )}
        </div>

        <Modal
          isOpened={!!itemData}
          closeModal={closeConfirmModal}
          title="Confirmation."
          content={
            <div className={classes.confirmText}>
              Do want to delete account, ending in{' '}
              {itemData ? itemData.lastFour : 'XXXX'}?
            </div>
          }
          callback={deleteAccount}
          loader={showLoader}
        />
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default LinkedAccounts;
