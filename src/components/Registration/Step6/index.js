import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import AddressVerificationContainer from '../../../containers/AddressVerificationContainer';

function Step6(props) {
  const { classes, submitAddress, userData } = props;

  try {
    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Enter your address
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Must be physical address and not a PO box. Use and address that you
          have had a bill or bank statement attached to.
        </Typography>
        <div className={classes.center}>
          <div className={classes.addressWrapper}>
            <AddressVerificationContainer
              address={userData.address || {}}
              submitAddress={submitAddress}
              isRegistration
            />
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step6.defaultProps = {
  classes: undefined,
  submitAddress: undefined,
  userData: undefined
};

Step6.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    addressWrapper: PropTypes.string
  }),
  submitAddress: PropTypes.func,
  userData: PropTypes.shape({
    address: PropTypes.shape({})
  })
};

export default Step6;
