import React,{ useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios'

import {
UserOutlined,
} from '@ant-design/icons';

//css
import "./SideMenu.css"

const { Sider } = Layout;
const { SubMenu } = Menu;

const iconList={
"/home":<UserOutlined />,
"/user-manage":<UserOutlined />,
"/right-manage":<UserOutlined />,
"/user-manage/list":<UserOutlined />,
"/right-manage/role/list":<UserOutlined />,
"/right-manage/right/list":<UserOutlined />,
}

function SideMenu(props) {

  
  const[menu,setMenu] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then(
      res => {
        setMenu(res.data)
      }
      )
    }, [])
    
    const {role:{rights}}=JSON.parse(localStorage.getItem("token"))
//检查是否为页面接口
const checkPagepermission=(item)=>{
  return item.pagepermisson&&rights.includes(item.key)
}
//列表栏渲染函数
  const manuRender = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagepermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {manuRender(item.children)}
          </SubMenu>
        )
      }
      return checkPagepermission(item) &&
        <Menu.Item key={item.key} icon={iconList[item.key]} onClick={() => {
          props.history.push(item.key)
        }} >
          {item.title}
        </Menu.Item>
    })
  }
// console.log(props.location.pathname);
  const selectKeys=[props.location.pathname]
  const openKeys=['/'+props.location.pathname.split('/')[1]]

  return (

    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">锦绣文章后台管理</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={selectKeys} defaultOpenKeys={openKeys}>
            {manuRender(menu)}
          </Menu>
        </div>
      </div>
    </Sider>


  )
}

export default withRouter(SideMenu)