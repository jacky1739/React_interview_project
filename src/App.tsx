import React from 'react';
import styles from './App.module.scss'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App;
