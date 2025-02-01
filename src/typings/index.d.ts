declare namespace TransactionModule {
  namespace Action {
    interface RequestFetchSuccess {
      transactionList: Transaction[];
    }
    export interface ReduxAction<T = any> {
      type: string;
      payload?: T;
    }
  }

  interface Transaction {
    refId: string;
    transferDate: string;
    recipientName: string;
    transferName: string;
    amount: number;
    description: string;
    isExpenditure: boolean;
  }

  declare namespace State {
    interface AppState {
      transactionReducer: {
        transactionList: Transaction[];
      };
    }
  }
}
