import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import Hamburger from 'hamburger-react';
import AccountData from '../AccountData';
import Icon from '../Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../Button';
import DDBanner from '../DDBanner';
import SearchRewardContainer from '../../../containers/SearchRewardContainer';
import { splitAmount } from '../../../utils/helpers';

import logo from '../../../assets/img/logo.svg';
import overviewTopBg from '../../../assets/img/overview-topbg.svg';
import walletTopBg from '../../../assets/img/wallet-topbg.svg';
import partyTopBg from '../../../assets/img/party-topbg.svg';
import settingsTopBg from '../../../assets/img/settings-topbg.svg';
import rewardsTopBg from '../../../assets/img/rewards-topbg.svg';
import inventoryTopBg from '../../../assets/img/inventory-topbg.svg';

const useStyles = makeStyles(theme => ({
  navbarWrapper: {
    width: '100%',
    paddingLeft: '25px',
    marginBottom: '20px'
  },
  overviewWrapper: {
    background: `url(${overviewTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  walletWrapper: {
    background: `url(${walletTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  partyWrapper: {
    background: `url(${partyTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  settingsWrapper: {
    background: `url(${settingsTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  rewardsWrapper: {
    background: `url(${rewardsTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  inventoryWrapper: {
    background: `url(${inventoryTopBg}) repeat-x left center`,
    backgroundSize: 'auto 94px'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '71px',
    padding: '20px 0'
  },
  topRight: {
    margin: '0 30px 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      zIndex: '9000',
      top: '91px',
      right: '0',
      padding: '0',
      background: theme.palette.background.gray,
      width: '230px',
      flexDirection: 'column',
      textAlign: 'center',
      maxHeight: '0',
      overflowY: 'hidden',
      opacity: '0',
      transition: 'all 0.3s'
    }
  },
  accountDataWrap: {
    margin: '0 0 0 auto'
  },
  openedMenu: {
    padding: '40px',
    maxHeight: '3000px',
    overflowY: 'visible',
    opacity: '1'
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: '16px',
    textDecoration: 'none',
    marginRight: '50px',
    transition: 'all 0.2s',
    '&:hover': {
      color: theme.palette.text.disabled
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      display: 'block',
      margin: '0 auto 30px auto'
    }
  },
  btn: {
    textDecoration: 'none',
    width: '200px',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  hamb: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      padding: '0 30px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 20px',
      margin: '0 0 0 auto'
    }
  },
  rightSide: {
    margin: '0 0 0 auto'
  },
  accountBalances: {
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%'
  },
  balance: {
    display: 'flex',
    flexDirection: 'column'
  },
  balanceText: {
    fontSize: '20px',
    marginBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px'
    }
  },
  balanceValue: {
    color: theme.palette.text.purple,
    fontSize: '50px',
    lineHeight: '50px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    '& span': {
      fontSize: '30px',
      fontWeight: '400'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '30px',
      lineHeight: '30px',
      '& span': {
        fontSize: '20px'
      }
    }
  },
  groupText: {
    fontSize: '24px',
    fontWeight: '500'
  },
  logo: {
    width: '145px',
    lineHeight: '0',
    margin: '15px 10px 15px 30px',
    position: 'relative',
    zIndex: '2',
    '& img': {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      margin: '15px 10px 15px 15px'
    }
  },
  addIconWrapper: {
    margin: '0 0 0 auto',
    position: 'relative',
    width: '40px',
    height: '40px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    cursor: 'pointer',
    transition: 'all .1s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)'
    }
  },
  addIcon: {
    height: '23px'
  },
  arrowLeft: {
    display: 'inline-block',
    height: '14px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  reportText: {
    fontSize: '24px',
    fontWeight: '500',
    [theme.breakpoints.down('xs')]: {
      fontSize: '21px'
    }
  },
  hideOnMobiles: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

function TopNavbar(props) {
  const {
    history,
    userData,
    toggleMenu,
    isMenuOpen,
    isSystem,
    handleOpenLogout,
    handleOpenParty,
    handleOpenDD,
    closeDDBanner
  } = props;
  const classes = useStyles();

  try {
    const goBack = () => {
      history.goBack();
    };

    let availBalance = '';
    if (userData && userData.accountDetails) {
      availBalance = splitAmount(
        Number(userData.accountDetails.balance).toFixed(2)
      );
    }

    let topBgClass = '';
    if (history.location.pathname === '/overview') {
      topBgClass = classes.overviewWrapper;
    } else if (history.location.pathname === '/party') {
      topBgClass = classes.partyWrapper;
    } else if (history.location.pathname === '/wallet') {
      topBgClass = classes.walletWrapper;
    } else if (history.location.pathname.indexOf('settings') !== -1) {
      topBgClass = classes.settingsWrapper;
    } else if (history.location.pathname === '/rewards-shop') {
      topBgClass = classes.rewardsWrapper;
    } else if (history.location.pathname === '/inventory') {
      topBgClass = classes.inventoryWrapper;
    }

    let ddBanner;

    if (
      !isSystem &&
      !cookie.load('isDDBannerClosed') &&
      cookie.load('isDDBannerProcessing')
    ) {
      ddBanner = <DDBanner isProcessing closeDDBanner={closeDDBanner} />;
    }

    if (
      !isSystem &&
      userData &&
      userData.accountDetails &&
      !cookie.load('isDDBannerClosed')
    ) {
      // if there is directDeposit obj but user removed DD
      if (userData.accountDetails.directDeposit) {
        const directDepositObj = userData.accountDetails.directDeposit;

        if (
          (directDepositObj.type === 'amount' &&
            Number(directDepositObj.amount) === 0) ||
          (directDepositObj.type === 'percentage' &&
            Number(directDepositObj.percentage) === 0)
        ) {
          ddBanner = (
            <DDBanner
              withoutChests
              handleOpenDD={handleOpenDD}
              closeDDBanner={closeDDBanner}
            />
          );
        }
        // if there is no directDeposit obj but there is directDepositType and user removed DD
      } else if (userData.accountDetails.directDepositType) {
        if (
          (userData.accountDetails.directDepositType === 'amount' &&
            Number(userData.accountDetails.directDepositAmount) === 0) ||
          (userData.accountDetails.directDepositType === 'percentage' &&
            Number(userData.accountDetails.directDepositPercentage) === 0)
        ) {
          ddBanner = (
            <DDBanner
              withoutChests
              handleOpenDD={handleOpenDD}
              closeDDBanner={closeDDBanner}
            />
          );
        }
        // if there is no directDeposit obj and directDepositType
      } else if (
        !userData.accountDetails.directDeposit &&
        !userData.accountDetails.directDepositType
      ) {
        ddBanner = (
          <DDBanner handleOpenDD={handleOpenDD} closeDDBanner={closeDDBanner} />
        );
      }
    }

    return (
      <div className={`${classes.navbarWrapper} ${topBgClass}`}>
        {ddBanner}

        <div className={classes.container}>
          {isSystem && (
            <React.Fragment>
              <Link to="/" className={classes.logo}>
                <img src={logo} alt="Mythia" />
              </Link>
              {history.location.pathname !== '/registration' && (
                <div
                  className={`${classes.topRight} ${
                    isMenuOpen ? classes.openedMenu : ''
                  }`}
                >
                  <Link to="/signin" className={classes.link}>
                    Sign in
                  </Link>
                  <Link
                    to="/registration"
                    className={classes.btn}
                    style={{ display: 'none' }}
                  >
                    <CustButton btnstyle="system">Get Started</CustButton>
                  </Link>
                </div>
              )}
            </React.Fragment>
          )}

          {isSystem && history.location.pathname !== '/registration' && (
            <div
              className={`${classes.hamb} ${isSystem ? classes.rightSide : ''}`}
            >
              <Hamburger toggled={isMenuOpen} toggle={toggleMenu} />
            </div>
          )}

          {userData && !isSystem && (
            <React.Fragment>
              {(history.location.pathname === '/rewards-shop' ||
                history.location.pathname === '/overview' ||
                history.location.pathname === '/wallet' ||
                history.location.pathname.indexOf('settings') !== -1) && (
                <div className={classes.accountBalances}>
                  <div className={classes.balance}>
                    <div className={classes.balanceText}>Available balance</div>
                    <div className={classes.balanceValue}>{availBalance}</div>
                  </div>
                </div>
              )}

              {history.location.pathname === '/rewards-shop' && (
                <div className={classes.hideOnMobiles}>
                  <SearchRewardContainer />
                </div>
              )}

              {history.location.pathname === '/party' && (
                <div className={classes.accountBalances}>
                  <div
                    className={classes.addIconWrapper}
                    role="presentation"
                    onClick={handleOpenParty}
                  >
                    <Icon icon="addUser" className={classes.addIcon} />
                  </div>
                </div>
              )}

              {history.location.pathname === '/statements' && (
                <div className={classes.accountBalances}>
                  <div className={classes.balance}>
                    <div className={classes.reportText}>
                      <Icon
                        icon="arrow-left"
                        className={classes.arrowLeft}
                        role="presentation"
                        onClick={goBack}
                      />{' '}
                      Statements
                    </div>
                  </div>
                </div>
              )}

              {history.location.pathname === '/inventory' && (
                <div className={classes.accountBalances}>
                  <div className={classes.balance}>
                    <div className={classes.reportText}>
                      <Icon
                        icon="arrow-left"
                        className={classes.arrowLeft}
                        role="presentation"
                        onClick={goBack}
                        style={{ display: 'none' }}
                      />{' '}
                      Inventory
                    </div>
                  </div>
                </div>
              )}

              <div className={classes.accountDataWrap}>
                <AccountData
                  userData={userData || {}}
                  pathname={history.location.pathname}
                  handleOpenLogout={handleOpenLogout}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

TopNavbar.defaultProps = {
  userData: undefined,
  toggleMenu: undefined,
  isMenuOpen: undefined,
  handleOpenLogout: undefined,
  handleOpenParty: undefined,
  handleOpenDD: undefined,
  closeDDBanner: undefined,
  history: undefined,
  isSystem: undefined
};

TopNavbar.propTypes = {
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      balance: PropTypes.number,
      directDeposit: PropTypes.shape({
        type: PropTypes.string,
        amount: PropTypes.string,
        percentage: PropTypes.string
      }),
      directDepositType: PropTypes.string,
      directDepositAmount: PropTypes.string,
      directDepositPercentage: PropTypes.string
    })
  }),
  toggleMenu: PropTypes.func,
  isMenuOpen: PropTypes.bool,
  handleOpenLogout: PropTypes.func,
  handleOpenParty: PropTypes.func,
  handleOpenDD: PropTypes.func,
  closeDDBanner: PropTypes.func,
  history: PropTypes.shape({
    goBack: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }),
  isSystem: PropTypes.bool
};

export default withRouter(TopNavbar);
