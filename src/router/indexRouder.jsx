import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '../views/login/login'
import NewsSandbox from '../views/sandbox/NewsSandbox'
export default function indexRouder() {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />

        <Route path="/" render={() =>
          localStorage.getItem("token") ?
            <NewsSandbox></NewsSandbox> :
            <Redirect to="/login" />
        } />
      </Switch>
    </HashRouter>
  )
}
