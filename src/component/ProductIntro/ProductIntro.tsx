import React from 'react'
import styles from './ProductIntro.module.scss'
import { Typography, Carousel, Image, Rate, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface PropsType {
  title: string
  shortDescription: string
  price: string | number
  coupons: string
  discount: string
  points: string
  rating: string | number
  pictures: string[]
}

const columns: ColumnsType<RowType> = [
  {
    title: "title",
    dataIndex: "title",
    key: "title",
    align: "left",
    width: 120
  },
  {
    title: "description",
    dataIndex: "description",
    key: "descriptioin",
    align: "center"
  }
]

interface RowType {
  title: string
  description: string | number | JSX.Element
  key: number
}

export const ProductIntro: React.FC<PropsType> = (props) => {
  const { title, shortDescription, price, coupons, discount, points, rating, pictures } = props

  const tableDataSource: RowType[] = [
    {
        key: 0,
        title: "路線名稱",
        description: title,
    },
    {
        key: 1,
        title: "價格",
        description: (
          <div>
            ¥{" "}
            <Typography.Text type="danger" strong>
              {price}
            </Typography.Text>
        </div>
        ),
    },
    {
      key: 2,
      title: "限時搶購折扣",
      description: discount ? (
        <>
          ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
          <Typography.Text type="danger" strong>
            ¥ {discount}
          </Typography.Text>
          </>
      ) : (
          "暫無折扣"
      ),
    },
    {
      key: 3,
      title: "領取優惠",
      description: coupons ? discount : "無優惠券可領",
    },
    {
      key: 4,
      title: "路線評價",
      description: (
        <div>
          <Rate allowHalf defaultValue={+rating} />
          <Typography.Text style={{ marginLeft: 10 }}>
            {rating} 星
          </Typography.Text>
        </div>
    ),
    },
  ]

  return (
    <div className={styles['intro-container']}>
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{shortDescription}</Typography.Text>
      <div className={styles['intro-detail-content']}>
        <Typography.Text style={{ margin: 20 }}>
          $ <span className={styles['intro-detail-strong-text']}>{price}</span>/人起
        </Typography.Text>
        <Typography.Text style={{ margin: 50 }}>
          <span className={styles['intro-detail-strong-text']}>{rating}</span> 分
        </Typography.Text>
      </div>
      <Carousel autoplay slidesToShow={3}>
        { pictures.map(p => {
          return <Image height={150} src={p} />
          })
        }
      </Carousel>
      <Table columns={columns} dataSource={tableDataSource} size="small" bordered={false} pagination={false} />
    </div>
  )
}