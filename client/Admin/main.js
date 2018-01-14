import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Menu from './Menu'
import AllOrders from './AllOrders'

const Main = () => {
  return (
    <div>
      <Header />
      <div className="admin">
        <Menu />
        <Switch>
          <Route path="/admin/orders" component={AllOrders} />
        </Switch>
      </div>
    </div>
  )
}

export default Main
