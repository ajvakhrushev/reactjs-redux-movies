import React from 'react';
import { configure, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import configureStore from 'store/configureStore';
import Adapter from 'enzyme-adapter-react-16';
import { MovieList } from 'containers/MovieList/MovieList.jsx';
import listData from 'mocks/list.json';

describe('components/MovieList', () => {
  configure({ adapter: new Adapter() });

  const initialState = {
    movie: {
      list: listData,
      item: {}
    }
  };
  const history = createBrowserHistory();
  const store = configureStore(initialState, history);

  it('renders without crashing', () => {
    shallow(<MovieList store={store}/>);
  });
});
