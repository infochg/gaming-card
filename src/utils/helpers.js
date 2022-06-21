// eslint-disable-next-line
import React from 'react';

export const phoneMask = value => {
  const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  // eslint-disable-next-line
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
};

export const ssnMask = value => {
  const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
  // eslint-disable-next-line
  return !x[2] ? x[1] : x[1] + '-' + x[2] + (x[3] ? '-' + x[3] : '');
};

export const splitAmount = value => {
  let splittedVal = value.toString().split('.');

  if (Number(value) < 0) {
    splittedVal = (
      <React.Fragment>
        -$
        {Math.abs(splittedVal[0])
          .toString()
          .replace(
            /\d(?=(?:\d{3})+\b)/g,
            // eslint-disable-next-line
            '$&' + ','
          )}
        {splittedVal[1] && <span>.{splittedVal[1]}</span>}
      </React.Fragment>
    );
  } else {
    splittedVal = (
      <React.Fragment>
        $
        {Math.abs(splittedVal[0])
          .toString()
          .replace(
            /\d(?=(?:\d{3})+\b)/g,
            // eslint-disable-next-line
            '$&' + ','
          )}
        {splittedVal[1] && <span>.{splittedVal[1]}</span>}
      </React.Fragment>
    );
  }
  return splittedVal;
};
