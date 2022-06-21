import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import cookie from 'react-cookies';
import PinwheelModal from '@pinwheel/react-modal';
import ErrorBoundary from '../ErrorBoundary';
import Preloader from '../../components/Common/Preloader';
import Modal from '../../components/Common/Modal';
import CustButton from '../../components/Common/Button';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import { segPinwheelStart, segPinwheelSuccess } from '../../utils/segment';
import { phPinwheelStart, phPinwheelSuccess } from '../../utils/posthog';

const useStyles = makeStyles(theme => ({
  form: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '415px',
    margin: '0 auto'
  },
  congrats: {
    width: '100%',
    maxWidth: '305px'
  },
  text: {
    fontSize: '18px'
  },
  opacityText: {
    fontSize: '18px',
    opacity: '0.5'
  },
  btnWithMarg: {
    margin: '20px auto 0 auto'
  },
  h1: {
    fontSize: '46px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    margin: '0 auto 15px auto',
    textAlign: 'center',
    color: theme.palette.text.darkPurple,
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px'
    }
  },
  dashH1: {
    fontFamily: 'Oswald',
    fontSize: '28px',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: theme.palette.text.darkPurple,
    margin: '0 auto 15px auto',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px'
    }
  },
  left: {
    textAlign: 'left',
    marginLeft: '0'
  },
  modalTitle: {
    fontSize: '30px',
    color: theme.palette.text.darkPurple,
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    marginTop: '15px'
  },
  modalText: {
    fontSize: '18px',
    padding: '20px 0 30px 0'
  },
  positBtn: {
    width: '144px',
    margin: '10px'
  }
}));

function PinwheelContainer() {
  // eslint-disable-next-line
  const classes = useStyles();
  const {
    anonId,
    userData,
    userDataDispatch,
    isDDOpen,
    isDDOpenDispatch,
    errorDispatch
  } = useContext(appContext);

  const [token, setToken] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Get pinwheel token
  const onSuccessToken = payload => {
    setShowLoader(false);
    setToken(payload.data);
  };

  const onFailToken = payload => {
    setShowLoader(false);
    errorDispatch({
      type: 'SET_ERROR',
      payload: payload || 'Something is wrong, please, try again.'
    });
  };

  const getPinwheelToken = () => {
    setShowLoader(true);
    fetchData(
      '/money/getPinwheelLinkToken',
      'GET',
      onSuccessToken,
      onFailToken
    );
  };

  useEffect(() => {
    if (isDDOpen.isOpen && !token) {
      getPinwheelToken();
      // eslint-disable-next-line
      segPinwheelStart(userData ? userData._id : null, anonId);
      phPinwheelStart();
    }
  }, [isDDOpen, token]);

  // Update user data
  const onSuccessUserData = payload => {
    userDataDispatch({ type: 'SET_USER_DATA', payload });

    // turn on DD banner if user removed DD
    if (
      payload &&
      payload.accountDetails &&
      payload.accountDetails.directDepositAmount &&
      Number(payload.accountDetails.directDepositAmount) === 0 &&
      cookie.load('isDDBannerClosed')
    ) {
      cookie.remove('isDDBannerClosed');
    }
  };

  const onErrorUserData = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  // Pinwheel event handlers
  const onExit = () => {
    fetchData('/userData/main', 'GET', onSuccessUserData, onErrorUserData);

    setToken(null);
    isDDOpenDispatch({
      type: 'SET_IS_DD_OPEN',
      payload: {
        isOpen: false
      }
    });
  };

  // Post modal
  const onEvent = e => {
    if (e === 'success') {
      const expires = new Date(Date.now() + 259200 * 1000);
      cookie.save('isDDBannerProcessing', true, {
        path: '/',
        sameSite: 'Lax',
        expires
      });
      setShowPostModal(true);
      // eslint-disable-next-line
      segPinwheelSuccess(userData ? userData._id : null, anonId);
      phPinwheelSuccess();
    }
  };

  const closePostModal = () => setShowPostModal(false);

  const postModalContent = (
    <React.Fragment>
      <Typography className={classes.modalTitle}>Congratulations</Typography>
      <Typography className={classes.modalText}>
        We’re now processing your direct deposit. This usually takes under 24
        hours. Once complete, your bonus will be added to your account.
      </Typography>
      <div className={classes.modalBtns}>
        <CustButton onClick={closePostModal} subclass={classes.positBtn}>
          Ok
        </CustButton>
      </div>
    </React.Fragment>
  );

  let content = '';
  if (isDDOpen.isOpen) {
    content = !showLoader ? (
      <PinwheelModal
        linkToken={token}
        open={!!token}
        onEvent={e => {
          onEvent(e);
        }}
        onExit={onExit}
      />
    ) : (
      <Modal content={<Preloader />} isOpened noBtns noCloseBtn />
    );
  } else if (showPostModal) {
    content = <Modal isOpened content={postModalContent} noBtns />;
  }

  try {
    return content;
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default PinwheelContainer;
