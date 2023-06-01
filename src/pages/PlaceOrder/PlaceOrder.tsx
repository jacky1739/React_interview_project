import React from 'react'
import { PaymentForm, CheckOutCard } from '../../component'
import { MainLayout } from '../../layout/mainLayout'
import { Row, Col } from 'antd'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { placeOrder } from '../../redux/order/slice'
import { useDispatch } from 'react-redux'

export const PlaceOrderPage: React.FC = () => {
  const jwt = useSelector((state) => state.user.token) as string
  const loading = useSelector((state) => state.order.loading)
  const error = useSelector((state) => state.order.error)
  const order = useSelector((state) => state.order.currentOrder)
  const dispatch = useDispatch()

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={order}
            onCheckout={() => {
              dispatch(placeOrder({jwt, orderId: order.id}))
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  )
}