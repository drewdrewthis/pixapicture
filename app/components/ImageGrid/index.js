import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';

const LANDSCAPE_COLUMNS = 8;
const PORTRAIT_COLUMNS = 4;
const getImageDimensions = (isLandscape, width) => (isLandscape
  ? (width / LANDSCAPE_COLUMNS)
  : (width / PORTRAIT_COLUMNS));

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
    width: '100%',
  },
});

class ImageGrid extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      refreshing: false,
    };
  }

  getDerivatedStateFromProps(_nextProps, prevState) {
    this.setState({ refreshing: false });
  }

  handleEndReached = () => {
    this.setState({ refreshing: true });
    this.props.getMoreImages();
  }

  render() {
    const {
      images,
      isLandscape,
      deviceWidth,
      openDetailsPage,
    } = this.props;

    if (!images.length) { return null; }

    const imageDimension = getImageDimensions(isLandscape, deviceWidth);

    const renderItem = ({ item: image }) => (
      <TouchableHighlight
        onPress={() => openDetailsPage({ image })}
      >
        <ImageBackground
          source={{ uri: image.previewURL }}
          style={{
            width: imageDimension,
            height: imageDimension,
          }}
          imageStyle={{
            width: '100%',
          }}
        />
      </TouchableHighlight>
    );

    return (
      <FlatList
        extraData={this.state}
        key={`${isLandscape ? 'l' : 'p'}`}
        ScrollView={{ contentContainerStyle: styles.flatList }}
        keyboardShouldPersistTaps="always"
        numColumns={isLandscape ? LANDSCAPE_COLUMNS : PORTRAIT_COLUMNS}
        data={images}
        getItemLayout={(data, index) => (
          { length: imageDimension, index, offset: index * imageDimension })
        }
        keyExtractor={item => `${item.id}${isLandscape ? 'l' : 'p'}`}
        onEndReached={this.handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={this.state.refreshing}
        renderItem={renderItem}
      />
    );
  }
}

ImageGrid.propTypes = {
  getMoreImages: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
  })).isRequired,
  isLandscape: PropTypes.bool.isRequired,
  deviceWidth: PropTypes.number.isRequired,
  openDetailsPage: PropTypes.func.isRequired,
};

export default ImageGrid;
