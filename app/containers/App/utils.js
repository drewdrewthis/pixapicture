import { Dimensions } from 'react-native';

export const windowDimensionProps = () => {
  const { height, width } = Dimensions.get('window');
  const isLandscape = width - height > 0;

  return {
    isLandscape,
    deviceWidth: width,
  };
};
