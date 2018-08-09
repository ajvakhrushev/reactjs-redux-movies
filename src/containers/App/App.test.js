import React from 'react';
import { configure, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import configureStore from 'store/configureStore';
import Adapter from 'enzyme-adapter-react-16';
import { App } from 'containers/App/App.jsx';
import listData from 'mocks/list.json';

describe('containers/App', () => {
  configure({ adapter: new Adapter() });

  const initialState = {
    movie: {
      list: listData,
      item: {},
      strategy: null
    }
  };
  const history = createBrowserHistory();
  const store = configureStore(initialState, history);

  it('renders without crashing', () => {
    shallow(<App store={store}/>);
  });
});
