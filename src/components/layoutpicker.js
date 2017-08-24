import React, { Component } from 'react';

export class LayoutPicker extends Component {
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
        <section>
          <input type="radio" 
           name="layout" value='a'
           onChange={this.handleChange.bind(this)} 
           checked={this.state.layout == 'a'} />
           <label>Layout A</label>
        </section>
        
        <section>
          <input 
           type="radio" 
           name="layout" 
           onChange={this.handleChange.bind(this)}
           value='b'
           checked={this.state.layout == 'b'} />
           <label>Layout B</label>
        </section>
        
        <section>
          <input type="radio" 
           name="layout"
           onChange={this.handleChange.bind(this)} 
           value='c' 
           checked={this.state.layout == 'c'} />
           <label>Layout C</label>
        </section>
      </form>
    )
  }
}