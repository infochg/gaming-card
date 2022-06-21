import React from 'react';
import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '10px 0',
    width: '100%'
  },
  select: {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.border.default}`,
    height: '56px',
    padding: '0 5px',
    boxSizing: 'border-box',
    background: 'transparent',
    borderRadius: '0',
    fontSize: '18px',
    textAlign: 'left',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    '&:focus': {
      background: 'transparent'
    },
    '& .MuiSelect-select': {
      paddingLeft: '0',
      '&:focus': {
        background: 'transparent'
      },
      '& span': {
        // display: 'none'
        paddingRight: '20px'
      }
    },
    '& fieldset': {
      border: 'none'
    },
    '& svg': {
      color: theme.palette.text.lightGray
    }
  },
  birthDateSelect: {
    border: `1px solid ${theme.palette.border.default}`,
    background: '#fff',
    height: '56px',
    padding: '0 5px',
    boxSizing: 'border-box',
    borderRadius: '6px',
    fontSize: '20px',
    textAlign: 'left',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    '&:focus': {
      background: 'transparent'
    },
    '& .MuiSelect-select': {
      paddingLeft: '0',
      '&:focus': {
        background: 'transparent'
      },
      '& span': {
        display: 'none'
      }
    },
    '& fieldset': {
      border: 'none'
    },
    '& svg': {
      color: theme.palette.text.lightGray
    }
  },
  label: {
    fontSize: '18px',
    color: theme.palette.text.primary,
    padding: '0 10px 10px 10px',
    opacity: '0.7',
    textAlign: 'left'
  },
  iconOutlined: {
    color: theme.palette.text.primary
  },
  listRoot: {
    '& li:hover': {
      background: theme.palette.background.purpleWithOp
    },
    '& .Mui-selected': {
      background: theme.palette.background.purpleWithOp
    }
  },
  paperRoot: {
    background: '#fff'
  }
}));

function RenderSelectField({
  label,
  placeholder,
  input,
  children,
  styleType,
  ...custom
}) {
  const classes = useStyles();

  try {
    return (
      <FormControl className={classes.wrapper}>
        <InputLabel className={classes.label}>{label}</InputLabel>
        <Select
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...custom}
          displayEmpty
          className={
            styleType === 'birthDate' ? classes.birthDateSelect : classes.select
          }
          classes={{ iconOutlined: classes.iconOutlined }}
          MenuProps={{
            classes: {
              list: classes.listRoot
            },
            PopoverClasses: {
              paper: classes.paperRoot
            }
          }}
        >
          {placeholder ? (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          ) : null}
          {children}
        </Select>
      </FormControl>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
}

RenderSelectField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  meta: PropTypes.shape({
    invalid: PropTypes.bool,
    touched: PropTypes.bool,
    error: PropTypes.string
  }),
  children: PropTypes.node,
  styleType: PropTypes.string
};

RenderSelectField.defaultProps = {
  placeholder: undefined,
  label: undefined,
  input: undefined,
  meta: undefined,
  children: undefined,
  styleType: undefined
};

export default RenderSelectField;
