import React from 'react';
import styles from './App.module.scss'
import { Header } from './component/Header/Header'
import { Footer } from './component/Footer/Footer'

const App = () => {

  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  )
}

export default App;
