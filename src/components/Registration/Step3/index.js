import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

function Step3(props) {
  const { classes, submit, userData } = props;
  const [firstName, setFirstName] = useState(
    userData && userData.firstName ? userData.firstName : ''
  );
  const [lastName, setLastName] = useState(
    userData && userData.lastName ? userData.lastName : ''
  );

  const changeField = e => {
    const regex = /[^A-Za-z-]/;

    if (e.target.name === 'firstName') {
      if (!regex.test(e.target.value) && e.target.value.length < 26) {
        setFirstName(e.target.value);
      }
    } else if (e.target.name === 'lastName') {
      if (!regex.test(e.target.value) && e.target.value.length < 26) {
        setLastName(e.target.value);
      }
    }
  };

  try {
    const handleSubmit = e => {
      e.preventDefault();
      const data = {};
      if (firstName !== '') {
        data.firstName = firstName;
      }
      if (lastName !== '') {
        data.lastName = lastName;
      }

      submit(data);
    };

    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Enter your name
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="firstName"
              value={firstName}
              placeholder="Add your first name"
              label="First Name"
              onChange={changeField}
              variant="outlined"
              fullWidth
            />
            <TextField
              name="lastName"
              value={lastName}
              placeholder="Add your last name"
              label="Last Name"
              onChange={changeField}
              variant="outlined"
              fullWidth
            />
            <CustButton
              disabled={firstName === '' || lastName === ''}
              type="submit"
              btnstyle="system"
              fullWidth
              subclass={classes.btnWithMarg}
            >
              Continue
            </CustButton>
          </form>
        </div>
      </React.Fragment>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

Step3.defaultProps = {
  classes: undefined,
  submit: undefined,
  userData: undefined
};

Step3.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  submit: PropTypes.func,
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};

export default Step3;
