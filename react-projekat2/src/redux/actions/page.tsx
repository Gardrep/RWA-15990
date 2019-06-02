import {
  GET_POKEMONS_REQUEST,
  SET_POKEMONS,
  FILTER_POKEMONS,
  CLEAR_POKEMONS
} from '../constants/page'


export function setPokemons(data) {
  return {
    type: SET_POKEMONS,
    payload: data
  }
}

export function getPokemons(id='') {
  return {
      type: GET_POKEMONS_REQUEST,
      payload: id
    }
}

export function filterPokemons(searchString = '') {
  return{
    type: FILTER_POKEMONS,
    payload: searchString
  }
}

export function clearPokemons() {
  return{
    type: CLEAR_POKEMONS
  }
}