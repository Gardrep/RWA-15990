import {
  GET_POKEMONS_FAIL,
  SET_POKEMONS,
  FILTER_POKEMONS,
  FILTER_POKEMONS_BYHEALTH,
  FILTER_POKEMONS_BYATTACK,
  FILTER_POKEMONS_BYDEFENCE,
  CLEAR_POKEMONS,

  GET_USERS_FAIL,
  SET_USERS,

  GET_CURRENT_USER_FAIL,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_IDOLD,
  CLEAR_IDOLD
} from '../constants/page'



const initialState  = {
  error: null,
  pokemons: [],
  displayedPokemons: [],
  users:[],
  currentUser: null,
  IdStari: null
}

export default function(state = initialState, action: { type: any; payload: any; }) {
  switch (action.type) {

    case GET_POKEMONS_FAIL:
      return {...state,
        error: action.payload
      }

    case SET_POKEMONS:

      return {...state,
        pokemons: action.payload
      }

    case FILTER_POKEMONS:
    {
      let pokemoni=state.pokemons.filter((pokemon) => {
        return pokemon.name.english.includes(action.payload);
      });
      return {...state,
        displayedPokemons: pokemoni
      }
    }

    case FILTER_POKEMONS_BYHEALTH:
    {
      let pokemoni=state.pokemons.filter((pokemon) => {
        if( parseInt(pokemon.base.HP) === parseInt(action.payload))
        {
          return true;
        }
        return false;
      });
      return {...state,
        displayedPokemons: pokemoni
      }
    }

    case FILTER_POKEMONS_BYATTACK:
      {
        let pokemoni=state.pokemons.filter((pokemon) => {
          if(parseInt(pokemon.base.Attack) === parseInt(action.payload))
          {
            return true;
          }
          return false;
        });
        return {...state,
          displayedPokemons: pokemoni
        }
      }

      case FILTER_POKEMONS_BYDEFENCE:
        {
          let pokemoni=state.pokemons.filter((pokemon) => {
            if(parseInt(pokemon.base.Defense) === parseInt(action.payload))
            {
              return true;
            }
            return false;
          });
          return {...state,
            displayedPokemons: pokemoni
          }
        }

    case CLEAR_POKEMONS:
        return {...state,
          pokemons: null
        }

    case SET_USERS:
      return {...state,
        users: action.payload
      }

    case GET_USERS_FAIL:
        return {...state,
          error: action.payload
        }
  
    case SET_CURRENT_USER:
      return {...state,
        currentUser: action.payload
      }

    case GET_CURRENT_USER_FAIL:
        return {...state,
          error: action.payload
        }

    case CLEAR_CURRENT_USER:
        return {...state,
          currentUser: null
        }

    case SET_IDOLD:{
      console.log("deff ulazi idStari u store");
      console.log(action.payload);
      //debugger
      return {...state,
        IdStari: action.payload
      }
    }
    case CLEAR_IDOLD:
      return {...state,
        IdStari: null
      }

    default:
      return state
  }
}
