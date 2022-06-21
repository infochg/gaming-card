import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Typography } from '@material-ui/core';
import TextField from '../../Common/TextField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import { ssnMask } from '../../../utils/helpers';
import CustButton from '../../Common/Button';

function Step7(props) {
  const { classes, submit, userData } = props;
  const [socialNumber, setSocialNumber] = useState(
    userData &&
      userData.identity &&
      userData.identity.id &&
      userData.identity.id !== 'applicationNotSent' &&
      userData.identity.id !== 'deleted'
      ? userData.identity.id
      : ''
  );

  const changeField = e => {
    if (e.target.name === 'socialNumber') {
      setSocialNumber(ssnMask(e.target.value));
    }
  };

  const setCursor = e => {
    if (e.target) {
      setTimeout(() => {
        e.target.setSelectionRange(
          e.target.value.length,
          e.target.value.length
        );
      }, 100);
    }
  };

  const ssnRegExp = new RegExp(
    /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/
  );

  try {
    const handleSubmit = e => {
      e.preventDefault();

      // eslint-disable-next-line
      let date_of_birth = cookie.load('date_of_birth');

      if (userData.identity && userData.identity.date_of_birth) {
        // eslint-disable-next-line
        date_of_birth = userData.identity.date_of_birth;
      }

      const data = {
        identity: {
          date_of_birth,
          id: null,
          id_type: 'ssn'
        }
      };
      if (socialNumber !== '') {
        data.identity.id = socialNumber;
      }
      submit(data);
    };

    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Enter your Social Security Number
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="socialNumber"
              value={socialNumber}
              placeholder="Add your social security number"
              label="Social Security"
              onChange={changeField}
              onFocus={setCursor}
              onMouseDown={setCursor}
              onKeyDown={setCursor}
              variant="outlined"
              fullWidth
              withToggle
            />
            <Typography className={`${classes.subtext} ${classes.center}`}>
              We need this to make sure you&lsquo;re a real person.
              <br />
              <br />
              Since Mythia is a debit card, signing up won&lsquo;t affect your
              credit score.
              <br />
              <br />
              Information is encrypted using SSL/TLS
            </Typography>
            <CustButton
              disabled={socialNumber === '' || !ssnRegExp.test(socialNumber)}
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

Step7.defaultProps = {
  classes: undefined,
  submit: undefined,
  userData: undefined
};

Step7.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string,
    subtext: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  submit: PropTypes.func,
  userData: PropTypes.shape({
    identity: PropTypes.shape({
      id: PropTypes.number,
      date_of_birth: PropTypes.string
    })
  })
};

export default Step7;
