import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminHeader, AdminMenu, Orders, Watches } from './index'

const Main = () => {
  return (
    <div>
      <AdminHeader />
      <div className="admin">
        <AdminMenu />
        <Switch>
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/watches" component={Watches} />
          <Route path="/admin/orders" component={Orders} />
        </Switch>
      </div>
    </div>
  )
}

export default Main
