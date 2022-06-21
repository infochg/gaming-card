import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '../../components/Common/Modal';
import CustButton from '../../components/Common/Button';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';

import onboardingIcon from '../../assets/img/onboarding-ico.png';
import onboardingVideo from '../../assets/video/onboarding.webm';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '90%',
    maxWidth: '414px',
    margin: '0 auto'
  },
  icon: {
    width: '90%',
    maxWidth: '166px',
    margin: '20px auto'
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
    marginBottom: '20px',
    textAlign: 'center'
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  onboardVid: {
    width: 'auto',
    height: '75vh',
    maxHeight: '700px',
    margin: '20px 30px 0 0',
    [theme.breakpoints.down('xs')]: {
      height: '65vh'
    }
  }
}));

function OnboardingContainer() {
  const { userData, userDataDispatch, errorDispatch } = useContext(appContext);
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);

  // Update userData
  const onSuccessUpdate = payload => {
    userDataDispatch({ type: 'SET_USER_DATA', payload: payload.userData });
  };

  const onErrorUpdate = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    fetchData('/user/update', 'POST', onSuccessUpdate, onErrorUpdate, {
      onboardingVideo: { watchedVideo: true, seenOffer: true }
    });
    setIsOpen(false);
    setPlayVideo(false);
  };

  const playVid = () => {
    setPlayVideo(true);
  };

  useEffect(() => {
    if (
      userData &&
      userData.accountDetails &&
      userData.accountDetails.metadata &&
      userData.accountDetails.metadata.onboardingVideo &&
      !userData.accountDetails.metadata.onboardingVideo.watchedVideo
    ) {
      openModal();
    }
  }, [userData]);

  let content = (
    <div className={classes.contentWrapper}>
      <img src={onboardingIcon} alt="" className={classes.icon} />
      <Typography className={classes.title}>
        Want to learn how to use mythia?
      </Typography>
      <Typography className={classes.text}>Watch the Welcome Video</Typography>
      <CustButton onClick={playVid}>Watch Video</CustButton>
    </div>
  );

  if (playVideo) {
    content = (
      <div className={classes.contentWrapper}>
        {/* eslint-disable-next-line */}
        <video
          className={classes.onboardVid}
          onEnded={closeModal}
          autoPlay="autoplay"
          preload="auto"
        >
          <source id="videoSource" src={onboardingVideo} type="video/webm" />
        </video>
      </div>
    );
  }

  return (
    <Modal isOpened={isOpen} closeModal={closeModal} content={content} noBtns />
  );
}

export default OnboardingContainer;
