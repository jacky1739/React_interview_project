// import { createStore, applyMiddleware } from 'redux'

import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'

// import thunk from 'redux-thunk'

// 從這import combineReducers才能支援slice中的reducer
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ProductDetailSlice } from './productDetail/slice'
// import { productDetailSlice } from './recommendProducts/slice'
import { productSearchSlice } from './productSearch/slice'

// rootReducer命名為固定, 為combineReducers的集合體
// combineReducers可以組合多個reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: ProductDetailSlice.reducer,
  productSearch: productSearchSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk))
const store = configureStore({
  reducer: rootReducer,
  devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState} 10-8
export type AppDispatch = typeof store.dispatch

export default store