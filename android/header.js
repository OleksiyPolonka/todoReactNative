import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

class Header extends Component {
  render() {
    const { value, onAddItem, onChange, onToggleAllComplete } = this.props;

    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleAllComplete}>
          <Text>
            {String.fromCharCode(10003)}
          </Text>
        </TouchableOpacity>
        <TextInput
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onAddItem}
          placeholder='What needs to be done?'
          blurOnSubmit={ false }
          returnKeyType='done'
          style={ styles.input }
        />
      </ View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  toggleIcon: {
    fontSize: 30,
    color: '#ccc'
  },
  input: {
    flex: 1,
    height: 50
  }
})

export default Header;
