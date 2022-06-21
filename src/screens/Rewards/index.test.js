import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Rewards from './index';

const history = createMemoryHistory();
window.Intercom = jest.fn();

describe('Rewards without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Rewards />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have list of categories', () => {
    expect(screen.getByText('Games')).toBeInTheDocument();
  });
});

describe('Rewards with AppContext', () => {
  test('should open Intercom when user click at category', () => {
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
          <Rewards />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Games'));

    expect(window.Intercom).toHaveBeenCalledTimes(2);
  });
});
