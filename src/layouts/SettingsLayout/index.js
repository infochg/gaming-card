import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import history from '../../history';
import Icon from '../../components/Common/Icon';
import LogoutContainer from '../../containers/LogoutContainer';

import profileIco from '../../assets/img/mob-profile-ico.svg';
import accountsIco from '../../assets/img/mob-accounts-ico.svg';
import promoIco from '../../assets/img/mob-promo-ico.svg';
import cardIco from '../../assets/img/mob-card-ico.svg';
import supportIco from '../../assets/img/mob-support-ico.svg';
import statementsIco from '../../assets/img/mob-statements-ico.svg';
// import onboardingIco from '../../assets/img/mob-onboarding-ico.svg';
import termsIco from '../../assets/img/mob-terms-ico.svg';
import privacyIco from '../../assets/img/mob-privacy-ico.svg';
import rulesIco from '../../assets/img/mob-rules-ico.svg';
import logoutIco from '../../assets/img/mob-logout-ico.svg';
import freeatmsIco from '../../assets/img/mob-free-atms-ico.svg';

import useWindowSize from '../../utils/useWindowSize';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: '0 30px 40px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  leftMenu: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '45px'
  },
  menuWrapper: {
    display: 'block',
    width: 'calc(100% - 30px)',
    overflow: 'auto',
    borderTop: `1px solid ${theme.palette.border.default}`,
    borderBottom: `1px solid ${theme.palette.border.default}`,
    marginBottom: '30px'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 15px 0 15px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    opacity: '0.4',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderRight: `1px solid ${theme.palette.border.default}`,
    '&:first-child': {
      paddingLeft: '0'
    },
    '&:last-child': {
      border: 'none'
    },
    '& p': {
      color: theme.palette.text.lightGray,
      textTransform: 'uppercase',
      fontSize: '14px',
      fontFamily: 'Oswald',
      [theme.breakpoints.down('md')]: {
        fontSize: '11px'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '10px'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '9px'
      }
    },
    '&:hover': {
      opacity: '1'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 7px 0 7px'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '0 5px 0 5px'
    }
  },
  activeMenuItem: {
    opacity: '1',
    '& p': {
      fontSize: '18px',
      color: theme.palette.text.purple,
      fontWeight: '700',
      textDecoration: 'underline',
      [theme.breakpoints.down('md')]: {
        fontSize: '13px'
      }
    }
  },
  content: {
    width: '100%'
  },
  contentInactive: {
    display: 'none'
  },
  modalTitle: {
    fontSize: '22px',
    color: theme.palette.text.primary,
    fontWeight: '900'
  },
  modalText: {
    fontSize: '14px',
    opacity: '0.7',
    padding: '20px 0 30px 0',
    fontFamily: 'Roboto'
  },
  positBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px',
    background: '#B92941',
    color: '#fff',
    borderRadius: '20px',
    fontWeight: '600',
    '&:hover': {
      background: '#b94739'
    }
  },
  mobileWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  mobileMenuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '55px',
    transition: 'all 0.3s',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    borderBottom: `1px solid ${theme.palette.border.default}`,
    '& p': {
      color: theme.palette.text.primary,
      fontSize: '16px'
    }
  },
  iconWrapper: {
    marginRight: '20px',
    '& img': {
      height: '32px'
    }
  },
  chevronIcon: {
    height: '15px',
    color: theme.palette.text.primary,
    margin: '0 30px 0 auto'
  },
  documents: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '40px'
  },
  logoutWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '40px'
  }
}));

