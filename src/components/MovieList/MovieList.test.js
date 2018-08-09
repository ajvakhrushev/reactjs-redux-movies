import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MovieList } from 'components/MovieList/MovieList.jsx';
import listData from 'mocks/list.json';

describe('components/MovieList', () => {
  configure({ adapter: new Adapter() });

  it('renders without crashing', () => {
    shallow(<MovieList data={listData} $delete={() => {}}/>);
  });
});

