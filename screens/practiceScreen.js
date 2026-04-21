import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const DATA = [
    { id: '1', name: 'John' },
    { id: '2', name: 'Alice' },
    { id: '3', name: 'Bob' },
    { id: '4', name: 'Emma' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: '#ddd',
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});
