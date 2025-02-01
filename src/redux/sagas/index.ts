import {all, call, put, take} from 'redux-saga/effects';
import {transactionListAction} from '../actions/transactionListActions';
import transactionApi from '../../api/transactionApi';
import {Share, ShareAction} from 'react-native';
import {generateTransactionDetailsMessage} from '../../util/commonUtil';

function* fetchTransactionListRuntime() {
  while (true) {
    yield take(transactionListAction.startRequestFetchApi);

    const response: TransactionModule.Transaction[] = yield call(
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

function* shareTransactionDetailsRuntime() {
  while (true) {
    const action: TransactionModule.Action.ReduxAction = yield take(
      transactionListAction.requestShareTransactionDetails,
    );

    try {
      const transactionItem: TransactionModule.Transaction = action.payload;
      const message = generateTransactionDetailsMessage(transactionItem);

      const result: ShareAction = yield Share.share({
        message: message,
        title: 'Transaction Details',
      });

      // do nothing in any cases prompting user would be too intrusive
      if (result.action) {
        yield put(transactionListAction.successShareTransaction());
      } else if (result.action === Share.dismissedAction) {
        yield put(transactionListAction.cancelShareTransaction());
      }
    } catch (error) {
      // lifecycle, can perform better handling here
      yield put(transactionListAction.failedShareTransaction());
    }
  }
}

export default function* allRuntimes() {
  yield all([
    call(fetchTransactionListRuntime),
    call(shareTransactionDetailsRuntime),
  ]);
}
