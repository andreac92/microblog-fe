import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { api_host } from '../constants/const.js';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''};
  }

  login() {
    let info = {email: this.state.email, password: this.state.password};
    let that = this;

    axios.post(api_host + 'auth/sign_in', info)
    .then(function (response) {
      that.props.set_auth(response.headers['access-token'], response.headers['client'], response.headers['uid']);
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <div className="login-box">
        <p className="title">Log In</p>
        <p><span>Email</span><br /><input type="email" name="email" onChange={this.handleChange.bind(this)} /></p>
        <p><span>Password</span><br /><input type="password" name="password" onChange={this.handleChange.bind(this)} /></p>
        <button onClick={this.login.bind(this)}>Log in</button>
      </div>
    )
  }
}