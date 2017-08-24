import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {Login} from './components/login.js';
import {SignUp} from './components/signup.js';
import {Posts} from './components/posts.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      token: null
    }
    this.auth = {
      uid: null,
      client: null
    }
  }

  set_auth(token, client, uid) {
    if (uid) {
      this.auth.uid = uid;
    }
    if (client) {
      this.auth.client = client;
    }
    this.setState({logged_in: true, token: token});
  }

  render() {
    return (
      <div>
        <Header loggedIn={this.state.logged_in} />
        <Content 
         set_auth={this.set_auth.bind(this)}
         logged_in={this.state.logged_in} 
         token={this.state.token} 
         auth={this.auth} />
      </div>
    );
  }
}

class Header extends Component {
  render() {
    return (
      <nav>
      <Link to='/' className="site-title" >Netlify Microblog</Link>
      { this.props.logged_in && 
        <span>Logout</span>
      }
      </nav>
    )
  }
}

class Content extends Component {
  render() {
    let that = this;
    return (
      <Route path='/' render={() => (
        this.props.logged_in ? (
          <Posts token={this.props.token} auth={this.props.auth} set_auth={this.props.set_auth} />
        ) : (
          <Home set_auth={this.props.set_auth} />
      ))} />
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="instructions">
          <p>Create your own microblog in seconds!</p>
          <ul>
            <li><span className="step1">Step 1:</span> Add microblog posts (200 characters max)</li>
            <li><span className="step2">Step 2:</span> Choose a layout for your microblog</li>
            <li><span className="step3">Step 3:</span> Deploy your microblog to Netlify!</li>
          </ul>
        </div>
        <div className="actions">
          <Login set_auth={this.props.set_auth} />
          <SignUp />
        </div>
      </div>
    )
  }
}

export default App;
