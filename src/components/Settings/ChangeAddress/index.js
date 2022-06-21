import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import AddressVerificationContainer from '../../../containers/AddressVerificationContainer';
import Icon from '../../Common/Icon';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'relative'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'Oswald',
    color: theme.palette.text.darkPurple,
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center'
  },
  arrowLeft: {
    display: 'none !important',
    height: '14px',
    marginRight: '10px',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      display: 'inline-block !important'
    }
  },
  loader: {
    margin: '30px auto'
  }
}));

function ChangeAddress(props) {
  const { address, updateUserData, closeUpdateBlock, loading } = props;
  const classes = useStyles();

  try {
    return (
      <React.Fragment>
        <Typography className={classes.title}>
          <Icon
            icon="arrow-left"
            className={classes.arrowLeft}
            role="presentation"
            onClick={closeUpdateBlock}
          />{' '}
          Update your address
        </Typography>
        <AddressVerificationContainer
          address={address || {}}
          submitAddress={updateUserData}
          loading={loading}
        />
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

ChangeAddress.defaultProps = {
  address: undefined,
  updateUserData: undefined,
  loading: undefined,
  closeUpdateBlock: undefined
};

ChangeAddress.propTypes = {
  address: PropTypes.shape({}),
  updateUserData: PropTypes.func,
  loading: PropTypes.bool,
  closeUpdateBlock: PropTypes.func
};

export default ChangeAddress;
