import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../TextField';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: '400px',
    margin: '30px auto 0 auto',
    textAlign: 'center'
  },
  modalBtns: {
    paddingTop: '20px'
  },
  negatBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px',
    borderRadius: '20px',
    background: '#2E284E',
    fontWeight: '600',
    border: '1px solid rgba(255,255,255,0.5)',
    color: 'rgba(255,255,255,0.5)',
    '&:hover': {
      background: '#2e2c53'
    }
  },
  positBtn: {
    width: '144px',
    padding: '6px 10px',
    margin: '10px',
    background: '#B92941',
    color: '#fff',
    borderRadius: '20px',
    fontWeight: '600',
    '&:hover': {
      background: '#b94739'
    }
  },
  loader: {
    margin: '30px auto'
  },
  codeWrapper: {
    display: 'flex',
    '& > div': {
      padding: '0 8px',
      '& input': {
        textAlign: 'center'
      }
    }
  },
  codeText: {
    textAlign: 'left',
    fontSize: '16px',
    fontFamily: 'Roboto',
    paddingLeft: '8px',
    color: '#B6B6B6'
  },
  [theme.breakpoints.down('xs')]: {
    codeWrapper: {
      '& > div': {
        padding: '0 4px',
        '& input': {
          textAlign: 'center',
          paddingLeft: '4px',
          paddingRight: '4px'
        }
      }
    }
  }
}));

function CodeInput(props) {
  const classes = useStyles();
  const { onChange } = props;
  const [code, setCode] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: ''
  });

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();

  const isNumber = num => {
    return /[^0-9]/.test(num);
  };

  const changeField = e => {
    if (e.target.name === 'code1') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 1: e.target.value });
        if (
          inputRef2.current &&
          inputRef1.current &&
          inputRef1.current.value !== ''
        ) {
          inputRef2.current.focus();
        }
      }
    } else if (e.target.name === 'code2') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 2: e.target.value });
        if (
          inputRef3.current &&
          inputRef2.current &&
          inputRef2.current.value !== ''
        ) {
          inputRef3.current.focus();
        }
      }
    } else if (e.target.name === 'code3') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 3: e.target.value });
        if (
          inputRef4.current &&
          inputRef3.current &&
          inputRef3.current.value !== ''
        ) {
          inputRef4.current.focus();
        }
      }
    } else if (e.target.name === 'code4') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 4: e.target.value });
        if (
          inputRef5.current &&
          inputRef4.current &&
          inputRef4.current.value !== ''
        ) {
          inputRef5.current.focus();
        }
      }
    } else if (e.target.name === 'code5') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 5: e.target.value });
        if (
          inputRef6.current &&
          inputRef5.current &&
          inputRef5.current.value !== ''
        ) {
          inputRef6.current.focus();
        }
      }
    } else if (e.target.name === 'code6') {
      if (!isNumber(e.target.value) && e.target.value.length < 2) {
        setCode({ ...code, 6: e.target.value });
      }
    }
  };

  const onKeyDown = e => {
    if (e.keyCode === 8) {
      if (e.target.name === 'code2') {
        if (
          inputRef1.current &&
          inputRef2.current &&
          inputRef2.current.value === ''
        ) {
          inputRef1.current.focus();
        }
      } else if (e.target.name === 'code3') {
        if (
          inputRef2.current &&
          inputRef3.current &&
          inputRef3.current.value === ''
        ) {
          inputRef2.current.focus();
        }
      } else if (e.target.name === 'code4') {
        if (
          inputRef3.current &&
          inputRef4.current &&
          inputRef4.current.value === ''
        ) {
          inputRef3.current.focus();
        }
      } else if (e.target.name === 'code5') {
        if (
          inputRef4.current &&
          inputRef5.current &&
          inputRef5.current.value === ''
        ) {
          inputRef4.current.focus();
        }
      } else if (e.target.name === 'code6') {
        if (
          inputRef5.current &&
          inputRef6.current &&
          inputRef6.current.value === ''
        ) {
          inputRef5.current.focus();
        }
      }
    }
  };

  useEffect(() => {
    onChange(Object.values(code).join(''));
  }, [code]);

  return (
    <div className={classes.codeWrapper}>
      <TextField
        name="code1"
        value={code[1]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef1}
      />
      <TextField
        name="code2"
        value={code[2]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef2}
      />
      <TextField
        name="code3"
        value={code[3]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef3}
      />
      <TextField
        name="code4"
        value={code[4]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef4}
      />
      <TextField
        name="code5"
        value={code[5]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef5}
      />
      <TextField
        name="code6"
        value={code[6]}
        onChange={changeField}
        onKeyDown={onKeyDown}
        variant="outlined"
        fullWidth
        inputRef={inputRef6}
      />
    </div>
  );
}

CodeInput.propTypes = {
  onChange: PropTypes.func
};

CodeInput.defaultProps = {
  onChange: undefined
};

export default CodeInput;
