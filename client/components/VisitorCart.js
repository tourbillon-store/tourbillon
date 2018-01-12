import React from 'react'
import { connect } from 'react-redux'

const VisitorCart = () => {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <h2>Visitor</h2>
    </div>
  )
}

const mapStateToProps = ({ cart }) => ({ cart })

export default connect(mapStateToProps)(VisitorCart)
