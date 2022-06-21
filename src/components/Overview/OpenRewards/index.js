import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Typography, Fade, Backdrop } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CorneredBlock from '../../Common/CorneredBlock';
import CustButton from '../../Common/Button';
import useWindowSize from '../../../utils/useWindowSize';

import smallChest from '../../../assets/img/sm-chest.png';
import mediumChest from '../../../assets/img/med-chest.png';
import largeChest from '../../../assets/img/lg-chest.png';

import steamCredits from '../../../assets/img/inventory/steam-credits.svg';
import xboxCredits from '../../../assets/img/inventory/xbox-credits.svg';
import psCredits from '../../../assets/img/inventory/ps-credits.svg';
import oculusCredits from '../../../assets/img/inventory/oculus-credits.svg';
import epicCredits from '../../../assets/img/inventory/epic-credits.svg';
import apexCredits from '../../../assets/img/inventory/apex-credits.svg';
import riotCredits from '../../../assets/img/inventory/riot-credits.svg';
import fortnineCredits from '../../../assets/img/inventory/fortnine-credits.svg';
import ps5 from '../../../assets/img/inventory/ps5.png';
import xbox from '../../../assets/img/inventory/xbox.png';
import quest2 from '../../../assets/img/inventory/quest2.png';
import nindendo from '../../../assets/img/inventory/nindendo.png';
import videoGames from '../../../assets/img/inventory/videogame.svg';
import gem from '../../../assets/img/inventory/gem.png';

import smallWebm from '../../../assets/video/small.webm';
import smallLoopedWebm from '../../../assets/video/smallLooped.webm';
import smallPoster from '../../../assets/video/smallPoster.jpg';
import smallWebmMob from '../../../assets/video/smallMob.webm';
import smallLoopedWebmMob from '../../../assets/video/smallLoopedMob.webm';
import smallPosterMob from '../../../assets/video/smallPosterMob.jpg';

import mediumWebm from '../../../assets/video/medium.webm';
import mediumLoopedWebm from '../../../assets/video/mediumLooped.webm';
import mediumPoster from '../../../assets/video/mediumPoster.jpg';
import mediumWebmMob from '../../../assets/video/mediumMob.webm';
import mediumLoopedWebmMob from '../../../assets/video/mediumLoopedMob.webm';
import mediumPosterMob from '../../../assets/video/mediumPosterMob.jpg';

import largeWebm from '../../../assets/video/large.webm';
import largeLoopedWebm from '../../../assets/video/largeLooped.webm';
import largePoster from '../../../assets/video/largePoster.jpg';
import largeWebmMob from '../../../assets/video/largeMob.webm';
import largeLoopedWebmMob from '../../../assets/video/largeLoopedMob.webm';
import largePosterMob from '../../../assets/video/largePosterMob.jpg';

