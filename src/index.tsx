import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/reset.css'
import './i18n/configs'

import { Provider } from 'react-redux'
import rootStore from './redux/store'
import axios from 'axios'
// PersistGate為redux-perisit針對react開發的provider
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = '3C81D6C539FD0CF2'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
