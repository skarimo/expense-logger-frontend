

export default class Adapter {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  postRequest(URL, loginObj) {
    return fetch((this.baseURL + URL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginObj),
    }).then(res => res.json())
  }

  postRequestAfterToken(URL, token, data) {
    return fetch((this.baseURL + URL), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`,
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

  createExpense(token, data) {
    return this.postRequestAfterToken('/api/v1/expenses', token, data)
  }

  addFriendRequest(token,userId, data) {
    return this.postRequestAfterToken(`/user/${userId}/friend_request`, token, data)
  }

  getUserData(token, userId) {
    return this.getRequest(`/users/${userId}`, token)
  }

  getCategories(token) {
    return this.getRequest('/api/v1/categories', token)
  }

  existingTokenCheck(token) {
    return this.getRequest('/test', token)
  }

  getBillShares(token,userId, data) {
    return this.postRequestAfterToken(`/user/${userId}/show_bill_shares`, token, data)
  }

  updateBillShares(token,userId, data) {
    return this.postRequestAfterToken(`/user/${userId}/update_bill_shares`, token, data)
  }

  acceptFriendRequest(token,userId, data) {
    return this.postRequestAfterToken(`/user/${userId}/accept_request`, token, data)
  }

  rejectFriendRequest(token,userId, data) {
    return this.postRequestAfterToken(`/user/${userId}/reject_request`, token, data)
  }

}
