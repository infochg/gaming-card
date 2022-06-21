import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

import directDeposit from '../../../assets/img/direct-deposit.png';

function DirectDeposit(props) {
  const {
    classes,
    finishProcess,
    openPinwheel,
    directDepositAmount,
    history
  } = props;

  useEffect(() => {
    if (directDepositAmount && Number(directDepositAmount > 0)) {
      history.push('/overview');
    }
  }, [directDepositAmount]);

  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={directDeposit} alt="" className={classes.directDeposit} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Your reward is waiting for you
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Connect your Direct Deposit and get 5 Large Boxes
        </Typography>
        <div className={classes.form}>
          <CustButton
            onClick={openPinwheel}
            btnstyle="system"
            fullWidth
            subclass={classes.btnWithMarg}
          >
            Connect
          </CustButton>
          <div
            role="presentation"
            onClick={finishProcess}
            className={classes.skipBtn}
          >
            Skip
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

DirectDeposit.defaultProps = {
  classes: undefined,
  finishProcess: undefined,
  openPinwheel: undefined,
  directDepositAmount: undefined,
  history: undefined
};

DirectDeposit.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    directDeposit: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string,
    skipBtn: PropTypes.string
  }),
  finishProcess: PropTypes.func,
  openPinwheel: PropTypes.func,
  directDepositAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default DirectDeposit;
