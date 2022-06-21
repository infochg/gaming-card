import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

import deposit from '../../../assets/img/deposit.png';

function Deposit(props) {
  const { classes, goToStep, handleOpenPayment } = props;

  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={deposit} alt="" className={classes.deposit} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Make a Deposit.
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          For every $50 you deposit, you&lsquo;ll get 1 reward box. Deposits
          land in your Mythia account in 3-5 business days.
        </Typography>
        <div className={classes.form}>
          <CustButton
            onClick={handleOpenPayment}
            btnstyle="system"
            fullWidth
            subclass={classes.btnWithMarg}
          >
            Next
          </CustButton>
          <div
            role="presentation"
            onClick={() => goToStep('directDeposit')}
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

Deposit.defaultProps = {
  classes: undefined,
  goToStep: undefined,
  handleOpenPayment: undefined
};

Deposit.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    deposit: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string,
    skipBtn: PropTypes.string
  }),
  goToStep: PropTypes.func,
  handleOpenPayment: PropTypes.func
};

export default Deposit;
