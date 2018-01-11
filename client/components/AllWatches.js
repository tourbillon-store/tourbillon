import React from 'react';
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Watches = (props) => {
  const { watches } = props;
  return (
    <div>
      {watches.map(watch => {
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
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    watches: state.watches
  }
}

export default connect(mapStateToProps)(Watches);
