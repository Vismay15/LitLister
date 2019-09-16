import Transaction from './Transaction';
import TransactionHistory from './TransactionHistory';

export default [
  {
    path: '/transaction/',
    exact: true,
    component: TransactionHistory
  },
  {
    path: '/transaction/:tid',
    exact: true,
    component: Transaction
  }
];
