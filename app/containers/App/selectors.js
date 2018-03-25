import { bindActionCreators } from 'redux';
import * as Actions from './actions';

export const mapStateToProps = (state, props) => {
  const {
    appReducer: {
      loading,
      data
    }
  } = state;

  return {
    loading,
    data
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Actions, dispatch);
}
