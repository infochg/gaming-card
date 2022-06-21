import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../../components/Common/Modal';
import Preloader from '../../components/Common/Preloader';
import CodeInput from '../../components/Common/CodeInput';
import CustButton from '../../components/Common/Button';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import history from '../../history';

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '400px',
    margin: '30px auto 0 auto',
    textAlign: 'center'
  },
  modalBtns: {
    paddingTop: '40px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  btn: {
    maxWidth: '180px'
  },
  loader: {
    margin: '30px auto'
  },
  codeText: {
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'Roboto',
    paddingLeft: '8px',
    color: '#B6B6B6'
  }
}));

function TFAContainer(props) {
  const classes = useStyles();
  const { isCodeSent, setIsCodeSent } = props;
  const [code, setCode] = useState('');
  const [showModalLoader, setShowModalLoader] = useState(false);

  const { userTokenDispatch, errorDispatch } = useContext(appContext);

  const handleCloseModal = () => {
    setIsCodeSent(false);

    if (history.location.pathname === '/signin') {
      cookie.remove('2fa');
      cookie.remove('token');
    }
  };

  // Submit code
  const onSuccessCode = payload => {
    cookie.remove('2fa');
    setShowModalLoader(false);
    setIsCodeSent(false);
    userTokenDispatch({ type: 'SET_USER_TOKEN', payload });
  };

  const onErrorCode = () => {
    setShowModalLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload: 'Code is incorrect' });
  };

  const submitCode = e => {
    e.preventDefault();

    const data = { code };
    setShowModalLoader(true);
    fetchData('/user/2fa/verifycode', 'POST', onSuccessCode, onErrorCode, data);

    return null;
  };

  const changeCode = data => {
    setCode(data);
  };

  return (
    <Modal
      title="Enter the 6 digit code"
      isOpened={isCodeSent}
      closeModal={handleCloseModal}
      callback={submitCode}
      content={
        <div className={classes.form}>
          <Typography className={classes.codeText}>Code</Typography>
          <form onSubmit={submitCode}>
            <CodeInput onChange={changeCode} />
            <div className={classes.modalBtns}>
              {!showModalLoader ? (
                <React.Fragment>
                  <CustButton
                    onClick={handleCloseModal}
                    btnstyle="negat"
                    subclass={classes.btn}
                  >
                    Cancel
                  </CustButton>
                  <CustButton
                    disabled={code === '' || code.length < 6}
                    type="submit"
                    subclass={classes.btn}
                  >
                    Send
                  </CustButton>
                </React.Fragment>
              ) : (
                <Preloader />
              )}
            </div>
          </form>
        </div>
      }
      noBtns
    />
  );
}

TFAContainer.propTypes = {
  isCodeSent: PropTypes.bool,
  setIsCodeSent: PropTypes.func
};

TFAContainer.defaultProps = {
  isCodeSent: undefined,
  setIsCodeSent: undefined
};

export default TFAContainer;
