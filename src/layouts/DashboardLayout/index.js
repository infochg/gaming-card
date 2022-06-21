import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import cookie from 'react-cookies';
import ReactPixel from 'react-facebook-pixel';
import Dashboard from '../../components/Common/Dashboard';
import TopNavbar from '../../components/Common/TopNavbar';
import ToastsContainer from '../../components/Common/ToastsContainer';
import LogoutContainer from '../../containers/LogoutContainer';
import Preloader from '../../components/Common/Preloader';
import PartyContainer from '../../containers/PartyContainer';
import OnboardingContainer from '../../containers/OnboardingContainer';
import PinwheelContainer from '../../containers/PinwheelContainer';
import history from '../../history';
import { segChangePage } from '../../utils/segment';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'stretch',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      position: 'relative'
    }
  },
  container: {
    minHeight: '100%',
    width: 'calc(100% - 267px)',
    padding: '0 0 0 10px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '0 0 60px 0'
    }
  },
  content: {
    minHeight: 'calc(100vh - 111px)',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1300px',
    // margin: '0 auto',
    paddingLeft: '25px'
  }
}));

function DashboardLayout(props) {
  const {
    component,
    location,
    showLoader,
    userData,
    isAddAccountOpenDispatch,
    isPaymentOpenDispatch,
    isDDOpenDispatch,
    anonId
  } = props;
  const classes = useStyles();

  if (!cookie.load('token')) {
    history.push('/signin');
  }

  if (Object.keys(userData).length > 0 && userData.accountDetails) {
    if (
      userData.accountDetails.accountStatus !== 'approved' ||
      (userData.cards &&
        userData.cards.virtual &&
        userData.cards.virtual.cardId === null)
    ) {
      history.push('/registration');
    }
  }

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add Payment/Bank Account containers
  useEffect(() => {
    isPaymentOpenDispatch({
      type: 'SET_IS_PAYMENT_OPEN',
      payload: { isOpen: false }
    });
    isAddAccountOpenDispatch({
      type: 'SET_IS_ADD_ACCOUNT_OPEN',
      payload: { isOpen: false }
    });
  }, [location.pathname]);

  // Logout Modal
  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

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
              payload: { isOpen: {} }
            });
          }
        }
      });
    } else {
      isPaymentOpenDispatch({
        type: 'SET_IS_PAYMENT_OPEN',
        payload: { isOpen: {} }
      });
    }
  };

  // Party Modal
  const [openParty, setOpenParty] = useState(false);
  const handleOpenParty = () => {
    setOpenParty(true);
  };
  const handleCloseParty = () => {
    setOpenParty(false);
  };

  useEffect(() => {
    // Segment
    // eslint-disable-next-line
    segChangePage(location.pathname, userData ? userData._id : null, anonId);

    // Intercom
    if (window.Intercom) {
      window.Intercom('shutdown');
    }

    // FB Pixel
    ReactPixel.pageView();

    // Snapchat Pixel
    // eslint-disable-next-line
    snaptr('track', 'PAGE_VIEW');

    // TikTok Pixel
    // eslint-disable-next-line
    ttq.track('Browse');
  }, [location.pathname]);

  // Direct Deposits banner
  const handleOpenDD = () => {
    isDDOpenDispatch({
      type: 'SET_IS_DD_OPEN',
      payload: {
        isOpen: true
      }
    });
  };

  const closeDDBanner = () => {
    isDDOpenDispatch({
      type: 'SET_IS_DD_OPEN',
      payload: {
        isOpen: false
      }
    });
    cookie.save('isDDBannerClosed', true, { path: '/' });
    cookie.remove('isDDBannerProcessing', { path: '/' });
  };

  // Remove isDDBannerProcessing cookie if DD landed
  useEffect(() => {
    if (
      userData &&
      userData.accountDetails &&
      cookie.load('isDDBannerProcessing')
    ) {
      // if there is directDeposit obj
      if (userData.accountDetails.directDeposit) {
        const directDepositObj = userData.accountDetails.directDeposit;
        if (
          (directDepositObj.type === 'amount' &&
            Number(directDepositObj.amount) !== 0) ||
          (directDepositObj.type === 'percentage' &&
            Number(directDepositObj.percentage) !== 0)
        ) {
          cookie.remove('isDDBannerProcessing', { path: '/' });
        }
        // if there is no directDeposit obj but there is directDepositType
      } else if (userData.accountDetails.directDepositType) {
        if (
          (userData.accountDetails.directDepositType === 'amount' &&
            Number(userData.accountDetails.directDepositAmount) !== 0) ||
          (userData.accountDetails.directDepositType === 'percentage' &&
            Number(userData.accountDetails.directDepositPercentage) !== 0)
        ) {
          cookie.remove('isDDBannerProcessing', { path: '/' });
        }
        // if there is no directDeposit obj and directDepositType
      } else if (
        !userData.accountDetails.directDeposit &&
        !userData.accountDetails.directDepositType
      ) {
        cookie.remove('isDDBannerProcessing', { path: '/' });
      }
    }
  }, [userData]);

  return (
    <React.Fragment>
      <div className={classes.contentWrapper}>
        <Dashboard
          pathname={location.pathname}
          handleOpenLogout={handleOpenLogout}
        />
        <div className={classes.container}>
          <TopNavbar
            userData={userData}
            toggleMenu={toggleMenu}
            isMenuOpen={isMenuOpen}
            handleOpenLogout={handleOpenLogout}
            handleOpenPayment={handleOpenPayment}
            handleOpenParty={handleOpenParty}
            handleOpenDD={handleOpenDD}
            closeDDBanner={closeDDBanner}
          />
          <div className={classes.content}>
            {!showLoader ? component : <Preloader />}
          </div>
        </div>
      </div>

      <LogoutContainer
        openLogout={openLogout}
        handleCloseLogout={handleCloseLogout}
      />
      <PartyContainer
        openParty={openParty}
        handleCloseParty={handleCloseParty}
      />
      <PinwheelContainer />
      <OnboardingContainer />
      <ToastsContainer />
    </React.Fragment>
  );
}

DashboardLayout.propTypes = {
  component: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  showLoader: PropTypes.bool,
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      accountStatus: PropTypes.string,
      linkedAccounts: PropTypes.arrayOf(PropTypes.shape({})),
      directDepositAmount: PropTypes.string,
      directDepositType: PropTypes.string,
      directDepositPercentage: PropTypes.string,
      directDeposit: PropTypes.shape({
        type: PropTypes.string,
        amount: PropTypes.string,
        percentage: PropTypes.string
      })
    }),
    cards: PropTypes.shape({
      virtual: PropTypes.shape({
        cardId: PropTypes.string
      })
    })
  }),
  isAddAccountOpenDispatch: PropTypes.func,
  isPaymentOpenDispatch: PropTypes.func,
  isDDOpenDispatch: PropTypes.func,
  anonId: PropTypes.string
};

DashboardLayout.defaultProps = {
  component: undefined,
  location: undefined,
  showLoader: undefined,
  userData: undefined,
  isAddAccountOpenDispatch: undefined,
  isPaymentOpenDispatch: undefined,
  isDDOpenDispatch: undefined,
  anonId: undefined
};

export default withRouter(DashboardLayout);
