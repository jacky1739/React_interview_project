import React, { useEffect } from 'react'
import styles from './App.module.scss'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from './pages'
import { Navigate } from 'react-router-dom'
import { useSelector, useAppDispatch } from './redux/hooks'
import { getShoppingCart } from './redux/shoppingCart/slice'

// 使用函數式元件的方式來創建Private路由
const PrivateRoute = ({ children }: any) => {
  const jwt = useSelector((state) => state.user.token)
  return jwt ? children : <Navigate to="/signin" />
}

const App: React.FC = () => {
  const jwt = useSelector((state) => state.user.token)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt))
    }
  }, [jwt])

  return (
    <div className={styles.App}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/:keywords" element={<SearchPage />} />
          <Route 
            path="/shoppingCart"
            element={
              <PrivateRoute>
                <ShoppingCartPage />
              </PrivateRoute>}
          />
          <Route 
            path="/placeOrder"
            element={
              <PrivateRoute>
                <PlaceOrderPage />
              </PrivateRoute>}
          />
          <Route path="*" element={<h1>你的頁面跑去火星了</h1>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
