import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';
import ErrorBoundary from '../../../containers/ErrorBoundary';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '740px',
    background: 'transparent',
    margin: '0 auto'
  },
  active: {
    marginTop: '-3px',
    color: `${theme.palette.background.purple} !important`,
    borderRadius: '100%',
    boxShadow: '0px 0px 13px 0px rgba(71,53,190,0.5)',
    '& text': {
      fontFamily: 'Oswald',
      fontSize: '12px'
    }
  },
  completed: {
    '& svg': {
      color: 'transparent !important',
      fontSize: '1px',
      width: '24px',
      height: '24px',
      background: theme.palette.background.purple,
      borderRadius: '100%'
    }
  },
  disabledLabel: {
    '& text': {
      display: 'none'
    },
    '& svg': {
      color: 'transparent !important',
      fontSize: '1px',
      width: '24px',
      height: '24px',
      background: '#fff',
      borderRadius: '100%',
      border: `2px solid ${theme.palette.border.purpleWithOp}`
    }
  },
  contentRoot: {
    borderTop: `1px solid ${theme.palette.border.purpleWithOp}`,
    width: '100%',
    marginLeft: '-10%',
    zIndex: '-1'
  },
  connectorLine: {
    borderTop: `1px solid ${theme.palette.border.purpleWithOp}`
  }
}));

const CustStepper = props => {
  const classes = useStyles();
  const { step } = props;
  const steps = ['', '', '', '', '', '', ''];

  try {
    return (
      <Stepper
        alternativeLabel
        connector={
          <StepConnector
            classes={{
              line: classes.connectorLine,
              root: classes.contentRoot
            }}
          />
        }
        activeStep={step}
        classes={{
          root: classes.root
        }}
      >
        {steps.map(label => (
          <Step
            key={shortid.generate()}
            classes={{
              root: classes.rootStep,
              completed: classes.completed
            }}
          >
            <StepLabel
              classes={{
                disabled: classes.disabledLabel
              }}
              StepIconProps={{
                classes: {
                  active: classes.active
                }
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    );
  } catch (e) {
    return <ErrorBoundary error={e} />;
  }
};

CustStepper.defaultProps = {
  step: undefined
};

CustStepper.propTypes = {
  step: PropTypes.number
};

export default CustStepper;
