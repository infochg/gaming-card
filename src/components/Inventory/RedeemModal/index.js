import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Modal from '../../Common/Modal';
import CorneredBlock from '../../Common/CorneredBlock';
import CustButton from '../../Common/Button';
import Preloader from '../../Common/Preloader';
import TextField from '../../Common/TextField';

import gem from '../../../assets/img/gem.svg';
import successBg from '../../../assets/img/success-bg.png';

const useStyles = makeStyles(theme => ({
  corBlockClass: {
    margin: '0 20px 0 0',
    maxWidth: '113px'
  },
  itemWrapper: {
    width: '100%',
    padding: '10px 15px',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative'
  },
  flexRow: {
    display: 'flex',
    width: '100%',
    marginTop: '15px',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: `1px solid ${theme.palette.border.default}`
  },
  imgWrapper: {
    width: '80px',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '-40px auto 0 auto',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  anyGameImgWrapper: {
    width: '110px',
    height: '130px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    paddingRight: '15px',
    '& img': {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  },
  count: {
    fontSize: '20px',
    fontFamily: 'Oswald',
    fontWeight: '500',
    textAlign: 'center',
    margin: '0 auto',
    width: '80px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  itemName: {
    fontSize: '14px',
    textAlign: 'center',
    margin: '0 auto',
    width: '80px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  redeemTitle: {
    fontSize: '30px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'left',
    width: '50%',
    '& span': {
      display: 'block',
      whiteSpace: 'nowrap'
    }
  },
  redeemSubtitle: {
    fontSize: '18px',
    fontFamily: 'Oswald',
    fontWeight: '500',
    textTransform: 'uppercase',
    textAlign: 'left'
  },
  redeemInstructions: {
    padding: '0',
    margin: '5px 0 15px 20px',
    maxWidth: '360px',
    textAlign: 'left',
    fontSize: '16px',
    '& li': {
      padding: '5px 0'
    }
  },
  redeemSubtext: {
    margin: '15px 0 0 0',
    maxWidth: '360px',
    textAlign: 'left',
    fontSize: '12px',
    color: theme.palette.text.lightGray
  },
  successTitle: {
    fontSize: '24px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    margin: '20px auto'
  },
  successText: {
    fontSize: '16px',
    margin: '0 auto 30px auto'
  },
  successImgWrapper: {
    margin: '0 auto',
    width: '218px',
    height: '170px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  successImg: {
    position: 'relative',
    height: '100px'
  },
  successImgBg: {
    width: '218px',
    height: '170px',
    position: 'absolute',
    zIndex: '2'
  },
  label: {
    fontSize: '16px',
    color: theme.palette.text.lightGray,
    textAlign: 'left',
    marginTop: '10px'
  },
  textField: {
    '& input': {
      background: theme.palette.background.gray,
      fontSize: '16px'
    }
  },
  btnWithMarg: {
    marginTop: '20px'
  },
  addressForm: {
    width: '380px',
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  center: {
    textAlign: 'center'
  }
}));

function RedeemModal(props) {
  const {
    isOpened,
    redeemItem,
    invItems,
    redeemAction,
    closeModal,
    showLoader
  } = props;
  const classes = useStyles();

  const [name, setName] = useState('');
  const [console, setConsole] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!isOpened) {
      setName('');
      setConsole('');
      setAddress('');
    }
  }, [isOpened]);

  try {
    // Game Credits
    const submitCredits = () => {
      redeemAction({
        name: redeemItem.name.trim(),
        amount: redeemItem.count
      });
    };

    // Any Game
    const changeField = e => {
      if (e.target.name === 'name') {
        if (name === '') {
          setName(e.target.value.trim());
        } else {
          setName(e.target.value);
        }
      } else if (e.target.name === 'console') {
        if (console === '') {
          setConsole(e.target.value.trim());
        } else {
          setConsole(e.target.value);
        }
      } else if (e.target.name === 'address') {
        if (address === '') {
          setAddress(e.target.value.trim());
        } else {
          setAddress(e.target.value);
        }
      }
    };

    const submitAnyGame = e => {
      e.preventDefault();

      redeemAction({
        name: name.trim(),
        console: console.trim()
      });
    };

    // Console
    const submitConsole = e => {
      e.preventDefault();

      redeemAction({
        name: redeemItem.name.trim(),
        address: address.trim()
      });
    };

    let modalContent = null;

    if (redeemItem) {
      if (redeemItem.success) {
        modalContent = (
          <React.Fragment>
            <div className={classes.successImgWrapper}>
              <img
                src={
                  invItems[redeemItem.name]
                    ? invItems[redeemItem.name].icon
                    : gem
                }
                alt={redeemItem.title}
                className={classes.successImg}
              />
              <img src={successBg} className={classes.successImgBg} alt="" />
            </div>
            <Typography className={classes.successTitle}>
              Congratulations!
            </Typography>
            <Typography className={classes.successText}>
              You succesfully redeemed the reward
            </Typography>
            <CustButton fullWidth onClick={closeModal}>
              Ok
            </CustButton>
          </React.Fragment>
        );
      } else {
        if (redeemItem.category === 'gameStoreCredits') {
          modalContent = (
            <React.Fragment>
              <div className={classes.flexRow}>
                <CorneredBlock subClass={classes.corBlockClass}>
                  <div className={classes.itemWrapper}>
                    <div className={classes.imgWrapper}>
                      <img
                        src={
                          invItems[redeemItem.name]
                            ? invItems[redeemItem.name].icon
                            : gem
                        }
                        alt={redeemItem.title}
                      />
                    </div>
                    <Typography className={classes.count}>
                      {redeemItem.count || redeemItem.count === 0
                        ? redeemItem.count
                        : ''}
                    </Typography>
                    <Typography className={classes.itemName}>
                      {redeemItem.name || ''}
                    </Typography>
                  </div>
                </CorneredBlock>
                <Typography className={classes.redeemTitle}>
                  <span>Redeem Your</span>
                  <span>{redeemItem.name || ''}</span>
                </Typography>
              </div>
              <Typography className={classes.redeemSubtitle}>
                HOW TO REDEEM YOUR {redeemItem.name || ''}:
              </Typography>
              <ul className={classes.redeemInstructions}>
                <li>
                  Make a purchase in the{' '}
                  {invItems[redeemItem.name]
                    ? invItems[redeemItem.name].store
                    : ''}
                  , using your Mythia card
                </li>
                <li>Click “Activate Redemption”</li>
                <li>
                  You’ll spend your {redeemItem.name || ''} instead of cash
                </li>
              </ul>
              {!showLoader ? (
                <React.Fragment>
                  {Number(redeemItem.count) < 500 ? (
                    <React.Fragment>
                      <CustButton disabled fullWidth>
                        500 Credits minimum
                      </CustButton>
                      <Typography
                        className={`${classes.redeemSubtext} ${classes.center}`}
                      >
                        You are {500 - Number(redeemItem.count)} credits away
                        from redeeming this reward
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <CustButton fullWidth onClick={submitCredits}>
                      Activate Redemption
                    </CustButton>
                  )}
                </React.Fragment>
              ) : (
                <Preloader />
              )}
              <Typography className={classes.redeemSubtext}>
                *You have{' '}
                {redeemItem.count || redeemItem.count === 0
                  ? redeemItem.count
                  : ''}{' '}
                {redeemItem.name || ''}, good for up to $
                {(Number(redeemItem.count) / 100).toFixed(2) || ''} in the{' '}
                {invItems[redeemItem.name]
                  ? invItems[redeemItem.name].store
                  : ''}
                . Minimum of 500 credits per redemption.
              </Typography>
            </React.Fragment>
          );
        }

        if (
          redeemItem.category === 'videoGames' &&
          redeemItem.name === 'buyAnyGame'
        ) {
          modalContent = (
            <React.Fragment>
              <div className={classes.flexRow}>
                <div className={classes.anyGameImgWrapper}>
                  <img
                    src={
                      invItems[redeemItem.name]
                        ? invItems[redeemItem.name].icon
                        : gem
                    }
                    alt={redeemItem.title}
                  />
                </div>
                <Typography className={classes.redeemTitle}>
                  <span>Get your</span>
                  <span>free video</span>
                  <span>game</span>
                </Typography>
              </div>
              <form onSubmit={submitAnyGame}>
                <Typography className={classes.label}>
                  What video game would you like to redeem for?
                </Typography>
                <TextField
                  name="name"
                  value={name}
                  label="Video game"
                  onChange={changeField}
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
                <Typography className={classes.label}>
                  Which console is this game on?
                </Typography>
                <TextField
                  name="console"
                  value={console}
                  label="Console"
                  onChange={changeField}
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
                {!showLoader ? (
                  <CustButton
                    disabled={console === '' || name === ''}
                    type="submit"
                    fullWidth
                    subclass={classes.btnWithMarg}
                  >
                    Ok
                  </CustButton>
                ) : (
                  <Preloader />
                )}
                <Typography className={classes.redeemSubtext}>
                  *Our team will purchase the game for you. You’ll hear more
                  details from us within 48 business hours.
                </Typography>
              </form>
            </React.Fragment>
          );
        }

        if (redeemItem.category === 'consoles') {
          modalContent = (
            <React.Fragment>
              <div className={classes.flexRow}>
                <div className={classes.anyGameImgWrapper}>
                  <img
                    src={
                      invItems[redeemItem.name]
                        ? invItems[redeemItem.name].icon
                        : gem
                    }
                    alt={redeemItem.title}
                  />
                </div>
                <Typography className={classes.redeemTitle}>
                  <span>Get your</span>
                  free {redeemItem.name}
                </Typography>
              </div>
              <form onSubmit={submitConsole}>
                <Typography className={classes.label}>
                  What address should we ship your {redeemItem.name} to?
                </Typography>
                <TextField
                  name="address"
                  value={address}
                  label="Address"
                  onChange={changeField}
                  variant="outlined"
                  fullWidth
                  className={classes.textField}
                />
                {!showLoader ? (
                  <CustButton
                    disabled={address === ''}
                    type="submit"
                    fullWidth
                    subclass={classes.btnWithMarg}
                  >
                    Ok
                  </CustButton>
                ) : (
                  <Preloader />
                )}
                <Typography className={classes.redeemSubtext}>
                  *You’ll hear more details from us within 48 business hours
                </Typography>
              </form>
            </React.Fragment>
          );
        }
      }
    }

    return (
      <Modal
        isOpened={isOpened}
        closeModal={closeModal}
        content={modalContent}
        noBtns
      />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RedeemModal.defaultProps = {
  isOpened: undefined,
  redeemItem: undefined,
  invItems: undefined,
  redeemAction: undefined,
  closeModal: undefined,
  showLoader: undefined
};

RedeemModal.propTypes = {
  isOpened: PropTypes.bool,
  redeemItem: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    success: PropTypes.bool,
    title: PropTypes.string,
    category: PropTypes.string
  }),
  invItems: PropTypes.shape({}),
  redeemAction: PropTypes.func,
  closeModal: PropTypes.func,
  showLoader: PropTypes.bool
};

export default RedeemModal;
