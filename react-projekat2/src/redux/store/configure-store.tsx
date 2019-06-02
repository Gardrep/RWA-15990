import { createStore, applyMiddleware} from 'redux'
import createSagaMiddleware  from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from './saga'
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState= {}) {
  const sagaMiddleware  = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware ))
  )
  sagaMiddleware.run(rootSaga);
  return store;
}
