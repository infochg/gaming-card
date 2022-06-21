import React, { useState, useContext, useEffect } from 'react';
import cookie from 'react-cookies';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ReactPixel from 'react-facebook-pixel';
import ErrorBoundary from '../../containers/ErrorBoundary';
import Step0 from '../../components/Registration/Step0';
import Step1 from '../../components/Registration/Step1';
import Step2 from '../../components/Registration/Step2';
import Step3 from '../../components/Registration/Step3';
import Step4 from '../../components/Registration/Step4';
import Step5 from '../../components/Registration/Step5';
import Step6 from '../../components/Registration/Step6';
import Step7 from '../../components/Registration/Step7';
import Step8 from '../../components/Registration/Step8';
import Processing from '../../components/Registration/Processing';
import Approved from '../../components/Registration/Approved';
import UploadID from '../../components/Registration/UploadID';
import Deposit from '../../components/Registration/Deposit';
import MoreTime from '../../components/Registration/MoreTime';
import Oops from '../../components/Registration/Oops';
import Agreement1 from '../../components/Registration/Agreement1';
import Agreement2 from '../../components/Registration/Agreement2';
import PromoCodeContainer from '../../containers/PromoCodeContainer';
import DirectDeposit from '../../components/Registration/DirectDeposit';
import Preloader from '../../components/Common/Preloader';
import Icon from '../../components/Common/Icon';
import Stepper from '../../components/Common/Stepper';
import PaymentContainer from '../../containers/PaymentContainer';
import AddAccountContainer from '../../containers/AddAccountContainer';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import history from '../../history';
import { segRegComplStep, segRegEnd } from '../../utils/segment';
import { phRegComplStep, phRegEnd } from '../../utils/posthog';

import mythiaTopBg from '../../assets/img/mythia-topbg.svg';
import cornerGraySystem from '../../assets/img/top-corner-gray-system.svg';

const FingerprintJS = require('@fingerprintjs/fingerprintjs-pro');

const fpPromise = FingerprintJS.load({ token: 'KbTePB61wLlUQ3b6lXCA' });

