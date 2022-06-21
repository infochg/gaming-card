import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../../Common/Icon';

import pdfIcon from '../../../assets/img/pdf-icon.svg';

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '20px 10px',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.palette.border.default}`,
    background: 'transparent',
    transition: 'all .3s',
    '&:hover': {
      background: theme.palette.background.purpleWithOp
    }
  },
  imgWrapper: {
    minWidth: '49px',
    maxWidth: '49px',
    height: '49px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px'
  },
  title: {
    fontSize: '18px',
    paddingRight: '10px',
    fontWeight: '700',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  },
  date: {
    fontSize: '14px',
    fontWeight: '400',
    opacity: '0.7',
    margin: '0 20px 0 auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    }
  },
  type: {
    fontSize: '16px',
    fontWeight: '400',
    opacity: '0.7',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  },
  icon: {
    height: '15px'
  }
}));

function StatementItem(props) {
  const classes = useStyles();
  const { pdfBase64, date, openStatement } = props;

  try {
    const open = () => {
      openStatement(pdfBase64);
    };

    return (
      <div className={classes.content} role="presentation" onClick={open}>
        <div className={classes.imgWrapper}>
          <img src={pdfIcon} alt="" />
        </div>
        <div>
          <Typography className={classes.title}>Account Statement</Typography>
          <Typography className={classes.type}>PDF</Typography>
        </div>
        <Typography className={classes.date}>
          {moment(date).format('MMM D, YYYY')}
        </Typography>
        <Icon icon="chevron-right" className={classes.icon} />
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

StatementItem.defaultProps = {
  pdfBase64: undefined,
  date: undefined,
  openStatement: undefined
};

StatementItem.propTypes = {
  pdfBase64: PropTypes.string,
  date: PropTypes.string,
  openStatement: PropTypes.func
};

export default StatementItem;
