export function GetPokemons()
{
    let pokemon =fetch(`http://localhost:3000/pokemons`)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw new Error(`${response.status}: ${response.statusText}`)
    })
    .then(data => {
        dispatch({
            type: GET_POKEMONS_SUCCESS
        })
        dispatch(setPokemons(data))
        dispatch(filterPokemons())
    })
    .catch(error => {
        dispatch({
            type: GET_POKEMONS_FAIL,
            payload: error.message
        })
    })

    pokemon 
    
}