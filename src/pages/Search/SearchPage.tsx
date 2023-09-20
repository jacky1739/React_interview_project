import React, { useEffect } from 'react'
import styles from './SearchPage.module.scss'
import { FilterArea, ProductList } from '../../component'
import { useLocation, useParams } from "react-router-dom"
import { Spin } from 'antd'
import { searchProduct } from '../../redux/productSearch/slice'
import { useSelector, useAppDispatch } from '../../redux/hooks'
import { MainLayout } from '../../layout/mainLayout'

interface MatchParams {
  keywords: string
}

export const SearchPage: React.FC = () => {
  const { keywords } = useParams<keyof MatchParams>()

  const loading = useSelector(state => state.productSearch.loading)
  const error = useSelector(state => state.productSearch.error)
  const pagination = useSelector(state => state.productSearch.pagination)
  const productList = useSelector(state => state.productSearch.data)

  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    if (keywords) {
      dispatch(searchProduct({ keywords }))
    }
  },[location]) // 如果url發生改變就觸發useEffect

  // const onPageChange = (nextPage: any, pageSize: any) => {
  //   if (keywords) {
  //     dispatch({ nextPage, pageSize, keywords })
  //   }
  // }

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
      <div className={styles['page-content']}>
        {/* 分類過濾器 */}
        <div className={styles['product-list-container']}>
          <FilterArea />
        </div>
        {/* 產品列表 */}
        <div className={styles['product-list-container']}>
          <ProductList
            data={productList}
            paging={pagination}
            // onPageChange={onPageChange}
          />
        </div>
      </div>
    </MainLayout>
  )
}