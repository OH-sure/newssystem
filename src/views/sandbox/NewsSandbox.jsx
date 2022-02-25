import React from 'react'
import {Route, Switch,Redirect} from 'react-router-dom'
import TopHeader from '../../components/sandbox/TopHeader'
import SideMenu from '../../components/sandbox/SideMenu'
import Home from './home/Home'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import UserList from './user-manage/UserList'
import NoPermission from './noPermission/NoPermission'

import { Layout } from 'antd';

//css
import './NewsSandbox.css'

const { Content } = Layout;


export default function sandbox() {
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
      <TopHeader>

      </TopHeader>

      <Content className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow:'auto'
            }}>
      <Switch>
        <Route path={'/home'} component={Home}/>
        <Route path={'/user-manage'} component={UserList}/>
        <Route path={'/right-manage/role/list'} component={RoleList}/>
        <Route path={'/right-manage/right/list'} component={RightList}/>
        <Redirect from='/' to='/home' exact/>
        <Route path='*' component={NoPermission}/>
      </Switch>
      </Content>
      </Layout>

      
    </Layout> 
  )
}
