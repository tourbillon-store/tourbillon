import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetWatch } from '../store'
import { Rating, Container, Header, Input, Card, Image, CardContent as Content, CardHeader, CardMeta, CardDescription, Radio} from 'semantic-ui-react'
import { numberWithCommas } from '../utils'

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
      <Container className="all-watches">
        <Header as="h1">Browse Watches</Header>
        <Header as="h3">Filter Results </Header>
        <div>
         {this.renderWatchSearch()}
        </div>
        <Card.Group className="all-watches-card-container">
          {watches.filter(this.filterWatch).map(watch => {
            if (watch.available) {
              const rating = Math.round(watch.reviews.reduce((prev, curr) => prev + curr.rating, 0) / watch.reviews.length)
              return (
                <div key={watch.id}>
                  <Link to={`/watches/${watch.id}`}>
                    <Card className="all-watches-single-card" raised centered color="blue">
                        <Image className="all-watches-img" src={watch.imageUrl} />
                        <Content className="all-watch-card">
                          <CardHeader>{watch.make}</CardHeader>
                          <CardMeta>{watch.model}</CardMeta>
                          <CardMeta>Complications: {watch.complications}</CardMeta>
                        </Content>
                      <Content extra>
                        <Rating name="rating" disabled icon="star" defaultRating={rating} maxRating={5} /> <Link to={`/watches/${watch.id}/reviews`}>({watch.reviews.length})</Link><br />
                        <CardMeta>Year: {watch.year},</CardMeta>
                        Price: ${numberWithCommas(watch.price / 100)}
                      </Content>
                    </Card>
                  </Link>
                </div>
              )
            }
          })}
      </Card.Group>
    </Container>
    )
  }


renderWatchSearch () {
  return (
    <div className="all-watches-form">
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
      {/*<Radio label="Available" defaultChecked /> */}
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
