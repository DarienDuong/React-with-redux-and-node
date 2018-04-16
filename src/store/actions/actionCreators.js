import * as t from './constants'
import axios from 'axios'


// Get list of words
export function fetchTerms(term){
  return function(dispatch){
    dispatch({type: t.FETCH_TERMS})
    axios.get(`http://localhost:4000/api/${term}`)
      .then(response => {
        if(response.data.error){
          dispatch(fetchTermsFail())
        } else {
          dispatch(fetchTermsSuccess(response.data.data))
        }
      })
      .catch(err => console.log(err))
  }
}

export function fetchTermsSuccess(results){
  return {
    type: t.FETCH_TERMS_SUCCESS,
    results
  }
}

export function fetchTermsFail() {
  return {
    type: t.FETCH_TERMS_FAIL
  }
}