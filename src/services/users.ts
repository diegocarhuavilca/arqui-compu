import axios from 'axios'

const api = 'https://878hgka3pe.execute-api.us-east-1.amazonaws.com/develop'

interface user {
  "id": string,
  "name": string,
  "lastName": string,
  "password": string
}

export interface userUpdate{
  "id": string,
  "name": string,
  "lastName": string,
}

export const userService = {
  async get() {
    return (await axios.get(api))
  },
  async create(user: user) {
    return axios.post(api, user) 
  },
  async delete(id:string){
    return axios.post(`${api}/eliminarusuario`,{'id':id})
  },
  async update(user:userUpdate){
    return axios.post(api,{id:user.id,name:user.name,lastName:user.lastName})
  }
}