class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  };

_defaultIf(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then((res) => this._defaultIf(res))
  };

  patchUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._defaultIf(res))
  };

  patchUserAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._defaultIf(res))
  };

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then((res) => this._defaultIf(res))
  };

  postNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._defaultIf(res))
  };

  putCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => this._defaultIf(res))
  };

  delCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._defaultIf(res))
  };

  delCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => this._defaultIf(res))
  };

}

export default Api;