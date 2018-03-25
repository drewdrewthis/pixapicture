import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, Dimensions } from 'react-native';
import { Spinner, Container, Header, Title, Footer, Body } from 'native-base';
import ImageGrid from '../../components/ImageGrid';
import SearchBar from '../../components/SearchBar';
import { mapStateToProps, mapDispatchToProps } from './selectors';
import styles from './styles';
import { windowDimensionProps } from './utils';

class App extends React.Component {
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
    if (this.props.loading) {
      return (
        <View style={styles.spinnerWrapper}>
          <Spinner color="green" />
        </View>
      );
    }
    return (
      <ImageGrid
        images={this.props.data.hits}
        imageDimension={this.state.imageDimension}
      />
    );
  }

  render() {
    const {
      getData,
      loading,
    } = this.props;

    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title>PixaPictures</Title>
          </Body>
        </Header>
        <SearchBar getData={getData} />
        <ScrollView
          contentContainerStyle={{
            height: loading ? '100%' : undefined,
          }}
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
