import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';
import ChangePhone from '../ChangePhone';
import ChangeAddress from '../ChangeAddress';
import ChangePassword from '../ChangePassword';
import ChangeEmail from '../ChangeEmail';
import Modal from '../../Common/Modal';
import close from '../../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex'
  },
  lContentWrapper: {
    marginLeft: '-36px',
    minWidth: '670px',
    [theme.breakpoints.down('md')]: {
      minWidth: '1px',
      width: '100%'
    }
  },
  rContentWrapper: {
    width: '100%',
    maxWidth: '500px',
    paddingLeft: '50px',
    borderLeft: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      zIndex: '2',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      top: '0',
      left: '0',
      padding: '0 0 0 35px',
      marginLeft: '-35px',
      border: '0',
      background: '#fff'
    }
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    paddingLeft: '36px',
    display: 'flex',
    alignItems: 'center'
  },
  arrowLeft: {
    display: 'inline-block',
    height: '14px',
    marginRight: '10px',
    cursor: 'pointer'
  },
  infoLine: {
    display: 'flex',
    width: '100%',
    padding: '0 50px 0 36px',
    transition: 'all .2s',
    opacity: '0.7',
    color: theme.palette.text.primary,
    '&:hover': {
      opacity: '1'
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: '0'
    }
  },
  infoLineActive: {
    background: theme.palette.background.purpleWithOp
  },
  asLink: {
    cursor: 'pointer',
    textDecoration: 'none',
    '& svg path': {
      fill: theme.palette.text.purple
    }
  },
  asLinkInner: {
    display: 'flex',
    width: '100%',
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
  valueNameWrapper: {
    width: '115px',
    fontSize: '18px'
  },
  icon: {
    height: '15px'
  },
  infoText: {
    width: '100%',
    fontSize: '18px',
    color: theme.palette.text.darkPurple
  },
  accountInfoValue: {
    fontSize: '18px',
    marginLeft: 'auto',
    paddingLeft: '5px'
  }
}));

