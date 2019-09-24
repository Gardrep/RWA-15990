import {
  GET_USERS_REQUEST,
  SET_USERS,
  GET_CURRENT_USER_REQUEST,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  GET_TEAM_REQUEST,
  SET_TEAM_REQUEST,
  SET_IDOLD_REQUEST,
  SET_IDOLD
} from '../constants/constants'

export function getUsers() {
  return {
    type: GET_USERS_REQUEST
  }
}

export function setUsers(data) {
  return {
    type: SET_USERS,
    payload: data
  }
}

export function getCurrentUser(data) {
  return {
    type: GET_CURRENT_USER_REQUEST,
    payload: data
  }
}

export function setCurrentUser(data) {
  console.log("Upisan token u local storage");
  localStorage.setItem('token', JSON.stringify(data));
  return {
    type: SET_CURRENT_USER,
    payload: data
  }
}

export function clearCurrentUser() {
  console.log("Obrisan token iz local storage");
  localStorage.removeItem('token');
  return {
    type: CLEAR_CURRENT_USER,
  }
}

export function redirectToHome() {
  window.location.href = `/home`;
}

export function getPokemonTeam(data) {
  return {
    type: GET_TEAM_REQUEST,
    payload: data.team
  }
}

export function setIdStariRequest(IdStari) {
  return {
    type: SET_IDOLD_REQUEST,
    payload: IdStari
  }
}

export function setIdStari(IdStari) {
  return {
    type: SET_IDOLD,
    payload: IdStari
  }
}

export function replacePokemonTeam(user, IdStari, IdNovi) {
  let team = [];
  user.team.map((val) => {
    if (parseInt(val.id) === parseInt(IdStari)) {
      return team.push({ id: IdNovi });
    }
    else {
      return team.push({ id: parseInt(val.id) });
    }
  })

  let model = {
    id: `${user.id}`,
    username: `${user.username}`,
    password: `${user.password}`,
    team: team
  }
  setIdStariRequest(NaN);

  return {
    type: SET_TEAM_REQUEST,
    user: user,
    payload: model
  }
}

export function setPokemonTeam(user, model) {
  return {
    type: SET_TEAM_REQUEST,
    user: user,
    payload: model
  }
}