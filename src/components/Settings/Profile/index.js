import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgress, Switch, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  lContentWrapper: {
    minWidth: '584px',
    [theme.breakpoints.down('md')]: {
      minWidth: '1px',
      paddingRight: '30px'
    }
  },
  rContentWrapper: {
    width: '100%',
    marginLeft: '50px',
    borderLeft: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      marginTop: '30px',
      paddingTop: '30px',
      width: 'calc(100% - 30px)',
      borderLeft: 'none',
      borderTop: `1px solid ${theme.palette.border.default}`
    }
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center'
  },
  rSideTitle: {
    paddingLeft: '50px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '0'
    }
  },
  pencil: {
    height: '20px',
    marginLeft: 'auto',
    paddingLeft: '10px',
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  marginTop: {
    marginTop: '25px',
    [theme.breakpoints.down('md')]: {
      borderTop: `1px solid ${theme.palette.border.default}`,
      marginTop: '30px',
      paddingTop: '30px'
    }
  },
  infoLine: {
    display: 'flex',
    padding: '10px 0',
    alignItems: 'center'
  },
  asLink: {
    padding: '0 50px',
    cursor: 'pointer',
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all .2s',
    opacity: '0.7',
    '&:hover': {
      opacity: '1'
    },
    '& svg path': {
      fill: theme.palette.text.purple
    },
    [theme.breakpoints.down('md')]: {
      padding: '0'
    }
  },
  asLinkInner: {
    display: 'flex',
    width: '100%',
    padding: '10px 0',
    borderBottom: `1px solid ${theme.palette.border.default}`
  },
  iconWrapper: {
    width: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5px'
  },
  icon: {
    height: '15px'
  },
  valueNameWrapper: {
    width: '115px',
    fontSize: '18px'
  },
  infoText: {
    width: '100%',
    fontSize: '18px',
    color: theme.palette.text.darkPurple
  },
  accountInfoKey: {
    fontSize: '18px'
  },
  accountInfoKeyNum: {
    fontSize: '18px',
    width: '150px'
  },
  accountInfoValue: {
    fontSize: '18px',
    marginLeft: 'auto',
    paddingLeft: '5px'
  },
  accountInfoValueNum: {
    fontSize: '18px',
    color: theme.palette.text.darkPurple
  },
  copied: {
    fontSize: '18px',
    color: '#59B348'
  },
  switchWrapper: {
    display: 'flex',
    padding: '15px 0 5px 0',
    alignItems: 'center'
  },
  switchLabel: {
    fontSize: '16px',
    opacity: '0.7',
    marginLeft: '10px'
  },
  progress: {
    marginLeft: '15px'
  },
  eyeIco: {
    width: '16px',
    marginLeft: '10px',
    cursor: 'pointer'
  },
  stars: {
    fontSize: '10px'
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
        backgroundColor: theme.palette.background.green,
        borderColor: theme.palette.background.green
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

function Profile(props) {
  const {
    userData,
    enable2FA,
    disable2FA,
    updateUserData,
    showPersInfo,
    showLoader
  } = props;
  const classes = useStyles();

  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isShareAllow, setIsShareAllow] = useState(false);
  const [trigger, setTrigger] = useState(null);
  const [data, setData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isAccountNumVisible, setIsAccountNumVisible] = useState(false);
  const [isRouteNumVisible, setIsRouteNumVisible] = useState(false);

  const handleChangeShare = () => {
    setTrigger('share');
    updateUserData({
      isAnonymous: !isShareAllow
    });
  };

  useEffect(() => {
    if (userData.accountDetails) {
      setIs2FAEnabled(userData.accountDetails['2fa'].enabled);
      setData(userData.accountDetails);

      if (
        userData.accountDetails.winningsBoard &&
        userData.accountDetails.winningsBoard.isAnonymous
      ) {
        setIsShareAllow(true);
      } else {
        setIsShareAllow(false);
      }
    }
  }, [userData]);

  try {
    const handleChange2FAEnabled = () => {
      setTrigger('2fa');
      if (is2FAEnabled) {
        // setIs2FAEnabled(false);
        disable2FA();
      } else {
        // setIs2FAEnabled(true);
        enable2FA();
      }
    };

    const routingNumber = userData.accountDetails
      ? userData.accountDetails.routingNumber
      : '';
    const accountNumber = userData.accountDetails
      ? userData.accountDetails.accountNumber
      : '';

    const setRoutingCopied = () => {
      setIsCopied('routing');
      setTimeout(() => setIsCopied(false), 1000);
    };

    const setAccountCopied = () => {
      setIsCopied('account');
      setTimeout(() => setIsCopied(false), 1000);
    };

    const toggleAccountNum = () => {
      setIsAccountNumVisible(!isAccountNumVisible);
    };

    const toggleRouteNum = () => {
      setIsRouteNumVisible(!isRouteNumVisible);
    };

    return (
      <div className={classes.wrapper}>
        <div className={classes.lContentWrapper}>
          <Typography className={classes.title}>
            Personal Information
            <Icon
              icon="pencil"
              className={classes.pencil}
              onClick={showPersInfo}
              data-testid="pencil-icon"
            />
          </Typography>
          <div className={classes.infoLine}>
            <div className={classes.valueNameWrapper}>Name</div>
            <Typography className={classes.infoText}>
              {data.firstName || ''} {data.lastName || ''}
            </Typography>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.valueNameWrapper}>Email</div>
            <Typography className={classes.infoText}>
              {data.email || ''}
            </Typography>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.valueNameWrapper}>Phone</div>
            <Typography className={classes.infoText}>
              {data.mobileNumber || ''}
            </Typography>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.valueNameWrapper}>Address</div>
            <Typography className={classes.infoText}>
              {data.address && data.address.street !== null
                ? `${data.address.unit} ${data.address.street} ${data.address.city}, ${data.address.state} ${data.address.zip}`
                : ''}
            </Typography>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.valueNameWrapper}>Password</div>
            <Typography className={classes.infoText}>✵✵✵✵✵✵✵✵✵✵</Typography>
          </div>

          <div className={classes.switchWrapper}>
            <AntSwitch
              checked={is2FAEnabled}
              onClick={handleChange2FAEnabled}
              name="is2FAEnabled"
              data-testid="switch2fa"
            />
            {showLoader && trigger === '2fa' ? (
              <CircularProgress size={20} className={classes.progress} />
            ) : (
              <Typography className={classes.switchLabel}>
                Turn on 2FA Authentication
              </Typography>
            )}
          </div>

          <div className={classes.switchWrapper}>
            <AntSwitch
              checked={!isShareAllow}
              onChange={handleChangeShare}
              name="isShareAllowed"
              data-testid="share-switch"
            />
            {showLoader && trigger === 'share' ? (
              <CircularProgress size={20} className={classes.progress} />
            ) : (
              <Typography className={classes.switchLabel}>
                Share first name and last initial on public leaderboards?
              </Typography>
            )}
          </div>

          <Typography className={`${classes.title} ${classes.marginTop}`}>
            Account Information
          </Typography>
          <div className={classes.infoLine}>
            <Typography className={classes.accountInfoKeyNum}>
              Routing Number:
            </Typography>
            {routingNumber ? (
              <React.Fragment>
                {isCopied && isCopied === 'routing' ? (
                  <Typography className={classes.copied}>Copied</Typography>
                ) : (
                  <React.Fragment>
                    <CopyToClipboard
                      text={routingNumber}
                      onCopy={setRoutingCopied}
                      data-testid="routing-number"
                    >
                      <Typography className={classes.accountInfoValueNum}>
                        {isRouteNumVisible ? (
                          routingNumber
                        ) : (
                          <span className={classes.stars}>✵✵✵✵✵✵✵✵✵✵</span>
                        )}
                      </Typography>
                    </CopyToClipboard>
                    <Icon
                      icon="eye"
                      role="presentation"
                      onClick={toggleRouteNum}
                      className={classes.eyeIco}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
          <div className={classes.infoLine}>
            <Typography className={classes.accountInfoKeyNum}>
              Account Number:
            </Typography>
            {accountNumber ? (
              <React.Fragment>
                {isCopied && isCopied === 'account' ? (
                  <Typography className={classes.copied}>Copied</Typography>
                ) : (
                  <React.Fragment>
                    <CopyToClipboard
                      text={accountNumber}
                      onCopy={setAccountCopied}
                      data-testid="account-number"
                    >
                      <Typography className={classes.accountInfoValueNum}>
                        {isAccountNumVisible ? (
                          accountNumber
                        ) : (
                          <span className={classes.stars}>✵✵✵✵✵✵✵✵✵✵</span>
                        )}
                      </Typography>
                    </CopyToClipboard>
                    <Icon
                      icon="eye"
                      role="presentation"
                      onClick={toggleAccountNum}
                      className={classes.eyeIco}
                    />
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={classes.rContentWrapper}>
          <Typography className={`${classes.title} ${classes.rSideTitle}`}>
            Documents
          </Typography>
          <a
            className={`${classes.infoLine} ${classes.asLink}`}
            href="https://mythia.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={classes.asLinkInner}>
              <Typography className={classes.accountInfoKey}>
                Terms of Service
              </Typography>
              <Typography className={classes.accountInfoValue}>
                <Icon icon="chevron-right" className={classes.icon} />
              </Typography>
            </div>
          </a>
          <a
            className={`${classes.infoLine} ${classes.asLink}`}
            href="https://mythia.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={classes.asLinkInner}>
              <Typography className={classes.accountInfoKey}>
                Privacy Policy
              </Typography>
              <Typography className={classes.accountInfoValue}>
                <Icon icon="chevron-right" className={classes.icon} />
              </Typography>
            </div>
          </a>
          <a
            className={`${classes.infoLine} ${classes.asLink}`}
            href="https://mythia.com/contest-rules"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={classes.asLinkInner}>
              <Typography className={classes.accountInfoKey}>
                Contest Rules
              </Typography>
              <Typography className={classes.accountInfoValue}>
                <Icon icon="chevron-right" className={classes.icon} />
              </Typography>
            </div>
          </a>
          <a
            className={`${classes.infoLine} ${classes.asLink}`}
            href="https://www.mythia.com/winners"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={classes.asLinkInner}>
              <Typography className={classes.accountInfoKey}>
                Winners
              </Typography>
              <Typography className={classes.accountInfoValue}>
                <Icon icon="chevron-right" className={classes.icon} />
              </Typography>
            </div>
          </a>
        </div>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Profile.defaultProps = {
  userData: undefined,
  enable2FA: undefined,
  disable2FA: undefined,
  updateUserData: undefined,
  showPersInfo: undefined,
  showLoader: undefined
};

Profile.propTypes = {
  userData: PropTypes.shape({
    accountDetails: PropTypes.shape({
      '2fa': PropTypes.shape({
        enabled: PropTypes.bool
      }),
      winningsBoard: PropTypes.shape({
        isAnonymous: PropTypes.bool
      }),
      routingNumber: PropTypes.string,
      accountNumber: PropTypes.string
    })
  }),
  enable2FA: PropTypes.func,
  disable2FA: PropTypes.func,
  updateUserData: PropTypes.func,
  showPersInfo: PropTypes.func,
  showLoader: PropTypes.bool
};

export default Profile;
