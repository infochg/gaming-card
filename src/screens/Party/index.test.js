import React from 'react';
import { Router } from 'react-router';
import { rest } from 'msw';
import shortid from 'shortid';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
import server from '../../mocks/server';
import ReducerProvider from '../../context/reducerProvider';
import AppContext from '../../context/appContext';

import Party from './index';

const history = createMemoryHistory();

describe('Party without AppContext', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <ReducerProvider>
          <Party />
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
      screen.getByText('You have finished all your challenges')
    ).toBeInTheDocument();
  });
});

describe('Party with AppContext', () => {
  const mockedFn = jest.fn();

  const contextData = {
    anonId: `anon-${shortid.generate()}`,
    userData: {
      party: {
        challenges: [
          {
            currentValue: 1,
            id: 1,
            maxValue: 1,
            reward: { amount: 100, type: 'gems' },
            status: 'complete',
            tag: 'groceries',
            title: 'Make a purchase at a grocery store'
          }
        ],
        members: [
          {
            email: 'test@mail.com',
            firstName: 'testName',
            lastName: 'testLastName'
          }
        ],
        originalPartyID: 1,
        partyID: 1,
        resetTime: 1613951940.0
      }
    },
    errorDispatch: jest.fn()
  };

  beforeAll(() => {
    window.addEventListener('update-userdata', mockedFn);
    server.listen({
      onUnhandledRequest: 'warn'
    });
  });
  afterEach(() => server.resetHandlers());
  afterAll(() => {
    window.removeEventListener('update-userdata', mockedFn);
    server.close();
  });

  test('claiming prize process', async () => {
    render(
      <Router history={history}>
        <AppContext.Provider value={{ ...contextData }}>
          <Party />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Claim Prize'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Claim Your Prize'));
    expect(
      screen.getByText(
        'Your prize will be sent to your inventory on the home page.'
      )
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Collect'));
    await waitFor(() => screen.getByText('Party Challenges'));

    expect(mockedFn).toHaveBeenCalledTimes(1);
  });

  test('error claiming prize process', async () => {
    server.use(
      rest.post('*/party/claimPrize', (req, res, ctx) => {
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
          <Party />
        </AppContext.Provider>
      </Router>
    );

    fireEvent.click(screen.getByText('Claim Prize'));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Claim Your Prize'));
    expect(contextData.errorDispatch).toHaveBeenCalledTimes(1);
  });

  test('should show error message instead of component if something is wrong inside', () => {
    render(
      <Router history={history}>
        <AppContext.Provider
          value={{
            userData: {
              party: {
                challenges: [{}]
              }
            }
          }}
        >
          <Party />
        </AppContext.Provider>
      </Router>
    );

    expect(
      screen.getByText('Oops!!! Something went wrong')
    ).toBeInTheDocument();
  });
});
