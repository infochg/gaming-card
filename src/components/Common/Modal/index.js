import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Typography } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Preloader from '../Preloader';
import CustButton from '../Button';

import close from '../../../assets/img/close-ico.svg';

const useStyles = makeStyles(theme => ({
  modalWrapper: {
    zIndex: '9001 !important'
  },
  backDrop: {
    backgroundColor: 'rgba(34, 29, 67, 0.8)'
  },
  modal: {
    padding: '35px 23px 23px 23px',
    maxWidth: '560px',
    textAlign: 'center',
    background: '#fff'
  },
  close: {
    position: 'absolute',
    right: '23px',
    top: '23px',
    cursor: 'pointer'
  },
  modalTitle: {
    fontSize: '30px',
    color: theme.palette.text.darkPurple,
    fontWeight: '700',
    fontFamily: 'Oswald',
    textTransform: 'uppercase',
    marginTop: '15px'
  },
  modalText: {
    fontSize: '18px',
    padding: '20px 0 30px 0'
  },
  modalBtns: {
    paddingTop: '20px'
  },
  negatBtn: {
    width: '144px',
    margin: '10px'
  },
  positBtn: {
    width: '144px',
    margin: '10px'
  },
  preloader: {
    height: '48px'
  }
}));

function Modal(props) {
  const classes = useStyles();

  const {
    isOpened,
    closeModal,
    callback,
    loader,
    title,
    text,
    content,
    yesBtnText,
    noBtnText,
    noBtns,
    noCloseBtn
  } = props;

  try {
    return (
      <Dialog
        className={classes.modalWrapper}
        open={isOpened}
        onClose={!noCloseBtn ? closeModal : null}
        BackdropProps={{
          classes: {
            root: classes.backDrop
          }
        }}
      >
        {!noCloseBtn && (
          <div
            role="presentation"
            onClick={closeModal}
            className={classes.close}
          >
            <img src={close} alt="" />
          </div>
        )}

        <div className={classes.modal}>
          {title ? (
            <Typography className={classes.modalTitle}>{title}</Typography>
          ) : null}

          {text ? (
            <Typography className={classes.modalText}>{text}</Typography>
          ) : null}

          {content}

          {!noBtns && (
            <div className={classes.modalBtns}>
              {!loader ? (
                <React.Fragment>
                  <CustButton
                    onClick={closeModal}
                    subclass={classes.negatBtn}
                    btnstyle="negat"
                  >
                    {noBtnText || 'No'}
                  </CustButton>

                  <CustButton onClick={callback} subclass={classes.positBtn}>
                    {yesBtnText || 'Yes'}
                  </CustButton>
                </React.Fragment>
              ) : (
                <Preloader className={classes.preloader} />
              )}
            </div>
          )}
        </div>
      </Dialog>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Modal.propTypes = {
  isOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  callback: PropTypes.func,
  loader: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.node,
  yesBtnText: PropTypes.string,
  noBtnText: PropTypes.string,
  noBtns: PropTypes.bool,
  noCloseBtn: PropTypes.bool
};

Modal.defaultProps = {
  isOpened: undefined,
  closeModal: undefined,
  callback: undefined,
  loader: undefined,
  title: undefined,
  text: undefined,
  content: undefined,
  yesBtnText: undefined,
  noBtnText: undefined,
  noBtns: undefined,
  noCloseBtn: undefined
};

export default Modal;
