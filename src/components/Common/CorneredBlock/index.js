import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

import corner from '../../../assets/img/top-corner.svg';

const useStyles = makeStyles(() => ({
  leftCornerDots: {
    width: '100%',
    position: 'relative',
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
  rightCornerDots: {
    width: '100%',
    position: 'relative',
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
}));

const CorneredBlock = props => {
  const classes = useStyles();
  const { children, subClass } = props;

  return (
    <div className={`${classes.rightCornerDots} ${subClass || ''}`}>
      <div className={classes.leftCornerDots}>{children}</div>
    </div>
  );
};

CorneredBlock.propTypes = {
  children: PropTypes.node,
  subClass: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
};

CorneredBlock.defaultProps = {
  children: undefined,
  subClass: undefined
};

export default CorneredBlock;
