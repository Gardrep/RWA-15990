import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'
class Pokemon extends Component<any,any> {

  printaj()
 {
    const { currentUser, IdStari } = this.props;

    if(currentUser && IdStari){
      this.props.replacePokemonTeam(currentUser, IdStari, this.props.pokemon.id);
    }
    else{
      console.log("Currentuser je NULL");
    }

 }

  render() {
    const { pokemon } = this.props;
    let pictureID = "";
    if(pokemon.id<10)
    {
      pictureID = "00"+pokemon.id;
    }
    else{    
      if(pokemon.id<100)
      {
        pictureID = "0"+pokemon.id;
      }
      else
      {
        pictureID = pokemon.id;
      }}


    return (
      <div className="pokemon">     
        <button
          id={pokemon.id}
          onClick={(e) => this.printaj()}
          type="button"
          className="pokemon__sprite"
          style={{
           backgroundImage: `url(${`/images/${pictureID}${pokemon.name.english}.png`})`
          }}
        />
        
        <div>
          <p className="pokemon__id">ID: {pokemon.id}</p>
          <p className="pokemon__hp">HP: {pokemon.base.HP}</p>
          <p className="pokemon__atk">ATK: {pokemon.base.Attack}</p>
          <p className="pokemon__def">DEF: {pokemon.base.Defense}</p>
          <p className="pokemon__name">{pokemon.name.english}</p>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state: any) {
  const { currentUser, IdStari } = state.page;
  return {
    currentUser,
    IdStari
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replacePokemonTeam:(user, IdStari, IdNovi) => dispatch(userActions.replacePokemonTeam(user, IdStari, IdNovi))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon)
