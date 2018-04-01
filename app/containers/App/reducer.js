import { UPDATE_RESULTS, UPDATE_QUERY } from './actions';

const defaultState = {
  pages: 1,
  images: [],
  loading: false,
  query: '',
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case UPDATE_RESULTS:
      return Object.assign(
        {},
        state,
        {
          ...payload,
          loading: false,
        },
      );
    case UPDATE_QUERY:
      return Object.assign(
        {},
        state,
        {
          query: payload,
          loading: true,
        },
      );
    default:
      return state;
  }
};
