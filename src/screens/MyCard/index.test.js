import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';

import MyCard from './index';

const history = createMemoryHistory();

describe('MyCard without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <MyCard />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have Report a Problem block', () => {
    expect(screen.getByText('Report a Problem')).toBeInTheDocument();
  });
});

describe('MyCard with AppContext', () => {
  test('should call goBack func on click at back arrow', () => {
    const goBack = jest.fn();

    render(
      <Router history={history}>
        <ReducerProvider value={{}}>
          <MyCard goBack={goBack} />
        </ReducerProvider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('back-btn'));
    expect(goBack).toHaveBeenCalledTimes(1);
  });
});
