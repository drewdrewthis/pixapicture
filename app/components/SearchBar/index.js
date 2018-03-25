import React from 'react';
import throttle from 'lodash/throttle';
import { StyleSheet } from 'react-native';
import { Item, Input, Icon } from 'native-base';

const styles = StyleSheet.create({
  input: {
    color: '#fff',
    // placeholderTextColor: '#fff',
  },
});

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      typing: false
    }

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
          onChange={() => this.setState({typing: true})}
          onChangeText={this.handleChangeText}
          placeholder='What would you like to see? (eg. pancakes)'
        />
        <Icon name='ios-search-outline' />
      </Item>
    )
  }
}

export default SearchBar;
