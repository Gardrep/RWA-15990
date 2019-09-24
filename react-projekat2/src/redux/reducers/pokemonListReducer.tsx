import {
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_ALL,
  CLEAR_POKEMONS
} from '../constants/constants'
import { PokemonModel } from '../../models/pokemonModel';

export interface PokemonListState {
  error: boolean,
  pokemons: PokemonModel[],
  displayedPokemons: PokemonModel[],
  compareList: PokemonModel[]
}


export const pokemonListInitialState: PokemonListState = {
  error: null,
  pokemons: [],
  displayedPokemons: [],
  compareList: []
}

export function pokemonListReducer(state: PokemonListState = pokemonListInitialState, action: { type: string, payload: any }): PokemonListState {
  switch (action.type) {

    case GET_POKEMONS_FAIL:
      return {
        ...state,
        error: action.payload
      }

    case SET_POKEMONS:
      {
        return {
          ...state,
          pokemons: action.payload
        }
      }
    case FILTER_POKEMONS:
      {
        let pokemoni = state.pokemons.filter((pokemon) => { return pokemon.name.english.includes(action.payload) });
        return {
          ...state,
          displayedPokemons: pokemoni
        }
      }

    case FILTER_POKEMONS_ALL:
      {
        let filter = action.payload;
        console.log(action.payload);
        let pokemoni = state.pokemons
          .filter((pokemon) => { return !filter.searchString || pokemon.name.english.includes(filter.searchString) })

          .filter((pokemon) => { return isNaN(filter.SearchHealthStart) || pokemon.base.HP >= parseInt(filter.SearchHealthStart) })
          .filter((pokemon) => { return isNaN(filter.SearchAttackStart) || pokemon.base.Attack >= parseInt(filter.SearchAttackStart) })
          .filter((pokemon) => { return isNaN(filter.SearchDeffenceStart) || pokemon.base.Defense >= parseInt(filter.SearchDeffenceStart) })

          .filter((pokemon) => { return isNaN(filter.SearchHealthEnd) || pokemon.base.HP <= parseInt(filter.SearchHealthEnd) })
          .filter((pokemon) => { return isNaN(filter.SearchAttackEnd) || pokemon.base.Attack <= parseInt(filter.SearchAttackEnd) })
          .filter((pokemon) => { return isNaN(filter.SearchDeffenceEnd) || pokemon.base.Defense <= parseInt(filter.SearchDeffenceEnd) })
          .filter((pokemon) => {
            return filter.searchTypes.length === 0 || filter.searchTypes.reduce((acc, x) => {
              return acc && pokemon.type.includes(x);
            }, true)
          });

        return {
          ...state,
          displayedPokemons: pokemoni
        }
      }

    case CLEAR_POKEMONS:
      return {
        ...state,
        pokemons: null
      }

    default:
      return state
  }
}
