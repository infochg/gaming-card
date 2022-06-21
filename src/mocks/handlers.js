import { rest } from 'msw';
import mockUserData from './main.json';

const handlers = [
  rest.post('https://api.segment.io/v1/batch', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  rest.post('*/admin/saveErrorLog', (req, res, ctx) => {
    return res(ctx.json({}));
  }),
  // rest.get('*/userData/main', (req, res, ctx) => {
  //   return res(
  //     ctx.json({
  //       ...mockUserData
  //     })
  //   );
  // }),
  rest.post('*/user/login', (req, res, ctx) => {
    return res(
      ctx.json({
        Authorization: 'testToken',
        status: '2faVerification',
        _id: '123'
      })
    );
  }),
  rest.post('*/user/2fa/requestcode', (req, res, ctx) => {
    return res(
      ctx.json({
        expiration: 1616183251,
        status: 'success'
      })
    );
  }),
  rest.post('*/party/claimPrize', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        userData: { ...mockUserData }
      })
    );
  }),
  rest.post('*/money/addTestTransaction', (req, res, ctx) => {
    return res(
      ctx.json({
        galileoData: { transaction_id: 42231 },
        userData: { ...mockUserData }
      })
    );
  }),
  rest.post('*/user/2fa/enable', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        '2fa': { enabled: true }
      })
    );
  }),
  rest.post('*/user/2fa/disable', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        '2fa': { enabled: false }
      })
    );
  }),
  rest.post('*/user/update', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'success',
        userData: {
          ...mockUserData,
          accountDetails: {
            ...mockUserData.accountDetails,
            email: 'newTest@test.com'
          }
        }
      })
    );
  })
];

export default handlers;
