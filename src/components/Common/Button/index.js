import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../Icon';

import corner from '../../../assets/img/top-corner-purple.svg';
import cornerGray from '../../../assets/img/top-corner.svg';
import cornerRed from '../../../assets/img/top-corner-red.svg';
import cornerSystem from '../../../assets/img/top-corner-system.svg';
import cornerGraySystem from '../../../assets/img/top-corner-gray-system.svg';
import cornerRedSystem from '../../../assets/img/top-corner-red-system.svg';

const useStyles = makeStyles(theme => ({
  btn: {
    width: '100%',
    maxWidth: '325px',
    padding: '8px 10px',
    background: 'transparent',
    border: `2px solid ${theme.palette.text.purple}`,
    borderRadius: '0',
    color: theme.palette.text.purple,
    fontWeight: '700',
    fontFamily: 'Oswald',
    fontSize: '16px',
    textTransform: 'uppercase',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      zIndex: '2',
      top: '-2px',
      left: '-2px',
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
      bottom: '-2px',
      right: '-2px',
      width: '14px',
      height: '14px',
      background: `url(${corner}) no-repeat center`,
      backgroundSize: '100% 100%',
      transform: 'rotate(90deg)'
    },
    '&:hover': {
      background: theme.palette.text.purple,
      color: '#fff',
      '& svg': {
        '& path': {
          fill: '#fff !important'
        }
      }
    },
    '&:disabled': {
      background: '#fff',
      color: theme.palette.border.default,
      border: `2px solid ${theme.palette.border.default}`,
      '&::before': {
        background: `url(${cornerGray}) no-repeat center`,
        backgroundSize: '100% 100%',
        top: '-2px',
        left: '-2px'
      },
      '&::after': {
        background: `url(${cornerGray}) no-repeat center`,
        backgroundSize: '100% 100%',
        bottom: '-2px',
        right: '-2px'
      }
    }
  },
  negatBtn: {
    border: `2px solid ${theme.palette.text.red}`,
    color: theme.palette.text.red,
    '&::before': {
      background: `url(${cornerRed}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerRed}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&:hover': {
      background: theme.palette.background.lightRed
    }
  },
  systemBtn: {
    '&::before': {
      background: `url(${cornerSystem}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerSystem}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&:disabled': {
      '&::before': {
        background: `url(${cornerGraySystem}) no-repeat center`,
        backgroundSize: '100% 100%'
      },
      '&::after': {
        background: `url(${cornerGraySystem}) no-repeat center`,
        backgroundSize: '100% 100%'
      }
    }
  },
  negatSystemBtn: {
    border: `2px solid ${theme.palette.text.red}`,
    color: theme.palette.text.red,
    '&::before': {
      background: `url(${cornerRedSystem}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&::after': {
      background: `url(${cornerRedSystem}) no-repeat center`,
      backgroundSize: '100% 100%'
    },
    '&:hover': {
      background: theme.palette.background.lightRed
    }
  },
  icon: {
    height: '18px',
    marginRight: '10px'
  },
  fullWidth: {
    maxWidth: '100%'
  }
}));

const CustButton = props => {
  const { children, onClick, subclass, icon, btnstyle, fullWidth } = props;
  const classes = useStyles();

  let classByStyle = '';
  if (btnstyle === 'negat') {
    classByStyle = classes.negatBtn;
  } else if (btnstyle === 'system') {
    classByStyle = classes.systemBtn;
  } else if (btnstyle === 'negatSystem') {
    classByStyle = classes.negatSystemBtn;
  }

  try {
    return (
      <Button
        variant="contained"
        disableElevation
        onClick={onClick}
        className={`${classes.btn} ${classByStyle}  ${subclass || ''} ${
          fullWidth ? classes.fullWidth : ''
        }`}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      >
        {icon && <Icon icon={icon} className={classes.icon} />}
        {children}
      </Button>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

CustButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  subclass: PropTypes.string,
  icon: PropTypes.string,
  btnstyle: PropTypes.string,
  fullWidth: PropTypes.bool
};

CustButton.defaultProps = {
  children: undefined,
  onClick: undefined,
  subclass: undefined,
  icon: undefined,
  btnstyle: undefined,
  fullWidth: undefined
};

export default CustButton;
