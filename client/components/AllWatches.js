import React from 'react';
import { connect } from 'react-redux'

const Watches = (props) => {
  const { watches } = props;
  return (
    <div>
      <ul>
        {watches.map(watch => {
          return (
            <div key={watch.id}>
              <h2>{watch.make} {watch.model}</h2>
              <li>Year: {watch.year}</li>
              <li>Complications: {watch.description}</li>
              <li>Image: {watch.imageUrl}</li>
              <li>Price: {watch.price}</li>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    watches: state.watches
  }
}

export const AllWatchesContainer = connect(mapStateToProps)(Watches);
