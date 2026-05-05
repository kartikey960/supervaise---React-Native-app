import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

export default function ViewDataScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStoredData = async () => {
    try {
      const data = await AsyncStorage.getItem('userData');

      if (data !== null) {
        const parsedData = JSON.parse(data);
        setUser(parsedData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    } finally {
      setLoading(false);
    }
  };
  const clearData = async () => {
    try {
      const emptyData = {
        username: '',
        email: '',
        password: '',
      };

      await AsyncStorage.setItem('userData', JSON.stringify(emptyData));

      setUser(emptyData);
    } catch (error) {
      console.log('Error clearing data:', error);
    }
  };

  useEffect(() => {
    getStoredData();
  }, []);

  return (
    <LinearGradient
      colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Stored User Data</Text>

        {loading ? (
          <ActivityIndicator size="large" />
        ) : user ? (
          <>
            <View style={styles.card}>
              <Text style={styles.text}>Username: {user.username}</Text>
              <Text style={styles.text}>Email: {user.email}</Text>
              <Text style={styles.text}>Password: {user.password}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button title="Clear Data" onPress={clearData} />
            </View>
          </>
        ) : (
          <Text style={styles.noData}>No data found</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});
