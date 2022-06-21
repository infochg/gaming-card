import React from 'react';
import Signin from './screens/Signin';
import Registration from './screens/Registration';
import ForgotPassword from './screens/ForgotPassword';
import Overview from './screens/Overview';
import Transactions from './screens/Transactions';
import Party from './screens/Party';
import Rewards from './screens/Rewards';
import Statements from './screens/Statements';
import Profile from './screens/Profile';
import LinkedAccounts from './screens/LinkedAccounts';
import Support from './screens/Support';
import Inventory from './screens/Inventory';
import MyCard from './screens/MyCard';
import AddPromo from './screens/AddPromo';
import DirectDeposit from './screens/DirectDeposit';
import FreeAtms from './screens/FreeAtms';

export const systemRoutes = [
  {
    path: '/registration',
    component: <Registration />
  },
  {
    path: '/signin',
    component: <Signin />
  },
  {
    path: '/forgotpassword',
    component: <ForgotPassword />
  }
];

export const dashboardRoutes = [
  {
    title: 'Overview',
    icon: 'overview',
    path: '/overview',
    component: <Overview />
  },
  {
    title: 'Wallet',
    icon: 'wallet',
    path: '/wallet',
    component: <Transactions />
  },
  {
    title: 'Party',
    icon: 'users',
    path: '/party',
    component: <Party />
  },
  {
    title: 'Rewards Shop',
    icon: 'rewards',
    path: '/rewards-shop',
    component: <Rewards />
  },
  {
    title: 'Inventory',
    icon: 'inventory',
    path: '/inventory',
    component: <Inventory />
  }
];

export const settingsRoutes = [
  {
    path: '/settings/my-card',
    component: <MyCard />
  },
  {
    path: '/settings/accounts',
    component: <LinkedAccounts />
  },
  {
    path: '/settings/add-promo',
    component: <AddPromo />
  },
  {
    path: '/settings/direct-deposit',
    component: <DirectDeposit />
  },
  {
    path: '/settings/support',
    component: <Support />
  },
  {
    path: '/settings/statements',
    component: <Statements />
  },
  {
    path: '/settings/free-atms',
    component: <FreeAtms />
  },
  {
    path: '/settings',
    component: <Profile />
  }
];

export const otherRoutes = [];

export const indexRoutes = dashboardRoutes
  .concat(otherRoutes)
  .concat(settingsRoutes);
