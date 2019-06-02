import {
    GET_USERS_REQUEST,
    SET_USERS,
    GET_CURRENT_USER_REQUEST,
    SET_CURRENT_USER,
    GET_TEAM_REQUEST,
    SET_TEAM_REQUEST,
    SET_IDOLD_REQUEST,
    SET_IDOLD
  } from '../constants/page'
  

    
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
  console.log("stvarno se upisao u local storage as token");
  localStorage.setItem('token', JSON.stringify(data));
  return {
    type: SET_CURRENT_USER,
    payload: data
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
  console.log("--------------------------");
  console.log(user);
  console.log(IdStari);
  console.log(IdNovi);
    let team = [];
    user.team.map((val)=>{
     console.log(val.id +" VS "+ IdStari);
      if(parseInt(val.id) === parseInt(IdStari)){
        console.log("upisan");
        return team.push({id: IdNovi});
      }
      else{
        return team.push({id: parseInt(val.id)});
      }
    })

    let model = {
      id: `${user.id}`,
      username: `${user.username}`,
      password: `${user.password}`,
      team: team
    }
    console.log(model);
    console.log("--------------------------");
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




  