import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  toastContainer: {
    width: '550px',
    maxWidth: '100%'
  },
  toast: {
    borderRadius: '5px',
    '&.Toastify__toast--error': {
      background: '#fff',
      border: `1px solid ${theme.palette.border.default}`
    },
    '&.Toastify__toast--success': {
      background: '#fff',
      border: `1px solid ${theme.palette.border.default}`
    },
    '&.Toastify__toast--info': {
      background: '#fff',
      border: `1px solid ${theme.palette.border.default}`
    },
    '& div.Toastify__toast-body': {
      fontSize: '16px',
      color: theme.palette.text.primary
    },
    '& button.Toastify__close-button': {
      color: theme.palette.text.primary,
      alignSelf: 'center',
      borderRadius: '100%',
      border: `1px solid ${theme.palette.text.primary}`,
      width: '16px',
      height: '16px',
      padding: '0',
      '& svg': {
        width: '9px',
        padding: '0',
        margin: '-1px 0 0 0'
      }
    }
  }
}));

function ToastsContainer() {
  const classes = useStyles();

  try {
    return (
      <ToastContainer
        hideProgressBar
        position="bottom-right"
        className={classes.toastContainer}
        toastClassName={classes.toast}
      />
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

export default ToastsContainer;
