import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Icon from '../../components/Common/Icon';
import CustButton from '../../components/Common/Button';
import SettingsLayout from '../../layouts/SettingsLayout';
import appContext from '../../context/appContext';

import support from '../../assets/img/support.png';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    '& img': {
      maxWidth: '100%',
      [theme.breakpoints.down('md')]: {
        maxWidth: '200px'
      }
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '30px'
    }
  },
  rContentWrapper: {
    width: '100%',
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0'
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '30px'
    }
  },
  timeWrapper: {
    margin: '7% auto 0 auto',
    textAlign: 'center'
  },
  days: {
    fontSize: '36px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    color: theme.palette.text.darkPurple
  },
  time: {
    fontSize: '36px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    color: theme.palette.text.darkPurple,
    display: 'block',
    whiteSpace: 'nowrap',
    '& span': {
      color: theme.palette.text.purple
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '23px'
    }
  },
  text: {
    fontSize: '16px',
    maxWidth: '450px',
    textAlign: 'center',
    margin: '20px auto'
  },
  subText: {
    fontSize: '14px',
    maxWidth: '450px',
    textAlign: 'center',
    margin: '20px auto 0 auto',
    color: theme.palette.text.lightGray
  },
  chatIcon: {
    height: '20px',
    marginRight: '15px'
  },
  btn: {
    margin: '40px auto 20px auto',
    maxWidth: '450px'
  }
}));

function Support() {
  const classes = useStyles();
  const { userData } = useContext(appContext);

  try {
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

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <img src={support} alt="" />
          </div>
          <div className={classes.rContentWrapper}>
            <div className={classes.timeWrapper}>
              <Typography className={classes.days}>Monday - Friday</Typography>
              <Typography className={classes.time}>
                <span>8:00 a.m.</span> to <span>4:30 p.m.</span> MT
              </Typography>
            </div>
            <Typography className={classes.text}>
              Please chat with our Customer Service team below if you have any
              issues or concerns.
            </Typography>

            <CustButton onClick={openIntercom} subclass={classes.btn}>
              <Icon icon="chat" className={classes.chatIcon} /> Chat
            </CustButton>

            <Typography className={classes.subText}>
              * Excludes January 1, Memorial Day, July 4, Labor Day,
              Thanksgiving Day, and December 25
            </Typography>
          </div>
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Support;
