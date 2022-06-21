import React, { useContext, useState } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../containers/ErrorBoundary';
import PartyMembers from '../../components/Party/PartyMembers';
import Challenges from '../../components/Party/Challenges';
import Modal from '../../components/Common/Modal';
import Preloader from '../../components/Common/Preloader';
import CustButton from '../../components/Common/Button';
import appContext from '../../context/appContext';
import fetchData from '../../utils/fetch';
import { claimChallenge } from '../../utils/segment';
import { phClaimChallenge } from '../../utils/posthog';

import awardIcon from '../../assets/img/award-ico.png';

const useStyles = makeStyles(theme => ({
  contentWrapper: {
    width: '100%'
  },
  content: {
    fontSize: '36px',
    fontWeight: '900',
    textAlign: 'center',
    display: 'flex',
    width: '100%',
    paddingRight: '30px'
  },
  awardIco: {
    width: '117px',
    maxWidth: '90%'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    padding: '20px 0 0 0'
  },
  modalText: {
    fontSize: '16px',
    padding: '20px 0',
    maxWidth: '325px'
  },
  positBtn: {
    margin: '10px 0'
  }
}));

function Party() {
  const classes = useStyles();
  const { anonId, userData, errorDispatch } = useContext(appContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [loader, setLoader] = useState(false);

  try {
    const handleOpenModal = () => {
      setIsModalOpened(true);
    };

    const handleCloseModal = () => {
      setIsModalOpened(false);
    };

    const updateUserData = () => {
      // eslint-disable-next-line
      const event = new Event('update-userdata');
      window.dispatchEvent(event);
    };

    // Claim prizes
    const onSuccessClaim = () => {
      setLoader(false);
    };

    const onErrorClaim = payload => {
      handleCloseModal();
      setLoader(false);
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const claimPrize = (challengeID, challengeTitle) => {
      handleOpenModal();
      setLoader(true);

      // Segment
      claimChallenge(
        { challengeTitle },
        // eslint-disable-next-line
        userData ? userData._id : null,
        anonId
      );

      // PostHog
      phClaimChallenge({ challengeTitle });

      fetchData('/party/claimPrize', 'POST', onSuccessClaim, onErrorClaim, {
        challengeID
      });
    };

    return (
      <div className={classes.contentWrapper}>
        <div
          className={classes.content}
          style={{
            display:
              userData.party && userData.party.members.length > 1 ? '' : 'none'
          }}
        >
          <PartyMembers
            partyMembers={userData.party ? userData.party.members : []}
          />
        </div>
        <div className={classes.content}>
          <Challenges
            challenges={userData.party ? userData.party.challenges : []}
            claimPrize={claimPrize}
            time={
              userData.party && userData.party.resetTime
                ? userData.party.resetTime
                : null
            }
          />
        </div>

        <Modal
          isOpened={isModalOpened}
          closeModal={handleCloseModal}
          content={
            !loader ? (
              <div>
                <img src={awardIcon} className={classes.awardIco} alt="" />
                <Typography className={classes.modalTitle}>
                  Claim Your Prize
                </Typography>
                <Typography className={classes.modalText}>
                  Your prize will be sent to your inventory on the home page.
                </Typography>
                <CustButton
                  subclass={classes.positBtn}
                  onClick={updateUserData}
                >
                  Collect
                </CustButton>
              </div>
            ) : (
              <Preloader />
            )
          }
          noBtns
          noCloseBtn
        />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Party;
