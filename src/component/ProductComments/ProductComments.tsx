import React from 'react'
import { List, Tooltip } from 'antd'


interface PropsType {
  data: {
    author: string
    avatar: string
    content: string
    createDate: string
  }[]
}

export const ProductComments: React.FC<PropsType> = ({data}) => {
  return(
    <List
      dataSource={data}
      itemLayout="horizontal"
      renderItem={(item) => {
        return (
          <li>

          </li>
        )
      }}
    >
      
    </List>
  )
}