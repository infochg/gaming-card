import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../../Common/Preloader';

import congrats from '../../../assets/img/complete-challenges.png';
import CustButton from '../../Common/Button';

function Approved(props) {
  const { classes, showLoader, goToPayment } = props;
  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={congrats} alt="" className={classes.congrats} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Your application has been approved!
        </Typography>
        <div className={classes.form}>
          {!showLoader ? (
            <CustButton
              onClick={goToPayment}
              btnstyle="system"
              fullWidth
              subclass={classes.btnWithMarg}
            >
              Continue
            </CustButton>
          ) : (
            <Preloader />
          )}
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Approved.defaultProps = {
  classes: undefined,
  showLoader: undefined,
  goToPayment: undefined
};

Approved.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    congrats: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  showLoader: PropTypes.bool,
  goToPayment: PropTypes.func
};

export default Approved;
