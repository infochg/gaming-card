import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Support from './index';

const history = createMemoryHistory();
history.goBack = jest.fn();
window.Intercom = jest.fn();

describe('Support without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Support />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct title', () => {
    expect(screen.queryAllByText('Support')).toHaveLength(2);
  });

  // Other tests
  test('should call goBack func on click at back arrow', () => {
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });
});

describe('Support with AppContext', () => {
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
          <Support />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Chat'));
    expect(window.Intercom).toHaveBeenCalledTimes(2);
  });
});
