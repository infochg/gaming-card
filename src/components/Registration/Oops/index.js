import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';
import { segIDVerifManualRejected } from '../../../utils/segment';
import { phIDVerifRejected } from '../../../utils/posthog';

import oops from '../../../assets/img/oops.png';

function Oops(props) {
  const { classes, userData, anonId } = props;

  useEffect(() => {
    // Segment
    // eslint-disable-next-line
    segIDVerifManualRejected(userData ? userData._id : null, anonId);

    // PostHog
    phIDVerifRejected();
  }, [userData]);

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

  try {
    return (
      <React.Fragment>
        <div className={classes.imgWrapper}>
          <img src={oops} alt="" className={classes.oops} />
        </div>
        <Typography className={`${classes.h1} ${classes.center}`}>
          oops!
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Unfortunately, we couldn’t verify your identity. Please contact
          support for additional details to open your account.
        </Typography>
        <div className={classes.form}>
          <CustButton
            onClick={openIntercom}
            btnstyle="system"
            fullWidth
            subclass={classes.btnWithMarg}
          >
            Contact Support
          </CustButton>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Oops.defaultProps = {
  classes: undefined,
  userData: undefined,
  anonId: undefined
};

Oops.propTypes = {
  classes: PropTypes.shape({
    imgWrapper: PropTypes.string,
    oops: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      email: PropTypes.string,
      mobileNumber: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }),
  anonId: PropTypes.string
};

export default Oops;
