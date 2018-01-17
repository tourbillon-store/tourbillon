import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { AdminHeader, AdminMenu, Orders, Watches, Users } from './index'
import { fetchOrders, adminFetchUsers } from '../store'
import { connect } from 'react-redux'

class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  /* eslint-disable class-methods-use-this*/
  render() {
    return (
      <div>
        <AdminHeader />
        <div className="admin">
          <AdminMenu />
          <Switch>
            <Route path="/admin/watches" component={Watches} />
            <Route path="/admin/orders" component={Orders} />
          </Switch>
          <Route path="/admin/users" component={Users} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
      dispatch(adminFetchUsers())
    }
  }
}

export default connect(null, mapDispatchToProps)(Main)
