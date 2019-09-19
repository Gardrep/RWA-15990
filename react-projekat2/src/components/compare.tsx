import React, { Component } from 'react';
import Pokemon from './pokemon';

import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { PokemonModel } from '../models/pokemonModel';

class ComparePokemons extends Component<any, any> {
    searchString = "";
    SearchHealthStart = NaN;
    emptyPokemonScelet: PokemonModel = {
        "id": 0,
        "name": {
            "english": "",
            "japanese": "",
            "chinese": ""
        },
        "type": [],
        "base": {
            "HP": 0,
            "Attack": 0,
            "Defense": 0,
            "SpAttack": 0,
            "SpDefense": 0,
            "Speed": 0
        }
    };
    pokemonLeft: PokemonModel = this.emptyPokemonScelet;
    pokemonRight: PokemonModel = this.emptyPokemonScelet;

    constructor(props) {
        super(props);
        this.state = {
            pokemonLeft: this.emptyPokemonScelet,
            pokemonRight: this.emptyPokemonScelet
        }
    }

    render() {
        return (
            <div>
                <div >
                    <ul className="pokemons">{this.renderPokemons()}</ul>
                </div>
                <div className="pokemons-compare">
                    <div id="divLeft">
                        {this.comparePokemons(this.state.pokemonLeft, true)}
                    </div>
                    <div id="divRight">
                        {this.comparePokemons(this.state.pokemonRight, false)}
                    </div>
                </div>
            </div>
        )
    }

    renderPokemons() {
        let { compareList } = this.props;
        console.log(compareList);
        if (compareList)
            return compareList.map(pokemon => {
                return (
                    <li className="pokemons__item" key={pokemon.id}>
                        <div>
                            <Pokemon pokemon={pokemon} isComparable={false} />
                            <button onClick={() => this.setState({ pokemonLeft: pokemon })} className="compare-putButton btn-sm btn-secondary">{String.fromCharCode(60)}</button>
                            <button onClick={() => this.setState({ pokemonRight: pokemon })} className="compare-putButton btn-sm btn-secondary" >{String.fromCharCode(62)}</button>
                        </div>
                    </li>
                )
            });
    }
    comparePokemons(pokemon: PokemonModel, isLeft: boolean) {
        let pictureID = "";
        if (pokemon.id < 10) {
            pictureID = "00" + pokemon.id;
        }
        else {
            if (pokemon.id < 100) {
                pictureID = "0" + pokemon.id;
            }
            else {
                pictureID = "" + pokemon.id;
            }
        }
        console.log(pictureID);

        return (
            <div>
                {this.pokemonStats(pokemon, isLeft)}
                <div
                    className="pokemon-compare"
                    style={{
                        backgroundImage: `url(${`/images/${pictureID}${pokemon.name.english}.png`})`
                    }}
                ></div>
                {this.pokemonStats(pokemon, !isLeft)}
            </div>
        )
    }
    pokemonStats(pokemon: PokemonModel, isCorrect: boolean) {
        if (isCorrect)
            return (
                <div>
                    <div>{"English: "} {pokemon.name.english}</div>
                    <div>{"Japanese: "} {pokemon.name.japanese}</div>
                    <div>{"Chinese: "} {pokemon.name.chinese}</div>
                    <br />
                    <div>{"HP: "} {pokemon.base.HP}</div>
                    <div>{"ATK: "} {pokemon.base.Attack}</div>
                    <div>{"DEF: "}{pokemon.base.Defense}</div>
                    <br />
                    <div>{"Sp. Atk: "} {pokemon.base.SpAttack}</div>
                    <div>{"Sp. Def: "} {pokemon.base.SpDefense}</div>
                    <div>{"Speed: "}{pokemon.base.Speed}</div>
                    <br />
                    <div>{"Type: "} {pokemon.type.map((type) => type + " ")}</div>
                </div>
            )
    }
}

function mapStateToProps(state: AppState) {
    const { compareList } = state.compareList;
    return {
        compareList
    }
}

function mapDispatchToProps() {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePokemons)