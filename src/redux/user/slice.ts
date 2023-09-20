// 想定義action的類型可以使用PayloadAction
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean
  error: string | null
  token: string | null // jwt token
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

export const signIn = createAsyncThunk(
  "user/signIn",
  async (paramaters: {
    email: string,
    password: string
  }, thunkAPI) => {
    const { data } = await axios.post(`http://82.157.43.234:8080/auth/login`, {
      email: paramaters.email,
      password: paramaters.password
    })
    // 要return 一個promise
    return data.token
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null
      state.error = null
      state.loading = false
    }
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      // return { ...state, loading: true}
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false
      state.token = action.payload
      state.error = null
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
