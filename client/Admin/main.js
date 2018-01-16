import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminHeader, AdminMenu, Orders, Watches } from './index'
import { fetchOrders, fetchUsers } from '../store'
import { connect } from 'react-redux'

const Main = () => {
  return (
    <div>
      <AdminHeader />
      <div className="admin">
        <AdminMenu />
        <Switch>
          <Route path="/admin/watches" component={Watches} />
          <Route path="/admin/orders" component={Orders} />
        </Switch>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
      dispatch(fetchUsers())
    }
  }
}

export default connect(null, mapDispatchToProps)(Main)
