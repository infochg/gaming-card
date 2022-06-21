import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

import needTime from '../../../assets/img/need-time.png';

function MoreTime(props) {
  const { classes } = props;
  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={needTime} alt="" className={classes.needTime} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          We need more time to process
          <br />
          your application
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Please check back in 24 hours.
        </Typography>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

MoreTime.defaultProps = {
  classes: undefined
};

MoreTime.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    needTime: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string
  })
};

export default MoreTime;
