import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { resetWatch } from '../store'
import { Container, Header, Input, Card, Image, CardContent as content, CardHeader, CardDescription as Description, Radio} from 'semantic-ui-react'

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
            if (watch.available){
              return (
                <div key={watch.id}>
                <Link to={`/watches/${watch.id}`}>
                    <Card className="all-watch-single-card" raised={true} >
                    <Header as="h2" className="all-watch-card-title">{watch.make} </Header>
                      <Image src={watch.imageUrl} />
                      <content className="all-watch-card">
                        <CardHeader>{watch.model}</CardHeader>
                        <CardHeader>Make: {watch.make}</CardHeader>
                        <CardHeader>Model: {watch.model}</CardHeader>
                        <p> Year: {watch.year} </p>
                        <p>Complications: {watch.complications}</p>
                        <Description>Price: {watch.price}</Description>
                      </content>
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


const mapStateToProps = (state) => {
  return {
    watches: state.watches
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
