import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import { RootState, AppThunk } from '../../app/store'
import { IHobby, IUserState } from '../../interface'
import { fetchUser, addHobby, addUser, deleteHobby } from './userAPI'


export const getUsers = createAsyncThunk('user/fetchUsers', async () => {
  const res = await fetchUser()
  return res?.users
})

// export const addnewUser = createAsyncThunk('user/addUser', async (name: string) => {
//   const res = await addNewUser(name)
//   return res?.users
// })

const initialState: IUserState = {
  value: [],
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewUser: (state: IUserState, action: PayloadAction<string>) => {
      const checkIfThisNameAlreadyExists = pathOr([], ['value'], state).filter(({ user }) => user === action.payload)
      if(checkIfThisNameAlreadyExists.length) {
       return alert("This user's name already exists")
      }

      state?.value?.push({ 
        id: state?.value?.length + 1,
        user: action.payload,
        hobbies: []
       })
    },

    addNewHobby: (state: IUserState, action: PayloadAction<{ selectedUserId: number; newHobby: IHobby }>) => {
      const selectedUserId: number = action.payload.selectedUserId

      // Validate on Selecting a user first before adding a hobby
      if(!selectedUserId) return alert("Please select a user first!")
      const selectedUserIndex = state.value.findIndex(({ id }) => id  === selectedUserId)

      const checkIfThisHobbyAlreadyExsits = state.value?.[selectedUserIndex].hobbies.filter(({ hobby }) => hobby === action?.payload?.newHobby?.hobby)
      if(checkIfThisHobbyAlreadyExsits.length) return alert("This hobby already exists for this user!")
      
      state.value?.[selectedUserIndex].hobbies.push(action.payload.newHobby)
    },

    removeHobby: (state: IUserState, action: PayloadAction<{ selectedUserId: number, hobbyId: number }>) => {
      const selectedUserId: number = action.payload.selectedUserId
      const hobbyId: number = action.payload.hobbyId

      // The validation here is somehow redundant,cuz the user won't be able to view the hobbies unless he selectes a user, but added it anyways as an extra layer of validation
      if(!selectedUserId) return alert("Please select a user first!")
      const selectedUserIndex = state.value.findIndex(({ id }) => id  === selectedUserId)

      const selected = state?.value?.[selectedUserIndex]

      const updated = [
        ...state.value.filter((v) => v.id !== selectedUserId),
        {
          ...selected,
          hobbies: selected?.hobbies.filter(({ id }: IHobby) => id !== hobbyId),
        }]

        state.value = updated
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(getUsers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.status = 'idle';
          state.value = action.payload;
        })
        .addCase(getUsers.rejected, (state) => {
          state.status = 'failed';
        });
    },
  
});

export const { addNewUser, addNewHobby, removeHobby } = userSlice.actions

export default userSlice.reducer
