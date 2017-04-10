import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Footer extends Component {
  render() {
    const { filterItems, filter, count, clearCompleted } = this.props;

    return (
      <View style={ styles.container }>
        <Text>{ count } count</Text>
        <View style={styles.filterStyle}>
          <TouchableOpacity onPress={ () => filterItems() }>
            <Text style={[styles.filter, filter === 'all' && styles.selected]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => filterItems('active') }>
            <Text style={[styles.filter, filter === 'active' && styles.selected]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => filterItems('completed') }>
            <Text style={[styles.filter, filter === 'completed' && styles.selected]}>
              Copleted
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={ clearCompleted }>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterStyle: {
    flexDirection: 'row'
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
   selected: {
     borderColor: 'rgba(175, 47, 47, .2)'
   }
})

export default Footer;
