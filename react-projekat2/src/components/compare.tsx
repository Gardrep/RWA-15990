import React, { Component } from 'react';
import Pokemon from './pokemon';

import { connect } from 'react-redux';
import { AppState } from '../redux/reducers';
import { PokemonModel, baseList } from '../models/pokemonModel';

class ComparePokemons extends Component<any, any> {
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
                    <div className="divCenter">
                        {this.showCenterStats()}
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
        if (compareList)
            return compareList.map(pokemon => {
                return (
                    <li className="pokemons__item" id={pokemon.id} key={pokemon.id}>
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

        return (
            <div className="pokemon-compare">
                {this.showStats(pokemon, !isLeft)}
                <div
                    id={pokemon.id + "Picture"}
                    className="pokemon-compare-picture"
                    style={{ backgroundImage: `url(${`/images/${pictureID}${pokemon.name.english}.png`})` }}
                ></div>
                {this.showStats(pokemon, isLeft)}
            </div>
        )
    }

    showStats(pokemon: PokemonModel, isCorrect: boolean) {
        if (isCorrect) {
            return (
                <div className="divSides">
                    <div>{"English: "} {pokemon.name.english}</div>
                    <div>{"Japanese: "} {pokemon.name.japanese}</div>
                    <div>{"Chinese: "} {pokemon.name.chinese}</div>
                    <br />
                    <div className="hp" >{"HP: "} {pokemon.base.HP}</div>
                    <div className="atk" >{"ATK: "} {pokemon.base.Attack}</div>
                    <div className="def" >{"DEF: "}{pokemon.base.Defense}</div>
                    <br />
                    <div className="spAtk" >{"Sp.ATK: "}{pokemon.base.SpAttack}</div>
                    <div className="spDef" >{"Sp.DEF: "}{pokemon.base.SpDefense}</div>
                    <div className="speed" >{"SPEED: "}{pokemon.base.Speed}</div>
                    <br />
                    <div>{"Type: "} {pokemon.type.map((type) => type + " ")}</div>
                </div>
            )
        }
    }

    calc(base: string) {
        let calulation = this.state.pokemonLeft.base[base] - this.state.pokemonRight.base[base];
        if (calulation < 0) {
            return "< " + (-calulation) + " <";
        } else {
            return "> " + calulation + " >";
        }
    }

    showCenterStats() {
        let centerPokemon = {
            "base": {
                "HP": 0,
                "Attack": 0,
                "Defense": 0,
                "SpAttack": 0,
                "SpDefense": 0,
                "Speed": 0
            }
        };
        baseList.map((base) => 
            centerPokemon.base[base] = this.calc(base)
        );
        return (
            <div>
                <br />
                <br />
                {"Differeence"}
                <br />
                <br />
                <br />
                <div className="compare" >{centerPokemon.base.HP}</div>
                <div className="compare" >{centerPokemon.base.Attack}</div>
                <div className="compare" >{centerPokemon.base.Defense}</div>
                <br />
                <div className="compare" >{centerPokemon.base.SpAttack}</div>
                <div className="compare" >{centerPokemon.base.SpDefense}</div>
                <div className="compare" >{centerPokemon.base.Speed}</div>
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