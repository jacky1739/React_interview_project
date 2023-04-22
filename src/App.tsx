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
  const menuItems: MenuProps['items'] = [
    { key: 1, label: "旅遊首頁" },
    { key: 2, label: "跟團遊" },
    { key: 3, label: "週末遊" },
    { key: 4, label: "自由行" },
    { key: 5, label: "私家團" },
    { key: 6, label: "郵輪" },
    { key: 7, label: "酒店+景點" },
    { key: 8, label: "當地玩樂" },
    { key: 9, label: "主題遊" },
    { key: 10, label: "定製遊" },
    { key: 11, label: "遊學" },
    { key: 12, label: "簽證" },
    { key: 13, label: "企業遊" },
    { key: 14, label: "高端遊" },
    { key: 15, label: "愛玩戶外" },
    { key: 16, label: "保險"}
  ]

  return (
    <div className="App">
      <div className="app-header">
        {/* top-header */}
        <div className="container">
          <div className="top-header">
            <Dropdown.Button
              style={{ marginTop: 5 }}
              menu={{ items }}
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
        <Menu mode={'horizontal'} items={menuItems} className="main-menu"></Menu>
      </div>
      <Layout.Footer>
        <Typography.Title level={4} style={{ textAlign: 'center' }}>
          版權所有 @ React 旅遊網
        </Typography.Title>
      </Layout.Footer>
    </div>
  )
}

export default App;
