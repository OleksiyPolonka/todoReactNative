import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

class App extends Component {
  constructor(...args) {
    super(...args);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    }
    this.setSorce = this.setSorce.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.onToggleAllComplete = this.onToggleAllComplete.bind(this);
  }
  setSorce(items, itemsDatasource, otherState) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    });
  }
  onRemove(key) {
    console.log('key: ', key);
    const newItems = this.state.items.filter(el => el.key !== key)

    this.setSorce(newItems, newItems);
  }
  onComplete(key, complete) {
    const newItems = this.state.items.map(el => {
      if (el.key !== key) return el;
      return {
        ...el,
        complete
      };
    });

    this.setSorce(newItems, newItems);
  }
  handleAddItem() {
    const { value, items } = this.state;

    if (value) {
      const newItems = [{
        key: Date.now(),
        text: value,
        complete: false
      }, ...items];

      this.setSorce(newItems, newItems, { value: '' });
    } 
  }
  onToggleAllComplete() {
    const { allComplete, items } = this.state;
    const complete = !allComplete;
    const newItems = items.map(el => Object.assign({}, el, { complete }));

    this.setSorce(newItems, newItems, { allComplete: complete });
  }
  render() {
    const { value, dataSource, items } = this.state;

    return (
      <View style={styles.container}>
        <Header
          value={value}
          onToggleAllComplete={this.onToggleAllComplete}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
        />
        <View style={styles.contentStyle}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({key, ...value}) => (
              <Row
                key={key}
                onComplete={complete => this.onComplete(key, complete)}
                onRemove={() => this.onRemove(key)}
                {...value}
              />
            ) }
            renderSeparator={(sectionId, rowId) => (
              <View
                key={rowId}
                style={styles.separator}
              />
            )}
          />
        </View>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    ...Platform.select({
      android: {
        paddingTop: 30
      }
    })
  },
  contentStyle: {
    flex: 1
  },
  list: {
    backgroundColor: '#fff'
  },
  separator: {
      borderWidth: 1,
      borderColor: '#f5f5f5'
  }
})

export default App;
