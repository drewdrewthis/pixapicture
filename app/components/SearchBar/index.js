import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { StyleSheet } from 'react-native';
import { Item, Input, Icon } from 'native-base';

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    fontSize: 14
  },
});

const SearchBar = ({ updateQuery: updateQueryAction }) => {
  const updateQuery = throttle(text => updateQueryAction(text), 1000, { leading: false });
  const handleChangeText = text => updateQuery(text);

  return (
    <Item success style={styles.search}>
      <Input
        style={styles.input}
        onChangeText={handleChangeText}
        placeholder="What would you like to see? (e.g. pancakes)"
      />
      <Icon name="ios-search-outline" />
    </Item>
  );
};

SearchBar.propTypes = {
  updateQuery: PropTypes.func.isRequired,
};

export default SearchBar;
