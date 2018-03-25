import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Container, Header, Title, Footer, Body, Text } from 'native-base';
import ImageGrid from './src/components/ImageGrid';

const KEY = process.env.PIXABAY_KEY;

const windowDimensionProps = () => {
  const { height, width } = Dimensions.get('window');
  const isLandscape = width - height > 0;

  return {
    isLandscape,
    imageDimension: isLandscape ? (width / 8) : (width / 4),
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  main: {
    width: '100%',
  },
  footer: {
    backgroundColor: '#000',
  },
});

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      query: 'cats',
      data: {},
      ...windowDimensionProps(),
    };
  }

  componentDidMount() {
    const { query } = this.state;

    Dimensions.addEventListener('change', () => {
      this.setState({
        ...windowDimensionProps(),
      });
    });

    /* eslint-disable no-console */
    fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=40`)
      .then((response) => {
        if (response.status !== 200) {
          console.log('API_KEY', KEY);
          console.log(`Looks like there was a problem. Status Code: ${
            response.status}`);
          return;
        }

        // Examine the text in the response
        response.json().then((data) => {
          console.log('Received data from Pixabay -', data.hits.length, 'images');
          this.setState({ data });
        });
      })
      .catch((err) => {
        console.log('Fetch Error', err);
      });
    /* eslint-enable no-console */
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title>PixaPictures</Title>
            <Text>{this.state.windowWidth}</Text>
          </Body>
        </Header>
        <ScrollView
          contentContainerStyle={styles.main}
        >
          {
            this.state.data.hits &&
              <ImageGrid
                images={this.state.data.hits}
                imageDimension={this.state.imageDimension}
              />
          }
        </ScrollView>
        <Footer style={styles.footer} />
      </Container>
    );
  }
}
