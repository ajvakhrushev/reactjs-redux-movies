import React from 'react';
import { configure, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import configureStore from 'store/configureStore';
import Adapter from 'enzyme-adapter-react-16';
import { MovieItem } from 'containers/MovieItem/MovieItem.jsx';
import listData from 'mocks/list.json';

describe('containers/MovieItem', () => {
  configure({ adapter: new Adapter() });

  const initialState = {
    movie: {
      list: listData,
      item: listData[0],
      strategy: 'update'
    }
  };
  const history = createBrowserHistory();
  const store = configureStore(initialState, history);

  it('renders without crashing', () => {
    shallow(<MovieItem store={store}/>);
  });
});
