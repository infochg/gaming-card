import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Typography, MenuItem } from '@material-ui/core';
import TextField from '../../Common/TextField';
import SelectField from '../../Common/SelectField';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import CustButton from '../../Common/Button';

const days = Array.from({ length: 31 }, (v, i) => i + 1);

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function Step5(props) {
  const { classes, submit, userData } = props;

  const birthDayArray =
    userData && userData.identity && userData.identity.date_of_birth
      ? userData.identity.date_of_birth.split('-')
      : [];

  const [birthMonth, setBirthMonth] = useState(
    birthDayArray[1]
      ? months[Number(birthDayArray[1].replace(/^0+/, '')) - 1]
      : 'January'
  );
  const [birthDay, setBirthDay] = useState(
    birthDayArray[2] ? birthDayArray[2].replace(/^0+/, '') : 1
  );
  const [birthYear, setBirthYear] = useState(birthDayArray[0] || '');

  // eslint-disable-next-line
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(
      moment(`${birthMonth} ${birthDay} ${birthYear}`, 'MMMM DD YYYY').isAfter(
        moment().subtract(99, 'years')
      ) &&
        moment(
          `${birthMonth} ${birthDay} ${birthYear}`,
          'MMMM DD YYYY'
        ).isBefore(moment().subtract(18, 'years'))
    );
  }, [userData, birthMonth, birthDay, birthYear]);

  const changeField = e => {
    if (e.target.name === 'birthDay') {
      setBirthDay(e.target.value);
    } else if (e.target.name === 'birthMonth') {
      setBirthMonth(e.target.value);
    } else if (e.target.name === 'birthYear') {
      if (!/[^0-9]/.test(e.target.value) && e.target.value.length < 5) {
        setBirthYear(e.target.value);
      }
    }

    return userData;
  };

  try {
    const handleSubmit = e => {
      e.preventDefault();
      const data = {
        identity: { date_of_birth: null, id: null, id_type: null }
      };

      if (birthDay !== '' && birthMonth !== '' && birthYear !== '') {
        const formattedDate = moment(
          `${birthMonth} ${birthDay} ${birthYear}`,
          'MMMM DD YYYY'
        ).format('YYYY-MM-DD');

        cookie.save('date_of_birth', formattedDate, {
          path: '/',
          sameSite: 'Lax'
        });

        data.identity.date_of_birth = formattedDate;
      }

      submit(data);
    };

    return (
      <React.Fragment>
        <Typography className={`${classes.h1} ${classes.center}`}>
          Enter your Date of Birth
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit}>
            <div className={classes.birthDateBlock}>
              <SelectField
                name="birthMonth"
                variant="outlined"
                type="text"
                onChange={changeField}
                fullWidth
                value={birthMonth}
                styleType="birthDate"
              >
                {months.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectField>
              <SelectField
                name="birthDay"
                variant="outlined"
                type="text"
                onChange={changeField}
                fullWidth
                value={birthDay}
                styleType="birthDate"
              >
                {days.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </SelectField>
              <TextField
                name="birthYear"
                value={birthYear}
                placeholder="0000"
                onChange={changeField}
                variant="outlined"
                fullWidth
              />
            </div>
            <CustButton
              disabled={
                birthDay === '' ||
                birthMonth === '' ||
                birthYear === '' ||
                birthYear.length < 4 ||
                !isCorrect
              }
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

Step5.defaultProps = {
  classes: undefined,
  submit: undefined,
  userData: undefined
};

Step5.propTypes = {
  classes: PropTypes.shape({
    h1: PropTypes.string,
    center: PropTypes.string,
    form: PropTypes.string,
    birthDateBlock: PropTypes.string,
    btnWithMarg: PropTypes.string
  }),
  submit: PropTypes.func,
  userData: PropTypes.shape({
    identity: PropTypes.shape({
      date_of_birth: PropTypes.string
    })
  })
};

export default Step5;
