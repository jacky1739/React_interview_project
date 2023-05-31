import React from 'react'
import styles from './ShoppingCart.module.scss'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col, Affix } from 'antd'
import { ProductList, PaymentCard } from '../../component'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { clearShoppingCartItem, checkout } from '../../redux/shoppingCart/slice'
import { useNavigate } from 'react-router-dom'

export const ShoppingCartPage: React.FC = () => {
  const loading = useSelector((state) => state.shoppingCart.loading)
  const shoppingCartItems = useSelector((state) => state.shoppingCart.items)
  const jwt = useSelector((state) => state.user.token) as string
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  return (
    <MainLayout>
      <Row>
        {/* 購物車清單 */}
        <Col span={16}>
          <div className={styles['product-list-container']}>
            <ProductList data={shoppingCartItems.map((item:any) => item.touristRoute)} />
          </div>
        </Col>
        {/* 信用卡元件 */}
        <Col span={8}>
          <Affix>
            <div className={styles['paymant-card-container']}>
              <PaymentCard
                loading={loading}
                originalPrice={shoppingCartItems.map((item: any) => item.originalPrice).reduce((a: any,b: any) => a + b, 0)}
                price={shoppingCartItems.map((item: any) => item.originalPrice * (item.discountPresent ? item.discountPresent : 1)).reduce((a: any, b: any) => a + b, 0)}
                onCheckout={() => {
                  if (shoppingCartItems.length <= 0) {
                    alert("購物車是空的 請先加入購物車")
                    return navigate('/')
                  }
                  dispatch(checkout(jwt))
                  navigate('/placeOrder')
                }}
                onShoppingCartClear={() => {
                  dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map((item: any) => item.id)}))
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  )
}
