
let baseUrl="http://localhost:3003/";

export function getDataPoints() {

    return fetch(`${baseUrl}dataPoints`)
    .then(response => {
        if (response.ok) {
        return response.json()
        }
        throw new Error(`${response.status}: ${response.statusText}`)
    })
}

export function getDataPoint(id='') {

    return fetch(`${baseUrl}dataPoints/`+id)
    .then(response => {
        if (response.ok) {
        return response.json()
        }
        throw new Error(`${response.status}: ${response.statusText}`)
    })
}

export function setDataPoint(id, model) {
    let options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
    return fetch(`${baseUrl}dataPoints/`+id, options)
      .then((response) => response.json)
  }