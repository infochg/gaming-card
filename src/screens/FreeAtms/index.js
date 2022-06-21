import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../containers/ErrorBoundary';
import CustButton from '../../components/Common/Button';
import SettingsLayout from '../../layouts/SettingsLayout';

import atms from '../../assets/img/atms-ico.png';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    '& img': {
      width: '100%',
      maxWidth: '400px',
      margin: '100px auto',
      [theme.breakpoints.down('md')]: {
        maxWidth: '200px',
        margin: '0 auto'
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
  title: {
    margin: '7% auto 0 auto',
    textAlign: 'center',
    fontSize: '36px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    color: theme.palette.text.darkPurple,
    [theme.breakpoints.down('sm')]: {
      fontSize: '26px'
    }
  },
  btn: {
    margin: '40px auto 20px auto',
    maxWidth: '450px'
  }
}));

function FreeAtms() {
  const classes = useStyles();

  try {
    const goToAllPoints = () => {
      window.open('https://www.allpointnetwork.com/locator.html', '_blank');
    };

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <img src={atms} alt="" />
          </div>
          <div className={classes.rContentWrapper}>
            <div className={classes.title}>
              Show me the
              <br />
              nearest free atms
            </div>
            <CustButton onClick={goToAllPoints} subclass={classes.btn}>
              Get me to the map
            </CustButton>
          </div>
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default FreeAtms;
