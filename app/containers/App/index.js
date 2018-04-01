import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Dimensions } from 'react-native';
import { Spinner, Container, Footer } from 'native-base';
import ImageGrid from '../../components/ImageGrid';
import SearchBar from '../../components/SearchBar';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import styles from './styles';
import { windowDimensionProps } from './utils';

class App extends React.PureComponent {
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
      images,
      getData,
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
        isLandscape={this.state.isLandscape}
        deviceWidth={this.state.deviceWidth}
        getMoreImages={getData}
        images={images}
        imageDimension={this.state.imageDimension}
        openDetailsPage={image => navigate('DetailsPage', image)}
      />
    );
  }

  render() {
    const {
      updateQuery,
    } = this.props;

    return (
      <Container style={styles.container}>
        <SearchBar updateQuery={updateQuery} />
        { this.renderImageGrid() }
        <Footer style={styles.footer} />
      </Container>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.any),
  getData: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  updateQuery: PropTypes.func.isRequired,
};

App.defaultProps = {
  images: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
