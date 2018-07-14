import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { DEFAULT_ITEM, REGEXP } from 'constants/index';
import { isDataValid, getInvalidData } from 'services';
import formats from 'mocks/formats.json';
import 'components/MovieItem/MovieItem.scss';
const cloneDeep = require('lodash.clonedeep');
const set = require('lodash.set');

const now = new Date();
const min = 1895;
const max = now.getFullYear();

export class MovieItem extends Component {

  static propTypes = {
    item: PropTypes.object,
    strategy: PropTypes.string
  }

  state = {
    item: cloneDeep(DEFAULT_ITEM),
    isValid: false,
    title: 'Create movie'
  }

  constructor(props) {
    super(props);

    this.state = {
      item: Object.assign(cloneDeep(DEFAULT_ITEM), props.item || {}),
      isValid: false,
      title: props.strategy === 'create' ? 'Create movie' : 'Update movie'
    };

    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if(this.props.item === props.item) {
      return;
    }

    this.setState({
      item: Object.assign(cloneDeep(DEFAULT_ITEM), props.item),
      isValid: this.isValid(props.item)
    });
  }

  isValid(data = {}) {
    return isDataValid(data);
  }

  handleChange(name) {
    return (event) => {
      const { item } = this.state;

      set(item, name, event.target.value);

      this.setState({
        item,
        isValid: this.isValid(item)
      });
    }
  }

  onCancel(event) {
    const { cancel } = this.props;

    event.preventDefault();

    cancel();
  }

  onRemove(event) {
    const { $delete, item: { id } } = this.props;

    event.preventDefault();

    $delete({ id });
  }

  onSubmit(event) {
    const { strategy, create, update } = this.props;
    const { isValid, item } = this.state;

    event.preventDefault();

    if(!isValid) {
      return;
    }

    switch(strategy) {
      case 'create': create(item);
        break;
      case 'update': update(item);
        break;
      default:
    }
  }

  render() {
    const { id } = this.props;
    const { isValid, item, title } = this.state;

    const invalid = getInvalidData(item);

    return (
      <div className="movie-list__container">
        <form
          key={id}
          className="movie-form"
          onSubmit={::this.onSubmit}>
          <h1 className="movie-form__title">
            {title}
          </h1>
          <div className="movie-form__fields">
            <TextField
              key={`${id}-title`}
              label="Title"
              value={item.title}
              error={!!invalid.title}
              helperText={invalid.title}
              onChange={::this.handleChange('title')}
              required
              className="movie-form__field"
            />
            <TextField
              key={`${id}-releaseYear`}
              type="number"
              min={min}
              max={max}
              label="Release year"
              value={item.releaseYear}
              error={!!invalid.releaseYear}
              helperText={invalid.releaseYear}
              onChange={::this.handleChange('releaseYear')}
              className="movie-form__field"
            />
            <TextField
              key={`${id}-format`}
              select
              label="Format"
              value={item.format}
              error={!!invalid.format}
              helperText={invalid.format}
              onChange={::this.handleChange('format')}
              required
              className="movie-form__field"
            >
              {formats.map(next => (
                <MenuItem key={next} value={next}>
                  {next}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              key={`${id}-stars`}
              multiline
              rows="3"
              rowsMax="24"
              label="Stars"
              value={item.stars}
              error={!!invalid.stars}
              helperText={invalid.stars}
              onChange={::this.handleChange('stars')}
              pattern={REGEXP.stars}
              className="movie-form__field field-description"
            />
          </div>
          <div className="movie-form__actions">
            <Button
              color="secondary"
              className="movie-form__actions__button"
              onClick={::this.onCancel}
            >Cancel</Button>
            <input
              className="movie-form__actions__button submit-button"
              type="submit"
              value="Submit"
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    );
  }

}
