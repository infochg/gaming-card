import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Countdown from '../../Common/Countdown';
import ChallengeItem from '../ChallengeItem';

import cupIco from '../../../assets/img/cup-ico.png';

const useStyles = makeStyles(theme => ({
  challengesWrapper: {
    width: '100%',
    marginBottom: '40px'
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  col6: {
    width: 'calc(50% - 23px)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginBottom: '-23px'
    }
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    padding: '10px 0'
  },
  title: {
    fontSize: '28px',
    textAlign: 'left',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase'
  },
  countDown: {
    margin: '0 0 0 auto',
    fontSize: '18px',
    '& span': {
      color: '#FF9E2C'
    }
  },
  successIco: {
    marginTop: '30px',
    width: '180px',
    maxWidth: '90%'
  },
  h1: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    maxWidth: '350px',
    textAlign: 'center',
    margin: '0 auto 30px auto'
  },
  checkBack: {
    fontSize: '16px',
    margin: '0 auto 30px auto'
  }
}));

function Challenges(props) {
  const { challenges, claimPrize, time } = props;
  const classes = useStyles();

  try {
    const length = Math.ceil(challenges.length / 2);

    const firstCol = challenges.slice(0, length);
    const secondCol = challenges.slice(length);

    return (
      <div className={classes.challengesWrapper}>
        <div className={classes.titleWrapper}>
          <Typography className={classes.title}>Party Challenges</Typography>
          {time && (
            <Typography className={classes.countDown}>
              Resets In{' '}
              <span>
                <Countdown time={time} />
              </span>
            </Typography>
          )}
        </div>
        {challenges.length > 0 ? (
          <div className={classes.row}>
            <div className={classes.col6}>
              {firstCol.map(item => (
                <ChallengeItem
                  key={shortid.generate()}
                  challenge={item}
                  claimPrize={claimPrize}
                />
              ))}
            </div>
            <div className={classes.col6}>
              {secondCol.map(item => (
                <ChallengeItem
                  key={shortid.generate()}
                  challenge={item}
                  claimPrize={claimPrize}
                />
              ))}
            </div>
          </div>
        ) : (
          <React.Fragment>
            <img src={cupIco} alt="" className={classes.successIco} />
            <Typography className={classes.h1}>
              You have finished all your challenges
            </Typography>
            <Typography className={classes.checkBack}>
              Check back in {time ? <Countdown time={time} /> : 'next Monday'}{' '}
              to see your new challenges
            </Typography>
          </React.Fragment>
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Challenges.defaultProps = {
  challenges: undefined,
  claimPrize: undefined,
  time: undefined
};

Challenges.propTypes = {
  challenges: PropTypes.arrayOf(PropTypes.shape({})),
  claimPrize: PropTypes.func,
  time: PropTypes.number
};

export default Challenges;
