import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spin, Row, Col, Divider, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import styles from './DetailPage.module.scss'
import { ProductIntro, ProductComments } from '../../component'
// 引入商品評論MockData
import { commentMockData } from './mockup'

import { getProductDetail } from '../../redux/productDetail/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'

import { MainLayout } from '../../layout/mainLayout'
import { addShoppingCartItem } from '../../redux/shoppingCart/slice'

// antd 日期
import { DatePicker, Button } from 'antd'
// import { productDetailSlice } from '../../redux/recommendProducts/slice'
const { RangePicker } = DatePicker

// type MatchParams = {
//   touristRouteId: string, 
//   other: string
// }

interface MatchParams2 {
  touristRouteId: string
}

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<keyof MatchParams2>()
  // const [ loading, setLoading ] = useState<boolean>(true)
  // const [ product, setProduct ] = useState<any>(null)
  // const [ error, setError ] = useState<string | null>(null)

  const loading = useSelector((state) => state.productDetail.loading)
  const error = useSelector((state) => state.productDetail.error)
  const product = useSelector((state) => state.productDetail.data)

  const dispatch = useAppDispatch()

  const jwt = useSelector((state) => state.user.token) as string
  const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading)

  useEffect(() => {
    if (touristRouteId) {
      dispatch(getProductDetail(touristRouteId ))
    }
  }, [])

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          marginTop: 200,
          marginBottom: 200,
          marginLeft: "auto",
          marginRight: "auto",
          width: "100%"
        }}
      />
    )
  }

  if (error) {
    return <div>網站出錯: {error}</div>
  }

  return (
    <MainLayout>
      {/* 產品簡介 和 日期選擇 */}
      <div className={styles["product-intro-container"]}>
        <Row>
          <Col span={13}>
            <ProductIntro
              title={product.title}
              shortDescription={product.descriptioin}
              price={product.originalPrice}
              coupons={product.coupons}
              points={product.points}
              discount={product.price}
              rating={product.rating}
              pictures={product.touristRoutePictures.map((picture: any) => 
                picture.url
              )}
            />
          </Col>
          <Col span={11}>
            <Button
              style={{marginTop: 50, marginBottom: 30, display: "block"}}
              type="primary"
              danger
              loading={shoppingCartLoading}
              onClick={() => {
                dispatch(addShoppingCartItem({ jwt ,touristRouteId: product.id }))
              }}
            >
              <ShoppingCartOutlined />
              加入購物車
            </Button>
            <RangePicker open style={{ marginTop: 20 }} />
          </Col>
        </Row>
      </div>
      {/* 錨點菜單 */}
      <div className={styles["product-detail-anchor"]}></div>
      {/* 產品特色 */}
      <div id="feature" className={styles['product-detail-container']}>
        <Divider orientation={'center'}>
          <Typography.Title level={3}>產品特色</Typography.Title>
        </Divider>
        {/* react為防止注入攻擊, 有特殊的html處理機制, 使用dangerouslySetInnerHTML */}
        <div
          dangerouslySetInnerHTML={{__html: product.features}} style={{ margin: 50 }}
        />
      </div>
      {/* 費用 */}
      <div id="fees" className={styles['product-detail-container']}>
        <Divider orientation={"center"}>
          <Typography.Title level={3}>費用</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{__html: product.fees}} style={{ margin: 50}}
        />
      </div>
      {/* 預定須知 */}
      <div id="notes" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>預定須知</Typography.Title>
        </Divider>
        <div
          dangerouslySetInnerHTML={{__html: product.notes}} style={{ margin: 50 }}
        />
      </div>
      {/* 商品評價 */}
      <div id="comments" className={styles['product-detail-container']}>
        <Divider>
          <Typography.Title level={3}>商品評價</Typography.Title>
        </Divider>
        <div style={{ margin: 40 }}>
          <ProductComments data={commentMockData} />
        </div>
      </div>
    </MainLayout>
  )
}