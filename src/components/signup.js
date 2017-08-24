import React, { Component } from 'react';

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', redirectHome: false };
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  signup() {
    /* TO DO */
  }

  render() {
    return (
      <div className="register-box">
        <p className="title">Sign Up</p>
        <p><span>Email</span><br /><input type="email" name="email" onChange={this.handleChange.bind(this)} /></p>
        <p><span>Password</span><br /><input type="password" name="password" onChange={this.handleChange.bind(this)} /></p>
        <button onClick={this.signup.bind(this)}>Sign up</button>
      </div>
    )
  }
}