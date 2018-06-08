import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import StorePicker from './StorePicker'
import App from './App'
import NotFound from './NotFound'

// 构建单页app的路由
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* 由上到下依次匹配↓ */}
        {/* 根路径 */}
        <Route exact path='/' component={StorePicker} />
        {/* 带参路径 */}
        <Route path='/store/:storeId' component={App} />
        {/* 匹配剩余所有路径 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
