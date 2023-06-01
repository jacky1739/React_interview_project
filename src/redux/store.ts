import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
// 從這import combineReducers才能支援slice中的reducer
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { ProductDetailSlice } from './productDetail/slice'
// import { productDetailSlice } from './recommendProducts/slice'
import { productSearchSlice } from './productSearch/slice'
import {userSlice } from './user/slice'
import { orderSlice } from './order/slice'

import { persistStore, persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import { ShoppingCartSlice } from './shoppingCart/slice'


// redux-persist的設定
const persistConfig = {
  key: 'root', // 持久化命名空間
  storage, // 數據的保存方式
  whitelist: ['user'] // 這裡指向的是rootReducer裡的user 把資料都保存起來 其他都不保存 黑名單則相反 不會保存裡面的內容 但其他數據全部保存
}

// rootReducer命名為固定, 為combineReducers的集合體
// combineReducers可以組合多個reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: ProductDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,
  shoppingCart: ShoppingCartSlice.reducer,
  order: orderSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const store = createStore(rootReducer, applyMiddleware(thunk))
// configureStore 是RTK的 store
const store = configureStore({
  reducer: persistedReducer,
  devTools: true
})
// 使用persisStore創造一個持久化的store
const persistor = persistStore(store)

// store 的類型
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState} 10-8
export type AppDispatch = typeof store.dispatch

const rootSotre = {store, persistor}

export default rootSotre