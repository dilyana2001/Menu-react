const baseUrl = 'http://localhost:3030/api';

function getAllItems() {
    return fetch(`${baseUrl}`)
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}

function postItem(data) {
    return fetch(`${baseUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}

function getItem(id) {
    return fetch(`${baseUrl}/${id}`)
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}

function editItem(id, data) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}

function deleteItem(id) {
    return fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}

function searchBy(string, type) {
    return fetch(`${baseUrl}/${type}/${string}`)
        .then(res => res.json())
        .catch((err) => console.log(err.message));
}


const fetchFunctions = {
    getAllItems,
    postItem,
    getItem,
    editItem,
    deleteItem,
    searchBy,
}

export default fetchFunctions;