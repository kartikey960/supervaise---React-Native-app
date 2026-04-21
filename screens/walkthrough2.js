import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function walkthrough2({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
      <View style={styles.page}>
        <View>
          <TouchableOpacity style={styles.skip}>
            <Text>Skip</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../assests/logo/container2.png')}
            style={styles.item}
            resizeMode="contain"
          />
        </View>
        <View style={styles.mini}>
          <Text style={styles.text}>
            Track Supervision{'\n'}
            Hours.{'\n'}
          </Text>
          <Text style={styles.text2}>
            Easily Log and Monitor your{'\n'}
            supervision hours to meet licensing{'\n'}
            requirements.
          </Text>
        </View>
        <View style={styles.slider}>
          <View style={styles.box1} />
          <View style={styles.box2} />
          <View style={styles.box3} />
        </View>
        <View style={styles.touch}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Walkthrough3');
            }}
          >
            <Text style={styles.inside}>Next > </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#043C87',
  },

  page: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  item: {
    height: 150,
    width: 150,
    marginTop: 65,
  },
  mini: {
    margin: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40,
  },
  text2: {
    textAlign: 'center',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    text: 'white',
    height: 50,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  inside: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },

  skip: {
    marginLeft: 280,
    marginBottom: 30,
  },
  slider: {
    flexDirection: 'row',
    marginTop: 130,
  },
  box1: {
    width: 10,
    height: 10,
    backgroundColor: '#D1D5DC',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  box2: {
    width: 30,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  box3: {
    width: 10,
    height: 10,
    backgroundColor: '#D1D5DC',
    borderRadius: 10,
  },
});
