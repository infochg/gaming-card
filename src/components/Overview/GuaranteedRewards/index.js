import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';
import Slider from 'react-slick';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import ProgressBar from '../../Common/ProgressBar';
import ChallengeItem from '../../Party/ChallengeItem';
import CustButton from '../../Common/Button';
import Preloader from '../../Common/Preloader';
import CorneredBlock from '../../Common/CorneredBlock';

import cod from '../../../assets/img/guaranteed-awards/cod.png';
import corner from '../../../assets/img/top-corner.svg';
import bg from '../../../assets/img/guaranteed-reward-bg.svg';
import noRewards from '../../../assets/img/no-guar-rewards-ico.png';

const useStyles = makeStyles(theme => ({
  title: {
    padding: '10px 0',
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  contentBlock: {
    width: '100%',
    border: '1px solid rgba(255,255,255,0.1)',
    margin: '0 0 40px 0',
    display: 'flex',
    alignItems: 'center'
  },
  progressWrapper: {
    width: '100%',
    textAlign: 'left'
  },
  progress: {
    height: '10px',
    backgroundColor: theme.palette.background.lightPurple,
    margin: '0 23px 10px 23px'
  },
  barColorPrimary: {
    backgroundColor: theme.palette.text.purple
  },
  rewardTitle: {
    fontSize: '19px',
    textAlign: 'left',
    padding: '23px',
    fontWeight: '700',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 23px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  },
  rewardDesc: {
    fontSize: '17px',
    textAlign: 'left',
    padding: '0 23px 23px 23px',
    marginTop: '-10px',
    [theme.breakpoints.down('sm')]: {
      padding: '0 23px 10px 23px'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '12px'
    }
  },
  contentWrapper: {
    width: '100%',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    borderLeft: '0',
    margin: '0',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
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
      bottom: '-1px',
      right: '-1px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(90deg)'
    }
  },
  imgWrapper: {
    minWidth: '208px',
    maxWidth: '208px',
    padding: '0',
    margin: '0',
    '& img': {
      maxWidth: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '160px',
      maxWidth: '160px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '124px',
      maxWidth: '124px'
    }
  },
  imgWrapperWithBg: {
    background: `url(${bg}) no-repeat center`,
    backgroundSize: '100% 100%',
    minWidth: '208px',
    maxWidth: '208px',
    minHeight: '208px',
    maxHeight: '208px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    margin: '0',
    '& img': {
      maxWidth: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '160px',
      maxWidth: '160px',
      minHeight: '160px',
      maxHeight: '160px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '124px',
      maxWidth: '124px',
      minHeight: '124px',
      maxHeight: '124px'
    }
  },
  imgWrapperWithCorners: {
    minWidth: '208px',
    maxWidth: '208px',
    minHeight: '263px',
    maxHeight: '263px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    margin: '0',
    position: 'relative',
    background: theme.palette.background.gray,
    border: `1px solid ${theme.palette.border.default}`,
    [theme.breakpoints.down('sm')]: {
      minWidth: '160px',
      maxWidth: '160px',
      minHeight: '202px',
      maxHeight: '202px'
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '124px',
      maxWidth: '124px',
      minHeight: '157px',
      maxHeight: '157px'
    },
    '& span:nth-child(1)': {
      width: '100%',
      height: '100%',
      '&::before': {
        content: '""',
        position: 'absolute',
        zIndex: '2',
        top: '-1px',
        left: '-1px',
        width: '14px',
        height: '14px',
        background: `url(${corner}) no-repeat center`,
        backgroundSize: '100% 100%',
        transform: 'rotate(270deg)'
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
      }
    },
    '& span:nth-child(2)': {
      width: '100%',
      height: '100%',
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
        right: '-1px',
        width: '14px',
        height: '14px',
        background: `url(${corner}) no-repeat center`,
        backgroundSize: '100% 100%',
        transform: 'rotate(90deg)'
      }
    }
  },
  valuesBlocks: {
    display: 'flex'
  },
  valuesBlock: {
    margin: '0 0 23px 25px',
    fontSize: '26px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.purple,
    '& span': {
      fontSize: '16px',
      fontWeight: '400',
      color: theme.palette.text.purple
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 0 10px 25px'
    }
  },
  ampersand: {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'Oswald',
    fontSize: '21px',
    fontWeight: '700',
    color: theme.palette.text.purple,
    opacity: '0.2',
    [theme.breakpoints.down('xs')]: {
      margin: '0 -15px'
    }
  },
  slick: {
    '& ul.slick-dots': {
      marginBottom: '20px',
      '& li': {
        '&.slick-active': {
          '& button': {
            width: '8px',
            height: '8px',
            backgroundColor: theme.palette.text.purple,
            '&::before': {
              content: '""'
            }
          }
        },
        '& button': {
          width: '8px',
          height: '8px',
          backgroundColor: theme.palette.background.gray,
          '&::before': {
            content: '""'
          }
        }
      }
    }
  },
  claimBtn: {
    margin: '0 20px 20px 20px',
    maxWidth: 'calc(100% - 40px)'
  },
  preloader: {
    marginBottom: '28px'
  },
  noRewardsWrapper: {
    border: `1px solid ${theme.palette.border.default}`,
    padding: '0 20px 20px 20px'
  },
  noRewardsTitile: {
    fontFamily: 'Oswald',
    fontWeight: '500',
    fontSize: '16px',
    color: theme.palette.text.lightGray,
    textTransform: 'uppercase'
  },
  noRewardsImg: {
    width: '90px',
    margin: '10px auto'
  }
}));

