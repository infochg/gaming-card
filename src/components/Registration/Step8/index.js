import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Typography, withStyles } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

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

function Step8(props) {
  const { classes, submit, userData, goToStep } = props;

  const [isCitizen, setIsCitizen] = useState(true);

  const changeIsCitizen = () => setIsCitizen(!isCitizen);

  try {
    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Review your application
        </Typography>

        <Typography className={classes.reviewLine}>
          <span className={classes.reviewTitle}>Name: </span>
          {userData.firstName || ''} {userData.lastName || ''}
        </Typography>
        <Typography className={classes.reviewLine}>
          <span className={classes.reviewTitle}>Address: </span>
          {userData.address.unit !== null
            ? `${userData.address.unit} ${userData.address.street} ${userData.address.city}, ${userData.address.state} ${userData.address.zip}`
            : ''}
        </Typography>
        <Typography className={classes.reviewLine}>
          <span className={classes.reviewTitle}>Birthdate: </span>
          {userData.identity.date_of_birth || ''}
        </Typography>
        {/* <Typography className={classes.reviewLine}>
          <span className={classes.reviewTitle}>SSN: </span>
          {userData.identity.id || ''}
        </Typography> */}

        <div className={classes.switchWrapper}>
          <AntSwitch
            checked={isCitizen}
            onChange={changeIsCitizen}
            name="isCitizen"
            data-testid="lock-switch"
          />
          <Typography className={classes.switchLabel}>
            I am a U.S. citizen or U.S. permanent resident
          </Typography>
        </div>
        <Typography
          className={`${classes.h1} ${classes.center} ${classes.agrHeader}`}
        >
          Agreements
        </Typography>
        <Typography
          className={classes.agreement}
          role="presentation"
          onClick={() => goToStep('agreement1')}
        >
          • Mythia Electronic Disclosure Agreement
        </Typography>
        <Typography
          className={classes.agreement}
          role="presentation"
          onClick={() => goToStep('agreement2')}
        >
          • Mythia Account Agreement
        </Typography>
        <div className={classes.form}>
          <CustButton
            onClick={() => {
              goToStep('promoCode');
            }}
            btnstyle="system"
            fullWidth
            subclass={`${classes.btnWithMarg} ${classes.disabledBtn}`}
          >
            Add Promo Code
          </CustButton>
          <CustButton
            onClick={submit}
            btnstyle="system"
            fullWidth
            subclass={classes.btnWithMarg}
            disabled={!isCitizen}
          >
            Accept
          </CustButton>
        </div>
        {!isCitizen && (
          <Typography className={`${classes.subtext} ${classes.center}`}>
            You must be a U.S. citizen or permanent resident to use Mythia.
          </Typography>
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step8.defaultProps = {
  classes: undefined,
  submit: undefined,
  userData: undefined,
  goToStep: undefined
};

Step8.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    reviewLine: PropTypes.string,
    reviewTitle: PropTypes.string,
    switchWrapper: PropTypes.string,
    switchLabel: PropTypes.string,
    agrHeader: PropTypes.string,
    agreement: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string,
    disabledBtn: PropTypes.string,
    subtext: PropTypes.string
  }),
  submit: PropTypes.func,
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.shape({
      unit: PropTypes.string,
      street: PropTypes.string,
      state: PropTypes.string,
      city: PropTypes.string,
      zip: PropTypes.string
    }),
    identity: PropTypes.shape({
      date_of_birth: PropTypes.string
    })
  }),
  goToStep: PropTypes.func
};

export default Step8;
