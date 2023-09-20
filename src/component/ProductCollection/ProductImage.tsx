import React from 'react'
import { Image, Typography } from 'antd'
import { Link } from 'react-router-dom'

interface PropsType {
  id: string | number
  size: "large" | "small"
  imgSrc: string
  price: number | string
  title: string
}

export const ProductImage: React.FC<PropsType> = ({id, size, imgSrc, price, title}) => {
  return (
    // 等於使用a標籤將整個元件包裹起來 用戶可以直接使用右鍵新增頁面的方式開啟
    <Link to={`/detail/${id}`}>
      { 
        size=="large" ? <Image src={imgSrc} height={285} width={490} />
        : <Image src={imgSrc} height={120} width={240} />
      }
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>$ {price} 起</Typography.Text>
      </div>
    </Link>
  )
}