import React from 'react';
import { Router } from 'react-router';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import server from '../../mocks/server';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Profile from './index';

const history = createMemoryHistory();
history.goBack = jest.fn();
window.prompt = jest.fn();

describe('Profile without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Profile />
        </ReducerProvider>
      </Router>
    );
  });

  test('should match the snapshot', () => {
    expect(screen).toMatchSnapshot();
  });

  // Static elements tests
  test('should have correct title', () => {
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  // Other tests
  test('should call goBack func on click at back arrow', () => {
    fireEvent.click(screen.getByTestId('back-btn'));
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });
});

describe('Profile with AppContext', () => {
  const contextData = {
    userData: {
      accountDetails: {
        address: {
          city: 'Test City',
          state: 'CA',
          street: 'Test St',
          unit: '99',
          zip: '12345'
        },
        email: 'test@email.com',
        firstName: 'testName',
        lastName: 'testLastName',
        mobileNumber: '4152319883',
        shippingAddress: {
          city: 'Test City',
          state: 'CA',
          street: 'Test St',
          unit: '99',
          zip: '12345'
        },
        '2fa': {
          enabled: false
        }
      },
      card: {
        account_id: '123123',
        account_number: 111111111111,
        cardNumber: '123743XXXXXX0123',
        card_id: 123123,
        passedCIP: true,
        routing_number: 222222222222
      }
    },
    errorDispatch: jest.fn(),
    userDataDispatch: jest.fn()
  };

  beforeAll(() => {
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('should send request to server to activate 2fa on click ', async () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('switch2fa'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Turn on 2FA Authentication'));
    expect(contextData.userDataDispatch).toHaveBeenCalledTimes(1);
  });

  test('should show error if 2fa request failed', async () => {
    server.use(
      rest.post('*/user/2fa/disable', (req, res, ctx) => {
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
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('switch2fa'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Turn on 2FA Authentication'));
    expect(contextData.errorDispatch).toHaveBeenCalledTimes(1);
  });

  test('should have 2fa switcher ON', () => {
    render(
      <Router history={history}>
        <AppContext.Provider
          value={{
            userData: {
              accountDetails: {
                '2fa': {
                  enabled: true
                }
              }
            },
            errorDispatch: () => {},
            userDataDispatch: () => {}
          }}
        >
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    const switcher = screen.getByTestId('switch2fa');
    expect(switcher).toHaveClass('Mui-checked');
  });

  test('should have 2fa switcher OFF', () => {
    render(
      <Router history={history}>
        <AppContext.Provider
          value={{
            userData: {
              accountDetails: {
                '2fa': {
                  enabled: false
                }
              }
            },
            errorDispatch: () => {},
            userDataDispatch: () => {}
          }}
        >
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    const switcher = screen.getByTestId('switch2fa');
    expect(switcher).not.toHaveClass('Mui-checked');
  });

  test('navigation between Profile and Personal Info views', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('back-to-profile-btn'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();
  });

  test('should show error message instead of component if something is wrong inside', () => {
    render(
      <Router history={history}>
        <AppContext.Provider
          value={{
            userData: {},
            errorDispatch: () => {},
            userDataDispatch: () => {}
          }}
        >
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(
      screen.getByText('Oops!!! Something went wrong')
    ).toBeInTheDocument();
  });

  test('Email updating success process', async () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('test@email.com'));
    expect(screen.getByText('New email')).toBeInTheDocument();

    const updateBtn = screen.getByText('Update');
    const emailField = screen.getByPlaceholderText('New email');
    const passwordField = screen.getByPlaceholderText('Password');

    fireEvent.change(emailField, { target: { value: 'newTest@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'Qwertyqwerty1-' } });

    fireEvent.click(updateBtn);
    expect(
      screen.getByText(
        'Do you really want to change your Email to newTest@test.com?'
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Yes'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );
    expect(contextData.userDataDispatch).toHaveBeenLastCalledWith({
      payload: { status: 'success', userData: expect.any(Object) },
      type: 'UPDATE_USER_DATA'
    });
  });

  test('Email updating failed process', async () => {
    server.use(
      rest.post('*/user/update', (req, res, ctx) => {
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
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('test@email.com'));
    expect(screen.getByText('New email')).toBeInTheDocument();

    const updateBtn = screen.getByText('Update');
    const emailField = screen.getByPlaceholderText('New email');
    const passwordField = screen.getByPlaceholderText('Password');

    fireEvent.change(emailField, { target: { value: 'newTest@test.com' } });
    fireEvent.change(passwordField, { target: { value: 'Qwertyqwerty1-' } });

    fireEvent.click(updateBtn);
    expect(
      screen.getByText(
        'Do you really want to change your Email to newTest@test.com?'
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Yes'));
    expect(screen.queryByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );

    expect(contextData.errorDispatch).toHaveBeenCalledWith({
      payload: 'Something is wrong, please try later.',
      type: 'SET_ERROR'
    });
  });

  test('Password updating success process', async () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Password'));
    expect(screen.getByText('Update your password')).toBeInTheDocument();

    const updateBtn = screen.getByText('Update');
    const oldPassField = screen.getByPlaceholderText('Old password');
    const newPassField = screen.getByPlaceholderText('New password');
    const newPassAgainField = screen.getByPlaceholderText('New password again');

    fireEvent.change(oldPassField, { target: { value: 'Qwertyqwerty1-' } });
    fireEvent.change(newPassField, { target: { value: 'Qwertyqwerty1-' } });
    fireEvent.change(newPassAgainField, {
      target: { value: 'Qwertyqwerty1-' }
    });

    fireEvent.click(updateBtn);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );
    expect(contextData.userDataDispatch).toHaveBeenLastCalledWith({
      payload: { status: 'success', userData: expect.any(Object) },
      type: 'UPDATE_USER_DATA'
    });
  });

  test('Password updating failed process', async () => {
    server.use(
      rest.post('*/user/update', (req, res, ctx) => {
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
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('pencil-icon'));
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.queryByText('Account Information')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Password'));
    expect(screen.getByText('Update your password')).toBeInTheDocument();

    const updateBtn = screen.getByText('Update');
    const oldPassField = screen.getByPlaceholderText('Old password');
    const newPassField = screen.getByPlaceholderText('New password');
    const newPassAgainField = screen.getByPlaceholderText('New password again');

    fireEvent.change(oldPassField, { target: { value: 'Qwertyqwerty1-' } });
    fireEvent.change(newPassField, { target: { value: 'Qwertyqwerty1-' } });
    fireEvent.change(newPassAgainField, {
      target: { value: 'Qwertyqwerty1-' }
    });

    fireEvent.click(updateBtn);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0)
    );
    expect(contextData.errorDispatch).toHaveBeenCalledWith({
      payload: 'Something is wrong, please try later.',
      type: 'SET_ERROR'
    });
  });

  test('Copy Routing number', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('routing-number'));
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  test('Copy Account number', () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Profile />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByTestId('account-number'));
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });
});
