import React from 'react';
import { StyleSheet, ScrollView, View, ImageBackground } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

const KEY = process.env.PIXABAY_KEY;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      query: 'cats',
      data: {}
    };
  }

  componentDidMount() {
    const { query } = this.state;

    fetch(`https://pixabay.com/api/?key=${KEY}&q=${query}&image_type=photo&per_page=40`)
      .then(response => {
        if (response.status !== 200) {
          console.log('API_KEY', KEY);
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(data => {
          console.log('Received data from Pixabay -', data.hits.length, 'images');
          this.setState({ data });
        });
      })
      .catch(function(err) {
        console.log('Fetch Error', err);
      });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Body>
            <Title>PixaPictures</Title>
          </Body>
        </Header>
        <ScrollView
          contentContainerStyle={styles.imageGrid}
        >
          {
            this.state.data.hits &&
              this.state.data.hits.map(item => (
                <ImageBackground
                  key={item.id}
                  source={{ uri: item.previewURL }}
                  style={{
                    width: '25%',
                    height: 100,
                  }}
                  imageStyle={{
                    width: '100%'
                  }}
                />
              ))
          }
        </ScrollView>
        <Footer style={styles.footer}/>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footer: {
    backgroundColor: '#000'
  }
});
