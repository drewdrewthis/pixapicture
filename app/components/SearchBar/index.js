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

    this.updateQuery = this.updateQuery.bind(this);
    this.updateQuery = throttle(this.updateQuery, 1000, { leading: false });
  }

  updateQuery(text) {
    const { updateQuery } = this.props;
    return updateQuery(text);
  }

  handleChangeText = (text) => {
    this.updateQuery(text);
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
  updateQuery: PropTypes.func.isRequired,
};

export default SearchBar;
