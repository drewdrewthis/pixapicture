import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
  imageGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const ImageGrid = (props) => {
  const {
    images,
    imageDimension,
  } = props;

  return (
    <View
      style={styles.imageGrid}
    >
      {images.map(item => (
        <ImageBackground
          key={item.id}
          source={{ uri: item.previewURL }}
          style={{
            width: imageDimension,
            height: imageDimension,
          }}
          imageStyle={{
            width: '100%',
          }}
        />
      ))}
    </View>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    previewURL: PropTypes.string.isRequired,
  })).isRequired,
  imageDimension: PropTypes.number,
};

ImageGrid.defaultProps = {
  imageDimension: 100,
};

export default ImageGrid;
