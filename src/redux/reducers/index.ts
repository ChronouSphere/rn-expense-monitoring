import {combineReducers} from 'redux';
import transactionList from './transactionListReducer';

const rootReducer = combineReducers({
  transactionList,
});

export default rootReducer;
