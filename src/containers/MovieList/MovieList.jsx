import { connect } from 'react-redux';
import * as actions from 'actions';
import { MovieList as MovieListComponent } from 'components';
import 'components/MovieList/MovieList.scss';

const mapStateToProps = (state) => {
  const { list } = state.movie;

  return {
    data: list
  };
}

const mapDispatchToProps = (dispatch) => ({
  $delete: (id) => {
    dispatch({
      type: actions.DELETE_MOVIE_LIST_ITEM,
      payload: { id }
    });
  }
})

export const MovieList = connect(
  mapStateToProps, 
  mapDispatchToProps
)(MovieListComponent);
