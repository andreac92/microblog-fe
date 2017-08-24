import React, { Component } from 'react';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Create a new post!'};
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  addPost() {
    this.props.addPost(this.state.text);
  }

  render() {
    return (
      <div className="create-post">
        <textarea value={this.state.text} onChange={this.handleChange.bind(this)}></textarea>
        <br /><button onClick={this.addPost.bind(this)}>Create</button>
      </div>
    )
  }
}