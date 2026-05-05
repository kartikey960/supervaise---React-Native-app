import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnBoardingScreen');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <LinearGradient
      colors={['#A7D8E6', '#6EC1C7', '#3AA6A6']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View>
          <Image
            source={require('../assests/logo/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  logo: {
    width: 250,
    height: 250,
  },
});
