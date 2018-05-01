import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import { connect } from 'react-redux'
import { fetchTerms } from './store/actions/actionCreators'

class App extends Component {
  componentDidMount() {
    this.props.fetchTerms(localStorage.getItem('search'))
  }

  submitHandler = (term) => {
    this.props.fetchTerms(term)
  }

  renderWords = () => {
    if (this.props.error) {
      return <h1 class='error-message'>Enter a valid word</h1>
    }
    if (this.props.loading) {
      return <h1>Loading</h1>
    } if (this.props.results.length > 0) {
      return this.props.results.map(word => <h1>{word}</h1>)
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Search for synonyms of a word</h1>
        <Form submitHandler={this.submitHandler} />
        {this.renderWords()}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    results: reduxState.results,
    loading: reduxState.loading,
    error: reduxState.error
  }
}

export default connect(mapStateToProps, { fetchTerms })(App);