const useStyles = makeStyles(theme => ({
  title: {
    padding: '10px 0',
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  contentBlock: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    padding: '40px 0 25px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  boxWrapper: {
    width: '100%',
    padding: '10px 15px',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative'
  },
  corBlockClass: {
    marginRight: '20px'
  },
  badge: {
    marginTop: '-50px',
    height: '24px',
    minWidth: '24px',
    padding: '0 2px',
    fontSize: '12px',
    lineHeight: '1px',
    fontWeight: '700',
    background: theme.palette.background.red,
    border: '2px solid #fff',
    color: '#fff',
    borderRadius: '100%',
    right: '10px',
    zIndex: '3'
  },
  imgWrapper: {
    position: 'relative',
    padding: '0',
    margin: '-60px auto 0 auto',
    [theme.breakpoints.down('xs')]: {
      margin: '-50px auto -50px auto'
    }
  },
  img: {
    position: 'relative',
    zIndex: '2',
    maxWidth: '110px',
    width: '90%',
    height: 'auto',
    maxHeight: '200px',
    [theme.breakpoints.down('xs')]: {
      maxHeight: '50px',
      width: 'auto'
    }
  },
  pointer: {
    cursor: 'pointer'
  },
  chestName: {
    fontSize: '20px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    margin: '0 auto',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px'
    }
  },
  chestDesc: {
    fontSize: '16px'
  },
  modalBoxWrapper: {
    margin: '60px auto 30px auto'
  },
  modalTitle: {
    fontWeight: '500',
    fontFamily: 'Oswald',
    fontSize: '30px',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  modalText: {
    fontWeight: '400',
    fontSize: '18px',
    maxWidth: '325px',
    margin: '20px auto'
  },
  storeImg: {
    display: 'block',
    margin: '20px auto',
    maxWidth: '100%',
    cursor: 'pointer'
  },
  btn: {
    width: '100%',
    maxWidth: '325px',
    padding: '6px 10px',
    margin: '10px auto',
    background: '#B92941',
    color: '#fff',
    borderRadius: '20px',
    fontWeight: '600',
    '&:hover': {
      background: '#b94739'
    }
  },
  btns: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    margin: '0 0 40px 0',
    padding: '0'
  },
  btnsItem: {
    maxWidth: '45% !important'
  },
  videoWrapper: {
    position: 'relative',
    width: '500px',
    height: '500px',
    marginTop: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '350px',
      height: '622px'
    }
  },
  bgVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: '1',
    top: '0',
    left: '0'
  },
  rewardTitle: {
    position: 'absolute',
    bottom: '30px',
    left: '0',
    width: '100%',
    padding: '0 30px',
    textAlign: 'center',
    zIndex: '2',
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Oswald',
    fontSize: '30px'
  },
  backdrop: {
    zIndex: 9001
  },
  rewardImg1: {
    position: 'absolute',
    top: '50px',
    width: '40px',
    margin: '0 auto 0 -60px',
    zIndex: '2',
    animation: `$rewardEffect 3000ms ${theme.transitions.easing.easeInOut}`
  },
  rewardImg2: {
    position: 'absolute',
    top: '100px',
    width: '40px',
    margin: '0 auto 0 -15px',
    zIndex: '2',
    animation: `$rewardEffect 3000ms ${theme.transitions.easing.easeInOut}`
  },
  rewardImg3: {
    position: 'absolute',
    top: '50px',
    width: '40px',
    margin: '0 auto 0 25px',
    zIndex: '2',
    animation: `$rewardEffect 3000ms ${theme.transitions.easing.easeInOut}`
  },
  '@keyframes rewardEffect': {
    '0%': {
      opacity: 0,
      transform: 'translateY(130px)'
    },
    '30%': {
      opacity: 0,
      transform: 'translateY(130px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  },
  shake: {
    animation: `$shake 1.2s ease-in-out 0s normal none infinite running`
  },
  '@keyframes shake': {
    '0%, 50%, 100%': {
      transform: 'rotate(0deg)'
    },
    '10%, 30%': {
      transform: 'rotate(-2deg)'
    },
    '20%, 40%': {
      transform: 'rotate(2deg)'
    }
  },
  yellowGlow: {
    position: 'absolute',
    zIndex: '1',
    top: '50%',
    left: '50%',
    width: '15%',
    height: '15%',
    margin: '-8% 0 0 -8%',
    borderRadius: '100%',
    animation: `$yellowGlow 1.2s ease-in-out 0s normal none infinite running`,
    [theme.breakpoints.down('xs')]: {
      top: '25%',
      animation: `$yellowGlowMobile 1.2s ease-in-out 0s normal none infinite running`
    }
  },
  greenGlow: {
    position: 'absolute',
    zIndex: '1',
    top: '50%',
    left: '50%',
    width: '15%',
    height: '15%',
    margin: '-8% 0 0 -8%',
    borderRadius: '100%',
    animation: `$greenGlow 1.2s ease-in-out 0s normal none infinite running`,
    [theme.breakpoints.down('xs')]: {
      top: '25%',
      animation: `$greenGlowMobile 1.2s ease-in-out 0s normal none infinite running`
    }
  },
  blueGlow: {
    position: 'absolute',
    zIndex: '1',
    top: '50%',
    left: '50%',
    width: '15%',
    height: '15%',
    margin: '-8% 0 0 -8%',
    borderRadius: '100%',
    animation: `$blueGlow 1.2s ease-in-out 0s normal none infinite running`,
    [theme.breakpoints.down('xs')]: {
      top: '25%',
      animation: `$blueGlowMobile 1.2s ease-in-out 0s normal none infinite running`
    }
  },
  '@keyframes yellowGlow': {
    from: {
      boxShadow: '0px 0px 30px 40px #e5d26d'
    },
    to: {
      boxShadow: '0px 0px 5px 15px #e5d26d'
    }
  },
  '@keyframes greenGlow': {
    from: {
      boxShadow: '0px 0px 30px 40px #809a4c'
    },
    to: {
      boxShadow: '0px 0px 5px 15px #809a4c'
    }
  },
  '@keyframes blueGlow': {
    from: {
      boxShadow: '0px 0px 30px 40px #234ba9'
    },
    to: {
      boxShadow: '0px 0px 5px 15px #234ba9'
    }
  },
  '@keyframes yellowGlowMobile': {
    from: {
      boxShadow: '0px 0px 15px 20px #e5d26d'
    },
    to: {
      boxShadow: '0px 0px 2px 5px #e5d26d'
    }
  },
  '@keyframes greenGlowMobile': {
    from: {
      boxShadow: '0px 0px 15px 20px #809a4c'
    },
    to: {
      boxShadow: '0px 0px 2px 5px #809a4c'
    }
  },
  '@keyframes blueGlowMobile': {
    from: {
      boxShadow: '0px 0px 15px 20px #234ba9'
    },
    to: {
      boxShadow: '0px 0px 2px 5px #234ba9'
    }
  }
}));

