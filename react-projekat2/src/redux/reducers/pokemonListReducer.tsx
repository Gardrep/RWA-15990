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
        let pokemoni = state.pokemons
          .filter((pokemon) => { return !action.payload.searchString || pokemon.name.english.includes(action.payload.searchString) })

          .filter((pokemon) => { return isNaN(action.payload.SearchHealthStart) || pokemon.base.HP >= parseInt(action.payload.SearchHealthStart) })
          .filter((pokemon) => { return isNaN(action.payload.SearchAttackStart) || pokemon.base.Attack >= parseInt(action.payload.SearchAttackStart) })
          .filter((pokemon) => { return isNaN(action.payload.SearchDeffenceStart) || pokemon.base.Defense >= parseInt(action.payload.SearchDeffenceStart) })

          .filter((pokemon) => { return isNaN(action.payload.SearchHealthEnd) || pokemon.base.HP <= parseInt(action.payload.SearchHealthEnd) })
          .filter((pokemon) => { return isNaN(action.payload.SearchAttackEnd) || pokemon.base.Attack <= parseInt(action.payload.SearchAttackEnd) })
          .filter((pokemon) => { return isNaN(action.payload.SearchDeffenceEnd) || pokemon.base.Defense <= parseInt(action.payload.SearchDeffenceEnd) })
          .filter((pokemon) => {
            return action.payload.searchTypes.length === 0 || action.payload.searchTypes.reduce((acc, x) => {
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
