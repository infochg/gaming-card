import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../containers/ErrorBoundary';
import TransactionsList from '../../components/Transactions/TransactionsList';
import AddAccountContainer from '../../containers/AddAccountContainer';
import PaymentContainer from '../../containers/PaymentContainer';
import appContext from '../../context/appContext';

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    display: 'flex',
    width: '100%',
    paddingRight: '30px',
    position: 'relative'
  },
  lContentWrapper: {
    minWidth: '700px',
    width: '700px',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      width: '100%'
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
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      padding: '0 35px 0 0',
      marginLeft: '0',
      border: '0',
      background: '#fff'
    }
  }
}));

function Transactions() {
  const classes = useStyles();
  const {
    userData,
    isAddAccountOpen,
    isAddAccountOpenDispatch,
    isPaymentOpen,
    isPaymentOpenDispatch
  } = useContext(appContext);

  // Payment Modal
  const handleOpenPayment = type => {
    if (
      userData.accountDetails &&
      userData.accountDetails.linkedAccounts &&
      userData.accountDetails.linkedAccounts.length === 0
    ) {
      isAddAccountOpenDispatch({
        type: 'SET_IS_ADD_ACCOUNT_OPEN',
        payload: {
          isOpen: true,
          onSuccess: () => {
            isPaymentOpenDispatch({
              type: 'SET_IS_PAYMENT_OPEN',
              payload: { isOpen: {}, type }
            });
          }
        }
      });
    } else {
      isPaymentOpenDispatch({
        type: 'SET_IS_PAYMENT_OPEN',
        payload: { isOpen: {}, type }
      });
    }
  };

  try {
    return (
      <div className={classes.content}>
        <div className={classes.lContentWrapper}>
          <TransactionsList
            handleOpenPayment={handleOpenPayment}
            transactions={userData.transactions || []}
            cardStatus={
              userData && userData.cards && userData.cards.physical
                ? userData.cards.physical.status
                : ''
            }
          />
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
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Transactions;
