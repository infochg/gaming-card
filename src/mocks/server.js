import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import handlers from './handlers';

const server = setupServer(...handlers);

export default server;
