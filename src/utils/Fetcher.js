import { apiEndpoint } from './../config'
const { logout } = require('./../actions')
const { fetch } = window

class Fetcher {
  constructor (authorizationToken, userId, dispatch) {
    this.authorizationToken = authorizationToken
    this.userId = userId
    this.dispatch = dispatch
    this.baseUrl = apiEndpoint
    this.headers = {
      'Authorization': `bearer ${authorizationToken}`,
      'user-id': userId,
      'Content-Type': 'application/json'
    }
  }

  async executeRequest (req) {
    const res = await req

    if (res.status === 401) {
      this.dispatch(logout())
    }

    return res
  }

  get (path) {
    const url = `${this.baseUrl}/${path}`
    const req = fetch(url, {
      headers: this.headers,
      method: 'get'
    })
    return this.executeRequest(req)
  }

  post (path, payload) {
    const url = `${this.baseUrl}/${path}`
    const req = fetch(url, {
      headers: this.headers,
      method: 'post',
      body: JSON.stringify(payload)
    })
    return this.executeRequest(req)
  }

  upload (path, formData) {
    const url = `${this.baseUrl}/${path}`
    const req = fetch(url, {
      headers: { 'Authorization': this.authorizationToken },
      method: 'post',
      body: formData
    })
    return this.executeRequest(req)
  }

  put (path, payload) {
    const url = `${this.baseUrl}/${path}`
    const req = fetch(url, {
      headers: this.headers,
      method: 'put',
      body: JSON.stringify(payload)
    })
    return this.executeRequest(req)
  }

  delete (path) {
    const url = `${this.baseUrl}/${path}`
    const req = fetch(url, {
      headers: this.headers,
      method: 'delete'
    })
    return this.executeRequest(req)
  }
}

export default Fetcher
