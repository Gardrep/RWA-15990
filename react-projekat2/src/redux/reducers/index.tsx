import { combineReducers } from 'redux';
import { pokemonListReducer, PokemonListState } from './pokemonListReducer';
import { userReducer, UserState } from './userReducer';

export interface AppState{
  pokemonList: PokemonListState;
  user: UserState;
}

const store  = {
  pokemonList:pokemonListReducer,
  user:userReducer
};

export default combineReducers(store);
