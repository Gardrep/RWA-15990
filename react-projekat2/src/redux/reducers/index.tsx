import { combineReducers } from 'redux';
import { pokemonListReducer, PokemonListState } from './pokemonListReducer';
import { userReducer, UserState } from './userReducer';
import { compareListReducer, CompareListState } from './compareReducer';

export interface AppState{
  pokemonList: PokemonListState;
  user: UserState;
  compareList: CompareListState;
}

const store  = {
  pokemonList:pokemonListReducer,
  user:userReducer,
  compareList: compareListReducer
};

export default combineReducers(store);
