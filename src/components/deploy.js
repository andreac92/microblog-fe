import React, { Component } from 'react';
import axios from 'axios';
import { getHeaders, api_host } from '../constants/const.js';

export class Deploy extends Component {
  constructor(props) {
    super(props);
    this.state = {url: null};
  }
  deploy() {
    let that = this;
    axios.post(api_host + 'deploy', {layout: this.props.layout}, getHeaders(this.props.token, this.props.auth.client, this.props.auth.uid))
    .then(function (response) {
      if (response.headers['access-token']) {
        that.props.set_auth(response.headers['access-token'], null, null);
      }
      that.setState({url: response.data.url})

    })
    .catch(function (err) {
      console.log(err);
    })
  }
  render() { 
    return (
      <div>
        <button className="deploy-button" onClick={this.deploy.bind(this)}>Deploy now!</button>
        { this.state.url &&
          <p>Your site has been deployed to <a target="_blank" href={this.state.url}>Netlify!</a></p>
        }
      </div>
    )
  }
}

