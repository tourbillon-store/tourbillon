import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminHeader, AdminMenu, Orders } from './index'

const Main = () => {
  return (
    <div>
      <AdminHeader />
      <div className="admin">
        <AdminMenu />
        <Switch>
          <Route path="/admin/orders" component={Orders} />
        </Switch>
      </div>
    </div>
  )
}

export default Main