function SettingsLayout(props) {
  const { children } = props;
  const classes = useStyles();

  const [isMMActive, setIsMMActive] = useState(true);

  useEffect(() => {
    if (history.location.pathname !== '/settings') {
      setIsMMActive(false);
    }
  }, [history.location.pathname]);

  const closeMM = () => {
    setIsMMActive(false);
  };

  // Logout Modal
  const [openLogout, setOpenLogout] = useState(false);
  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const menuItems = [
    {
      title: 'Profile',
      path: '/settings',
      mobIcon: profileIco
    },
    {
      title: 'My Card',
      path: '/settings/my-card',
      mobIcon: cardIco
    },
    {
      title: 'Bank Accounts',
      path: '/settings/accounts',
      mobIcon: accountsIco
    },
    {
      title: 'Free ATMs',
      path: '/settings/free-atms',
      mobIcon: freeatmsIco
    },
    {
      title: 'Add Promo Code',
      path: '/settings/add-promo',
      mobIcon: promoIco
    },
    {
      title: 'Direct Deposit',
      path: '/settings/direct-deposit',
      mobIcon: cardIco
    },
    {
      title: 'Support',
      path: '/settings/support',
      mobIcon: supportIco
    },
    {
      title: 'Statements',
      path: '/settings/statements',
      mobIcon: statementsIco
    }
  ];

  const documents = [
    {
      title: 'Terms of Service',
      link: 'https://mythia.com/terms',
      mobIcon: termsIco
    },
    {
      title: 'Privacy Policy',
      link: 'https://mythia.com/privacy-policy',
      mobIcon: privacyIco
    },
    {
      title: 'Contest Rules',
      link: 'https://mythia.com/contest-rules',
      mobIcon: rulesIco
    },
    {
      title: 'Winners',
      link: 'https://www.mythia.com/winners',
      mobIcon: termsIco
    }
  ];

  const desktopView = (
    <div className={classes.wrapper}>
      <div className={classes.menuWrapper}>
        <div className={classes.leftMenu}>
          {menuItems.map(item => {
            return (
              <Link
                to={item.path}
                key={item.title}
                className={`${classes.menuItem} ${
                  history.location.pathname === item.path
                    ? classes.activeMenuItem
                    : ''
                }`}
                role="presentation"
              >
                <div className={classes.nameWrapper}>
                  <Typography className={classes.name}>{item.title}</Typography>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );

  const mobileView = (
    <div className={classes.mobileWrapper}>
      {isMMActive ? (
        <React.Fragment>
          <div className={classes.mobileMenu}>
            {menuItems.map(item => {
              return item.title === 'Profile' ? (
                <div
                  key={item.title}
                  className={classes.mobileMenuItem}
                  role="presentation"
                  onClick={closeMM}
                >
                  <div className={classes.iconWrapper}>
                    <img src={item.mobIcon} alt={item.title} />
                  </div>
                  <div className={classes.nameWrapper}>
                    <Typography className={classes.name}>
                      {item.title}
                    </Typography>
                  </div>
                  <Icon icon="chevron-right" className={classes.chevronIcon} />
                </div>
              ) : (
                <Link
                  to={item.path}
                  key={item.title}
                  className={classes.mobileMenuItem}
                  role="presentation"
                >
                  <div className={classes.iconWrapper}>
                    <img src={item.mobIcon} alt={item.title} />
                  </div>
                  <div className={classes.nameWrapper}>
                    <Typography className={classes.name}>
                      {item.title}
                    </Typography>
                  </div>
                  <Icon icon="chevron-right" className={classes.chevronIcon} />
                </Link>
              );
            })}
          </div>
          <div className={classes.documents}>
            {documents.map(item => {
              return (
                <a
                  key={item.title}
                  className={classes.mobileMenuItem}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={classes.iconWrapper}>
                    <img src={item.mobIcon} alt="" />
                  </div>
                  <div className={classes.nameWrapper}>
                    <Typography className={classes.name}>
                      {item.title}
                    </Typography>
                  </div>
                  <Icon icon="chevron-right" className={classes.chevronIcon} />
                </a>
              );
            })}
          </div>

          <div className={classes.logoutWrapper}>
            <div
              className={classes.mobileMenuItem}
              role="presentation"
              onClick={handleOpenLogout}
            >
              <div className={classes.iconWrapper}>
                <img src={logoutIco} alt="Logout" />
              </div>
              <div className={classes.nameWrapper}>
                <Typography className={classes.name}>Logout</Typography>
              </div>
              <Icon icon="chevron-right" className={classes.chevronIcon} />
            </div>
          </div>
          <LogoutContainer
            openLogout={openLogout}
            handleCloseLogout={handleCloseLogout}
          />
        </React.Fragment>
      ) : (
        <div className={classes.mobileContent}>{children}</div>
      )}
    </div>
  );

  return useWindowSize().width > 600 ? desktopView : mobileView;
}

SettingsLayout.defaultProps = {
  children: undefined
};

SettingsLayout.propTypes = {
  children: PropTypes.node
};

export default withRouter(SettingsLayout);