function GuaranteedRewards(props) {
  const {
    guaranteedReward,
    challenges,
    claimGuaranteedReward,
    showLoader
  } = props;
  const classes = useStyles();

  try {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let progressValue = 0;
    if (guaranteedReward.currentValue !== 0) {
      progressValue =
        (guaranteedReward.currentValue * 100) / guaranteedReward.targetValue;
    }

    let rewardBlock = (
      <div className={classes.contentBlock}>
        <div className={classes.imgWrapper}>
          <img src={cod} alt="" />
        </div>
        <div className={classes.contentWrapper}>
          <Typography className={classes.rewardTitle}>
            {guaranteedReward.title}
          </Typography>
          <div className={classes.progressWrapper}>
            <ProgressBar
              value={progressValue}
              classes={{
                root: classes.progress,
                barColorPrimary: classes.barColorPrimary
              }}
            />

            <div className={classes.valuesBlock}>
              {Object.keys(guaranteedReward).length > 0 ? (
                <React.Fragment>
                  $
                  {guaranteedReward.currentValue
                    ? guaranteedReward.currentValue.toFixed(2)
                    : 0}
                  <span> / ${guaranteedReward.targetValue || 0}</span>
                </React.Fragment>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    );

    if (guaranteedReward.type === 'rewardBox') {
      const challenge = {
        currentValue: guaranteedReward.currentValue,
        id: shortid.generate(),
        maxValue: guaranteedReward.targetValue,
        reward: { amount: 1, subtype: guaranteedReward.subtype, type: 'box' },
        status: 'incomplete',
        tag: '',
        title: guaranteedReward.title
      };

      rewardBlock = (
        <ChallengeItem
          key={shortid.generate()}
          challenge={challenge}
          claimPrize={() => {}}
        />
      );
    }

    if (guaranteedReward.directDepositMaxValue) {
      const amountPart =
        (guaranteedReward.directDepositCurrentValue * 50) /
        guaranteedReward.directDepositMaxValue;

      const countPart =
        (guaranteedReward.transactionCountCurrentValue * 50) /
        guaranteedReward.transactionCountMaxValue;

      rewardBlock = (
        <div className={classes.contentBlock}>
          <div
            className={classes.imgWrapperWithCorners}
            style={{
              background: `url(${guaranteedReward.imageURL}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          >
            <span />
            <span />
          </div>
          <div className={classes.contentWrapper}>
            <Typography className={classes.rewardTitle}>
              {guaranteedReward.title}
            </Typography>
            <Typography className={classes.rewardDesc}>
              {guaranteedReward.status === 'inProgress'
                ? "Your reward is been processed - you'll hear from us via email soon"
                : guaranteedReward.subtitle}
            </Typography>
            <div className={classes.progressWrapper}>
              <ProgressBar
                value={amountPart + countPart}
                classes={{
                  root: classes.progress,
                  barColorPrimary: classes.barColorPrimary
                }}
              />

              <div className={classes.valuesBlocks}>
                <div className={classes.valuesBlock}>
                  {Object.keys(guaranteedReward).length > 0 ? (
                    <React.Fragment>
                      $
                      {guaranteedReward.directDepositCurrentValue
                        ? guaranteedReward.directDepositCurrentValue.toFixed(2)
                        : 0}
                      <span>
                        {' '}
                        / ${guaranteedReward.directDepositMaxValue || 0}
                      </span>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
                <div className={classes.valuesBlock}>
                  <Typography className={classes.ampersand}>&</Typography>
                </div>
                <div className={classes.valuesBlock}>
                  {Object.keys(guaranteedReward).length > 0 ? (
                    <React.Fragment>
                      {guaranteedReward.transactionCountCurrentValue || 0}
                      <span>
                        {' '}
                        / {guaranteedReward.transactionCountMaxValue || 0}
                      </span>
                    </React.Fragment>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {guaranteedReward.status === 'readyToClaim' && !showLoader && (
              <CustButton
                subclass={classes.claimBtn}
                btnstyle="system"
                onClick={claimGuaranteedReward}
              >
                Claim Prize
              </CustButton>
            )}
            {showLoader && (
              <div className={classes.preloader}>
                <Preloader />
              </div>
            )}
          </div>
        </div>
      );
    }

    if (Object.keys(guaranteedReward).length === 0 || !guaranteedReward.title) {
      let choosedChallenge = {};
      challenges.map(item => {
        if (item.status === 'incomplete') {
          if (Object.keys(choosedChallenge).length === 0) {
            choosedChallenge = { ...item };
          } else if (choosedChallenge.id > item.id) {
            choosedChallenge = { ...item };
          }
        }
        return null;
      });

      if (Object.keys(choosedChallenge).length !== 0) {
        rewardBlock = (
          <ChallengeItem
            key={shortid.generate()}
            challenge={choosedChallenge}
            claimPrize={() => {}}
          />
        );
      } else {
        rewardBlock = (
          <CorneredBlock>
            <div className={classes.noRewardsWrapper}>
              <img src={noRewards} alt="" className={classes.noRewardsImg} />
              <Typography className={classes.noRewardsTitile}>
                There is no guaranteed rewards for now.
              </Typography>
            </div>
          </CorneredBlock>
        );
      }
    }

    return (
      <React.Fragment>
        <div className={classes.title}>
          {Object.keys(guaranteedReward).length > 0
            ? 'Guaranteed Rewards'
            : 'Selected Challenge'}
        </div>
        {/* eslint-disable-next-line */}
        <Slider {...settings} className={classes.slick}>
          <div>{rewardBlock}</div>
        </Slider>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

GuaranteedRewards.defaultProps = {
  guaranteedReward: undefined,
  challenges: undefined,
  claimGuaranteedReward: undefined,
  showLoader: undefined
};

GuaranteedRewards.propTypes = {
  guaranteedReward: PropTypes.shape({
    currentValue: PropTypes.number,
    targetValue: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
    subtype: PropTypes.string,
    status: PropTypes.string,
    directDepositMaxValue: PropTypes.number,
    directDepositCurrentValue: PropTypes.number,
    transactionCountCurrentValue: PropTypes.number,
    transactionCountMaxValue: PropTypes.number,
    imageURL: PropTypes.string
  }),
  challenges: PropTypes.arrayOf(PropTypes.shape({})),
  claimGuaranteedReward: PropTypes.func,
  showLoader: PropTypes.bool
};

export default GuaranteedRewards;
