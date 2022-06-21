import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(() => ({
  preloaderWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100%'
  }
}));

const Preloader = () => {
  const classes = useStyles();

  try {
    return (
      <div className={classes.preloaderWrapper}>
        <CircularProgress />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

export default Preloader;
