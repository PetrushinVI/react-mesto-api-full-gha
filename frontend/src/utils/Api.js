class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: 'include',
            headers: this._headers,
        })
            .then(this._checkResponse(res));
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`${res.status} ${res.statusText}`);
        }
    }

    getInitialCard() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            credentials: 'include',
            headers: {
            },
        })
            .then(res => this._checkResponse(res));
    }

    editUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: userData.name,
                about: userData.about
            })
        })
            .then(res => this._checkResponse(res))
            .catch(err => {
                console.log(err);
            });
    }

    addCard(cardData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: cardData.name,
                link: cardData.link
            })
        })
            .then(res => this._checkResponse(res))
            .catch(err => {
                console.log(err);
            });
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
            }
        })
            .then(res => this._checkResponse(res));
    }

    editUserAvatar(body) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({avatar: body.avatar}),
        })
            .then(res => this._checkResponse(res));
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            credentials: 'include',
            headers: this._headers,
        })
            .then(res => this._checkResponse(res));
    }

    changeLikeCardStatus(cardId, isLike) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLike ? 'DELETE' : 'PUT',
            credentials: 'include',
            headers: this._headers
        })
            .then(res => this._checkResponse(res))
            .catch(err => {
                console.log(err);
            });
    }
}

const api = new Api({
    baseUrl: 'https://api-petrushin.nomoredomains.rocks',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;