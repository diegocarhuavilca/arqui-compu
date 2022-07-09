import axios from 'axios'

const api = 'https://xgih1dclv0.execute-api.us-east-1.amazonaws.com/develop'

interface user {
  "id": string,
  "name": string,
  "lastName": string,
  "password": string
}

export const userService = {
  async get() {
    return (await axios.get(api))
  },
  async create(user: user) {
    return axios.post(api, user)
  }
}