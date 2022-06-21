import React, { useContext, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Switch,
  Typography,
  Tooltip,
  Button,
  CircularProgress
} from '@material-ui/core';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Icon from '../../components/Common/Icon';
import Preloader from '../../components/Common/Preloader';
import CardActivation from '../../components/Settings/CardActivation';
import CardLost from '../../components/Settings/CardLost';
import CardStolen from '../../components/Settings/CardStolen';
import CardDamaged from '../../components/Settings/CardDamaged';
import SettingsLayout from '../../layouts/SettingsLayout';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';

import useWindowSize from '../../utils/useWindowSize';

import card from '../../assets/img/card-frame.png';
import close from '../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex'
  },
  lContentWrapper: {
    width: '100%',
    maxWidth: '670px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%'
    }
  },
  rContentWrapper: {
    width: '100%',
    paddingLeft: '50px',
    borderLeft: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: '2',
      width: 'calc(100% + 36px)',
      maxWidth: 'calc(100% + 36px)',
      height: '100%',
      top: '0',
      left: '0',
      padding: '0 0 0 36px',
      marginLeft: '-36px',
      border: '0',
      background: '#fff'
    }
  },
  switchWrapper: {
    display: 'flex',
    padding: '5px 0',
    alignItems: 'center',
    maxWidth: '450px'
  },
  switchLabel: {
    fontSize: '16px',
    color: theme.palette.text.primary,
    opacity: '0.7'
  },
  infoIcon: {
    marginLeft: '5px',
    opacity: '0.7',
    cursor: 'pointer',
    padding: '0',
    minWidth: '1px',
    width: '14px',
    '& svg': {
      width: '100%'
    }
  },
  cardWrapper: {
    margin: '30px 0 0 -36px',
    width: 'calc(100% + 36px)'
  },
  title: {
    fontFamily: 'Oswald',
    fontSize: '28px',
    textTransform: 'uppercase',
    fontWeight: '700',
    color: theme.palette.text.darkPurple,
    margin: '30px 0',
    padding: '0 50px 0 36px'
  },
  infoLine: {
    display: 'flex',
    width: '100%',
    padding: '10px 0',
    transition: 'all .2s',
    opacity: '0.7',
    '&:hover': {
      opacity: '1'
    }
  },
  infoLineActive: {
    background: theme.palette.background.purpleWithOp
  },
  asLink: {
    padding: '0 50px 0 36px',
    cursor: 'pointer',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '& svg path': {
      fill: theme.palette.text.purple
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0 30px 0 36px'
    }
  },
  asLinkInner: {
    display: 'flex',
    width: '100%',
    maxWidth: '450px',
    padding: '10px 0',
    borderBottom: `1px solid ${theme.palette.border.default}`
  },
  noBorder: {
    border: 'none'
  },
  close: {
    marginBottom: '-6px',
    marginRight: '-6px'
  },
  infoText: {
    fontSize: '16px'
  },
  accountInfoValue: {
    fontSize: '18px',
    marginLeft: 'auto',
    paddingLeft: '5px'
  },
  icon: {
    height: '15px'
  },
  cardWrap: {
    position: 'relative',
    margin: '10px 50px 20px 0',
    width: '450px',
    height: '268px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '400px',
      height: '238px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
      height: '149px'
    }
  },
  cardImg: {
    position: 'relative',
    width: '100%',
    zIndex: '1'
  },
  copyBox: {
    width: '450px',
    height: '268px',
    position: 'absolute',
    left: '0',
    top: '0',
    zIndex: '3',
    [theme.breakpoints.down('sm')]: {
      width: '400px',
      height: '238px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '250px',
      height: '149px'
    }
  },
  cardPanTitle: {
    position: 'absolute',
    zIndex: '2',
    top: '105px',
    left: '35px',
    fontSize: '14px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      top: '85px'
    },
    [theme.breakpoints.down('xs')]: {
      top: '45px',
      left: '15px',
      fontSize: '9px'
    }
  },
  cardPan: {
    position: 'absolute',
    zIndex: '2',
    top: '125px',
    left: '35px',
    '& iframe': {
      height: '32px',
      width: '150%'
    },
    [theme.breakpoints.down('sm')]: {
      top: '105px'
    },
    [theme.breakpoints.down('xs')]: {
      top: '55px',
      left: '15px'
    }
  },
  cardExpTitle: {
    position: 'absolute',
    zIndex: '2',
    bottom: '55px',
    left: '360px',
    fontSize: '14px',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      left: '320px'
    },
    [theme.breakpoints.down('xs')]: {
      left: '200px',
      bottom: '45px',
      fontSize: '9px'
    }
  },
  cardExp: {
    position: 'absolute',
    zIndex: '2',
    bottom: '25px',
    left: '375px',
    '& iframe': {
      height: '20px',
      width: '150%'
    },
    [theme.breakpoints.down('sm')]: {
      left: '335px'
    },
    [theme.breakpoints.down('xs')]: {
      left: '195px',
      bottom: '15px'
    }
  },
  cardCvvTitle: {
    position: 'absolute',
    zIndex: '2',
    bottom: '55px',
    left: '35px',
    fontSize: '14px',
    color: '#fff',
    [theme.breakpoints.down('xs')]: {
      bottom: '45px',
      left: '15px'
    }
  },
  cardCvv: {
    position: 'absolute',
    zIndex: '2',
    bottom: '25px',
    left: '35px',
    '& iframe': {
      height: '20px',
      width: '150%'
    },
    [theme.breakpoints.down('xs')]: {
      bottom: '15px',
      left: '15px'
    }
  },
  progress: {
    marginLeft: '15px'
  }
}));

