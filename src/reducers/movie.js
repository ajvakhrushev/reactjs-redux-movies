import { LOCATION_CHANGE } from 'react-router-redux';
import { DEFAULT_ITEM } from 'constants';
import * as actions from 'actions';
const uuidv1 = require('uuid/v1');
const cloneDeep = require('lodash.clonedeep');

const initialState = {
  list: [],
  item: {},
  strategy: null
};

const reducers = {
  [actions.CREATE_MOVIE_LIST_ITEM]: (state, action) => {
    const { list } = state;
    const nextItem = {
      id: uuidv1(),
      ...action.payload,
      createdAt: (new Date()).toISOString()
    };

    return { 
      ...state,
      list: [ ...list, nextItem ],
      strategy: null,
      item: {}
    };
  },
  [actions.READ_MOVIE_LIST_ITEM]: (state, action) => {
    const { id } = action.payload;
    const { list } = state;

    return { 
      ...state,
      item: list.find((next) => next.id === id)
    };
  },
  [actions.UPDATE_MOVIE_LIST_ITEM]: (state, action) => {
    const { payload } = action;
    const { list } = state;
    const index = list.findIndex((next) => next.id === payload.id);
    const nextList = list.slice();
    const nextItem = {
      ...list[index],
      ...payload
    };

    nextList.splice(index, 1, nextItem);

    return { 
      ...state,
      list: nextList,
      item: nextItem
    };
  },
  [actions.DELETE_MOVIE_LIST_ITEM]: (state, action) => {
    const { id } = action.payload;
    const { list } = state;
    const index = list.findIndex((next) => next.id === id);
    const nextList = list.slice();

    nextList.splice(index, 1);

    return { 
      ...state,
      list: nextList,
      item: {}
    };
  },
  [LOCATION_CHANGE]: (state, action) => {
    const { list } = state;
    const { pathname } = action.payload;
    const values = pathname.split('/');

    if(!values[2]) {
      return state;
    }

    switch(values[2]) {
      case 'create':
        return { 
          ...state,
          strategy: 'create',
          item: cloneDeep(DEFAULT_ITEM)
        };
      case 'list':
        return { 
          ...state,
          strategy: null,
          item: {}
        };
      default:
        return { 
          ...state,
          strategy: 'update',
          item: list.find((next) => next.id === values[2])
        };
    }
  }
}

export default (state = initialState, action) => {
  return typeof reducers[action.type] === 'function' ? reducers[action.type](state, action) : state;
};
