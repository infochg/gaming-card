import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';
import CorneredBlock from '../../Common/CorneredBlock';
import CustButton from '../../Common/Button';

import gems from '../../../assets/img/gem.svg';
import smChest from '../../../assets/img/sm-chest.png';
import medChest from '../../../assets/img/med-chest.png';
import lgChest from '../../../assets/img/lg-chest.png';
import cornerGray from '../../../assets/img/top-corner-gray-system.svg';
import cornerPurpleBgPurple from '../../../assets/img/top-corner-gray-bg-purple.svg';
import cornerPurple from '../../../assets/img/top-corner-purple-bg-purple.svg';

const useStyles = makeStyles(theme => ({
  contentBlockWrapper: {
    background: theme.palette.background.gray,
    width: '100%',
    border: `1px solid ${theme.palette.border.default}`,
    margin: '23px 0'
  },
  contentCompletedBlockWrapper: {
    background: theme.palette.background.lightPurple,
    width: '100%',
    border: `1px solid ${theme.palette.border.default}`,
    margin: '23px 0'
  },
  contentBlock: {
    width: '100%',
    padding: '23px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  leftPart: {
    width: 'calc(100% - 140px)',
    paddingRight: '23px',
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 70px)',
      paddingRight: '13px'
    }
  },
  rightPart: {
    width: '137px',
    minHeight: '78px',
    textAlign: 'center',
    '& img': {
      maxWidth: '40px',
      margin: '0 auto'
    },
    [theme.breakpoints.down('xs')]: {
      width: '67px',
      minHeight: '38px'
    }
  },
  rightPartCompleted: {
    minHeight: '38px'
  },
  rightPartCorners: {
    border: `1px solid ${theme.palette.border.default}`,
    padding: '15px'
  },
  rightPartCompletedCorners: {
    border: `1px solid ${theme.palette.border.defaultWithOp}`,
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  grayCorners: {
    '&::before': {
      background: `url(${cornerGray}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerGray}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '& div': {
      '&::before': {
        background: `url(${cornerGray}) no-repeat center`,
        backgroundSize: '100% 100%'
      },
      '&::after': {
        background: `url(${cornerGray}) no-repeat center`,
        backgroundSize: '100% 100%'
      }
    }
  },
  purpleCorners: {
    '&::before': {
      background: `url(${cornerPurpleBgPurple}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerPurpleBgPurple}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '& div': {
      '&::before': {
        background: `url(${cornerPurpleBgPurple}) no-repeat center`,
        backgroundSize: '100% 100%'
      },
      '&::after': {
        background: `url(${cornerPurpleBgPurple}) no-repeat center`,
        backgroundSize: '100% 100%'
      }
    }
  },
  itemTitle: {
    fontSize: '18px',
    textAlign: 'left'
  },
  itemPrizeAmount: {
    fontSize: '18px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: theme.palette.text.darkPurple
  },
  itemPrizeName: {
    fontSize: '9px',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  progressWrapper: {
    width: '100%'
  },
  progress: {
    height: '10px',
    backgroundColor: theme.palette.background.lightPurple,
    margin: '10px 0'
  },
  barColorPrimary: {
    backgroundColor: theme.palette.text.purple
  },
  valuesBlock: {
    textAlign: 'left',
    margin: '0 23px 0 0',
    fontSize: '16px',
    fontFamily: 'Oswald',
    color: theme.palette.text.purple,
    '& span': {
      fontWeight: '400',
      fontSize: '14px'
    }
  },
  claimBlock: {
    width: 'calc(100% + 48px)',
    padding: '15px',
    background: '#B92941',
    color: '#fff',
    fontSize: '18px',
    margin: '15px -24px -24px -24px',
    borderRadius: '0 0 20px 20px',
    cursor: 'pointer',
    transition: 'all .2s',
    '&:hover': {
      background: '#b93f36'
    }
  },
  claimBtn: {
    marginTop: '20px',
    maxWidth: '100%',
    '&::before': {
      background: `url(${cornerPurple}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerPurple}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  claimBtnMobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'block'
    }
  },
  checkBack: {
    fontSize: '16px',
    margin: '0 auto 30px auto'
  }
}));

function ChallengeItem(props) {
  const { challenge, claimPrize } = props;
  const classes = useStyles();

  try {
    let progressValue = 0;
    if (challenge.currentValue !== 0) {
      progressValue = (challenge.currentValue * 100) / challenge.maxValue;
    }

    let icon = '';
    if (challenge.reward.type === 'box') {
      if (challenge.reward.subtype === 'small') {
        icon = smChest;
      } else if (challenge.reward.subtype === 'medium') {
        icon = medChest;
      } else if (challenge.reward.subtype === 'large') {
        icon = lgChest;
      }
    } else if (challenge.reward.type === 'gems') {
      icon = gems;
    }

    let prizeName = '';
    if (challenge.reward.type === 'box') {
      if (challenge.reward.amount > 1) {
        prizeName = 'boxes';
      } else {
        prizeName = 'box';
      }
    } else if (challenge.reward.type === 'gems') {
      if (challenge.reward.amount > 1) {
        prizeName = 'gems';
      } else {
        prizeName = 'gem';
      }
    }

    return (
      <CorneredBlock
        subClass={
          challenge.status === 'readyToClaim'
            ? classes.contentCompletedBlockWrapper
            : classes.contentBlockWrapper
        }
        key={shortid.generate()}
      >
        <div className={classes.contentBlock}>
          <div className={classes.leftPart}>
            <Typography className={classes.itemTitle}>
              {challenge.title || ''}
            </Typography>
            <ProgressBar
              value={progressValue}
              classes={{
                root: classes.progress,
                barColorPrimary: classes.barColorPrimary
              }}
            />

            <div className={classes.valuesBlock}>
              {challenge.currentValue || challenge.currentValue === 0
                ? challenge.currentValue
                : ''}
              /<span>{challenge.maxValue || ''}</span>
            </div>
          </div>
          <div
            className={`${classes.rightPart} ${
              challenge.status === 'readyToClaim'
                ? classes.rightPartCompleted
                : ''
            }`}
          >
            <CorneredBlock
              subClass={
                challenge.status === 'readyToClaim'
                  ? classes.purpleCorners
                  : classes.grayCorners
              }
            >
              <div
                className={
                  challenge.status === 'readyToClaim'
                    ? classes.rightPartCompletedCorners
                    : classes.rightPartCorners
                }
              >
                <img src={icon} alt="" />
                <div>
                  <Typography className={classes.itemPrizeAmount}>
                    {challenge.reward ? challenge.reward.amount : ''}
                  </Typography>
                  <Typography className={classes.itemPrizeName}>
                    {challenge.reward.subtype} {prizeName}
                  </Typography>
                </div>
              </div>
            </CorneredBlock>

            {challenge.status === 'readyToClaim' && (
              <CustButton
                subclass={classes.claimBtn}
                onClick={() => claimPrize(challenge.id, challenge.title)}
              >
                Claim Prize
              </CustButton>
            )}
          </div>
          {challenge.status === 'readyToClaim' && (
            <CustButton
              subclass={`${classes.claimBtn} ${classes.claimBtnMobile}`}
              onClick={() => claimPrize(challenge.id, challenge.title)}
            >
              Claim Prize
            </CustButton>
          )}
        </div>
      </CorneredBlock>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ChallengeItem.defaultProps = {
  challenge: undefined,
  claimPrize: undefined
};

ChallengeItem.propTypes = {
  challenge: PropTypes.shape({
    currentValue: PropTypes.number,
    maxValue: PropTypes.number,
    status: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
    reward: PropTypes.shape({
      type: PropTypes.string,
      subtype: PropTypes.string,
      amount: PropTypes.number
    })
  }),
  claimPrize: PropTypes.func
};

export default ChallengeItem;
