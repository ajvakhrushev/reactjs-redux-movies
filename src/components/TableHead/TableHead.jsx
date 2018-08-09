import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import 'components/TableHead/TableHead.scss';

const columnData = [
  { id: 'title', numeric: false, label: 'Title', className: 'table-cell__title'},
  { id: 'releaseYear', numeric: false, label: 'Release Year', className: 'table-cell__utility' },
  { id: 'format', numeric: false, label: 'Format', className: 'table-cell__utility' },
  { id: 'stars', numeric: false, label: 'Stars' }
];

export class EnhancedTableHead extends React.Component {

  static propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }

  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell className="table-cell__action"></TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                sortDirection={orderBy === column.id ? order : false}
                className={column.className}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            );
          }, this)}
          <TableCell className="table-cell__action"></TableCell>
        </TableRow>
      </TableHead>
    );
  }
}
