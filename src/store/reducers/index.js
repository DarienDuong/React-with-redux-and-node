import * as t from '../actions/constants'

const DEFAULT_STATE = {
  results: [],
  loading: false,
  error: false
}

const rootReducer = (state=DEFAULT_STATE, action) => {
  switch(action.type){
    case t.FETCH_TERMS: {
      return {...state, loading: true}
    }
    case t.FETCH_TERMS_SUCCESS: {
      return {...state, error: false, results: action.results, loading: false}
    }
    case t.FETCH_TERMS_FAIL: {
      return {...state, error: true, loading: false}
    }
    default:
      return {...state}
  }
}

export default rootReducer