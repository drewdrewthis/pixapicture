import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { StyleSheet } from 'react-native';
import { Item, Input, Icon } from 'native-base';

const styles = StyleSheet.create({
  input: {
    color: '#fff',
  },
});

class SearchBar extends React.Component {
  constructor() {
    super();

    this.getData = this.getData.bind(this);
    this.getData = throttle(this.getData, 1000, { leading: false });
  }

  getData(text) {
    const { getData } = this.props;
    return getData(text);
  }

  handleChangeText = (text) => {
    this.getData(text);
  }

  render() {
    return (
      <Item success style={styles.search}>
        <Input
          style={styles.input}
          onChangeText={this.handleChangeText}
          placeholder="What would you like to see? (eg. pancakes)"
        />
        <Icon name="ios-search-outline" />
      </Item>
    );
  }
}

SearchBar.propTypes = {
  getData: PropTypes.func.isRequired,
};

export default SearchBar;