function PersonalInformation(props) {
  const {
    data,
    showProfile,
    updateUserData,
    showLoader,
    updateEmail,
    isConfirmModal,
    logout,
    getRefCode
  } = props;
  const classes = useStyles();
  const [pageView, setPageView] = useState('');

  const closeUpdateBlock = () => {
    setPageView('');
  };

  const changePageView = name => {
    if (pageView === name) {
      closeUpdateBlock();
    } else {
      setPageView(name);
    }
  };

  const pages = {
    changePhone: (
      <ChangePhone
        mobileNumber={data.mobileNumber || ''}
        updateUserData={updateUserData}
        loading={showLoader}
        closeUpdateBlock={closeUpdateBlock}
      />
    ),
    changeAddress: (
      <ChangeAddress
        address={data.address}
        updateUserData={updateUserData}
        loading={showLoader}
        closeUpdateBlock={closeUpdateBlock}
      />
    ),
    changePassword: (
      <ChangePassword
        updateUserData={updateUserData}
        loading={showLoader}
        closeUpdateBlock={closeUpdateBlock}
      />
    ),
    changeEmail: (
      <ChangeEmail
        updateUserData={updateEmail}
        loading={showLoader}
        closeUpdateBlock={closeUpdateBlock}
      />
    )
  };

  try {
    return (
      <div className={classes.wrapper}>
        <div className={classes.lContentWrapper}>
          <Typography className={classes.title}>
            <Icon
              icon="arrow-left"
              className={classes.arrowLeft}
              role="presentation"
              onClick={showProfile}
            />{' '}
            Edit Personal Information
          </Typography>
          <div className={classes.infoLine}>
            <div className={classes.asLinkInner}>
              <div className={classes.valueNameWrapper}>Name</div>
              <Typography className={classes.infoText}>
                {data.firstName} {data.lastName}
              </Typography>
            </div>
          </div>
          <div
            className={`${classes.infoLine} ${classes.asLink} ${
              pageView === 'changeEmail' ? classes.infoLineActive : ''
            }`}
            role="presentation"
            onClick={() => changePageView('changeEmail')}
          >
            <div className={classes.asLinkInner}>
              <div className={classes.valueNameWrapper}>Email</div>
              <Typography className={classes.infoText}>{data.email}</Typography>
              <Typography className={classes.accountInfoValue}>
                {pageView === 'changeEmail' ? (
                  <img src={close} alt="" className={classes.close} />
                ) : (
                  <Icon icon="chevron-right" className={classes.icon} />
                )}
              </Typography>
            </div>
          </div>
          <div className={classes.infoLine}>
            <div className={classes.asLinkInner}>
              <div className={classes.valueNameWrapper}>Phone</div>
              <Typography className={classes.infoText}>
                {data.mobileNumber}
              </Typography>
            </div>
          </div>
          <div
            className={`${classes.infoLine} ${classes.asLink} ${
              pageView === 'changeAddress' ? classes.infoLineActive : ''
            }`}
            role="presentation"
            onClick={() => changePageView('changeAddress')}
          >
            <div className={classes.asLinkInner}>
              <div className={classes.valueNameWrapper}>Address</div>
              <Typography className={classes.infoText}>
                {data.address.street !== null
                  ? `${data.address.unit} ${data.address.street} ${data.address.city}, ${data.address.state} ${data.address.zip}`
                  : ''}
              </Typography>
              <Typography className={classes.accountInfoValue}>
                {pageView === 'changeAddress' ? (
                  <img src={close} alt="" className={classes.close} />
                ) : (
                  <Icon icon="chevron-right" className={classes.icon} />
                )}
              </Typography>
            </div>
          </div>
          <div
            className={`${classes.infoLine} ${classes.asLink} ${
              pageView === 'changePassword' ? classes.infoLineActive : ''
            }`}
            role="presentation"
            onClick={() => changePageView('changePassword')}
          >
            <div className={`${classes.asLinkInner} ${classes.noBorder}`}>
              <div className={classes.valueNameWrapper}>Password</div>
              <Typography className={classes.infoText}>✵✵✵✵✵✵✵✵✵✵</Typography>
              <Typography className={classes.accountInfoValue}>
                {pageView === 'changePassword' ? (
                  <img src={close} alt="" className={classes.close} />
                ) : (
                  <Icon icon="chevron-right" className={classes.icon} />
                )}
              </Typography>
            </div>
          </div>
          <div
            className={`${classes.infoLine} ${classes.asLink}`}
            role="presentation"
            onClick={getRefCode}
            style={{ display: 'none' }}
          >
            getRefCode
          </div>
        </div>
        {pages[pageView] && (
          <div className={classes.rContentWrapper}>{pages[pageView]}</div>
        )}
        {isConfirmModal && (
          <Modal
            isOpened
            content={
              <div>
                <Typography className={classes.modalTitle}>
                  Email updated
                </Typography>
                <Typography className={classes.modalText}>
                  For your security, please log in again with your new email.
                </Typography>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.positBtn}
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            }
            noBtns
            noCloseBtn
          />
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PersonalInformation.defaultProps = {
  data: undefined,
  updateUserData: undefined,
  showLoader: undefined,
  updateEmail: undefined,
  isConfirmModal: undefined,
  logout: undefined,
  showProfile: undefined,
  getRefCode: undefined
};

PersonalInformation.propTypes = {
  data: PropTypes.shape({
    mobileNumber: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      unit: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zip: PropTypes.string
    })
  }),
  updateUserData: PropTypes.func,
  showLoader: PropTypes.bool,
  updateEmail: PropTypes.func,
  isConfirmModal: PropTypes.bool,
  logout: PropTypes.func,
  showProfile: PropTypes.func,
  getRefCode: PropTypes.func
};

export default PersonalInformation;
