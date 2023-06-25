import React from "react"
import styles from "./UserLayout.module.scss"
import logo from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { CaretDownOutlined } from "@ant-design/icons"
import { Layout, Menu, Dropdown, Button } from "antd"
const { Header, Footer, Content } = Layout

// 在react 18中 必須加上類型定義
interface PropsTypes {
  children: React.ReactNode;
}

export const UserLayout: React.FC<PropsTypes> = ({ children }) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  )

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              選擇語言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>React 旅遊網</span>
            </Link>
          </div>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer... 想好了再寫</Footer>
    </Layout>
  )
}
