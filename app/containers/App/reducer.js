import { DATA_AVAILABLE } from './actions'; // Import the actions types constant we defined in our actions

const defaultState = {
  data: { hits: [] },
  loading: true,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case DATA_AVAILABLE:
      return Object.assign(
        {},
        state,
        {
          data: payload,
          loading: false,
        },
      );
    default:
      return state;
  }
};
