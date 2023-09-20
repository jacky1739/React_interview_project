import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import type { MenuProps } from 'antd'
import { Layout, Typography, Input, Menu, Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import styles from './Header.module.scss'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'

import { LanguageActionTypes, addLanguageActionCreator, changeLanguageActionCreator } from '../../redux/language/languageActions'

import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import { userSlice } from '../../redux/user/slice'

interface JwtPayload extends DefaultJwtPayload {
  username: string // 回傳的token解碼後 payload裡的username
}

export const Header: React.FC = () => {
  const { t } = useTranslation()
  // 進行頁面的處理
  const navigate = useNavigate()
  // 當前的路徑訊息
  const location = useLocation()
  // 獲取URL中的參數
  const params = useParams()

  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const dispatch = useDispatch()

  const jwt = useSelector((state) => state.user.token)
  const [ username, setUsername ] = useState("")

  const shoppingCartItems = useSelector((state) => state.shoppingCart.items)
  const shoppingCartLoading = useSelector((state) => state.shoppingCart.loading)

  useEffect(() => {
    if (jwt) {
      const token = jwt_decode<JwtPayload>(jwt)
      setUsername(token.username)
    }
  }, [jwt])

  // 發送
  const menuClickHandler = (e: any) => {
    console.log(e)
    if (e.key === "new_lang") {
      dispatch(addLanguageActionCreator("新語言", "new_lang"))
    } else {
      dispatch(changeLanguageActionCreator(e.key))
    }
  }
  // 渲染語言列表
  const items = languageList.map((item) => {
    return { key: item.code, label: item.name, onClick: (e: any) => { menuClickHandler(e) } }
  })

  const menuItems: MenuProps['items'] = [
    { key: "1", label: t("header.home_page") },
    { key: "2", label: t("header.weekend") },
    { key: "3", label: t("header.group") },
    { key: "4", label: t("header.backpack") },
    { key: "5", label: t("header.private") },
    { key: "6", label: t("header.cruise") },
    { key: "7", label: t("header.hotel") },
    { key: "8", label: t("header.local") },
    { key: "9", label: t("header.theme") },
    { key: "10", label: t("header.custom") },
    { key: "11", label: t("header.study") },
    { key: "12", label: t("header.visa") },
    { key: "13", label: t("header.enterprise") },
    { key: "14", label: t("header.high_end") },
    { key: "15", label: t("header.outdoor") },
    { key: "16", label: t("header.insurance") }
  ]

  const onLogout = () => {
    dispatch(userSlice.actions.logOut())
    navigate('/')
  }

  return (
    <div>
      <div className={styles["app-header"]}>
        {/* top-header */}
        <div className={styles.container}>
          <div className={styles["top-header"]}>
            <Dropdown.Button
              style={{ marginTop: 5 }}
              menu={{items}}
              icon={ <GlobalOutlined /> }
            >
              { language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            { jwt ? (
              <Button.Group className={styles["button-group"]}>
                <p>{username}</p>
                <Button loading={shoppingCartLoading} onClick={() => navigate("/shoppingCart")}>{t("header.shoppingCart")}({shoppingCartItems.length})</Button>
                <Button onClick={onLogout}>{t("header.signOut")}</Button>
              </Button.Group>
              ) : ( 
              <Button.Group className={styles["button-group"]}>
                <Button onClick={() => navigate("/register")}>{t("header.register")}</Button>
                <Button onClick={() => navigate("/signin")}>{t("header.signin")}</Button>
              </Button.Group>
              )
            }
          </div>
        </div>

        <Layout.Header className={styles["main-header"]}>
          <span onClick={() => navigate("/")}>
            <img src={logo} alt="" className={styles["App-logo"]} />
          </span>
          <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
          <Input.Search placeholder="請輸入旅遊目的地或關鍵字" className={styles["search-input"]} onSearch={(keywords) => navigate("/search/" + keywords)} />
        </Layout.Header>
        <Menu mode={'horizontal'} items={menuItems} className={styles["main-menu"]}></Menu>
      </div>
    </div>
  )
}
