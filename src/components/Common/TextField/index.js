import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';
import Icon from '../Icon';

import warning from '../../../assets/img/warning-ico.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '10px 0',
    position: 'relative'
  },
  input: {
    padding: '16px 14px',
    borderRadius: '8px',
    height: 'auto',
    lineHeight: '25px'
  },
  label: {
    fontSize: '18px',
    color: theme.palette.text.primary,
    padding: '0 10px 10px 10px',
    opacity: '0.7',
    textAlign: 'left'
  },
  root: {
    background: '#fff',
    borderRadius: '8px',
    height: 'auto',
    lineHeight: 'inherit',
    '&.Mui-focused fieldset': {
      borderColor: `${theme.palette.border.default} !important`,
      borderWidth: '1px !important'
    },
    '&:hover fieldset': {
      borderColor: `${theme.palette.border.purple} !important`
    }
  },
  notchedOutline: {
    borderColor: theme.palette.border.default
  },
  errorText: {
    fontSize: '13px',
    margin: '0 0 5px 0',
    padding: '8px 15px',
    borderRadius: '5px',
    color: theme.palette.text.darkRed,
    background: theme.palette.background.redWithOp,
    textAlign: 'left'
  },
  errorField: {
    '& fieldset': {
      borderColor: theme.palette.border.red
    },
    '& label': {
      color: theme.palette.text.darkRed
    }
  },
  eyeIcon: {
    position: 'absolute',
    right: '15px',
    top: '32px',
    height: '15px',
    cursor: 'pointer',
    opacity: '0.6'
  },
  warnIcon: {
    margin: '-1px 5px 0 0',
    float: 'left'
  }
}));

function RenderTextField({
  label,
  placeholder,
  input,
  validation,
  isVisible,
  withToggle,
  ...custom
}) {
  const classes = useStyles();

  const [fieldType, setFieldType] = useState(
    custom.type === 'password' ? 'password' : 'text'
  );

  useEffect(() => {
    if (isVisible) {
      if (fieldType === 'password') {
        setFieldType('text');
      }
    }
  }, [isVisible]);

  try {
    // show-hide value (for password)
    const togglePasswordFiledType = () => {
      if (fieldType === 'password') {
        setFieldType('text');
      } else {
        setFieldType('password');
      }
    };

    return (
      <div className={classes.wrapper}>
        {/* <InputLabel className={classes.label}>{label}</InputLabel> */}
        <TextField
          className={`${classes.textfield} ${
            validation && validation !== '' ? classes.errorField : ''
          }`}
          placeholder={placeholder}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...input}
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...custom}
          InputProps={{
            classes: {
              input: classes.input,
              root: classes.root,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline
            }
          }}
          label={label}
          type={fieldType}
          autoComplete={
            custom && custom.type === 'password' ? 'new-password' : ''
          }
        />

        {withToggle && (
          <Icon
            onClick={togglePasswordFiledType}
            icon={fieldType === 'password' ? 'eye' : 'eye-slash'}
            className={classes.eyeIcon}
          />
        )}

        {validation && validation !== '' && (
          <div className={classes.errorText}>
            <img src={warning} alt="" className={classes.warnIcon} />{' '}
            {validation}
          </div>
        )}
      </div>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RenderTextField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  validation: PropTypes.string,
  isVisible: PropTypes.bool,
  withToggle: PropTypes.bool
};

RenderTextField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  input: undefined,
  validation: undefined,
  isVisible: undefined,
  withToggle: undefined
};

export default RenderTextField;
