import React from 'react'
import {HashRouter,Route, Switch} from 'react-router-dom'
import Login from '../views/login/login'
import NewsSandbox from '../views/sandbox/NewsSandbox'
export default function indexRouder() {
  return (
    <HashRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' render={()=>
                <NewsSandbox></NewsSandbox>
            }/>
        </Switch>
    </HashRouter>
  )
}
