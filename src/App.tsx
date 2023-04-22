import React from 'react';
import logo from './logo.svg'
import type { MenuProps } from 'antd';
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons'

const App = () => {
  const items: MenuProps['items'] = [
    { key: '1', label: '中文' },
    { key: '2', label: 'English'}
  ]

  return (
    <div className="App">
      <div className="app-header">
        {/* top-header */}
        <div className="container">
          <div className="top-header">
            <Dropdown.Button
              style={{ marginTop: 5 }}
              menu={{
                items
              }}
              icon={ <GlobalOutlined /> }
            >
              語言
            </Dropdown.Button>
            <Button.Group className="button-group">
              <Button>註冊</Button>
              <Button>登入</Button>
            </Button.Group>
          </div>
        </div>

        <Layout.Header className="main-header">
          <img src={logo} alt="" className="App-logo" />
          <Typography.Title level={3} className="title">React 旅遊網</Typography.Title>
          <Input.Search placeholder="請輸入旅遊目的地或關鍵字" className="search-input" />
        </Layout.Header>
      </div>
    </div>
  )
}

export default App;
