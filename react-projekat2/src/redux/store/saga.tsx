import { put, takeEvery, all} from 'redux-saga/effects'
import {setPokemons, filterPokemons} from '../actions/page'
import {setUsers, setCurrentUser,  setIdStari, redirectToHome} from '../actions/user'
import {getPokemons, getUsers, getUser, setTeam} from '../../services/DBService'
import { 
    GET_POKEMONS_REQUEST, 
    GET_USERS_REQUEST, 
    GET_CURRENT_USER_REQUEST, 
    GET_CURRENT_USER_FAIL,
    CLEAR_CURRENT_USER,
    GET_TEAM_REQUEST,
    SET_TEAM_REQUEST,
    SET_IDOLD_REQUEST
} from '../constants/page';


export function* fetchPokemons(actions) {
    const data = yield getPokemons(actions.payload);
    yield put(setPokemons(data))
    yield put(filterPokemons())
}

export function* fetchPokemon(actions) {
    const data = yield getPokemons(actions.id);
    return data;
}

export function* fetchTeam(actions) {
    //debugger
    let data= yield all(actions.payload.map((id)=>{
        let pokemon =fetchPokemon(id);
        return pokemon;
    }))
    yield put(setPokemons(data))
}

export function* postTeam(actions) {
    yield setTeam(actions.user.id, actions.payload);
    yield redirectToHome();
}

export function* fetchUsers() {
    const data = yield getUsers();
    yield put(setUsers(data))
}

export function* setIdStariRequest(actions) {
    yield put(setIdStari(actions.payload));
}

export function* fetchCurrentUser(actions) {
    yield put({type: CLEAR_CURRENT_USER})
    const allUsers = yield getUsers();
    const user = allUsers.find((user)=> user.username === actions.payload.username  && user.password === actions.payload.password)
    if(!user){
        ////OBRISI TOKEN
        yield put({      
            type: GET_CURRENT_USER_FAIL,
            error: "NISI LEPO UNEO Username I Password"
        })
    }
    else{
        const data = yield getUser(user.id);
        yield put(setCurrentUser(data));
    }
}

export default function* rootSaga() {
    yield takeEvery(GET_POKEMONS_REQUEST,fetchPokemons);
    yield takeEvery(GET_USERS_REQUEST,fetchUsers);
    yield takeEvery(GET_CURRENT_USER_REQUEST,fetchCurrentUser);
    yield takeEvery(GET_TEAM_REQUEST,fetchTeam);
    yield takeEvery(SET_TEAM_REQUEST,postTeam);
    yield takeEvery(SET_IDOLD_REQUEST,setIdStariRequest);
  }