const AntSwitch = withStyles(theme => ({
  root: {
    width: 40,
    height: 22,
    padding: 0,
    margin: '0 15px 0 0',
    display: 'inline-flex'
  },
  switchBase: {
    padding: 2,
    color: 'rgba(255, 255, 255, 0.7)',
    '&$checked': {
      transform: 'translateX(18px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.background.lightGray,
        borderColor: theme.palette.background.lightGray
      }
    }
  },
  thumb: {
    width: 18,
    height: 18
  },
  track: {
    border: `1px solid ${theme.palette.border.default}`,
    borderRadius: 22 / 2,
    opacity: 1,
    backgroundColor: theme.palette.background.gray
  },
  checked: {}
}))(Switch);

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.background.gray,
    color: theme.palette.text.lightGray,
    border: `1px solid ${theme.palette.border.default}`,
    boxShadow: 'none',
    fontSize: 14,
    padding: '10px'
  }
}))(Tooltip);

function MyCard() {
  const classes = useStyles();
  const [showLoader, setShowLoader] = useState(false);
  const [token, setToken] = useState('');
  const [report, setReport] = useState('');

  const { userData, errorDispatch, infoDispatch } = useContext(appContext);

  let fontSize = '30px';

  if (useWindowSize().width < 600) {
    fontSize = '13px';
  } else if (useWindowSize().width < 960) {
    fontSize = '26px';
  }

  // get publicToken for Marqeta
  const onSuccessToken = payload => {
    setToken(payload.token);

    // eslint-disable-next-line
    marqeta.bootstrap({
      clientAccessToken: payload.token,
      showPan: {
        cardPan: {
          domId: 'mq-card-pan',
          format: true,
          styles: {
            span: {
              color: '#fff',
              'font-size': fontSize,
              'font-family': 'Arial',
              'letter-spacing': '5px'
            }
          }
        },
        copyCardPan: {
          domId: 'copy-mq-card-pan',
          mode: 'transparent',
          onCopySuccess: () => {
            infoDispatch({
              type: 'SET_INFO',
              payload: 'Card number copied to the clipboard'
            });
          },
          onCopyFailure: error => {
            errorDispatch({ type: 'SET_ERROR', payload: error });
          }
        },
        cardExp: {
          domId: 'mq-card-exp',
          format: true,
          styles: {
            span: {
              color: '#fff',
              'font-size': '16px',
              'font-family': 'Arial',
              'letter-spacing': '1px'
            }
          }
        },
        cardCvv: {
          domId: 'mq-card-cvv',
          styles: {
            span: {
              color: '#fff',
              'font-size': '16px',
              'font-family': 'Arial',
              'letter-spacing': '1px'
            }
          }
        }
      },
      callbackEvents: {
        onSuccess: () => {
          setShowLoader(false);
        },
        onFailure: () => {
          setShowLoader(false);
        }
      }
    });
  };

  const onErrorToken = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  useEffect(() => {
    if (
      userData &&
      userData.cards &&
      userData.cards.physical &&
      userData.cards.physical.status === 'active'
    ) {
      if (token === '' && !showLoader) {
        setShowLoader(true);

        fetchData('/money/marqetaToken', 'POST', onSuccessToken, onErrorToken, {
          cardId:
            userData && userData.cards && userData.cards.virtual
              ? userData.cards.virtual.cardId
              : ''
        });
      }
    }
  }, [userData]);

  // Copy card number
  const copyCard = () => {
    if (
      userData &&
      userData.cards &&
      userData.cards.physical &&
      userData.cards.physical.status === 'active'
    ) {
      // eslint-disable-next-line
      marqeta.copyToClipboard('mq-card-pan');
    }

    return null;
  };

  // Send pin
  const [showCardLoader, setShowCardLoader] = useState(false);

  const [activationStep, setActivationStep] = useState('activation');
  useEffect(() => {
    if (userData.cards && userData.cards.physical.status === 'unactivated') {
      setActivationStep('activation');
    } else if (userData.cards && !userData.cards.physical.pin_is_set) {
      setActivationStep('setPin');
    } else {
      setActivationStep('allSet');
    }
  }, [userData]);

  const onSuccessSendPIN = () => {
    setShowCardLoader(false);
    setActivationStep('allSet');
  };

  const onErrorSendPIN = payload => {
    setShowCardLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const sendPin = data => {
    setShowCardLoader(true);
    fetchData('/money/setPIN', 'POST', onSuccessSendPIN, onErrorSendPIN, data);
  };

  // Card activation
  const onSuccessActivating = () => {
    setShowCardLoader(false);
    setActivationStep('setPin');
  };

  const onErrorActivating = payload => {
    setShowCardLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const activateCard = data => {
    setShowCardLoader(true);
    fetchData(
      '/money/activateCard',
      'POST',
      onSuccessActivating,
      onErrorActivating,
      data
    );
  };

  // Card lock/unlock
  const [isCardLocked, setIsCardLocked] = useState(false);
  const [showCardLockLoader, setShowCardLockLoader] = useState(false);

  useEffect(() => {
    if (
      userData &&
      userData.cards &&
      userData.cards.physical &&
      userData.cards.physical.cardId !== null
    ) {
      if (userData.cards.physical.status === 'suspended') {
        setIsCardLocked(true);
      }
    }
  }, [userData]);

  const onSuccessLockCard = () => {
    infoDispatch({
      type: 'SET_INFO',
      payload: `The card is now ${!isCardLocked ? 'locked' : 'active'}`
    });
    setShowCardLockLoader(false);
    setIsCardLocked(!isCardLocked);
    // eslint-disable-next-line
    const event = new Event('update-userdata');
    window.dispatchEvent(event);
  };

  const onErrorLockCard = payload => {
    setShowCardLockLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const handleChangeLockCard = () => {
    setShowCardLockLoader(true);

    const data = { shouldLock: !isCardLocked };

    fetchData(
      '/money/toggleCardLock',
      'POST',
      onSuccessLockCard,
      onErrorLockCard,
      data
    );
  };

  try {
    const closeReport = () => {
      setReport('');
    };

    const changeReport = type => {
      if (report === type) {
        closeReport();
      } else {
        setReport(type);
      }
    };

    return (
      <SettingsLayout>
        <div className={classes.wrapper}>
          <div className={classes.lContentWrapper}>
            <div id="virtual-card-container" className={classes.cardWrap}>
              <div className={classes.cardPanTitle}>Card Number</div>
              {/* eslint-disable-next-line */}
              <div id="mq-card-pan" className={classes.cardPan}></div>
              <div className={classes.cardExpTitle}>Exp. Date</div>
              {/* eslint-disable-next-line */}
              <div id="mq-card-exp" className={classes.cardExp}></div>
              <div className={classes.cardCvvTitle}>CVV</div>
              {/* eslint-disable-next-line */}
              <div id="mq-card-cvv" className={classes.cardCvv}></div>
              {!showLoader ? (
                <img src={card} alt="" className={classes.cardImg} />
              ) : (
                <Preloader />
              )}
              <div
                role="presentation"
                onClick={copyCard}
                className={classes.copyBox}
                id="copy-mq-card-pan"
              />
            </div>

            <div className={classes.switchWrapper}>
              <AntSwitch
                checked={isCardLocked}
                onChange={handleChangeLockCard}
                name="isCardLocked"
                data-testid="lock-switch"
              />
              {!showCardLockLoader ? (
                <React.Fragment>
                  <Typography className={classes.switchLabel}>
                    Lock Card
                  </Typography>
                  <LightTooltip
                    title="Locking card if it's lost or stolen"
                    placement="top"
                  >
                    <Button className={classes.infoIcon}>
                      <Icon icon="information" />
                    </Button>
                  </LightTooltip>
                </React.Fragment>
              ) : (
                <CircularProgress size={20} className={classes.progress} />
              )}
            </div>

            <div className={classes.cardWrapper}>
              <div
                role="presentation"
                onClick={() => {
                  if (
                    userData.cards &&
                    userData.cards.physical &&
                    userData.cards.physical.cardId
                  ) {
                    changeReport('activate');
                  }
                  return null;
                }}
                className={`${classes.infoLine} ${classes.asLink} ${
                  report === 'activate' ? classes.infoLineActive : ''
                }`}
              >
                <div className={classes.asLinkInner}>
                  <Typography className={classes.infoText}>
                    Activate Card
                  </Typography>
                  <Typography className={classes.accountInfoValue}>
                    {report === 'activate' ? (
                      <img src={close} alt="" className={classes.close} />
                    ) : (
                      <Icon icon="chevron-right" className={classes.icon} />
                    )}
                  </Typography>
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => {
                  changeReport('stolen');
                }}
                className={`${classes.infoLine} ${classes.asLink} ${
                  report === 'stolen' ? classes.infoLineActive : ''
                }`}
              >
                <div className={classes.asLinkInner}>
                  <Typography className={classes.infoText}>
                    My card was stolen
                  </Typography>
                  <Typography className={classes.accountInfoValue}>
                    {report === 'stolen' ? (
                      <img src={close} alt="" className={classes.close} />
                    ) : (
                      <Icon icon="chevron-right" className={classes.icon} />
                    )}
                  </Typography>
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => {
                  changeReport('lost');
                }}
                className={`${classes.infoLine} ${classes.asLink} ${
                  report === 'lost' ? classes.infoLineActive : ''
                }`}
              >
                <div className={classes.asLinkInner}>
                  <Typography className={classes.infoText}>
                    My card is lost
                  </Typography>
                  <Typography className={classes.accountInfoValue}>
                    {report === 'lost' ? (
                      <img src={close} alt="" className={classes.close} />
                    ) : (
                      <Icon icon="chevron-right" className={classes.icon} />
                    )}
                  </Typography>
                </div>
              </div>
              <div
                role="presentation"
                onClick={() => {
                  changeReport('damaged');
                }}
                className={`${classes.infoLine} ${classes.asLink} ${
                  report === 'damaged' ? classes.infoLineActive : ''
                }`}
              >
                <div className={`${classes.asLinkInner} ${classes.noBorder}`}>
                  <Typography className={classes.infoText}>
                    My card is damaged/doesn’t work
                  </Typography>
                  <Typography className={classes.accountInfoValue}>
                    {report === 'damaged' ? (
                      <img src={close} alt="" className={classes.close} />
                    ) : (
                      <Icon icon="chevron-right" className={classes.icon} />
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          {report === 'activate' && (
            <div className={classes.rContentWrapper}>
              <CardActivation
                activationStep={activationStep}
                cardId={
                  userData.cards && userData.cards.physical
                    ? userData.cards.physical.cardId
                    : ''
                }
                isLoading={showCardLoader}
                closeReport={closeReport}
                activateCard={activateCard}
                sendPin={sendPin}
              />
            </div>
          )}
          {report === 'stolen' && (
            <div className={classes.rContentWrapper}>
              <CardStolen userData={userData} closeReport={closeReport} />
            </div>
          )}
          {report === 'lost' && (
            <div className={classes.rContentWrapper}>
              <CardLost userData={userData} closeReport={closeReport} />
            </div>
          )}
          {report === 'damaged' && (
            <div className={classes.rContentWrapper}>
              <CardDamaged userData={userData} closeReport={closeReport} />
            </div>
          )}
        </div>
      </SettingsLayout>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default MyCard;
