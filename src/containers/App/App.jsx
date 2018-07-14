import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import 'containers/App/App.scss';

class AppClass extends Component {
  
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar className="header-nav">
            <nav>
              <Link to="/movie/list">
                <Button color="inherit">Movie list</Button>
              </Link>
              <Link to="/movie/create">
                <Button color="inherit">Create movie</Button>
              </Link>
            </nav>
          </Toolbar>
        </AppBar>
        <div className="content">
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps  
)(AppClass);
