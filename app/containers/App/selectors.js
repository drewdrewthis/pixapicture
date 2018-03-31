import { bindActionCreators } from 'redux';
import * as Actions from './actions';

export const mapStateToProps = (state, _props) => {
  const {
    appReducer: {
      loading,
      data,
    },
  } = state;

  return {
    loading,
    data,
  };
};

export const mapDispatchToProps = dispatch => bindActionCreators(Actions, dispatch);
