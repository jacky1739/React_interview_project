// 想定義action的類型可以使用PayloadAction
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface ShoppingCartState {
  loading: boolean
  error: string | null
  items: any
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: []
}

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(`http://82.157.43.234:8080/api/shoppingCart`, {
      headers: {
        Authorization: `bearer ${jwt}`
      }
    })
    // 要return 一個promise
    return data.shoppingCartItems
  }
)

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { jwt: string, touristRouteId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://82.157.43.234:8080/api/shoppingCart/items`,
      {
        touristRouteId: parameters.touristRouteId
      },
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`
        }
      }
    )
    console.log(data.shoppingCartItems)
    return data.shoppingCartItems
  }
)

export const checkout = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      `http://82.157.43.234:8080/api/shoppingCart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`
        }
      }
    )
    console.log(data.shoppingCartItems)
    return data
  }
)

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (paramater: { jwt: string, itemIds: number[] }, thunkAPI) => {
    // return為204 所以直接retrun axios
    return await axios.delete(`http://82.157.43.234:8080/api/shoppingCart/items/(${paramater.itemIds.join(",")})`,
      {
        headers: {
          Authorization: `bearer ${paramater.jwt}`
        }
      }
    )
  }
)

export const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      // return { ...state, loading: true}
      state.loading = true
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = action.payload
      state.error = null
    },
    [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.items = action.payload
      state.loading = false
      state.error = null
    },
    [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      // return { ...state, loading: true}
      state.loading = true
    },
    [clearShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = []
      state.error = null
    },
    [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: (state) => {
      // return { ...state, loading: true}
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.loading = false
      state.items = []
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
  }
})
