import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../redux/actions/user';
import * as compareListActions from '../redux/actions/compare';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { AppState } from '../redux/reducers';

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    '& b': { fontWeight: theme.typography.fontWeightMedium, },
    costom: { zIndex: 200 }
  },
}))(Tooltip);

class Pokemon extends Component<any, any> {

  showCompareBtn() {
    const { pokemon } = this.props;
    if (this.props.isComparable) {
      return (<button onClick={(e) => this.props.addToCompare(pokemon)} className="pokemon__compare btn-sm btn-secondary">C</button>)
    } else return (<button onClick={(e) => this.props.removeFromCompare(pokemon)} className="pokemon__compare btn-sm btn-secondary">X</button>);
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
      <div className="pokemon__plate">
        {this.showCompareBtn()}
        <p className="pokemon__hp">HP: {pokemon.base.HP}</p>
        <p className="pokemon__atk">ATK: {pokemon.base.Attack}</p>
        <p className="pokemon__def">DEF: {pokemon.base.Defense}</p>
        <a rel="noopener noreferrer" href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name.english}`} className="pokemon__name">{pokemon.name.english}</a>
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
            <div
              id={pokemon.id}
              //onClick={(e) => this.printaj()}
              className="pokemon__sprite"
              //rel="noopener noreferrer"
              //href={`https://bulbapedia.bulbagarden.net/wiki/${pokemon.name.english}`}
              style={{
                backgroundImage: `url(${`/images/${pictureID}${pokemon.name.english}.png`})`
              }}
            > </div>
          </HtmlTooltip>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: AppState) {
  const { currentUser, IdStari } = state.user;
  return {
    currentUser,
    IdStari
  }
}

function mapDispatchToProps(dispatch) {
  return {
    replacePokemonTeam: (user, IdStari, IdNovi) => dispatch(userActions.replacePokemonTeam(user, IdStari, IdNovi)),
    addToCompare: (pokemon) => dispatch(compareListActions.addCompareList(pokemon)),
    removeFromCompare:(pokemon)=> dispatch(compareListActions.removeCompareList(pokemon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon)
