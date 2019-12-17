import React, { Component } from 'react'

import Graph from './Graph';
import './GraphContainer.css';
export default class GraphsContainer extends Component {
  state = {
    feed: [],
    feedReady: false,
    error:false,
  };
  apiTimeout = null;

  componentDidMount() {
    this.apiTimeout = setInterval(this.fetchFeed(), 10000);
  }
  fetchFeed = () => {
    console.log('fetch start')
    fetch('https://api.thingspeak.com/channels/937838/feeds.json?api_key=XMD0WU2YR6LBPMN9&results=10')
      .then(response => response.json())
      .then(data => this.setState({ feed: data, feedReady: true ,error:false}, console.log(this.state)))
      .then(setTimeout(this.fetchFeed, 5000))
      .catch(function () {
        setTimeout(this.fetchFeed, 5000);
        this.setState({error:false})
      }
      
      );
  }
  componentWillUnmount() {
    clearInterval(this.apiTimeout)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
}
  render() {
    const { feed, feedReady,error } = this.state;
    return (
      <div className='graph-box'>
        {feedReady ? <Graph feed={feed.feeds} field='field1' label="temperature" /> : "waiting for feed"}
        {feedReady ? <Graph feed={feed.feeds} field='field2' label="Humidity" /> : "waiting for feed"}
        {feedReady ? <Graph feed={feed.feeds} field='field3' label="Gas" /> : "waiting for feed"}
        {error? 'there was an error fetching data,showing last data fetched correctly and trying again':null}
      </div>
    )
  }
}

