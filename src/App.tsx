import React from 'react';
import styles from './App.module.scss'
import { Header, Footer } from './component'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <Header />
      <Footer />
    </div>
  )
}

export default App;
