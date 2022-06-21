import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import server from '../../mocks/server';
import ReducerProvider from '../../context/reducerProvider';

import ErrorBoundary from './index';

const history = createMemoryHistory();

describe('Error Boundary', () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <ErrorBoundary error={{ stack: 'testStack' }} />
        </ReducerProvider>
      </Router>
    );
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have error message', () => {
    expect(
      screen.getByText('Oops!!! Something went wrong')
    ).toBeInTheDocument();
  });
});
