import React, {Component} from 'react'
import {render} from 'react-dom'

class Form extends Component {
  constructor(props){
    super(props)
    this.state = {
      search: ""
    }
  }

  handleChange = (e) => {
    this.setState({search: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.submitHandler(this.state.search)
    this.setState({search: ""})
  }

  render(){
    return (
      <form onSubmit = {this.handleSubmit}>
        <input name='search' value={this.state.search} onChange={this.handleChange} placeholder='search' />
        <input type='submit' />
      </form>
    )
  }
}

export default Form