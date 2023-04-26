import React from 'react'
import styles from './HomePage.module.scss'
import { Header, Footer, Carousel, SideMenu, ProductCollection } from '../../component'
import { Row, Col, Typography } from 'antd'

import { productList1, productList2, productList3 } from './mockup'

import sideImage from '../../assets/images/sider_2019_12-09.png'
import sideImage2 from '../../assets/images/sider_2019_02-04.png'
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png'

export const HomePage: React.FC = () => {
  return (
    <div>
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
        <ProductCollection 
          title={<Typography.Title level={3} type="warning">爆款推薦</Typography.Title>}
          sideImage={sideImage}
          products={productList1}
        />
        <ProductCollection 
          title={<Typography.Title level={3} type="danger">新品上市</Typography.Title>}
          sideImage={sideImage2}
          products={productList2}
        />
        <ProductCollection 
          title={<Typography.Title level={3} type="success">國內旅遊推薦</Typography.Title>}
          sideImage={sideImage3}
          products={productList3}
        />
      </div>
      <Footer />
    </div>
  )
}