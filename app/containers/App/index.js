import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Dimensions } from 'react-native';
import { Spinner, Container, Footer } from 'native-base';
import ImageGrid from '../../components/ImageGrid';
import SearchBar from '../../components/SearchBar';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import styles from './styles';
import { windowDimensionProps } from './utils';

class App extends React.Component {
  static navigationOptions = {
    title: 'PixaPicture',
    headerBackTitle: 'Back to Search',
  };

  constructor() {
    super();
    this.state = {
      ...windowDimensionProps(),
    };
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        ...windowDimensionProps(),
      });
    });
  }

  renderImageGrid() {
    const {
      loading,
      data,
      navigation: {
        navigate,
      },
    } = this.props;

    if (loading) {
      return (
        <View style={styles.spinnerWrapper}>
          <Spinner color="green" />
        </View>
      );
    }

    return (
      <ImageGrid
        images={data.hits}
        imageDimension={this.state.imageDimension}
        openDetailsPage={image => navigate('DetailsPage', image)}
      />
    );
  }

  render() {
    const {
      loading,
      getData,
    } = this.props;

    return (
      <Container style={styles.container}>
        <SearchBar getData={getData} />
        <ScrollView
          contentContainerStyle={{
            height: loading ? '100%' : undefined,
          }}
          keyboardShouldPersistTaps="always"
        >
          { this.renderImageGrid() }
        </ScrollView>
        <Footer style={styles.footer} />
      </Container>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    hits: PropTypes.array,
  }),
  getData: PropTypes.func.isRequired,
};

App.defaultProps = {
  data: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
