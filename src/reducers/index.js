import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import movieReducer from './movie';

export default combineReducers({
  router: routerReducer,
  movie: movieReducer
});
