import React from 'react';
import logo from './logo.svg'
import { Layout, Typography, Input } from 'antd';

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <Layout.Header className="main-header">
          <img src={logo} alt="" className="App-logo" />
          <Typography.Title level={3} className="title">React 旅遊網</Typography.Title>
          <Input.Search placeholder="請輸入旅遊目的地或關鍵字" className="search-input" />
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;
