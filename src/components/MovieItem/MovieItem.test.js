import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MovieItem } from 'components/MovieItem/MovieItem.jsx';
import listData from 'mocks/list.json';

describe('containers/MovieItem', () => {
  configure({ adapter: new Adapter() });

  it('renders without crashing', () => {
    shallow(<MovieItem item={listData[0]} strategy="update" />);
  });
});

