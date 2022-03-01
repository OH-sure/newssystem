import React, { useState, } from 'react'

import { Layout, Menu, Dropdown, Avatar } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

function TopHeader(props) {
  const [collapsed, setCollapased] = useState(false)
  const changeCollapsed = () => {
    setCollapased(!collapsed)
  }

  const {role:{roleName},username}=JSON.parse(localStorage.getItem("token"))

  const menu = (
    <Menu >
      <Menu.Item key={1}>
        {roleName}
      </Menu.Item>

      <Menu.Item danger onClick={() => {

          props.history.replace('/login')
        }} key={2}>退出</Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {collapsed ? <MenuUnfoldOutlined className='trigger' onClick={changeCollapsed} /> : <MenuFoldOutlined className='trigger' onClick={changeCollapsed} />}

      <div style={{ 'float': 'right' }}>
        <span>
          欢迎{username}回来!
        </span>
        <Dropdown overlay={menu}>
          <Avatar size={45} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}
export default withRouter(TopHeader)