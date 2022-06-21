import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import ReducerProvider from '../../context/reducerProvider';

import ForgotPassword from './index';

const history = createMemoryHistory();
history.push = jest.fn();

describe('ForgotPassword without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <ForgotPassword />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct title', () => {
    expect(screen.queryAllByText('Forgot your password?')).toHaveLength(1);
  });

  // Email field tests
  test('should have an email field', () => {
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('should show Email error if field is empty on submit', () => {
    const loginBtn = screen.getByText('Send Code');
    fireEvent.click(loginBtn);
    expect(screen.getByText('Email is incorrect')).toBeInTheDocument();
  });

  test('should not show Email error if field has valid data on submit', () => {
    const loginBtn = screen.getByText('Send Code');
    const emailField = screen.getByPlaceholderText('Email');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.click(loginBtn);
    expect(screen.queryAllByText('Email is incorrect')).toHaveLength(0);
  });
});
