import {combineReducers} from 'redux';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  transactionReducer,
});

export default rootReducer;
