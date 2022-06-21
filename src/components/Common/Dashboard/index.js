import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '../Icon';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { dashboardRoutes } from '../../../routes';

import logo from '../../../assets/img/logo.svg';
import corner from '../../../assets/img/top-corner.svg';

const useStyles = makeStyles(theme => ({
  dashboardWrapper: {
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    borderLeft: 'none',
    width: '267px',
    minWidth: '267px',
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.2s',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(90deg)'
    },
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      zIndex: '9000',
      bottom: '-2px',
      height: '60px',
      minHeight: '1px',
      width: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      padding: '0',
      margin: '0',
      border: '0',
      '&::before': {
        display: 'none'
      },
      '&::after': {
        display: 'none'
      }
    }
  },
  logo: {
    display: 'block',
    maxWidth: '140px',
    margin: '30px auto 30px 60px',
    '& img': {
      width: '100%'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  link: {
    textDecoration: 'none'
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    margin: '0 30px 0 60px',
    cursor: 'pointer',
    opacity: '0.5',
    textDecoration: 'none',
    transition: 'all 0.2s',
    borderBottom: `1px solid ${theme.palette.border.defaultWithOp}`,
    color: theme.palette.text.darkPurple,
    '& p': {
      fontFamily: 'Oswald'
    },
    '& svg': {
      display: 'block',
      width: '100%',
      height: '100%',
      maxWidth: '25px',
      maxHeight: '24px',
      marginRight: '15px',
      transition: 'all 0.3s',
      '& path': {
        fill: `${theme.palette.text.darkPurple} !important`
      }
    },
    '&:hover': {
      opacity: '1'
    },
    [theme.breakpoints.down('xs')]: {
      padding: '12px 15px',
      margin: '0',
      flexDirection: 'column',
      '& svg': {
        marginRight: '0'
      }
    }
  },
  activeMenuItem: {
    padding: '20px 30px 20px 60px',
    margin: '0',
    background: theme.palette.background.purpleWithOp,
    border: 'none',
    opacity: '1',
    textTransform: 'uppercase',
    color: theme.palette.text.purple,
    '& p': {
      fontWeight: 700
    },
    '& svg': {
      '& path': {
        fill: `${theme.palette.text.purple} !important`
      }
    },
    [theme.breakpoints.down('xs')]: {
      padding: '12px 15px',
      margin: '0',
      textTransform: 'none',
      '& p': {
        fontWeight: 400
      },
      '& svg': {
        marginRight: '0'
      }
    }
  },
  noBorder: {
    border: 'none'
  },
  hideOverflow: {
    fontSize: '18px',
    maxWidth: 'calc(100% - 38px)',
    minWidth: 'calc(100% - 38px)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%',
      minWidth: '100%',
      fontSize: '8px',
      textAlign: 'center'
    }
  },
  bottomItems: {
    margin: 'auto 0 0 0',
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  logoutBtn: {
    display: 'flex',
    width: '100%',
    color: theme.palette.background.red,
    '& svg': {
      '& path': {
        fill: `${theme.palette.background.red} !important`
      }
    }
  },
  mobileSettings: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  }
}));

function Dashboard(props) {
  const { pathname, handleOpenLogout } = props;
  const classes = useStyles();

  try {
    return (
      <div className={classes.dashboardWrapper}>
        <Link to="/overview" className={classes.logo}>
          <img src={logo} alt="Mythia" />
        </Link>

        {dashboardRoutes.map((item, index) => {
          return (
            <Link to={item.path} key={item.title} className={classes.link}>
              <div
                className={`${classes.menuItem} ${
                  pathname === item.path ? classes.activeMenuItem : ''
                } ${
                  index === dashboardRoutes.length - 1 ? classes.noBorder : ''
                }`}
              >
                <Icon icon={item.icon} />{' '}
                <Typography className={classes.hideOverflow}>
                  {item.title}
                </Typography>
              </div>
            </Link>
          );
        })}

        <Link
          to="/settings"
          className={`${classes.link} ${classes.mobileSettings}`}
        >
          <div
            className={`${classes.menuItem} ${
              pathname.indexOf('settings') !== -1 ? classes.activeMenuItem : ''
            }`}
          >
            <Icon icon="setting" />{' '}
            <Typography className={classes.hideOverflow}>Settings</Typography>
          </div>
        </Link>

        <div className={classes.bottomItems}>
          <Link to="/settings" className={classes.link}>
            <div
              className={`${classes.menuItem} ${
                pathname.indexOf('settings') !== -1
                  ? classes.activeMenuItem
                  : ''
              }`}
            >
              <Icon icon="setting" />{' '}
              <Typography className={classes.hideOverflow}>Settings</Typography>
            </div>
          </Link>

          <div
            className={`${classes.menuItem} ${classes.noBorder}`}
            role="presentation"
            onClick={handleOpenLogout}
          >
            <div className={classes.logoutBtn}>
              <Icon icon="logout" />{' '}
              <Typography className={classes.hideOverflow}>Log out</Typography>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Dashboard.propTypes = {
  pathname: PropTypes.string,
  handleOpenLogout: PropTypes.func
};

Dashboard.defaultProps = {
  pathname: undefined,
  handleOpenLogout: undefined
};

export default Dashboard;
