import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import SettingsLayout from '../../layouts/SettingsLayout';
import CustButton from '../../components/Common/Button';
import appContext from '../../context/appContext';

import dd from '../../assets/img/dd-ico.png';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      paddingRight: '30px'
    }
  },
  rContentWrapper: {
    width: '100%',
    paddingLeft: '50px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      paddingRight: '30px',
      paddingLeft: '0',
      paddingBottom: '50px'
    }
  },
  ddIcon: {
    width: '90%',
    maxWidth: '435px',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: {
      maxWidth: '155px',
      marginBottom: '40px'
    }
  },
  ddTitle: {
    fontFamily: 'Oswald',
    fontWeight: '700',
    fontSize: '34px',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    margin: '0 auto 30px auto'
  },
  ddText: {
    fontSize: '18px',
    margin: '0 auto 30px auto'
  },
  btn: {
    maxWidth: '447px'
  }
}));

function DirectDeposit() {
  const classes = useStyles();

  const { isDDOpenDispatch, userData } = useContext(appContext);

  try {
    const openPinwheel = () => {
      isDDOpenDispatch({
        type: 'SET_IS_DD_OPEN',
        payload: {
          isOpen: true
        }
      });
    };

    let ddContent = null;

    if (userData && userData.accountDetails) {
      // if there is directDeposit obj
      if (userData.accountDetails.directDeposit) {
        const directDepositObj = userData.accountDetails.directDeposit;

        if (
          (directDepositObj.type === 'amount' &&
            Number(directDepositObj.amount) > 0) ||
          (directDepositObj.type === 'percentage' &&
            Number(directDepositObj.percentage) > 0) ||
          directDepositObj.type === 'remainder'
        ) {
          if (directDepositObj.type === 'amount') {
            ddContent = `Your current Direct Deposit is: $${Number(
              directDepositObj.amount
            )} per paycheck.`;
          } else if (directDepositObj.type === 'percentage') {
            ddContent = `Your current Direct Deposit is:
            ${Number(directDepositObj.percentage)}% per paycheck.`;
          } else if (directDepositObj.type === 'remainder') {
            ddContent = `Setup Ok`;
          }
        }
        // if there is no directDeposit obj but there is directDepositType
      } else if (userData.accountDetails.directDepositType) {
        if (
          (userData.accountDetails.directDepositType === 'amount' &&
            Number(userData.accountDetails.directDepositAmount) > 0) ||
          (userData.accountDetails.directDepositType === 'percentage' &&
            Number(userData.accountDetails.directDepositPercentage) > 0) ||
          userData.accountDetails.directDepositType === 'remainder'
        ) {
          if (userData.accountDetails.directDepositType === 'amount') {
            ddContent = `Your current Direct Deposit is: $${Number(
              userData.accountDetails.directDepositAmount
            )} per paycheck.`;
          } else if (
            userData.accountDetails.directDepositType === 'percentage'
          ) {
            ddContent = `Your current Direct Deposit is:
            ${Number(
              userData.accountDetails.directDepositPercentage
            )}% per paycheck.`;
          } else if (
            userData.accountDetails.directDepositType === 'remainder'
          ) {
            ddContent = `Setup Ok`;
          }
        }
      }
    }

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <img src={dd} alt="" className={classes.ddIcon} />
          </div>
          <div className={classes.rContentWrapper}>
            {ddContent ? (
              <React.Fragment>
                <Typography className={classes.ddTitle}>{ddContent}</Typography>

                <CustButton
                  onClick={openPinwheel}
                  fullWidth
                  subclass={classes.btn}
                >
                  Edit
                </CustButton>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography className={classes.ddTitle}>
                  RECEIVE YOUR PAYCHECK IN MYTHIA WITH DIRECT DEPOSIT
                </Typography>
                <Typography className={classes.ddText}>
                  Example: deposit 30% of your paycheck into Mythia
                  automatically
                </Typography>
                <CustButton
                  onClick={openPinwheel}
                  fullWidth
                  subclass={classes.btn}
                >
                  SET UP DIRECT DEPOSIT
                </CustButton>
              </React.Fragment>
            )}
          </div>
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default DirectDeposit;
