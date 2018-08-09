// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { OfferListItem } from 'components/OfferListItem/OfferListItem.jsx';
import 'components/MovieList/MovieList.scss';

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { EnhancedTableHead as TableHead } from 'components';

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

export class MovieList extends React.Component {

  static propTypes = {
    data: PropTypes.array.isRequired,
    $delete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'title',
      page: 0,
      rowsPerPage: 5
    };
  }

  handleSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleDeleteItem = (id) => (event) => {
    this.props.$delete(id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className="movie-list">
        <div className="movie-list__table-wrapper">
          <Table className="movie-list__table" aria-labelledby="tableTitle">
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleSort}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell className="table-cell__action">
                        <Link to={'/movie/' + n.id}>
                          <IconButton aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                      <TableCell className="table-cell__title">{n.title}</TableCell>
                      <TableCell className="table-cell__utility">{n.releaseYear}</TableCell>
                      <TableCell className="table-cell__utility">{n.format}</TableCell>
                      <TableCell>{n.stars}</TableCell>
                      <TableCell className="table-cell__action">
                        <IconButton
                          aria-label="Delete"
                          onClick={this.handleDeleteItem(n.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          className="movie-list__table-pagination"
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
