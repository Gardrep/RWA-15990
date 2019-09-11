import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../redux/actions/user'
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    costom: {
      zIndex: 200
    }
  },
}))(Tooltip);

export function classList() { return ["Normal", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel"]; }


class Pokemon extends Component<any, any> {

  printaj() {
    const { currentUser, IdStari } = this.props;
    if (currentUser && IdStari) {
      this.props.replacePokemonTeam(currentUser, IdStari, this.props.pokemon.id);
    }
    else {
      console.log("Currentuser je NULL");
    }
  }

  render() {
    const { pokemon } = this.props;
    let pictureID = "";
    if (pokemon.id < 10) {
      pictureID = "00" + pokemon.id;
    }
    else {
      if (pokemon.id < 100) {
        pictureID = "0" + pokemon.id;
      }
      else {
        pictureID = pokemon.id;
      }
    }

    return (
      <div className="pokemon">
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{pokemon.name.english}</Typography>
              {"HP: "} <u>{pokemon.base.HP}</u><br />
              {"ATK: "} <u>{pokemon.base.Attack}</u><br />
              {"DEF: "} <u>{pokemon.base.Defense}</u><br />

              {"Sp. Atk: "} <u>{pokemon.base.SpAttack}</u><br />
              {"Sp. Def: "} <u>{pokemon.base.SpDefense}</u><br />
              {"Speed: "} <u>{pokemon.base.Speed}</u><br />
              {"Type: "} <u>{pokemon.type.map((type) => type + " ")}</u>
            </React.Fragment>
          }
        >
          <a
            id={pokemon.id}
            onClick={(e) => this.printaj()}
            className="pokemon__sprite"
            rel="noopener noreferrer"
            href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name.english}`}
            style={{
              backgroundImage: `url(${`/images/${pictureID}${pokemon.name.english}.png`})`
            }}
          > </a>
        </HtmlTooltip>

        <div className="p-1">
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
    replacePokemonTeam: (user, IdStari, IdNovi) => dispatch(userActions.replacePokemonTeam(user, IdStari, IdNovi))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon)
