import {createReducer, isAnyOf} from '@reduxjs/toolkit';
import {APP_INITIAL_STATE} from './initialState';
import {transactionListAction} from '../actions/transactionListActions';

const transactionReducer = createReducer(APP_INITIAL_STATE, builder => {
  builder
    .addCase(transactionListAction.successRequestFetchApi, (state, action) => {
      return {
        ...state,
        transactionList: action.payload.transactionList,
      };
    })
    .addMatcher(
      isAnyOf(transactionListAction.failedRequestFetchApi),
      (state, _) => {
        return state;
      },
    );
});

export default transactionReducer;
