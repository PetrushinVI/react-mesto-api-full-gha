export const URL = 'https://api-petrushin.nomoredomains.rocks';

export const register = (email, password) => {
    return fetch(`${URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
        .then(checkResponse);
};

export const login = (email, password) => {
    return fetch(`${URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    })
        .then(checkResponse)
};

export const checkToken = (jwt) => {
    return fetch(`${URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        },
    })
        .then(checkResponse);
};

const checkResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`${res.status}`);