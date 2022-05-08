import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import { IHobby, IUser, IUserState } from '../../interface'
import { fetchUser, addHobby, addUser, deleteHobby } from './userAPI'


export const getUsers = createAsyncThunk('user/fetchUsers', async () => {
  // array of All the users []
  const { users } = await fetchUser()
  return users
})

export const addNewUser = createAsyncThunk('user/addUser', async (name: string, { getState}) => {
  const checkIfThisNameAlreadyExists = pathOr([], ['user', 'value'], getState()).filter(({ user }) => user === name)
  if(checkIfThisNameAlreadyExists.length) return alert("This user's name already exists")

  // Object of the new user {}
  const { user } = await addUser(name)
  return user
})

export const addNewHobby = createAsyncThunk('user/addNewHobby', async ({ userId, hobby }: { userId: string; hobby: IHobby }, { getState }) => {

  // The validation here is somehow redundant,cuz the user won't be able to view the hobbies unless he selectes a user, but added it anyways as an extra layer of validation
  if(!userId) return alert("Please select a user first!")
  const selectedUserIndex: number = pathOr([], ['user', 'value'], getState()).findIndex(({ _id }: IUser) => _id?.toString() === userId.toString())

  const checkIfThisHobbyAlreadyExists = pathOr([], ['user', 'value', selectedUserIndex, 'hobbies'], getState()).filter((values: IHobby) => values?.hobby.toLowerCase() === hobby?.hobby?.toLowerCase())
  if(checkIfThisHobbyAlreadyExists.length) return alert("This hobby already exists for this user!")


  const { newHobby } = await addHobby(hobby, userId)

  return { newHobby, selectedUserIndex }
})

export const removeHobby = createAsyncThunk('user/removeHobby', async ({ selectedUserId, hobbyId }: { selectedUserId: string; hobbyId: string }, { getState }) => {

  // The validation here is somehow redundant,cuz the user won't be able to view the hobbies unless he selectes a user, but added it anyways as an extra layer of validation
  if(!selectedUserId) return alert("Please select a user first!")
  const selectedUserIndex: number = pathOr([], ['user', 'value'], getState()).findIndex(({ _id }: IUser) => _id?.toString() === selectedUserId.toString())

  const { _id } = await deleteHobby(hobbyId)
  const updatedHobbiesArray = pathOr([], ['user', 'value', selectedUserIndex, 'hobbies'], getState()).filter((values: IHobby) => values._id.toString() !== _id.toString())

  return { updatedHobbiesArray, selectedUserIndex }
})

const initialState: IUserState = {
  value: [],
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

      // GET USERS
      builder
        .addCase(getUsers.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.value = action.payload;
        })
        .addCase(getUsers.rejected, (state) => {
          state.loading = false;
        })

        // ADD NEW USER
      builder
        .addCase(addNewUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(addNewUser.fulfilled, (state: IUserState, action) => {
          state.loading = false
          if(action.payload) {
            state.value.push(action.payload)
          }
        })
        .addCase(addNewUser.rejected, (state) => {
          state.loading = false;
        })

        // ADD NEW HOBBY
      builder
        .addCase(addNewHobby.pending, (state) => {
          state.loading = true;
        })
        .addCase(addNewHobby.fulfilled, (state: IUserState, action: any) => {
          state.loading = false
          const index = action?.payload?.selectedUserIndex
          const updatedHobbies = action?.payload?.newHobby
          if(updatedHobbies) {
            state.value[index].hobbies.push(updatedHobbies)
          }
        })
        .addCase(addNewHobby.rejected, (state) => {
          state.loading = false;
        })

        // DELETE HOBBY
      builder
        .addCase(removeHobby.pending, (state) => {
          state.loading = true;
        })
        .addCase(removeHobby.fulfilled, (state: IUserState, action: any) => {
          state.loading = false
          const index = action?.payload?.selectedUserIndex
          const updatedHobbies = action?.payload?.updatedHobbiesArray
          state.value[index].hobbies = updatedHobbies
        })
        .addCase(removeHobby.rejected, (state) => {
          state.loading = false;
        });
    },
  
})

export default userSlice.reducer
