declare namespace TransactionModule {
  namespace Action {
    interface RequestFetchSuccess {
      transactionList: TransactionList[];
    }
    export interface ReduxAction<T = any> {
      type: string;
      payload?: T;
    }
  }

  interface TransactionList {
    refId: string;
    transferDate: string;
    recipientName: string;
    transferName: string;
    amount: number;
  }

  declare namespace State {
    interface AppState {
      transactionList: TransactionList[] | [];
    }
  }
}
