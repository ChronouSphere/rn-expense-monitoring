import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import allRuntimes from '../sagas';
import {configureStore} from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// Middleware: Redux Saga
sagaMiddleware.run(allRuntimes);

export default store;
