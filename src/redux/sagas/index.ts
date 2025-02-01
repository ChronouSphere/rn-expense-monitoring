import {all, call, put, take} from 'redux-saga/effects';
import {transactionListAction} from '../actions/transactionListActions';
import transactionApi from '../../api/transactionApi';

function* fetchTransactionListRuntime() {
  while (true) {
    yield take(transactionListAction.startRequestFetchApi);

    const response: TransactionModule.TransactionList[] = yield call(
      transactionApi.getTransactionList,
    );

    // succesfull call will return list otherwise its 'undefined'
    if (!!response) {
      const transactionList = response;
      yield put(
        transactionListAction.successRequestFetchApi({transactionList}),
      );
    } else {
      // lifecycle, can perform better handling here
      yield put(transactionListAction.failedRequestFetchApi());
    }
  }
}

export default function* allRuntimes() {
  yield all([call(fetchTransactionListRuntime)]);
}
