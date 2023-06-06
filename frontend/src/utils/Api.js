class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }


    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._checkResponse);
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
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    editUserInfo(userData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
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
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    editUserAvatar(body) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: body}),
        })
            .then(this._checkResponse);
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLike) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLike ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then(res => this._checkResponse(res))
            .catch(err => {
                console.log(err);
            });
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '4515d0f2-bb83-494a-804c-6a6db4ace47a',
        'Content-Type': 'application/json'
    }
});

export default api;