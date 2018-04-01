import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Image, FlatList, View, ImageBackground } from 'react-native';
import { Icon, Button, Text } from 'native-base';
import styles from './styles';

const defaultImage = {
  webformatURL: 'https://pixabay.com/get/e83cb50f2af0043ed1584d05fb1d4795e777ebd21aac104497f2c478a0ebb1ba_640.jpg',
  user: 'user101',
  userImageURL: 'https://cdn.pixabay.com/user/2017/12/31/13-19-57-138_250x250.jpg',
  likes: 10,
  favorites: 20,
  tags: 'frogs, chickes, cards',
  views: 12331,
};

class DetailsPage extends Component {
  static navigationOptions = {
    title: 'DetailsPage',
  };

  constructor() {
    super();
    this.state = {
      infoOpen: false,
    };
  }

  render() {
    const image = get(this.props.navigation, 'state.params.image', defaultImage);
    const { infoOpen } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: image.webformatURL }}
          style={styles.imageBackground}
          imageStyle={styles.image}
          resizeMode="contain"
        />
        <View
          style={styles.outerInfoWrapper}
        >
          <View
            style={styles.infoWrapper(infoOpen)}
          >
            <View style={styles.infoHeader(infoOpen)}>
              <Image
                style={styles.userImage}
                source={{ uri: image.userImageURL || 'https://www.iconsdb.com/icons/preview/guacamole-green/camera-2-xl.png' }}
              />
              <Text style={styles.infoHeaderText}>{image.user}</Text>
              <Button
                transparent
                style={styles.buttonWrapper}
                onPress={() => this.setState({ infoOpen: !infoOpen })}
              >
                <Icon
                  name={infoOpen ? 'ios-close-circle-outline' : 'ios-information-circle-outline'}
                  style={styles.icon}
                  color="red"
                />
              </Button>
            </View>
            {
              infoOpen && (
                <FlatList
                  style={styles.infoList}
                  data={[
                    { key: 'resolution', text: `${image.imageWidth} x ${image.imageHeight}` },
                    { key: 'views', text: image.views },
                    { key: 'likes', text: image.likes },
                    { key: 'favorites', text: image.favorites },
                    { key: 'tags', text: image.tags },
                  ]}
                  renderItem={({ item }) => (
                    <Text
                      style={styles.infoText}
                      key={item.key}
                    >
                      {`${item.key}: ${item.text}`}
                    </Text>
                  )}
                />
              )
            }
          </View>
        </View>
      </View>
    );
  }
}

DetailsPage.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        image: PropTypes.shape({
          user: PropTypes.string,
          userImageURL: PropTypes.string,
          webformatURL: PropTypes.string.isRequired,
          views: PropTypes.number,
          like: PropTypes.number,
          favorites: PropTypes.number,
          tags: PropTypes.string,
          imageWidth: PropTypes.number,
          imageHeight: PropTypes.number,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailsPage;
