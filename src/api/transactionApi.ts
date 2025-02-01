import axios from 'axios';
import {BASE_TRANSACTION_API_URL} from '../constants/transactionConstant';

const transactionApi = {
  getTransactionList: async (): Promise<
    TransactionModule.TransactionList[] | undefined
  > => {
    try {
      const axiosConfig = {
        method: 'get',
        url: `${BASE_TRANSACTION_API_URL}`,
      };
      const response: any = await axios(axiosConfig);
      const transactionList: TransactionModule.TransactionList[] =
        response?.data;

      return transactionList.length > 0 ? transactionList : undefined;
    } catch (error) {
      return undefined;
    }
  },
};

export default transactionApi;
