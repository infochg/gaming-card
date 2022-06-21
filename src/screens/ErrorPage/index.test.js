import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';

import ErrorPage from './index';

const history = createMemoryHistory();
history.push = jest.fn();

describe('ErrorPage without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <ErrorPage />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct title', () => {
    expect(screen.queryAllByText('Something is wrong')).toHaveLength(1);
  });

  test('should redirect to homepage', () => {
    fireEvent.click(screen.getByText('Go home'));

    expect(history.push).toHaveBeenCalledWith('/');
  });
});
