import { apiSettingsAuth } from "./constants.js";

class Api {
  constructor({ baseUrlAuth, headers }) {
    this._baseUrl = baseUrlAuth;
    this._headers = headers;
  }

  _getProxy({ relativePath, method, body = "", headers = {} }) {
    const options = {
      method,
      headers: { ...this._headers, ...headers },
    };

    if (!!body) {
      options.body = body;
    }

    return fetch(`${this._baseUrl}${relativePath}`, options);
  }

  async _handleResponse(response) {
    const description = await response.json();

    if (response.ok) {
      return description;
    } else {
      return Promise.reject({
        status: response.status,
        message: description.message ? description.message : description.error
                                                             ? description.error
                                                             : "Что-то пошло не так!\nПопробуйте ещё раз.",
      });
    }
  }

  async tokenCheck({ jwt }) {
    const params = {
      relativePath: "/users/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signUp({ password, email }) {
    const params = {
      relativePath: "/signup",
      method: "POST",
      body: JSON.stringify({ password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }

  async signIn({ password, email }) {
    const params = {
      relativePath: "/signin",
      method: "POST",
      body: JSON.stringify({ password, email }),
    };
    const response = await this._getProxy(params);
    return await this._handleResponse(response);
  }
}

export const apiAuthObject = new Api(apiSettingsAuth);
