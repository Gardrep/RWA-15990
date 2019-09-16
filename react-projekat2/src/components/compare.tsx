import React, { Component } from 'react';
import Pokemon from './pokemon';

import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import * as pokemonListActions from '../redux/actions/pokemonList';
import * as userActions from '../redux/actions/user';
import { AppState } from '../redux/reducers';

class ComparePokemons extends Component<any, any> {
    searchString = "";
    SearchHealthStart = NaN;


    showAllVar = false;
    constructor(props) {
        super(props);
        this.state = {
            showAllVar: false
        }
    }

    componentDidMount = () => {
        this.props.getPokemons();
        var data = JSON.parse(localStorage.getItem('token'));
        if (data && !this.props.currentUser)
            this.props.getCurrentUser(data);
    }

    showAll() {
        debugger
        let { displayedPokemons, currentUser, IdStari } = this.props;
        console.log(displayedPokemons);
        let test = displayedPokemons.slice(100, 1000000).map(pokemon => {
            return (
                <li className="pokemons__item" key={pokemon.id}>
                    <LinkContainer to="/home">
                        <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} />
                    </LinkContainer>
                </li>
            )
        })
        return test;
    }


    render() {
        let { error } = this.props;

        return (
            <div className="pokemonList">
                {error && <div className="pokemonList__error">{error}</div>}
                {<ul className="pokemons">{/*this.renderPokemons()*/}</ul>}
            </div>
        )
    }

    onClickHandler() {
        this.setState({
            showAllVar: true
        });
    }

    renderPokemons() {
        let { displayedPokemons, currentUser, IdStari } = this.props;
        if (displayedPokemons)
            if (displayedPokemons.length > 100) {
                let pokemons = displayedPokemons;
                let pokemonsToShow = pokemons.map(pokemon => {
                    return (
                        <li className="pokemons__item" key={pokemon.id}>
                            <LinkContainer to="/home">
                                <Pokemon pokemon={pokemon} currentUser={currentUser} IdStari={IdStari} />
                            </LinkContainer>
                        </li>
                    )
                });
            }

    }
}

function mapStateToProps(state: AppState) {
    const { displayedPokemons, error, currentUser, IdStari } = state.pokemonList;
    return {
        displayedPokemons,
        error,
        currentUser,
        IdStari
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentUser: (state) => dispatch(userActions.getCurrentUser(state)),
        filterPokemonsAll: (searchString: string,
            SearchHealthStart: number,
            SearchHealthEnd: number,
            SearchAttackStart: number,
            SearchAttackEnd: number,
            SearchDeffenceStart: number,
            SearchDeffenceEnd: number,
            searchTypes: string[]) => dispatch(pokemonListActions.filterPokemonsAll(
              searchString,
              SearchHealthStart,
              SearchHealthEnd,
              SearchAttackStart,
              SearchAttackEnd,
              SearchDeffenceStart,
              SearchDeffenceEnd,
              searchTypes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePokemons)