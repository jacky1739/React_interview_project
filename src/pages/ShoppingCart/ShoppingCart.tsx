import React from 'react'
import styles from './ShoppingCart.module.scss'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../component'

export const ShoppingCartPage: React.FC = () => {
  return (
    <MainLayout>
      <Row>
        {/* 購物車清單 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            {/* <ProductList /> */}
          </div>
        </Col>
        {/* 信用卡元件 */}
        <Col span={8}>
          <Affix>
            <div className={styles['paymant-card-container']}>
              {/* <PaymentCard /> */}
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
