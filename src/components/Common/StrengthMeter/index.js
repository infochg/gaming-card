import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  strengthMeter: {
    position: 'relative',
    zIndex: '2',
    display: 'block',
    width: 'calc(100% - 16px)',
    margin: '-10px 0 40px 8px',
    borderTop: '5px solid transparent',
    borderRadius: '4px',
    transition: 'all .2s'
  },
  subtext: {
    fontSize: '16px',
    opacity: '0.7',
    margin: '15px auto',
    textAlign: 'left',
    '& span': {
      whiteSpace: 'nowrap'
    }
  },
  weak: {
    borderTopColor: theme.palette.background.red
  },
  medium: {
    borderTopColor: theme.palette.background.orange
  },
  strong: {
    borderTopColor: theme.palette.background.green
  },
  veryStrong: {
    borderTopColor: theme.palette.background.green
  },
  weakArrow: {
    color: theme.palette.background.red
  },
  weakTooltip: {
    backgroundColor: theme.palette.background.red,
    marginTop: '-5px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '10px 20px'
  },
  mediumArrow: {
    color: theme.palette.background.orange
  },
  mediumTooltip: {
    backgroundColor: theme.palette.background.orange,
    marginTop: '-5px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '10px 20px'
  },
  strongArrow: {
    color: theme.palette.background.green
  },
  strongTooltip: {
    backgroundColor: theme.palette.background.green,
    marginTop: '-5px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '10px 20px'
  },
  veryStrongArrow: {
    color: theme.palette.background.green
  },
  veryStrongTooltip: {
    backgroundColor: theme.palette.background.green,
    marginTop: '-5px',
    fontFamily: 'Oswald',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '10px 20px'
  }
}));

function StrengthMeter(props) {
  const { passwordScore, passwordLength } = props;
  const classes = useStyles();

  const scoreType = {
    0: {
      title: 'Weak',
      class: classes.weak,
      arrowClass: classes.weakArrow,
      tooltipClass: classes.weakTooltip,
      placement: 'bottom-start'
    },
    1: {
      title: 'Weak',
      class: classes.weak,
      arrowClass: classes.weakArrow,
      tooltipClass: classes.weakTooltip,
      placement: 'bottom-start'
    },
    2: {
      title: 'Medium',
      class: classes.medium,
      arrowClass: classes.mediumArrow,
      tooltipClass: classes.mediumTooltip,
      placement: 'bottom'
    },
    3: {
      title: 'Strong',
      class: classes.strong,
      arrowClass: classes.strongArrow,
      tooltipClass: classes.strongTooltip,
      placement: 'bottom-end'
    },
    4: {
      title: 'Very Strong',
      class: classes.veryStrong,
      arrowClass: classes.veryStrongArrow,
      tooltipClass: classes.veryStrongTooltip,
      placement: 'bottom-end'
    }
  };

  try {
    return (
      <React.Fragment>
        <Tooltip
          classes={{
            arrow: scoreType[passwordScore].arrowClass,
            tooltip: scoreType[passwordScore].tooltipClass
          }}
          title={scoreType[passwordScore].title}
          placement={scoreType[passwordScore].placement}
          open
        >
          <div
            className={`${classes.strengthMeter} ${scoreType[passwordScore].class}`}
          />
        </Tooltip>

        {passwordLength < 9 && (
          <Typography className={classes.subtext}>
            Your password must be at least 8 characters long.
          </Typography>
        )}
        {passwordScore < 2 && (
          <Typography className={classes.subtext}>
            Password tip: use symbols, numbers, and upper / lowercase letters.
            Don&lsquo;t include real words or names, even if it has numbers or
            uppercase letters in the word.
          </Typography>
        )}
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

StrengthMeter.defaultProps = {
  passwordScore: undefined,
  passwordLength: undefined
};

StrengthMeter.propTypes = {
  passwordScore: PropTypes.number,
  passwordLength: PropTypes.number
};

export default StrengthMeter;
