import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actions from 'actions';
import { MovieItem as MovieItemComponent } from 'components/MovieItem/MovieItem.jsx';
import 'components/MovieItem/MovieItem.scss';

const mapStateToProps = (state) => {
  const { item, strategy } = state.movie;
  
  return {
    item,
    strategy
  };
}

const mapDispatchToProps = (dispatch) => {
  const url = '/movie/list';

  return {
    create: (data = {}) => {
      dispatch({
        type: actions.CREATE_MOVIE_LIST_ITEM,
        payload: data
      });
      dispatch(push(url));
    },
    update: (data = {}) => {
      dispatch({
        type: actions.UPDATE_MOVIE_LIST_ITEM,
        payload: data
      });
      dispatch(push(url));
    },
    cancel: () => dispatch(push(url)),
  };
}

export const MovieItem = connect(
  mapStateToProps, 
  mapDispatchToProps
)(MovieItemComponent);
