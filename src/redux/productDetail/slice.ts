// 想定義action的類型可以使用PayloadAction
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductDetailState {
  loading: boolean
  error: string | null
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

export const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    fetchStart: (state) => {
    //   return { ...state, loading: true}
    state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})
