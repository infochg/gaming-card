import React from 'react';
import { Router } from 'react-router';
import cookie from 'react-cookies';
import { rest } from 'msw';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import server from '../../mocks/server';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Signin from './index';

const history = createMemoryHistory();
history.push = jest.fn();

describe('Sign in without AppContext', () => {
  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Signin />
        </ReducerProvider>
      </Router>
    );
  });

  afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have greeting', () => {
    expect(screen.getByText('Welcome to Mythia')).toBeInTheDocument();
  });

  test('should have Forgot your password link', () => {
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument();
  });

  test('should have Register link', () => {
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  // Click at links tests
  test('should go to Register page when user click at Register link', () => {
    fireEvent.click(screen.getByText('Register'));
    expect(history.push).toHaveBeenCalledWith('/registration');
  });

  test('should go to Forgot password page when user click at Forgot password link', () => {
    fireEvent.click(screen.getByText('Forgot your password?'));
    expect(history.push).toHaveBeenCalledWith('/forgotpassword');
  });

  // Email field tests
  test('should have an email field', () => {
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  test('should show Email error if field is empty on submit', () => {
    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);
    expect(screen.getByText('Email is incorrect')).toBeInTheDocument();
  });

  test('should not show Email error if field has valid data on submit', () => {
    const loginBtn = screen.getByText('Log in');
    const emailField = screen.getByPlaceholderText('Enter your email');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.click(loginBtn);
    expect(screen.queryAllByText('Email is incorrect')).toHaveLength(0);
  });

  // Password field tests
  test('should have a password field', () => {
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
  });

  test('should show Password error if field is empty on submit', () => {
    const loginBtn = screen.getByText('Log in');
    fireEvent.click(loginBtn);
    expect(screen.getByText('Password field is empty')).toBeInTheDocument();
  });

  test('should not show Password error if field has valid data on submit', () => {
    const loginBtn = screen.getByText('Log in');
    const passwordField = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(passwordField, { target: { value: 'qwertyqwerty1-' } });
    fireEvent.click(loginBtn);
    expect(screen.queryAllByText('Password field is empty')).toHaveLength(0);
  });

  // Login process
  test('should have Log in button', () => {
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });

  test('should show 2FA modal if response has status 2faVerification', async () => {
    const loginBtn = screen.getByText('Log in');
    const emailField = screen.getByPlaceholderText('Enter your email');
    const passwordField = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'qwertyqwerty1-' } });
    fireEvent.click(loginBtn);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );

    expect(screen.getByText('Enter the 6 digit code')).toBeInTheDocument();

    cookie.remove('token');
    cookie.remove('2fa');
  });

  test('should redirect to overview if response has status success', async () => {
    server.use(
      rest.post('*/user/login', (req, res, ctx) => {
        return res(
          ctx.json({
            Authorization: 'testToken',
            status: 'success',
            _id: '123'
          })
        );
      })
    );

    const loginBtn = screen.getByText('Log in');
    const emailField = screen.getByPlaceholderText('Enter your email');
    const passwordField = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'qwertyqwerty1-' } });
    fireEvent.click(loginBtn);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );

    expect(history.push).toHaveBeenCalledWith('/overview');

    cookie.remove('token');
  });
});

describe('Sign in with AppContext', () => {
  const contextData = {
    userTokenDispatch: jest.fn(),
    errorDispatch: jest.fn()
  };

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should show error if response has status failed', async () => {
    server.use(
      rest.post('*/user/login', (req, res, ctx) => {
        return res(
          ctx.json({
            status: 'failed'
          })
        );
      })
    );

    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Signin />
        </AppContext.Provider>
      </Router>
    );

    const loginBtn = screen.getByText('Log in');
    const emailField = screen.getByPlaceholderText('Enter your email');
    const passwordField = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'qwertyqwerty1-' } });
    fireEvent.click(loginBtn);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );
    expect(contextData.errorDispatch).toHaveBeenCalledWith({
      payload: 'Something is wrong, please try later.',
      type: 'SET_ERROR'
    });
  });

  test('should show error if 2fa response has status failed!', async () => {
    server.use(
      rest.post('*/user/2fa/requestcode', (req, res, ctx) => {
        return res(
          ctx.json({
            status: 'failed'
          })
        );
      })
    );

    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Signin />
        </AppContext.Provider>
      </Router>
    );

    const loginBtn = screen.getByText('Log in');
    const emailField = screen.getByPlaceholderText('Enter your email');
    const passwordField = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(emailField, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'qwertyqwerty1-' } });
    fireEvent.click(loginBtn);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );
    expect(contextData.errorDispatch).toHaveBeenCalledWith({
      payload: 'Something is wrong, please, try again.',
      type: 'SET_ERROR'
    });

    cookie.remove('token');
    cookie.remove('2fa');
  });
});
