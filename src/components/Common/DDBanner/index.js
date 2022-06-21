import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../Button';

import corner from '../../../assets/img/top-corner.svg';
import rewardBorder from '../../../assets/img/reward-border.svg';
import chest from '../../../assets/img/lg-chest.png';
import close from '../../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  bannerWrapper: {
    width: 'calc(100% - 30px)',
    margin: '30px 30px 10px 0',
    padding: '10px 15px',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    position: 'relative',
    display: 'flex',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      top: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      bottom: '-1px',
      left: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(180deg)'
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center'
    }
  },
  close: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase'
  },
  text: {
    fontSize: '12px',
    color: theme.palette.text.lightGray,
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px'
    }
  },
  rewardWrapper: {
    width: '100%',
    maxWidth: '227px',
    padding: '10px 15px',
    margin: '0 20px',
    background: `url(${rewardBorder}) no-repeat center`,
    backgroundSize: '100% 100%',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto 10px auto'
    }
  },
  rewardTitle: {
    fontFamily: 'Oswald',
    fontWeight: '400',
    fontSize: '14px',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  img: {
    width: '36px',
    margin: '0 10px'
  },
  x5: {
    fontFamily: 'Oswald',
    fontWeight: '600',
    fontSize: '24px'
  },
  rewardText: {
    fontSize: '10px',
    opacity: '0.7',
    margin: '0 0 0 auto'
  },
  btnWrapper: {
    margin: '0 30px 0 auto',
    width: '100%',
    maxWidth: '185px',
    display: 'inline-flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto'
    }
  }
}));

function DDBanner(props) {
  const classes = useStyles();
  const { handleOpenDD, closeDDBanner, withoutChests, isProcessing } = props;

  let bannerContent = (
    <React.Fragment>
      <div className={classes.textWrapper}>
        <Typography className={classes.title}>Set up direct deposit</Typography>
        <Typography className={classes.text}>
          Have part of your paychecks sent directly to your Mythia account?
        </Typography>
      </div>
      {!withoutChests && (
        <div className={classes.rewardWrapper}>
          <Typography className={classes.rewardTitle}>
            Reward
            <br />
            you&lsquo;ll get:
          </Typography>
          <img src={chest} alt="" className={classes.img} />
          <Typography className={classes.x5}>X5</Typography>
          <Typography className={classes.rewardText}>
            Large
            <br />
            Chests
          </Typography>
        </div>
      )}
      <div className={classes.btnWrapper}>
        <CustButton
          onClick={handleOpenDD}
          btnstyle="system"
          fullWidth
          subclass={classes.btn}
        >
          Set up
        </CustButton>
      </div>
    </React.Fragment>
  );

  if (isProcessing) {
    bannerContent = (
      <div className={classes.textWrapper}>
        <Typography className={classes.title}>
          Direct deposit in progress
        </Typography>
        <Typography className={classes.text}>
          ...this usually takes 24 to 72 hours.
        </Typography>
      </div>
    );
  }

  try {
    return (
      <div className={classes.bannerWrapper}>
        <div
          role="presentation"
          onClick={closeDDBanner}
          className={classes.close}
        >
          <img src={close} alt="" />
        </div>
        {bannerContent}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

DDBanner.propTypes = {
  handleOpenDD: PropTypes.func,
  closeDDBanner: PropTypes.func,
  withoutChests: PropTypes.bool,
  isProcessing: PropTypes.bool
};

DDBanner.defaultProps = {
  handleOpenDD: undefined,
  closeDDBanner: undefined,
  withoutChests: undefined,
  isProcessing: undefined
};

export default DDBanner;
