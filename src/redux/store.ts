import { createStore, combineReducers, applyMiddleware } from 'redux'
import languageReducer from './language/languageReducer'
import recommendProductsReducer from './recommendProducts/recommendProductsReducer'
import thunk from 'redux-thunk'

// rootReducer命名為固定, 為combineReducers的集合體
// combineReducers可以組合多個reducer
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store