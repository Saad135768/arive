import axios from 'axios'
import { IHobby } from '../../../interface'

export const fetchUser = async () =>  {
  const { data } = await axios('http://localhost:3000/api/getusers')
  return data
}

export const addUser = async (newUser: string) =>  {
  const { data } = await axios.post('http://localhost:3000/api/adduser', { newUser })
  return data
}
export const addHobby = async (newHobby: IHobby, userId: string) =>  {
  const { data } = await axios.post('http://localhost:3000/api/addhobby', { hobby: newHobby, userId })
  return data
}
export const deleteHobby = async (_id: string) =>  {
  const { data } = await axios.post('http://localhost:3000/api/deletehobby', { _id })
  return data
}
