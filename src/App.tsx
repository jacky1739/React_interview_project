import React from 'react';
import styles from './App.module.scss'
import { Header, Footer, Carousel, SideMenu } from './component'
import { Row, Col } from 'antd'

const App: React.FC = () => {

  return (
    <div className={styles.App}>
      <Header />
      {/* 頁面內容content */}
      <div className={styles['page-content']}>
        <Row style={{ margin: 20 }}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18}>
            <Carousel />
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}

export default App;
