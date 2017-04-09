import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder='What needs to be done'
          blurOnSubmit={false}
          returnKeyType='done'
        />
      </ View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50
  }
})

export default Header;
