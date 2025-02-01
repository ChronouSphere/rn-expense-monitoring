import {createAction} from '@reduxjs/toolkit';

export const transactionListAction = {
  startRequestFetchApi: createAction('TRANSACTIONS/START_REQUEST_FETCH'),
  successRequestFetchApi:
    createAction<TransactionModule.Action.RequestFetchSuccess>(
      'TRANSACTIONS/REQUEST_FETCH_SUCCESS',
    ),
  failedRequestFetchApi: createAction('TRANSACTIONS/REQUEST_FETCH_FAILURE'),
};
