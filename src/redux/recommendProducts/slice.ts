import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// 如果要使用自定義action, 就可以使用PayloadAction
import axios from 'axios'

interface ProductList {
  data: any
  loading: boolean
  error: string | null
}

const initialState: ProductList = {
  loading: true,
  error: null,
  data: null
}

export const getProductList = createAsyncThunk(
  // 前面為 name , 後面為這個 action 的名稱
  "productList/getProductList",
  async (touristRouteId: string) => {
    const { data } = await axios.get('http://82.157.43.234:8080/api/productCollections')
    // 返回的是一個promise, getProductDetail這個函數就會自動生成pending, fulfilled, rejected這三個action
    return data
  }
)

export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  },
  extraReducers: {
    [getProductList.pending.type]: (state) => {
      state.loading = true
    },
    [getProductList.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductList.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})