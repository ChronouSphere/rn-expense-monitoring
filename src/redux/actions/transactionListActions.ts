import {createAction} from '@reduxjs/toolkit';

export const transactionListAction = {
  startRequestFetchApi: createAction('TRANSACTIONS/START_REQUEST_FETCH'),
  successRequestFetchApi:
    createAction<TransactionModule.Action.RequestFetchSuccess>(
      'TRANSACTIONS/REQUEST_FETCH_SUCCESS',
    ),
  failedRequestFetchApi: createAction('TRANSACTIONS/REQUEST_FETCH_FAILURE'),
  requestShareTransactionDetails: createAction<TransactionModule.Transaction>(
    'TRANSACTIONS/REQUEST_SHARE_TRANSACTION',
  ),
  successShareTransaction: createAction(
    'TRANSACTIONS/SUCCESS_SHARE_TRANSACTION',
  ),
  cancelShareTransaction: createAction('TRANSACTIONS/CANCEL_SHARE_TRANSACTION'),
  failedShareTransaction: createAction('TRANSACTIONS/FAILED_SHARE_TRANSACTION'),
};
