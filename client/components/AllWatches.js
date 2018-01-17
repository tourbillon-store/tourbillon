import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetWatch } from '../store'
import { Rating, Input, Card, Image, CardContent as content, CardHeader as header, CardDescription as Cdesc, Radio} from 'semantic-ui-react'

class AllWatches extends Component {
  constructor(props){
    super(props)

    this.state = {
      make: '',
      model: '',
      year: '',
      price: '',
      complications: '',
      avialable: ''
    };

  this.filterWatch = this.filterWatch.bind(this);
  this.renderWatchSearch = this.renderWatchSearch.bind(this);

  }

  componentDidMount() {
    this.props.resetWatch()
  }

  render() {
    const { watches } = this.props;
    return (
      <div className="all-watches">
        <div>
         {this.renderWatchSearch()}
       </div>
        <div>
        <div className="all-watches-float">
        <Card.Group>
          {watches.filter(this.filterWatch).map(watch => {
            if (watch.available) {
              const rating = Math.round(watch.reviews.reduce((prev, curr) => prev + curr.rating, 0) / watch.reviews.length)
              return (
                <div key={watch.id}>
                  <Card className="all-watch-single-card" raised={true} >
                    <Link to={`/watches/${watch.id}`}>
                      <h2 className="all-watch-card-title">{watch.make} </h2>
                        <Image src={watch.imageUrl} />
                    </Link>
                    <content className="all-watch-card">
                      <header>{watch.model}</header>
                      <header>Make: {watch.make}</header>
                      <header>Model: {watch.model}</header>
                      <p> Year: {watch.year} </p>
                      <p>Complications: {watch.complications}</p>
                      <Rating name="rating" disabled icon="star" defaultRating={rating} maxRating={5} /> <Link to={`/watches/${watch.id}/reviews`}>({watch.reviews.length})</Link>
                      <Cdesc>Price: {watch.price}</Cdesc>
                    </content>
                  </Card>
                </div>
              )
            }
          })}
          </Card.Group>
        </div>
      </div>
    </div>
    )
  }


renderWatchSearch () {
  return (
    <div className="all-watch-form">
      <Input
        type="text"
        focus placeholder="MAKE"
        className=""
        onChange={evt => this.setState({ make: evt.target.value })}
      />
      <Input
        type="text"
        focus placeholder="MODEL"
        className=""
        onChange={evt => this.setState({ model: evt.target.value })}
      />
      <Input
        type="text"
        focus placeholder="YEAR"
        className=""
        onChange={evt => this.setState({ year: evt.target.value })}
      />
      <Input
        type="text"
        focus placeholder="COMPLICATIONS"
        className=""
        onChange={evt => this.setState({ complications: evt.target.value })}
      />
      <Radio label="Available" defaultChecked />
    </div>
  )
}

  filterWatch (watch) {
    const makeMatch = new RegExp(this.state.make, 'i');
    const modelMatch = new RegExp(this.state.model, 'i');
    const yearMatch  = new RegExp(this.state.year, 'i');
    const complicationsMatch = new RegExp(this.state.complications, 'i');

    return yearMatch.test(watch.year)
      && makeMatch.test(watch.make)
      && modelMatch.test(watch.model)
      && complicationsMatch.test(watch.complications)
  }
}

const mapStateToProps = ({watches}) => ({watches})

const mapDispatchToProps = (dispatch) => {
  return {
    resetWatch() {
      dispatch(resetWatch({ loading: true }))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllWatches));
