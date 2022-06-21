import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

import gem from '../../../assets/img/red-gem.png';
import chest from '../../../assets/img/chest.png';
import coin from '../../../assets/img/coin.png';

function Step1(props) {
  const { classes, nextStep } = props;
  try {
    return (
      <React.Fragment>
        <div className={classes.welcomeBlock}>
          <Typography className={`${classes.h1} ${classes.center}`}>
            Welcome to Mythia
          </Typography>
          <Typography className={`${classes.text} ${classes.center}`}>
            The adventure begins
          </Typography>
          <div className={classes.welcomeLine}>
            <div className={classes.welcomeLineImg}>
              <img src={gem} alt="" />
            </div>
            <div>
              <Typography className={classes.h2}>
                Win gaming rewards{' '}
              </Typography>
              <Typography className={classes.text}>
                Prizes include: PS5, XBox, Game Credits
              </Typography>
            </div>
          </div>
          <div className={classes.welcomeLine}>
            <div className={classes.welcomeLineImg}>
              <img src={chest} alt="" />
            </div>
            <div>
              <Typography className={classes.h2}>
                A Swipe Gets a Reward
              </Typography>
              <Typography className={classes.text}>
                Every time you swipe you get a reward box
              </Typography>
            </div>
          </div>
          <div className={classes.welcomeLine}>
            <div className={classes.welcomeLineImg}>
              <img src={coin} alt="" />
            </div>
            <div>
              <Typography className={classes.h2}>Debit card</Typography>
              <Typography className={classes.text}>
                Spend anywhere Mastercard in accepted
              </Typography>
            </div>
          </div>
        </div>
        <div className={`${classes.form} ${classes.withPadding}`}>
          <CustButton onClick={nextStep} btnstyle="system" fullWidth>
            Let’s go
          </CustButton>
        </div>
        <div className={classes.botText}>
          <div className={classes.botTextInner}>
            Banking and Debit Card services provided by Piermont Bank. Member
            FDIC, pursuant to license by Mastercard International Incorporated.
          </div>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step1.defaultProps = {
  classes: undefined,
  nextStep: undefined
};

Step1.propTypes = {
  classes: PropTypes.shape({
    welcomeBlock: PropTypes.string,
    h1: PropTypes.string,
    center: PropTypes.string,
    text: PropTypes.string,
    welcomeLine: PropTypes.string,
    welcomeLineImg: PropTypes.string,
    h2: PropTypes.string,
    form: PropTypes.string,
    withPadding: PropTypes.string,
    botText: PropTypes.string,
    botTextInner: PropTypes.string
  }),
  nextStep: PropTypes.func
};

export default Step1;
