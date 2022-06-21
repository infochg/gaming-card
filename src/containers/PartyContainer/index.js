import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Modal from '../../components/Common/Modal';
import TextField from '../../components/Common/TextField';
import Preloader from '../../components/Common/Preloader';
import fetchData from '../../utils/fetch';
import appContext from '../../context/appContext';
import Icon from '../../components/Common/Icon';

const useStyles = makeStyles(() => ({
  contentWrapper: {
    width: '414px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '20px',
    textAlign: 'left'
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
    textAlign: 'left'
  },
  addIcon: {
    height: '23px',
    marginRight: '10px'
  },
  btn: {
    minWidth: '184px',
    padding: '10px 30px',
    margin: '10px',
    background: '#B92941',
    color: '#fff',
    borderRadius: '20px',
    '&:hover': {
      background: '#b94739'
    },
    '&$buttonDisabled': {
      background: '#2E284E',
      color: 'rgba(255,255,255,0.5)'
    }
  },
  buttonDisabled: {}
}));

function PartyContainer(props) {
  const { openParty, handleCloseParty } = props;
  const { errorDispatch } = useContext(appContext);
  const classes = useStyles();

  const [party, setParty] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const closeModal = () => {
    handleCloseParty();
    setParty('');
  };

  const changeField = e => {
    if (e.target.name === 'party') {
      const regex = /[^0-9.]/;
      if (!regex.test(e.target.value)) {
        setParty(e.target.value);
      }
    }
  };

  // add funds
  const onSuccessParty = () => {
    setShowLoader(false);
    closeModal('');
  };

  const onErrorParty = payload => {
    setShowLoader(false);
    errorDispatch({ type: 'SET_ERROR', payload });
  };

  const joinParty = e => {
    e.preventDefault();
    setShowLoader(true);
    fetchData('/party/switch', 'POST', onSuccessParty, onErrorParty, {
      party: Number(party)
    });
  };

  const content = (
    <div className={classes.contentWrapper}>
      <Typography className={classes.title}>
        <Icon icon="addUser" className={classes.addIcon} /> Join Party
      </Typography>
      <Typography className={classes.text}>
        Earn more rewards when you team up with friends. Embark on bigger quests
        and get bigger rewards, together.
      </Typography>
      <Typography className={classes.text}>Enter Party Code Below</Typography>
      <form onSubmit={joinParty}>
        <TextField
          name="party"
          value={party}
          placeholder="Code"
          onChange={changeField}
          variant="outlined"
          fullWidth
        />
        {!showLoader ? (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={party === ''}
            className={classes.btn}
            classes={{ disabled: classes.buttonDisabled }}
          >
            Join
          </Button>
        ) : (
          <div className={classes.loader}>
            <Preloader />
          </div>
        )}
      </form>
    </div>
  );

  return (
    <Modal
      isOpened={openParty}
      closeModal={closeModal}
      content={content}
      noBtns
    />
  );
}

PartyContainer.propTypes = {
  openParty: PropTypes.bool,
  handleCloseParty: PropTypes.func
};

PartyContainer.defaultProps = {
  openParty: undefined,
  handleCloseParty: undefined
};

export default PartyContainer;
