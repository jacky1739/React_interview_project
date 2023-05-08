import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Spin, Row, Col } from 'antd'
import styles from './DetailPage.module.scss'
import { Header, Footer, ProductIntro } from '../../component'
// antd 日期
import { DatePicker, Space } from 'antd'
const { RangePicker } = DatePicker

// type MatchParams = {
//   touristRouteId: string, 
//   other: string
// }

interface MatchParams2 {
  touristRouteId: string
}

export const DetailPage: React.FC = () => {
    // let params = useParams<"touristRouteId">
  let params = useParams<keyof MatchParams2>()
  const { touristRouteId } = useParams<keyof MatchParams2>()
  const [ loading, setLoading ] = useState<boolean>(true)
  const [ product, setProduct ] = useState<any>(null)
  const [ error, setError ] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
        console.log(data)
        setProduct(data)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "error")
        setLoading(false)
      }
    }
    fetchData()
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
    <div>
      <Header />
      <div className={styles["page-content"]}>
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
              <RangePicker open style={{ marginTop: 20 }} />
            </Col>
          </Row>
        </div>
        {/* 錨點菜單 */}
        <div className={styles["product-detail-anchor"]}></div>
        {/* 產品特色 */}
        <div id='feature' className={styles['product-detail-container']}></div>
        {/* 費用 */}
        <div id='fees' className={styles['product-detail-container']}></div>
        {/* 預定須知 */}
        <div id='notes' className={styles['product-detail-container']}></div>
        {/* 商品評價 */}
        <div id='comments' className={styles['product-detail-container']}></div>
      </div>
      <Footer />
    </div>
  )
}