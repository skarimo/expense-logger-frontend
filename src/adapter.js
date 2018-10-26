

export default class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  postRequest(URL, data) {
    return fetch((this.baseURL + URL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }).then(res => res.json())
  }

  getRequest(URL, token) {
    return fetch((this.baseURL + URL), {
      headers: {
          "Authorization": `${token}`
      },
    }).then(res => res.json())
  }

  login(loginObj) {
    return this.postRequest('/auth/login', loginObj)
  }

  register(newUserInfo) {
    return this.postRequest('/auth/register', newUserInfo)
  }

  getUserData(token, userId) {
    return this.getRequest(`/users/${userId}`, token)
  }

  existingTokenCheck(token) {
    return this.getRequest('/test', token)
  }

}
