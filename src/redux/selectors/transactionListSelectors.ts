import {createSelector} from '@reduxjs/toolkit';

const stateSelector = (state: TransactionModule.State.AppState) =>
  state.transactionReducer;

export const transactionListSelector = createSelector(
  stateSelector,
  (appState): TransactionModule.Transaction[] => {
    const transactions = appState.transactionList ?? [];

    const sortedTransactions = [...transactions].sort((a, b) => {
      const dateA = new Date(a.transferDate);
      const dateB = new Date(b.transferDate);

      return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
    });

    return sortedTransactions;
  },
);

const incomingTransactionsSelector = createSelector(
  transactionListSelector, // Use the existing selector for the full list
  (transactions): TransactionModule.Transaction[] => {
    return transactions.filter(transaction => !transaction.isExpenditure); // Filter for incoming
  },
);

const outgoingTransactionsSelector = createSelector(
  transactionListSelector, // Use the existing selector for the full list
  (transactions): TransactionModule.Transaction[] => {
    return transactions.filter(transaction => transaction.isExpenditure); // Filter for outgoing
  },
);

export const incomingTransactionsAmountSelector = createSelector(
  incomingTransactionsSelector,
  (transactions): number => {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
  },
);

export const outgoingTransactionsAmountSelector = createSelector(
  outgoingTransactionsSelector,
  (transactions): number => {
    return transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
  },
);

// assumption is that incoming - outgoing = total balance
export const totalBalanceSelector = createSelector(
  incomingTransactionsAmountSelector,
  outgoingTransactionsAmountSelector,
  (incomingAmount, outgoingAmount): number => {
    return incomingAmount - outgoingAmount;
  },
);
