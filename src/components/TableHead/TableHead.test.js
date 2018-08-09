import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EnhancedTableHead as TableHead } from 'components/TableHead/TableHead.jsx';

describe('components/TableHead', () => {
  configure({ adapter: new Adapter() });

  it('renders without crashing', () => {
    shallow(
      <TableHead
        order="asc"
        orderBy="title"
        onRequestSort={() => {}}
      />
    );
  });
});