const itemsData = {
  'Steam Credit': steamCredits,
  'Steam Credits': steamCredits,
  'XBox Credit': xboxCredits,
  'XBox Credits': xboxCredits,
  'PlayStation Credit': psCredits,
  'PlayStation Credits': psCredits,
  'Oculus Credit': oculusCredits,
  'Oculus Credits': oculusCredits,
  'Epic Credit': epicCredits,
  'Apex Credits': apexCredits,
  'Apex Tokens': apexCredits,
  'Riot Points': riotCredits,
  'Riot Credits': riotCredits,
  'Fortnite Credits': fortnineCredits,
  'Fortnite vBucks': fortnineCredits,
  PS5: ps5,
  XBox: xbox,
  'XBox or PS5': ps5,
  'Oculus Quest 2': quest2,
  'Nintendo Switch': nindendo,
  buyAnyGame: videoGames
};

function OpenRewards(props) {
  const {
    ownedBoxes,
    upcomingRewardBoxes,
    handleOpenPayment,
    openRewardBox,
    history
  } = props;
  const classes = useStyles();

  // Modal
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = type => {
    if (ownedBoxes[type] > 0) {
      setIsModalOpened(type);
      openRewardBox(type);
    }
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  // Updating next rewards
  const [nextRewards, setNextRewards] = useState({});

  useEffect(() => {
    setNextRewards(upcomingRewardBoxes);
  }, [isModalOpened]);

  // const openAppStore = () => {
  //   window.open('https://apps.apple.com/us/app/mythia/id1549433133', '_blank');
  // };
  //
  // const boxImg = {
  //   small: smallChest,
  //   medium: mediumChest,
  //   large: largeChest
  // };

  // Video
  const videoObj = {
    small: {
      vid: useWindowSize().width > 600 ? smallWebm : smallWebmMob,
      loopedVid:
        useWindowSize().width > 600 ? smallLoopedWebm : smallLoopedWebmMob,
      poster: useWindowSize().width > 600 ? smallPoster : smallPosterMob,
      rewardTitle: nextRewards.small ? nextRewards.small.title : '',
      rewardAmount: nextRewards.small ? nextRewards.small.amount : '',
      rewardImg:
        nextRewards.small && itemsData[nextRewards.small.title]
          ? itemsData[nextRewards.small.title]
          : gem
    },
    medium: {
      vid: useWindowSize().width > 600 ? mediumWebm : mediumWebmMob,
      loopedVid:
        useWindowSize().width > 600 ? mediumLoopedWebm : mediumLoopedWebmMob,
      poster: useWindowSize().width > 600 ? mediumPoster : mediumPosterMob,
      rewardTitle: nextRewards.medium ? nextRewards.medium.title : '',
      rewardAmount: nextRewards.medium ? nextRewards.medium.amount : '',
      rewardImg:
        nextRewards.medium && itemsData[nextRewards.medium.title]
          ? itemsData[nextRewards.medium.title]
          : gem
    },
    large: {
      vid: useWindowSize().width > 600 ? largeWebm : largeWebmMob,
      loopedVid:
        useWindowSize().width > 600 ? largeLoopedWebm : largeLoopedWebmMob,
      poster: useWindowSize().width > 600 ? largePoster : largePosterMob,
      rewardTitle: nextRewards.large ? nextRewards.large.title : '',
      rewardAmount: nextRewards.large ? nextRewards.large.amount : '',
      rewardImg:
        nextRewards.large && itemsData[nextRewards.large.title]
          ? itemsData[nextRewards.large.title]
          : gem
    }
  };

  const showLoop = () => {
    const video = document.getElementById('videoWrapper');
    const videoSource = document.getElementById('videoSource');

    videoSource.src = videoObj[isModalOpened].loopedVid;
    video.loop = 'loop';
    video.muted = 'muted';

    video.load();
  };

  try {
    return (
      <React.Fragment>
        <div className={classes.title}>Open Rewards</div>
        <div className={classes.contentBlock}>
          <CorneredBlock subClass={classes.corBlockClass}>
            <div
              className={`${classes.boxWrapper} ${
                ownedBoxes.small > 0 ? classes.pointer : ''
              }`}
            >
              <Badge
                badgeContent={ownedBoxes.small || 0}
                showZero
                max={999999}
                classes={{ badge: `${classes.badge} ${classes.badgeS}` }}
              >
                <div className={classes.imgWrapper}>
                  <img
                    src={smallChest}
                    alt=""
                    className={`${classes.img} ${
                      ownedBoxes.small > 0 ? classes.shake : ''
                    }`}
                    role="presentation"
                    onClick={() => openModal('small')}
                  />
                  {ownedBoxes.small > 0 && (
                    <div className={classes.yellowGlow} />
                  )}
                </div>
              </Badge>
              <Typography className={classes.chestName}>Small Chest</Typography>
            </div>
          </CorneredBlock>
          <CorneredBlock subClass={classes.corBlockClass}>
            <div
              className={`${classes.boxWrapper} ${
                ownedBoxes.medium > 0 ? classes.pointer : ''
              }`}
            >
              <Badge
                badgeContent={ownedBoxes.medium || 0}
                showZero
                max={999999}
                classes={{ badge: `${classes.badge} ${classes.badgeM}` }}
              >
                <div className={classes.imgWrapper}>
                  <img
                    src={mediumChest}
                    alt=""
                    className={`${classes.img} ${
                      ownedBoxes.medium > 0 ? classes.shake : ''
                    }`}
                    role="presentation"
                    onClick={() => openModal('medium')}
                  />
                  {ownedBoxes.medium > 0 && (
                    <div className={classes.greenGlow} />
                  )}
                </div>
              </Badge>
              <Typography className={classes.chestName}>
                Medium Chest
              </Typography>
            </div>
          </CorneredBlock>
          <CorneredBlock>
            <div
              className={`${classes.boxWrapper} ${
                ownedBoxes.large > 0 ? classes.pointer : ''
              }`}
            >
              <Badge
                badgeContent={ownedBoxes.large || 0}
                showZero
                max={999999}
                classes={{ badge: `${classes.badge} ${classes.badgeL}` }}
              >
                <div className={classes.imgWrapper}>
                  <img
                    src={largeChest}
                    alt=""
                    className={`${classes.img} ${
                      ownedBoxes.large > 0 ? classes.shake : ''
                    }`}
                    role="presentation"
                    onClick={() => openModal('large')}
                  />
                  {ownedBoxes.large > 0 && <div className={classes.blueGlow} />}
                </div>
              </Badge>
              <Typography className={classes.chestName}>Large Chest</Typography>
            </div>
          </CorneredBlock>

          <Backdrop
            className={classes.backdrop}
            open={!!isModalOpened}
            onClick={closeModal}
          >
            {isModalOpened ? (
              <div
                className={classes.videoWrapper}
                style={{
                  background: `url(${videoObj[isModalOpened].poster}) no-repeat center`,
                  backgroundSize: '100% 100%'
                }}
              >
                {/* eslint-disable-next-line */}
                <video
                  className={classes.bgVideo}
                  onEnded={showLoop}
                  id="videoWrapper"
                  autoPlay="autoplay"
                  preload="auto"
                >
                  <source
                    id="videoSource"
                    src={videoObj[isModalOpened].vid}
                    type="video/webm"
                  />
                </video>
                <img
                  src={videoObj[isModalOpened].rewardImg}
                  alt={videoObj[isModalOpened].rewardTitle}
                  className={classes.rewardImg1}
                />
                <img
                  src={videoObj[isModalOpened].rewardImg}
                  alt={videoObj[isModalOpened].rewardTitle}
                  className={classes.rewardImg2}
                />
                <img
                  src={videoObj[isModalOpened].rewardImg}
                  alt={videoObj[isModalOpened].rewardTitle}
                  className={classes.rewardImg3}
                />
                <Fade in={!!isModalOpened} timeout={6000}>
                  <Typography className={classes.rewardTitle}>
                    + {videoObj[isModalOpened].rewardAmount}{' '}
                    {videoObj[isModalOpened].rewardTitle}
                  </Typography>
                </Fade>
              </div>
            ) : null}
          </Backdrop>
        </div>
        <div className={classes.btns}>
          <CustButton
            onClick={handleOpenPayment}
            subclass={classes.btnsItem}
            icon="plus"
            style={{ display: 'none' }}
          >
            Add Cash
          </CustButton>
          <CustButton
            onClick={() => history.push('/party')}
            subclass={classes.btnsItem}
            icon="firework"
          >
            Party Up
          </CustButton>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

OpenRewards.defaultProps = {
  ownedBoxes: undefined,
  upcomingRewardBoxes: undefined,
  handleOpenPayment: undefined,
  openRewardBox: undefined,
  history: undefined
};

OpenRewards.propTypes = {
  ownedBoxes: PropTypes.shape({
    small: PropTypes.number,
    medium: PropTypes.number,
    large: PropTypes.number
  }),
  upcomingRewardBoxes: PropTypes.shape({}),
  handleOpenPayment: PropTypes.func,
  openRewardBox: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default OpenRewards;
