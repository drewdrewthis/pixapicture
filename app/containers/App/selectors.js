import { bindActionCreators } from 'redux';
import * as Actions from './actions';

export const mapStateToProps = (state, _props) => {
  const {
    appReducer: {
      loading,
      images,
      totalResults,
      pages,
      query,
    },
  } = state;

  return {
    loading,
    images,
    pages,
    totalResults,
    query,
  };
};

export const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
