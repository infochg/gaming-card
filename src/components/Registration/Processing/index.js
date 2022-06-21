import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';

import sandclock from '../../../assets/img/sandclock.png';

function Processing(props) {
  const { classes } = props;
  const [progress, setProgress] = useState(0.08);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress =>
        prevProgress >= 100 ? 0.08 : prevProgress + 0.08
      );
    }, 60);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      window.location.reload();
    }
    return null;
  }, [progress]);

  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={sandclock} alt="" className={classes.sandclock} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          You’re almost there!
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          We are processing your application.
        </Typography>
        <div className={classes.progressBar}>
          <ProgressBar
            withTimer
            classes={{
              root: classes.progressBarRoot,
              barColorPrimary: classes.progressBarColorPrimary
            }}
          />
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Processing.defaultProps = {
  classes: undefined
};

Processing.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    sandclock: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    progressBar: PropTypes.string,
    progressBarRoot: PropTypes.string,
    progressBarColorPrimary: PropTypes.string
  })
};

export default Processing;
