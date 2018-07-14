import React from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { PageNotFound } from 'components';
import { App, MovieList, MovieItem } from 'containers';

const AppWithRouter = withRouter(App);
const MovieListWithRouter = withRouter(MovieList);
const MovieItemWithRouter = withRouter(MovieItem);
const PageNotFoundWithRouter = withRouter(PageNotFound);

export default (
  <AppWithRouter>
    <Switch>
      <Route path="/movie/list" component={MovieListWithRouter} />
      <Route path="/movie/create" component={MovieItemWithRouter} />
      <Route path="/movie/:id" component={MovieItemWithRouter} />
      <Redirect exact from="/" to="/movie/list" />
      <Route path="/*" component={PageNotFoundWithRouter} />
    </Switch>
  </AppWithRouter>
);
