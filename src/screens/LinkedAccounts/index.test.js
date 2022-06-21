import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';
// import AppContext from '../../context/appContext';

import LinkedAccounts from './index';
import AppContext from '../../context/appContext';

const history = createMemoryHistory();
history.goBack = jest.fn();

describe('LinkedAccounts without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <LinkedAccounts />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct title', () => {
    expect(screen.queryAllByText('Linked Accounts')).toHaveLength(2);
  });

  // Other tests
  test('should call goBack func on click at back arrow', () => {
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });
});

describe('LinkedAccounts with AppContext', () => {
  const contextData = {
    userData: {
      accountDetails: {
        '2fa': {
          code: { expiration: 1613751358 },
          enabled: false,
          phoneIsVerified: true
        },
        linkedAccounts: [
          {
            galileoAccountID: 17908,
            lastFour: '0000',
            name: 'Plaid Checking',
            plaidFundingAccountID: '6WP6abpXVQTeKKxeRaN1tA19mqrNbLugBpGld',
            plaidItemID: 'vVLDxWvB1dcm889mrvL3uDgDRga37duqN6mNA',
            subtype: 'checking',
            type: 'depository'
          }
        ]
      }
    },
    errorDispatch: jest.fn(),
    isAddAccountOpenDispatch: jest.fn(),
    isPaymentOpenDispatch: jest.fn()
  };

  test('open Modal when user click at Add Linked Account button', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <LinkedAccounts />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('add-account'));

    expect(contextData.isAddAccountOpenDispatch).toHaveBeenLastCalledWith({
      payload: { isOpen: true },
      type: 'SET_IS_ADD_ACCOUNT_OPEN'
    });
  });

  test('open Modal when user click at one of Linked Accounts', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <LinkedAccounts />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Plaid Checking'));

    expect(contextData.isPaymentOpenDispatch).toHaveBeenLastCalledWith({
      payload: {
        isOpen: {
          galileoAccountID: 17908,
          lastFour: '0000',
          name: 'Plaid Checking',
          plaidFundingAccountID: '6WP6abpXVQTeKKxeRaN1tA19mqrNbLugBpGld',
          plaidItemID: 'vVLDxWvB1dcm889mrvL3uDgDRga37duqN6mNA',
          subtype: 'checking',
          type: 'depository'
        }
      },
      type: 'SET_IS_PAYMENT_OPEN'
    });
  });

  test('should show error message instead of component if something is wrong inside', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{}}>
          <LinkedAccounts />
        </AppContext.Provider>
      </Router>
    );

    expect(
      screen.getByText('Oops!!! Something went wrong')
    ).toBeInTheDocument();
  });
});
