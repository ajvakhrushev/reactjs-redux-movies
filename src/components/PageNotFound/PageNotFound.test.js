import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PageNotFound } from 'components/PageNotFound/PageNotFound.jsx';

describe('components/MovieListItem', () => {
  configure({ adapter: new Adapter() });

  it('renders without crashing', () => {
    shallow(<PageNotFound/>);
  });
});