const useStyles = makeStyles(theme => ({
  stepWrapper: {
    position: 'relative',
    zIndex: '2'
  },
  h1: {
    fontSize: '46px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: '15px',
    color: theme.palette.text.darkPurple,
    [theme.breakpoints.down('xs')]: {
      fontSize: '28px'
    }
  },
  h2: {
    fontSize: '22px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: theme.palette.text.darkPurple,
    marginBottom: '5px',
    textAlign: 'left',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px'
    }
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    '& a': {
      color: theme.palette.text.purple,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.darkPurple
      }
    }
  },
  subtext: {
    fontSize: '16px',
    opacity: '0.7',
    margin: '10px auto',
    textAlign: 'left',
    maxWidth: '530px',
    '& span': {
      whiteSpace: 'nowrap'
    }
  },
  form: {
    position: 'relative',
    textAlign: 'center',
    maxWidth: '415px',
    margin: '0 auto'
  },
  withPadding: {
    paddingBottom: '170px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '20px'
    }
  },
  center: {
    textAlign: 'center'
  },
  left: {
    textAlign: 'left',
    marginLeft: '0'
  },
  signBtn: {
    margin: '30px auto'
  },
  btnWithMarg: {
    margin: '20px auto 0 auto'
  },
  disabledBtn: {
    background: '#f0f3f8',
    color: theme.palette.text.lightGray,
    border: `2px solid ${theme.palette.border.default}`,
    '&::before': {
      background: `url(${cornerGraySystem}) no-repeat center`,
      backgroundSize: '100% 100%',
      top: '-2px',
      left: '-2px'
    },
    '&::after': {
      background: `url(${cornerGraySystem}) no-repeat center`,
      backgroundSize: '100% 100%',
      bottom: '-2px',
      right: '-2px'
    }
  },
  loader: {
    margin: '30px auto'
  },
  botText: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      position: 'relative'
    }
  },
  botTextInner: {
    maxWidth: '1136px',
    margin: '0 auto 50px auto',
    fontSize: '14px',
    color: theme.palette.text.lightPurple
  },
  text: {
    fontSize: '18px'
  },
  link: {
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    display: 'block',
    '&:hover': {
      color: '#ffaf35'
    }
  },
  sliderWrapper: {
    paddingBottom: '20px',
    '& ul.slick-dots': {
      bottom: '-35px',
      '& li': {
        '& button': {
          width: '8px',
          height: '8px',
          borderRadius: '0',
          background: theme.palette.border.default,
          '&:before': {
            display: 'none'
          }
        },
        '&.slick-active': {
          '& button': {
            background: theme.palette.background.purple
          }
        }
      }
    }
  },
  slideWrapper: {
    minHeight: '460px',
    maxWidth: '550px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: '0 auto'
  },
  noMargin: {
    margin: '0 auto'
  },
  imgWrapper: {
    textAlign: 'center',
    margin: '30px 0',
    '& img': {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  gameRewards: {
    width: '100%',
    maxWidth: '318px'
  },
  deposit: {
    width: '100%',
    maxWidth: '400px'
  },
  directDeposit: {
    width: '100%',
    maxWidth: '300px'
  },
  congrats: {
    width: '100%',
    maxWidth: '305px'
  },
  oops: {
    width: '100%',
    maxWidth: '250px'
  },
  needTime: {
    width: '100%',
    maxWidth: '446px'
  },
  sandclock: {
    width: '100%',
    maxWidth: '336px'
  },
  completeChallenges: {
    width: '100%',
    maxWidth: '203px'
  },
  swipePrize: {
    width: '100%',
    maxWidth: '346px'
  },
  secure: {
    width: '100%',
    maxWidth: '364px'
  },
  noFees: {
    width: '100%',
    maxWidth: '337px'
  },
  welcomeBlock: {
    maxWidth: '420px',
    margin: '0 auto'
  },
  welcomeLine: {
    display: 'flex',
    margin: '40px 0',
    textAlign: 'left'
  },
  welcomeLineImg: {
    width: '70px',
    marginRight: '20px',
    textAlign: 'center',
    '& img': {
      maxWidth: '50px',
      maxHeight: '50px'
    }
  },
  collectBlock: {
    maxWidth: '900px',
    textAlign: 'center',
    margin: '0 auto'
  },
  collectBlockText: {
    margin: '60px 0'
  },
  birthDateBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& div': {
      margin: '0 5px'
    }
  },
  label: {
    fontSize: '18px',
    color: theme.palette.text.primary,
    padding: '0 15px',
    opacity: '0.7',
    textAlign: 'left'
  },
  agrHeader: {
    marginTop: '30px'
  },
  reviewLine: {
    display: 'flex',
    padding: '10px',
    margin: '0 auto',
    fontSize: '18px',
    maxWidth: '400px',
    textAlign: 'left'
  },
  reviewTitle: {
    width: '120px',
    minWidth: '120px'
  },
  agreement: {
    fontSize: '18px',
    color: theme.palette.text.purple,
    cursor: 'pointer',
    opacity: '1',
    maxWidth: '500px',
    margin: '10px auto',
    textAlign: 'center',
    transition: 'all .2s',
    '&:hover': {
      opacity: '0.7'
    }
  },
  pdfHolder: {
    background: '#fff',
    height: '400px',
    width: '100%',
    border: 'none'
  },
  whyText: {
    marginTop: '10px'
  },
  skipBtn: {
    fontSize: '16px',
    opacity: '0.7',
    cursor: 'pointer',
    margin: '30px auto',
    transition: 'all .2s',
    '&:hover': {
      opacity: '0.8'
    }
  },
  naviWrapper: {
    width: '100%',
    minHeight: '188px',
    textAlign: 'center',
    position: 'absolute',
    top: '35px',
    left: '0',
    background: `url(${mythiaTopBg}) repeat-x left bottom`,
    backgroundSize: 'auto 122px'
  },
  stepper: {
    width: '100%',
    minHeight: '122px',
    position: 'relative',
    zIndex: '1',
    [theme.breakpoints.down('sm')]: {
      marginTop: '80px'
    }
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '15px auto',
    cursor: 'pointer',
    transition: 'all .2s',
    position: 'relative',
    zIndex: '2',
    '& p': {
      fontSize: '24px',
      fontWeight: '600'
    },
    '&:hover': {
      opacity: '0.7'
    },
    [theme.breakpoints.down('sm')]: {
      float: 'right',
      marginRight: '20px'
    }
  },
  backIcon: {
    height: '12px',
    marginRight: '10px',
    color: theme.palette.background.purple
  },
  purpleText: {
    color: theme.palette.text.purple
  },
  codeLinksWrapper: {
    width: '100%',
    display: 'flex',
    margin: '30px 0',
    padding: '0 5px'
  },
  asLink: {
    fontSize: '16px',
    color: theme.palette.text.purple,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  rightLink: {
    marginLeft: 'auto'
  },
  redtext: {
    color: theme.palette.text.darkRed
  },
  birthSelect: {
    border: `1px solid ${theme.palette.border.default} !important`
  },
  addressWrapper: {
    margin: '0 auto',
    maxWidth: '450px'
  },
  progressBar: {
    margin: '0 auto',
    maxWidth: '450px'
  },
  progressBarRoot: {
    height: '10px',
    borderRadius: '5px'
  },
  progressBarColorPrimary: {
    background: theme.palette.background.purple
  },
  hiddenInput: {
    display: 'none'
  },
  switchWrapper: {
    display: 'flex',
    padding: '0 10px',
    alignItems: 'center',
    maxWidth: '400px',
    margin: '20px auto'
  },
  switchLabel: {
    fontSize: '16px',
    color: theme.palette.text.primary
  },
  vouchedWrapper: {
    '& div.vouched': {
      background: '#f0f3f8 !important',
      display: 'block'
    }
  },
  intercomLinkWrapper: {
    display: 'block',
    fontSize: '16px',
    textAlign: 'center',
    paddingTop: '15px'
  },
  intercomLink: {
    display: 'inline-block',
    color: theme.palette.text.purple,
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

function Registration() {
  const classes = useStyles();
  const [isMoving, setIsMoving] = useState(false);
  const [curStep, setCurStep] = useState(0);
  const [phoneValid, setPhoneValid] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [codeValid, setCodeValid] = useState('');
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [vouchedLink, setVouchedLink] = useState(null);
  const [regError, setRegError] = useState(false);

  const {
    anonId,
    userTokenDispatch,
    errorDispatch,
    userData,
    userDataDispatch,
    isAddAccountOpen,
    isAddAccountOpenDispatch,
    isPaymentOpen,
    isPaymentOpenDispatch,
    isDDOpenDispatch
  } = useContext(appContext);

  // Fingerprinting
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userId === null) {
      fpPromise
        .then(fp => fp.get())
        .then(result => setUserId(result.visitorId));
    }
  });

  const goToStep = step => {
    setCurStep(step);
    setIsMoving(true);
  };

  const goBack = () => {
    setCurStep(curStep - 1);
  };

  // Get userData
  const onSuccessUserData = payload => {
    userDataDispatch({ type: 'SET_USER_DATA', payload });
  };

  const onErrorUserData = payload => {
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const getUserData = () => {
    fetchData('/userData/main', 'GET', onSuccessUserData, onErrorUserData);
  };

  // Create New Debit Card
  const onSuccessCreatingDC = () => {
    return null;
  };

  const onErrorCreatingDC = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
    goToStep(8);
  };

  const createNewDebitCard = () => {
    // eslint-disable-next-line
    segRegEnd(userData, userData ? userData._id : null, anonId);

    // PostHog
    phRegEnd(userData);

    // FB Pixel
    ReactPixel.track('SubmitApplication');

    // Snapchat Pixel
    // eslint-disable-next-line
    snaptr('track', 'SUBSCRIBE');

    // TikTok Pixel
    // eslint-disable-next-line
    ttq.track('Registration');

    setShowLoader(true);

    fetchData(
      '/money/createNewDebitCard',
      'POST',
      onSuccessCreatingDC,
      onErrorCreatingDC,
      userData.accountDetails || {}
    );
    return null;
  };

  // Iovation Blackbox
  const onSuccessSendIovation = () => {
    createNewDebitCard();
  };

  const onErrorSendIovation = () => {
    createNewDebitCard();
    // setShowLoader(false);
    // errorDispatch({ type: 'SET_ERROR', payload });
  };

  const sendIovation = () => {
    setShowLoader(true);

    if (typeof window.IGLOO.getBlackbox !== 'function') {
      errorDispatch({
        type: 'SET_ERROR',
        payload: 'Something is wrong, please, try again.'
      });
      return null;
    }

    // eslint-disable-next-line
    const bbData = window.IGLOO.getBlackbox();
    if (bbData.finished) {
      fetchData(
        '/user/addIBBToken',
        'POST',
        onSuccessSendIovation,
        onErrorSendIovation,
        { ibb: bbData.blackbox }
      );
    }
    return null;
  };

  useEffect(() => {
    if (cookie.load('2fa')) {
      cookie.remove('2fa');

      if (cookie.load('token')) {
        cookie.remove('token');
      }
    }
  }, [history.location.pathname]);

  // redirect user to correct page when he updated page
  useEffect(() => {
    if (cookie.load('token')) {
      if (userData && Object.keys(userData).length === 0) {
        setShowPageLoader(true);
      } else {
        setShowPageLoader(false);
        if (userData && userData.accountDetails && !isMoving) {
          if (userData.accountDetails.accountStatus === 'approved') {
            goToStep('approved');
          } else if (
            userData.accountDetails.accountStatus === 'manual_review'
          ) {
            goToStep('uploadID');
          } else if (
            userData.accountDetails.accountStatus === 'verificationPassed' ||
            userData.accountDetails.accountStatus === 'pending' ||
            userData.accountDetails.accountStatus === 'submitted'
          ) {
            goToStep('moreTime');
          } else if (
            userData.accountDetails.accountStatus === 'rejected' ||
            userData.accountDetails.accountStatus === 'verificationFailed'
          ) {
            goToStep('oops');
          } else if (
            userData.accountDetails.identity.id !== null &&
            userData.accountDetails.identity.id !== false &&
            userData.accountDetails.identity.id !== 'applicationNotSent' &&
            userData.accountDetails.identity.id !== 'deleted'
          ) {
            goToStep(8);
          } else if (
            userData.accountDetails.address.city !== null &&
            userData.accountDetails.address.state !== null &&
            userData.accountDetails.address.street !== null &&
            userData.accountDetails.address.zip !== null
          ) {
            goToStep(7);
          } else if (userData.accountDetails.identity.date_of_birth !== null) {
            goToStep(6);
          } else if (
            userData.accountDetails.mobileNumber !== null &&
            userData.accountDetails['2fa'].phoneIsVerified
          ) {
            goToStep(5);
          } else if (
            userData.accountDetails.firstName !== null &&
            userData.accountDetails.lastName !== null
          ) {
            goToStep(4);
          } else if (
            userData.accountDetails.firstName === null ||
            userData.accountDetails.lastName === null
          ) {
            goToStep(3);
          }
        }
      }
    }
  }, [userData]);

  try {
    const nextStep = e => {
      if (e) {
        e.preventDefault();
      }
      setCurStep(curStep + 1);
      setIsMoving(true);
    };

    // Submit current step data
    const updateUserData = payload => {
      userDataDispatch({ type: 'SET_USER_DATA', payload: payload.userData });
    };

    const submitForm = data => {
      // Segment
      if (data.firstName) {
        // Segment
        segRegComplStep(
          { step: 'enterName' },
          // eslint-disable-next-line
          userData ? userData._id : null,
          anonId
        );
        // PostHog
        phRegComplStep({ step: 'enterName' });
      } else if (
        data.identity &&
        data.identity.date_of_birth &&
        !data.identity.id
      ) {
        // Segment
        segRegComplStep(
          { step: 'enterBirthday' },
          // eslint-disable-next-line
          userData ? userData._id : null,
          anonId
        );
        // PostHog
        phRegComplStep({ step: 'enterBirthday' });
      } else if (data.address) {
        // Segment
        segRegComplStep(
          { step: 'enterAddress' },
          // eslint-disable-next-line
          userData ? userData._id : null,
          anonId
        );
        // PostHog
        phRegComplStep({ step: 'enterAddress' });
      } else if (
        data.identity &&
        data.identity.date_of_birth &&
        data.identity.id
      ) {
        // Segment
        segRegComplStep(
          { step: 'enterSocial' },
          // eslint-disable-next-line
          userData ? userData._id : null,
          anonId
        );
        // PostHog
        phRegComplStep({ step: 'enterSocial' });
      }

      fetchData('/user/update', 'POST', updateUserData, undefined, data);
      nextStep();
    };

    // Registration
    const onSuccessReg = payload => {
      setRegError(false);
      setShowLoader(false);
      userTokenDispatch({ type: 'SET_USER_TOKEN', payload });
      goToStep(3);

      // FB Pixel
      ReactPixel.track('Lead');

      // Snapchat Pixel
      // eslint-disable-next-line
      snaptr('track', 'SIGN_UP');

      // TikTok Pixel
      // eslint-disable-next-line
      ttq.track('StartCheckout');
    };

    const onErrorReg = payload => {
      setRegError(true);
      setShowLoader(false);
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const registerUser = data => {
      setShowLoader(true);

      fetchData('/user/register', 'POST', onSuccessReg, onErrorReg, {
        ...data,
        fp: userId
      });
    };

    // Resetting registration form in case if user had error (becasue of async request to ReCaptcha)
    const resetRegForm = () => {
      document.location.reload();
    };

    // Update Phone Number and Send Code Request
    const onSuccessCodeRequest = () => {
      setShowLoader(false);
      setIsCodeSent(true);
    };

    const onErrorCodeRequest = payload => {
      setShowLoader(false);
      setPhoneValid(payload || 'Something is wrong, please, try again.');
    };

    const requestCode = payload => {
      userDataDispatch({ type: 'SET_USER_DATA', payload: payload.userData });
      setShowLoader(true);
      fetchData(
        '/user/2fa/requestcode',
        'POST',
        onSuccessCodeRequest,
        onErrorCodeRequest
      );
    };

    const submitNumber = data => {
      // Segment
      segRegComplStep(
        { step: 'enterMobile' },
        // eslint-disable-next-line
        userData ? userData._id : null,
        anonId
      );
      // PostHog
      phRegComplStep({ step: 'enterMobile' });

      setShowLoader(true);
      fetchData('/user/update', 'POST', requestCode, onErrorCodeRequest, data);
      return null;
    };

    // Confirm code
    const onSuccessCode = () => {
      // Segment
      segRegComplStep(
        { step: 'verifyPhone' },
        // eslint-disable-next-line
        userData ? userData._id : null,
        anonId
      );
      // PostHog
      phRegComplStep({ step: 'verifyPhone' });

      setShowLoader(false);
      setIsCodeSent(false);
      setCodeValid('');
      nextStep();
    };

    const onErrorCode = payload => {
      setShowLoader(false);
      setCodeValid(payload || 'Something is wrong, please, try again.');
    };

    const submitCode = data => {
      setShowLoader(true);
      fetchData(
        '/user/2fa/verifycode',
        'POST',
        onSuccessCode,
        onErrorCode,
        data
      );
      return data;
    };

    // Submit addresses
    const submitAddress = data => {
      submitForm({ ...data });
      nextStep();
    };

    // Accept review
    const acceptReview = () => {
      goToStep('processing');

      if (
        userData &&
        userData.accountDetails &&
        userData.accountDetails.accountStatus === 'applicationNotSent'
      ) {
        // createNewDebitCard();
        sendIovation();
      }
    };

    // Get Vouched Invite link
    const onSuccessGetLink = payload => {
      setShowLoader(false);

      if (payload && payload.data && payload.data.url) {
        setVouchedLink(payload.data.url);
      }

      return null;
    };

    const onErrorGetLink = payload => {
      setShowLoader(false);
      errorDispatch({ type: 'SET_ERROR', payload });
    };

    const getVouchedInviteLink = () => {
      setShowLoader(true);
      fetchData(
        '/user/getVouchedInviteLink',
        'GET',
        onSuccessGetLink,
        onErrorGetLink
      );
    };

    // Go to Deposit screen
    const goToPayment = () => {
      goToStep('deposit');
    };

    // Payment Modal
    const handleOpenPayment = () => {
      if (userData && userData.accountDetails) {
        if (
          userData.accountDetails.linkedAccounts &&
          userData.accountDetails.linkedAccounts.length === 0
        ) {
          isAddAccountOpenDispatch({
            type: 'SET_IS_ADD_ACCOUNT_OPEN',
            payload: {
              isOpen: {},
              isRegistration: true,
              onSuccess: () => {
                isAddAccountOpenDispatch({
                  type: 'SET_IS_ADD_ACCOUNT_OPEN',
                  payload: { isOpen: false }
                });

                isPaymentOpenDispatch({
                  type: 'SET_IS_PAYMENT_OPEN',
                  payload: {
                    isOpen: {},
                    type: 'deposit',
                    onSuccess: () => {
                      goToStep('directDeposit');
                    },
                    onFail: () => {
                      goToStep('deposit');
                    }
                  }
                });
              },
              onFail: () => {
                goToStep('deposit');
              }
            }
          });
        } else {
          isPaymentOpenDispatch({
            type: 'SET_IS_PAYMENT_OPEN',
            payload: {
              isOpen: {},
              type: 'deposit',
              onSuccess: () => {
                goToStep('directDeposit');
              },
              onFail: () => {
                goToStep('deposit');
              }
            }
          });
        }
      }
    };

    const openPinwheel = () => {
      isDDOpenDispatch({
        type: 'SET_IS_DD_OPEN',
        payload: {
          isOpen: true
        }
      });
    };

    // Finish Process
    const finishProcess = () => {
      cookie.remove('date_of_birth');
      history.push('/overview');
    };

    const steps = {
      0: <Step0 classes={classes} nextStep={nextStep} />,
      1: <Step1 classes={classes} nextStep={nextStep} />,
      2: (
        <Step2
          classes={classes}
          registerUser={registerUser}
          showLoader={showLoader}
          regError={regError}
          resetRegForm={resetRegForm}
        />
      ),
      3: (
        <Step3
          classes={classes}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
          submit={submitForm}
        />
      ),
      4: (
        <Step4
          classes={classes}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
          showLoader={showLoader}
          submitNumber={submitNumber}
          isCodeSent={isCodeSent}
          setIsCodeSent={setIsCodeSent}
          phoneValid={phoneValid}
          setPhoneValid={setPhoneValid}
          submitCode={submitCode}
          codeValid={codeValid}
          setCodeValid={setCodeValid}
          resendCode={requestCode}
        />
      ),
      5: (
        <Step5
          classes={classes}
          submit={submitForm}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
        />
      ),
      6: (
        <Step6
          classes={classes}
          submitAddress={submitAddress}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
        />
      ),
      7: (
        <Step7
          classes={classes}
          submit={submitForm}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
        />
      ),
      8: (
        <Step8
          classes={classes}
          userData={
            userData && userData.accountDetails ? userData.accountDetails : {}
          }
          submit={acceptReview}
          goToStep={goToStep}
        />
      ),
      processing: <Processing classes={classes} />,
      approved: (
        <Approved
          classes={classes}
          goToPayment={goToPayment}
          showLoader={showLoader}
        />
      ),
      uploadID: (
        <UploadID
          classes={classes}
          userData={userData || {}}
          getVouchedInviteLink={getVouchedInviteLink}
          showLoader={showLoader}
          vouchedLink={vouchedLink}
          getUserData={getUserData}
          goToStep={goToStep}
          anonId={anonId}
        />
      ),
      deposit: (
        <Deposit
          classes={classes}
          handleOpenPayment={handleOpenPayment}
          goToStep={goToStep}
        />
      ),
      directDeposit: (
        <DirectDeposit
          classes={classes}
          openPinwheel={openPinwheel}
          finishProcess={finishProcess}
          directDepositAmount={
            userData.accountDetails &&
            userData.accountDetails.directDepositAmount
              ? userData.accountDetails.directDepositAmount
              : 0
          }
          history={history}
        />
      ),
      moreTime: <MoreTime classes={classes} />,
      oops: <Oops classes={classes} userData={userData} anonId={anonId} />,
      promoCode: <PromoCodeContainer close={goToPayment} isRegistration />,
      agreement1: <Agreement1 classes={classes} goBack={() => goToStep(8)} />,
      agreement2: <Agreement2 classes={classes} goBack={() => goToStep(8)} />
    };

    return (
      <React.Fragment>
        {curStep && curStep > 1 && (
          <div className={classes.naviWrapper}>
            {curStep < 9 && (
              <React.Fragment>
                {curStep > 3 && (
                  <div
                    className={classes.backBtn}
                    role="presentation"
                    onClick={goBack}
                  >
                    <Icon icon="arrow-left" className={classes.backIcon} />
                    <Typography>Back</Typography>
                  </div>
                )}
                <div className={classes.stepper}>
                  <Stepper step={Number(curStep) - 2} />
                </div>
              </React.Fragment>
            )}
          </div>
        )}
        {curStep === 'promoCode' && (
          <div className={classes.naviWrapper}>
            <div
              className={classes.backBtn}
              role="presentation"
              onClick={() => {
                goToStep(8);
              }}
            >
              <Icon icon="arrow-left" className={classes.backIcon} />
              <Typography>Back</Typography>
            </div>
          </div>
        )}
        {!showPageLoader &&
          !isPaymentOpen.isOpen &&
          !isAddAccountOpen.isOpen && (
            <div className={classes.stepWrapper}>{steps[curStep]}</div>
          )}
        {isPaymentOpen.isOpen && <PaymentContainer />}
        {isAddAccountOpen.isOpen && <AddAccountContainer />}
        {showPageLoader && <Preloader />}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default Registration;
