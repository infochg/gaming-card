import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import CardStolen from './index';

const history = createMemoryHistory();
window.Intercom = jest.fn();

describe('CardStolen without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <CardStolen />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct text', () => {
    expect(
      screen.queryAllByText(
        'We’ll deactivate your stolen debit card, give you a new card number, and mail you a new debit card.'
      )
    ).toHaveLength(1);
  });
});

describe('CardStolen with AppContext', () => {
  test('should open Intercom', () => {
    render(
      <Router history={history}>
        <AppContext.Provider
          value={{
            userData: {
              accountDetails: {
                email: 'test@email.com',
                firstName: 'testName',
                lastName: 'testLastName',
                mobileNumber: '4152319883'
              }
            }
          }}
        >
          <CardStolen />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Continue'));
    expect(
      screen.queryAllByText(
        'There will be a $5 Card Replacement Fee assessed to your account when your new card is issued. Your new card should arrive in 7-10 business days.'
      )
    ).toHaveLength(1);

    fireEvent.click(screen.getByText('Confirm'));
    expect(window.Intercom).toHaveBeenCalledTimes(2);
  });
});
