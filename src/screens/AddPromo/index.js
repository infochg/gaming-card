import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../containers/ErrorBoundary';
import SettingsLayout from '../../layouts/SettingsLayout';
import PromoCodeContainer from '../../containers/PromoCodeContainer';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex'
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      paddingRight: '30px'
    }
  },
  rContentWrapper: {
    width: '100%',
    paddingLeft: '50px',
    borderLeft: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: '2',
      width: 'calc(100% + 36px)',
      maxWidth: 'calc(100% + 36px)',
      height: '100%',
      top: '0',
      left: '0',
      padding: '0 0 0 36px',
      marginLeft: '-36px',
      border: '0',
      background: '#fff'
    }
  }
}));

function AddPromo() {
  const classes = useStyles();
  try {
    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <PromoCodeContainer />
          </div>
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default AddPromo;
