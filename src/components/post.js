import React, { Component } from 'react';
import axios from 'axios';
import { getHeaders, api_host } from '../constants/const.js';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {editable: false, text: this.props.content};
  }

  editPost() {
    if (this.state.editable) {
      this.setState({editable: false});
    } else {
      this.setState({editable: true});
    }
  }

  deletePost() {
    var that = this;
    axios.delete(api_host + 'posts/' + this.props.id, getHeaders(this.props.token, this.props.auth.client, this.props.auth.uid))
    .then(function (response) {
      if (response.headers['access-token']) {
        that.props.set_auth(response.headers['access-token'], null, null);
      }
      that.props.refreshList();

    })
    .catch(function (err) {
      console.log(err);
    });
  }

  submitPost() {
    var that = this;
    axios.put(api_host + 'posts/' + this.props.id, {content: this.state.text}, getHeaders(this.props.token, this.props.auth.client, this.props.auth.uid))
    .then(function (response) {
      if (response.headers['access-token']) {
        that.props.set_auth(response.headers['access-token'], null, null);
      }
      that.props.refreshList();

    })
    .catch(function (err) {
      console.log(err);
    });
    this.setState({editable: false});
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  render() {
    let button;
    if (!this.state.editable) {
      button = <button onClick={this.editPost.bind(this)}>Edit</button>
    } else {
      button = <button onClick={this.submitPost.bind(this)}>Save</button>
    }
    return (
      <div className="post" id={this.props.id}>
        <textarea 
          value={this.state.text} 
          onChange={this.handleChange.bind(this)}
          disabled={!this.state.editable}>
          </textarea>
        <div>
          {button}
          <button onClick={this.deletePost.bind(this)}>Delete</button>
        </div>
      </div>
    )
  }
}