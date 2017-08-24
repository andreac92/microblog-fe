import React, { Component } from 'react';
import {CreatePost} from './createpost.js';
import {Post} from './post.js';
import {LayoutPicker} from './layoutpicker.js';
import {Deploy} from './deploy.js';
import axios from 'axios';
import { LAYOUT, getHeaders, api_host } from '../constants/const.js';

export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], layout: 'a'};
  }

  componentDidMount() {
    this.refreshList();
  }

  addPost(text) {
    let that = this;
    axios.post(api_host + 'posts', {'content': text}, getHeaders(this.props.token, this.props.auth.client, this.props.auth.uid))
    .then(function (response) {
      if (response.headers['access-token']) {
        that.props.set_auth(response.headers['access-token'], null, null);
      }
      that.refreshList();

    })
    .catch(function (err) {
      console.log(err);
    })
  }

  refreshList() {
    let that = this;
    axios.get(api_host + 'posts', getHeaders(this.props.token, this.props.auth.client, this.props.auth.uid))
    .then(function (response) {
      if (response.headers['access-token']) {
        that.props.set_auth(response.headers['access-token'], null, null);
      }
      that.setState({posts: response.data});

    })
    .catch(function (err) {
      console.log(err);
    })
  }

  changeLayout(layout) {
    this.setState({layout: layout});
  }

  render() {
    let posts = this.state.posts.length ? this.state.posts.map(function(post) {
        return (
          <Post 
           key={post.id} 
           id={post.id} 
           content={post.content} 
           refreshList={this.refreshList.bind(this)}
           token={this.props.token} 
           auth={this.props.auth} 
           set_auth={this.props.set_auth} />
        )
      }, this) : 'No posts made yet!';
    return (
      <div className="post-page">
        <div className="post-concerns">
          <p className="step1">Step 1: Create posts</p>
          <CreatePost addPost={this.addPost.bind(this)} />
          
          <p>Your posts</p>
          <div className={LAYOUT[this.state.layout]}>
            {posts}
          </div>
        </div>

        <div className="layout-concerns">
          <p className="step2">Step 2: Choose a layout</p>
          <LayoutPicker layout={this.state.layout} changeLayout={this.changeLayout.bind(this)} />
        
          <p className="step3">Step 3: Deploy to Netlify</p>
          <Deploy 
           layout={LAYOUT[this.state.layout]}
           token={this.props.token} 
           auth={this.props.auth} 
           set_auth={this.props.set_auth} />
        </div>
      </div>
    )
  }
}