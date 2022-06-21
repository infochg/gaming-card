import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import server from '../../mocks/server';
import ReducerProvider from '../../context/reducerProvider';

import Overview from './index';

const history = createMemoryHistory();

describe('Overview', () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Overview />
        </ReducerProvider>
      </Router>
    );
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });
});
