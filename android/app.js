import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import Header from './header';
import Footer from './footer';
import Row from './row';

class App extends Component {
  constructor(...args) {
    super(...args);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      loading: true,
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([]),
      filter: 'all'
    }
    this.setSource = this.setSource.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this)
    this.handleAddItem = this.handleAddItem.bind(this);
    this.onToggleAllComplete = this.onToggleAllComplete.bind(this);
  }
  setSource(items, itemsDatasource, otherState = {}) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ...otherState
    });
    AsyncStorage.setItem('items', JSON.stringify(items));
  }
  onRemove(key) {
    const newItems = this.state.items.filter(el => el.key !== key)

    this.setSource(newItems, newItems, { filter: 'all' });
  }
  onComplete(key, complete) {
    const newItems = this.state.items.map(el => {
      if (el.key !== key) return el;
      return {
        ...el,
        complete
      };
    });

    this.setSource(newItems, newItems);
  }
  componentWillMount() {
    AsyncStorage.getItem('items')
      .then((response = {}) => {
        const items = JSON.parse(response);

        this.setSource(items, items, { loading: false })
      })
  }
  handleAddItem() {
    const { value, items } = this.state;

    if (value) {
      const newItems = [{
        key: Date.now(),
        text: value,
        complete: false
      }, ...items];

      this.setSource(newItems, newItems, { value: '', filter: 'all' });
    } 
  }
  onToggleAllComplete() {
    const { allComplete, items } = this.state;
    const complete = !allComplete;
    const newItems = items.map(el => Object.assign({}, el, { complete }));

    this.setSource(newItems, newItems, { allComplete: complete });
  }
  filterItems(filter = 'all', count) {
    const { items } = this.state;
    const newItems = items.filter(el => {
      if (filter === 'active') {
        return !el.complete;
      }
      if (filter === 'completed') {
        return el.complete
      }

      return el;
    })

    if (count) {
      return newItems;
    }

    this.setSource(items, newItems, { filter });
  }
  clearCompleted() {
    const newItems = this.state.items.filter(el => !el.complete)

    this.setSource(newItems, newItems, {filter: 'all'});
  }
  render() {
    const { value, dataSource, items, filter, loading } = this.state;

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
        <Footer
          clearCompleted={this.clearCompleted}
          count={this.filterItems(filter, true).length}
          filter={filter}
          filterItems={this.filterItems}
        />
        { loading &&
          <View style={styles.loading}>
            <ActivityIndicator
              animating
              size='large'
            />
          </View>
        }
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
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)'
  }
})

export default App;
