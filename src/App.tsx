import React from 'react';
import styles from './App.module.scss'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage } from './pages'

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
          <Route path="*" element={<h1>你的頁面跑去火星了</h1>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
