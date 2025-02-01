import axios from 'axios';
import {BASE_TRANSACTION_API_URL} from '../constants/transactionConstant';

const transactionApi = {
  getTransactionList: async (): Promise<
    TransactionModule.Transaction[] | undefined
  > => {
    try {
      const axiosConfig = {
        method: 'get',
        url: `${BASE_TRANSACTION_API_URL}`,
      };
      const response: any = await axios(axiosConfig);
      let transactionList: TransactionModule.Transaction[] =
        response?.data || []; // Handle potential undefined data

      // Transform the data here:
      const transformedTransactionList = transactionList.map(item => ({
        ...item,
        isExpenditure: String(item.amount).startsWith('-'), // Check if it's an expenditure
        amount: parseFloat(String(item.amount).replace('-', '')), // Convert to string first for replace, handle potential non-string amounts
      }));

      return transformedTransactionList.length > 0
        ? transformedTransactionList
        : undefined; // Return transformed data
    } catch (error) {
      return undefined;
    }
  },
};

export default transactionApi;
