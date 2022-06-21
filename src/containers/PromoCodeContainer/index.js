import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import ErrorBoundary from '../ErrorBoundary';
import CustButton from '../../components/Common/Button';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import congrats from '../../assets/img/complete-challenges.png';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import { segAddPromo } from '../../utils/segment';
import { phAddPromo } from '../../utils/posthog';

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
  }
}));

function PromoCodeContainer(props) {
  const classes = useStyles();

  const { close, isRegistration } = props;
  const [referredByCode, setReferredByCode] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [isPromoActivated, setIsPromoActivated] = useState(false);

  const { userData, anonId, errorDispatch, userDataDispatch } = useContext(
    appContext
  );

  const onSuccessPromo = payload => {
    setShowLoader(false);
    setIsPromoActivated(true);
    userDataDispatch({ type: 'SET_USER_DATA', payload: payload.userData });
  };

  const onFailPromo = payload => {
    setShowLoader(false);
    errorDispatch({
      type: 'SET_ERROR',
      payload: payload || 'Something is wrong, please, try again.'
    });
  };

  const submitPromo = data => {
    setShowLoader(true);
    fetchData('/user/update', 'POST', onSuccessPromo, onFailPromo, data);

    // Segment
    segAddPromo(
      { promoCode: referredByCode },
      // eslint-disable-next-line
      userData ? userData._id : null,
      anonId
    );
    //  PostHog
    phAddPromo({ promoCode: referredByCode });
  };

  const goToForm = () => {
    setIsPromoActivated(false);
  };

  try {
    const changeField = e => {
      if (e.target.name === 'referredByCode') {
        setReferredByCode(e.target.value);
      }
    };

    const handleSubmit = e => {
      e.preventDefault();
      const data = {};
      if (referredByCode !== '') {
        data.referredByCode = referredByCode;
      }

      submitPromo(data);
    };

    return !isPromoActivated ? (
      <div>
        <Typography className={!isRegistration ? classes.dashH1 : classes.h1}>
          Add Promo Code
        </Typography>
        <div
          className={`${classes.form} ${!isRegistration ? classes.left : ''}`}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              name="referredByCode"
              value={referredByCode}
              label="Promo Code"
              onChange={changeField}
              variant="outlined"
              fullWidth
            />
            {!showLoader ? (
              <CustButton
                type="submit"
                btnstyle="system"
                fullWidth
                subclass={classes.btnWithMarg}
              >
                Submit
              </CustButton>
            ) : (
              <Preloader />
            )}

            <Typography
              className={`${classes.opacityText} ${classes.btnWithMarg}`}
            >
              Each account can only add one promo code.
            </Typography>
          </form>
        </div>
      </div>
    ) : (
      <div className={classes.form}>
        <div className={classes.imgWrapper}>
          <img src={congrats} alt="" className={classes.congrats} />
        </div>
        <Typography className={classes.h1}>Congratulations!</Typography>
        <Typography className={classes.text}>
          Your promo code is activated.
        </Typography>
        <CustButton
          onClick={close || goToForm}
          btnstyle="system"
          fullWidth
          subclass={classes.btnWithMarg}
        >
          Ok
        </CustButton>
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

PromoCodeContainer.defaultProps = {
  close: undefined,
  isRegistration: undefined
};

PromoCodeContainer.propTypes = {
  close: PropTypes.func,
  isRegistration: PropTypes.bool
};

export default PromoCodeContainer;
