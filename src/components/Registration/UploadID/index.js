import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../../Common/Preloader';
import CustButton from '../../Common/Button';
import {
  segIDVerifManualReview,
  segIDVerifStart
} from '../../../utils/segment';
import { phIDVerifManualReview, phIDVerifStart } from '../../../utils/posthog';

import verify from '../../../assets/img/verify.png';

function UploadID(props) {
  const {
    classes,
    userData,
    getVouchedInviteLink,
    showLoader,
    vouchedLink,
    getUserData,
    goToStep,
    anonId
  } = props;

  const [isLinkOpened, setIsLinkOpened] = useState(false);

  useEffect(() => {
    // Segment
    // eslint-disable-next-line
    segIDVerifManualReview(userData ? userData._id : null, anonId);

    // PostHog
    phIDVerifManualReview();

    getVouchedInviteLink();
  }, [vouchedLink]);

  useEffect(() => {
    if (userData && userData.accountDetails) {
      if (userData.accountDetails.accountStatus === 'approved') {
        goToStep('approved');
      } else if (
        userData.accountDetails.accountStatus === 'verificationPassed'
      ) {
        goToStep('moreTime');
      } else if (
        userData.accountDetails.accountStatus === 'rejected' ||
        userData.accountDetails.accountStatus === 'verificationFailed'
      ) {
        goToStep('oops');
      }
    }
  }, [userData]);

  const openLink = () => {
    // Segment
    // eslint-disable-next-line
    segIDVerifStart(userData ? userData._id : null, anonId);

    // PostHog
    phIDVerifStart();

    window.open(vouchedLink, '_blank');
    setIsLinkOpened(true);
    setInterval(() => {
      getUserData();
    }, 8000);
  };

  try {
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

    return !showLoader ? (
      <div className={classes.vouchedWrapper}>
        <img src={verify} alt="" className={classes.oops} />
        <Typography className={`${classes.h1} ${classes.center}`}>
          Please verify your identity with an ID
        </Typography>
        <Typography className={`${classes.subtext} ${classes.center}`}>
          Unfortunately, we couldn’t verify your identity. Please upload your
          ID.
        </Typography>
        {vouchedLink && !isLinkOpened && (
          <CustButton
            btnstyle="system"
            subclass={classes.btnWithMarg}
            onClick={openLink}
          >
            Upload ID
          </CustButton>
        )}
        <Typography className={classes.intercomLinkWrapper}>
          or{' '}
          <span
            className={classes.intercomLink}
            role="presentation"
            onClick={openIntercom}
          >
            contact us
          </span>
        </Typography>
      </div>
    ) : (
      <Preloader />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

UploadID.defaultProps = {
  classes: undefined,
  userData: undefined,
  getVouchedInviteLink: undefined,
  showLoader: undefined,
  vouchedLink: undefined,
  getUserData: undefined,
  goToStep: undefined,
  anonId: undefined
};

UploadID.propTypes = {
  classes: PropTypes.shape({
    vouchedWrapper: PropTypes.string,
    oops: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    subtext: PropTypes.string,
    btnWithMarg: PropTypes.string,
    intercomLinkWrapper: PropTypes.string,
    intercomLink: PropTypes.string
  }),
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      accountStatus: PropTypes.string,
      email: PropTypes.string,
      mobileNumber: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }),
  getVouchedInviteLink: PropTypes.func,
  showLoader: PropTypes.bool,
  vouchedLink: PropTypes.string,
  getUserData: PropTypes.func,
  goToStep: PropTypes.func,
  anonId: PropTypes.string
};

export default UploadID;
