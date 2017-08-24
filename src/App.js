import React, { Component } from 'react';
import { Switch, Route, NavLink, Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const api_host = 'http://localhost:3001/'

let auth = {
  logged_in: false,
  token: null,
  uid: null,
  client: null
}

let netlify_api = {

}

const LAYOUT = {
  a: 'layout-a',
  b: 'layout-b',
  c: 'layout-c'
}

const getHeaders = function() {
 return { 
  headers: {
    'access-token': auth.token,
    'client': auth.client,
    'uid': auth.uid
  }
 }
}

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' render={() => (
          auth.logged_in ? (
            <Posts />
          ) : (
            <Home />
        ))} />
        <Login path='/login' render={() => (
          auth.logged_in ? (
            <Home />
          ) : (
            <Login />
        ))} />
      </Switch>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to='/' activeClassName='active'>Home</NavLink></li>
          {auth.logged_in &&
            <div>
              <li>Choose a layout</li>
              <li>Deploy to Netlify</li>
            </div>
          }
        </ul>
      </nav>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <Link to='/login'>Log in</Link>
      </div>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', redirectHome: false };
  }

  login() {
    let info = {email: this.state.email, password: this.state.password};
    let that = this;

    axios.post(api_host + 'auth/sign_in', info)
    .then(function (response) {
      console.log(response);
      auth.logged_in = true;
      auth.token = response.headers['access-token'];
      auth.client = response.headers['client'];
      auth.uid = response.headers['uid'];
      that.setState({redirectHome: true});

      window.location.replace("http://stackoverflow.com");
      console.log(auth);
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if (this.state.redirectHome) {
      return (
        <Redirect to='/' />
      )
    }
    return (
      <div>
        <p><span>Email:</span> <input type="email" name="email" onChange={this.handleChange.bind(this)} /></p>
        <p><span>Password:</span> <input type="password" name="password" onChange={this.handleChange.bind(this)} /></p>
        <button onClick={this.login.bind(this)}>Log in</button>
      </div>
    )
  }
}

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {posts: [], layout: 'a'};
  }

  componentDidMount() {
    this.refreshList();
  }

  addPost(text) {
    let that = this;
    axios.post(api_host + 'posts', {'content': text}, getHeaders())
    .then(function (response) {
      if (response.headers['access-token']) {
        auth.token = response.headers['access-token'];
        console.log("token");
      }
      that.refreshList();
      //that.setState({posts: response.data});
      console.log(response);

    })
    .catch(function (err) {
      console.log(err);
    })
  }

  refreshList() {
    let that = this;
    axios.get(api_host + 'posts', getHeaders())
    .then(function (response) {
      if (response.headers['access-token']) {
        auth.token = response.headers['access-token'];
        console.log("token");
      }
      that.setState({posts: response.data});
      console.log(response);

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
          <Post key={post.id} id={post.id} content={post.content} refreshList={this.refreshList.bind(this)} />
        )
      }, this) : 'No posts made yet!';
    return (
      <div>
        <div className={LAYOUT[this.state.layout]}>
          <LayoutPicker layout={this.state.layout} changeLayout={this.changeLayout.bind(this)} />
          {posts}
        </div>
        <CreatePost addPost={this.addPost.bind(this)} />
      </div>
    )
  }
}

class LayoutPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { layout: this.props.layout };
  }

  handleChange(e) {
    this.setState({layout: e.target.value});
    this.props.changeLayout(e.target.value);
  }

  render() {
    return (
      <form action="">
        <input type="radio" 
         name="layout" value='a'
         onChange={this.handleChange.bind(this)} 
         checked={this.state.layout == 'a'} />
         <label>Layout A</label>
        
        <input 
         type="radio" 
         name="layout" 
         onChange={this.handleChange.bind(this)}
         value='b'
         checked={this.state.layout == 'b'} />
         <label>Layout B</label>
        
        <input type="radio" 
         name="layout"
         onChange={this.handleChange.bind(this)} 
         value='c' 
         checked={this.state.layout == 'c'} />
         <label>Layout C</label>
      </form>
    )
  }
}

class Post extends Component {
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
    axios.delete(api_host + 'posts/' + this.props.id, getHeaders())
    .then(function (response) {
      if (response.headers['access-token']) {
        auth.token = response.headers['access-token'];
        console.log("token");
      }
      that.props.refreshList();
      //that.setState({posts: response.data});
      console.log(response);

    })
    .catch(function (err) {
      console.log(err);
    });
  }

  submitPost() {
    var that = this;
    axios.put(api_host + 'posts/' + this.props.id, {content: this.state.text}, getHeaders())
    .then(function (response) {
      if (response.headers['access-token']) {
        auth.token = response.headers['access-token'];
        console.log("token");
      }
      that.props.refreshList();
      //that.setState({posts: response.data});
      console.log(response);

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
    return (
      <div className="post" id={this.props.id}>
        <div>
          <button onClick={this.editPost.bind(this)}>Edit</button>
          <button onClick={this.deletePost.bind(this)}>Delete</button>
        </div>

        <textarea 
          value={this.state.text} 
          onChange={this.handleChange.bind(this)}
          disabled={!this.state.editable}>
          </textarea>
        {this.state.editable &&
          <button onClick={this.submitPost.bind(this)}>Save</button>
        }
      </div>
    )
  }
}

class CreatePost extends Component {
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
      <div>
        <textarea value={this.state.text} onChange={this.handleChange.bind(this)}></textarea>
        <button onClick={this.addPost.bind(this)}>Submit</button>
      </div>
    )
  }
}

export default App;
