import { createStore, applyMiddleware, DeepPartial } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { AppState } from '../reducers'
import rootSaga from './saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import { pokemonListInitialState } from '../reducers/pokemonListReducer';

export default function configureStore(initialState:DeepPartial<AppState> = {
  pokemonList:pokemonListInitialState
}) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  sagaMiddleware.run(rootSaga);
  return store;
}
