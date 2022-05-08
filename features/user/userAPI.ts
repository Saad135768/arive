import axios from 'axios'

export const fetchUser = async () =>  {
  const { data } = await axios('http://localhost:3000/api/getuser')
  return data
}

export const addUser = async (newUser: string) =>  {
  const { data } = await axios.post('http://localhost:3000/api/adduser', { body: newUser })
  console.log({ data }, 'post')
  return data
}
export const addHobby = async () =>  {
  const { data } = await axios('http://localhost:3000/api/getuser')
  return data
}
export const deleteHobby = async (id) =>  {
  const { data } = await axios.post('http://localhost:3000/api/deletehobby', { body: id })
  console.log({ data })
}
