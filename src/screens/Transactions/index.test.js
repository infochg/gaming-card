import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import fetchData from '../../utils/fetch';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Transactions from './index';

const history = createMemoryHistory();
jest.mock('../../utils/fetch');

describe('Transactions without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Transactions />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have placeholder', () => {
    expect(
      screen.getByText('You don‘t have transactions yet.')
    ).toBeInTheDocument();
  });

  //  Other tests
  test('should send request if Env is Development', () => {
    const curEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const title = screen.getByText('Transactions');
    fireEvent.click(title);

    expect(fetchData).toHaveBeenCalledTimes(1);

    process.env.NODE_ENV = curEnv;
  });

  test('should NOT send request if Env is Production', () => {
    const curEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const title = screen.getByText('Transactions');
    fireEvent.click(title);

    expect(fetchData).toHaveBeenCalledTimes(0);

    process.env.NODE_ENV = curEnv;
  });
});

describe('Transactions with AppContext', () => {
  test('should show error message instead of component if something is wrong inside', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{}}>
          <Transactions />
        </AppContext.Provider>
      </Router>
    );

    expect(
      screen.getByText('Oops!!! Something went wrong')
    ).toBeInTheDocument();
  });
});
