import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../containers/ErrorBoundary';
import OpenRewards from '../../components/Overview/OpenRewards';
import GuaranteedRewards from '../../components/Overview/GuaranteedRewards';
import RecentRewards from '../../components/Overview/RecentRewards';
import appContext from '../../context/appContext';
import AddAccountContainer from '../../containers/AddAccountContainer';
import PaymentContainer from '../../containers/PaymentContainer';
import fetchData from '../../utils/fetch';

const useStyles = makeStyles(theme => ({
  content: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    display: 'flex',
    width: '100%',
    margin: '0 -20px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    minWidth: '700px',
    width: '700px',
    paddingLeft: '20px',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      width: '100%'
    }
  },
  rContentWrapper: {
    width: '100%',
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '20px'
    }
  }
}));

function Overview() {
  const classes = useStyles();
  const {
    userData,
    isAddAccountOpen,
    isAddAccountOpenDispatch,
    isPaymentOpen,
    isPaymentOpenDispatch,
    userDataDispatch,
    errorDispatch
  } = useContext(appContext);
  const [showLoader, setShowLoader] = useState(false);

  const history = useHistory();

  // Payment Modal
  const handleOpenPayment = () => {
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
              payload: { isOpen: {}, type: 'deposit' }
            });
          }
        }
      });
    } else {
      isPaymentOpenDispatch({
        type: 'SET_IS_PAYMENT_OPEN',
        payload: { isOpen: {}, type: 'deposit' }
      });
    }
  };

  // Open Reward Box
  const onSuccessOpen = payload => {
    userDataDispatch({ type: 'SET_USER_DATA', payload: payload.userData });
  };

  const onErrorOpen = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const openRewardBox = size => {
    fetchData(`/rewards/openbox/${size}`, 'GET', onSuccessOpen, onErrorOpen);
  };

  // get user data
  const onSuccessUserData = payload => {
    setShowLoader(false);
    userDataDispatch({ type: 'SET_USER_DATA', payload });
  };

  const onErrorUserData = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  // Claim Guaranteed Reward
  const onSuccessClaim = () => {
    fetchData('/userData/main', 'GET', onSuccessUserData, onErrorUserData);
  };

  const onErrorClaim = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const claimGuaranteedReward = () => {
    setShowLoader(true);
    fetchData(
      `/rewards/claimGuaranteedReward`,
      'POST',
      onSuccessClaim,
      onErrorClaim
    );
  };

  try {
    return (
      <div className={classes.content}>
        <div className={classes.lContentWrapper}>
          <OpenRewards
            ownedBoxes={userData.ownedBoxes || {}}
            upcomingRewardBoxes={userData.upcomingRewardBoxes || {}}
            handleOpenPayment={handleOpenPayment}
            openRewardBox={openRewardBox}
            history={history}
          />
          <GuaranteedRewards
            guaranteedReward={userData.guaranteedReward || {}}
            challenges={(userData.party && userData.party.challenges) || []}
            claimGuaranteedReward={claimGuaranteedReward}
            showLoader={showLoader}
          />
        </div>
        <div className={classes.rContentWrapper}>
          {!isAddAccountOpen.isOpen && !isPaymentOpen.isOpen && (
            <RecentRewards recentRewards={userData.recentRewards || []} />
          )}
          {isAddAccountOpen.isOpen && <AddAccountContainer />}
          {!!isPaymentOpen.isOpen && <PaymentContainer />}
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Overview;
