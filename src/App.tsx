import React from 'react'
import styles from './App.module.scss'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage } from './pages'
import { Navigate } from 'react-router-dom'
import { useSelector } from './redux/hooks'

const PrivateRoute = ({ children }: any) => {
  const jwt = useSelector((state) => state.user.token)
  return jwt ? children : <Navigate to="/signin" />
}

const App: React.FC = () => {

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
          <Route path="*" element={<h1>你的頁面跑去火星了</h1>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
