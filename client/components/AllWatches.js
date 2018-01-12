import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetWatch } from '../store'

class AllWatches extends Component {
  componentDidMount() {
    this.props.resetWatch()
  }

  render() {
    const { watches, isAdmin } = this.props;
    console.log(this.props)
    console.log(this.props.isAdmin)
    return (
      <div>
        {watches.map(watch => {
          if(watch.available) {
            return (
              <div key={watch.id}>
                <Link to={`/watches/${watch.id}`}><h2>{watch.make} {watch.model}</h2></Link>
                <ul>
                  <li>Year: {watch.year}</li>
                  <li>Complications: {watch.complications}</li>
                  <li>Image: {watch.imageUrl}</li>
                  <li>Price: {watch.price}</li>
                </ul>
              </div>
            )
          }
        })}
        <div>
          {isAdmin ? <div>
                       <h1>You are an admin!</h1>
                       <Link to={`/watches/new`}>
                         <span>Create a watch</span>
                       </Link>
                     </div>
                   :
                     ''
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    watches: state.watches,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetWatch() {
      dispatch(resetWatch({ loading: true }))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllWatches));
