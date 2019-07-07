
let baseUrl = "http://localhost:3001/";

export function getPokemons(id = '') {
    return fetch(`${baseUrl}pokemons/` + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`${response.status}: ${response.statusText}`)
        })
}

export function getUsers() {
    return fetch(`${baseUrl}users`)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`${response.status}: ${response.statusText}`)
        })
}

export function getUser(id = '') {
    return fetch(`${baseUrl}users/` + id)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(`${response.status}: ${response.statusText}`)
        })
}

export function setTeam(id, model) {
    let options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
    }
    return fetch(`${baseUrl}users/` + id, options)
        .then((response) => response.json)
}