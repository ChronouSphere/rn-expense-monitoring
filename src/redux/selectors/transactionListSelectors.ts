import {createSelector} from '@reduxjs/toolkit';

const stateSelector = (state: TransactionModule.State.AppState) => state;

export const transactionListSelector = createSelector(
  stateSelector,
  (appState): TransactionModule.TransactionList[] => {
    return appState.transactionList ?? [];
  },
);
