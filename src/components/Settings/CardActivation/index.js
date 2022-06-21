import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';
import TextField from '../../Common/TextField';
import Preloader from '../../Common/Preloader';

import close from '../../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    textAlign: 'center'
  },
  naviBar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  close: {
    cursor: 'pointer',
    marginLeft: 'auto'
  },
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    margin: '-30px 20px 20px 0'
  },
  subtitle: {
    fontSize: '22px',
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: 'Oswald',
    color: theme.palette.text.lightGray,
    display: 'flex',
    alignItems: 'center',
    margin: '0 0 20px 0'
  },
  text: {
    fontSize: '16px',
    opacity: '0.7',
    maxWidth: '300px',
    textAlign: 'center',
    margin: '20px auto'
  },
  icon: {
    maxWidth: '80%'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  formItem: {
    width: 'calc(50% - 20px)'
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.purple,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: '30px'
  },
  successText: {
    margin: '30px 0'
  },
  amountField: {
    margin: '20px 0',
    '& input': {
      border: 'none',
      textAlign: 'center',
      fontFamily: 'Oswald',
      fontWeight: '700',
      color: theme.palette.text.primary,
      background: theme.palette.background.gray
    }
  }
}));

function CardActivation(props) {
  const {
    cardId,
    closeReport,
    activationStep,
    isLoading,
    activateCard,
    sendPin
  } = props;
  const classes = useStyles();

  const [lastFour, setLastFour] = useState('');
  const [expiration, setExpiration] = useState('');
  const [PIN, setPIN] = useState('');

  const changeField = e => {
    const regex = /[^0-9.]/;
    if (e.target.name === 'lastFour') {
      if (!regex.test(e.target.value) && e.target.value.length < 5) {
        setLastFour(e.target.value);
      }
    } else if (e.target.name === 'expiration') {
      if (!regex.test(e.target.value) && e.target.value.length < 5) {
        setExpiration(e.target.value);
      }
    } else if (e.target.name === 'PIN') {
      if (!regex.test(e.target.value) && e.target.value.length < 5) {
        setPIN(e.target.value);
      }
    }
  };

  const submitCardActivation = e => {
    e.preventDefault();

    const data = { lastFour, expiration, cardId };
    activateCard(data);
  };

  const submitPin = e => {
    e.preventDefault();

    const data = { PIN, cardId };
    sendPin(data);
  };

  const steps = {
    activation: (
      <React.Fragment>
        <Typography className={classes.subtitle}>
          Type in your card details
        </Typography>
        <form onSubmit={submitCardActivation}>
          <div className={classes.form}>
            <div className={classes.formItem}>
              <TextField
                name="lastFour"
                value={lastFour}
                onChange={changeField}
                label="Card’s last 4 digits"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className={classes.formItem}>
              <TextField
                name="expiration"
                value={expiration}
                onChange={changeField}
                label="Exp.Date"
                variant="outlined"
                fullWidth
              />
            </div>
          </div>
          {isLoading ? (
            <Preloader />
          ) : (
            <CustButton
              type="submit"
              fullWidth
              subclass={classes.btn}
              disabled={lastFour.length < 4 || expiration.length < 4}
            >
              Continue
            </CustButton>
          )}
        </form>
      </React.Fragment>
    ),
    setPin: (
      <React.Fragment>
        <Typography className={classes.subtitle}>Choose your PIN</Typography>
        <form onSubmit={submitPin}>
          <TextField
            name="PIN"
            value={PIN}
            onChange={changeField}
            placeholder="0000"
            variant="outlined"
            className={classes.amountField}
            fullWidth
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <CustButton
              type="submit"
              fullWidth
              subclass={classes.btn}
              disabled={PIN.length < 4}
            >
              Submit
            </CustButton>
          )}
        </form>
      </React.Fragment>
    ),
    allSet: (
      <React.Fragment>
        <Typography className={classes.successTitle}>
          You’re all set!
        </Typography>
        <Typography className={classes.successText}>
          You can now use your Mythia card anywhere Mastercard is accepted
        </Typography>
        <CustButton subclass={classes.btn} onClick={closeReport}>
          Continue
        </CustButton>
      </React.Fragment>
    )
  };

  try {
    return (
      <div className={classes.wrapper}>
        <div className={classes.naviBar}>
          <div
            role="presentation"
            onClick={closeReport}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        </div>
        <Typography className={classes.title}>Activate your card</Typography>

        {steps[activationStep] || steps.activation}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

CardActivation.defaultProps = {
  cardId: undefined,
  activationStep: undefined,
  closeReport: undefined,
  isLoading: undefined,
  activateCard: undefined,
  sendPin: undefined
};

CardActivation.propTypes = {
  cardId: PropTypes.string,
  activationStep: PropTypes.string,
  closeReport: PropTypes.func,
  isLoading: PropTypes.bool,
  activateCard: PropTypes.func,
  sendPin: PropTypes.func
};

export default CardActivation;
