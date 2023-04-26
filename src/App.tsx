import React from 'react';
import styles from './App.module.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage } from './pages'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="*" element={<h1>你的頁面跑去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
