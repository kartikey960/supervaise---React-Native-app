import react, { useEffect } from 'react';
import { Text, View, BackHandler } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SuperviseScreen1 from './screens/SuperviseScreen1';

import SuperviseScreen2 from './screens/SuperviseScreen2';
import SessionDetailsScreen from './screens/SessionDetailsScreen';
import SessionScreen from './screens/SessionScreen';
import ForgotPassword from './screens/ForgotPassword';
import OTPScreen from './screens/OTPScreen';
import PracticeScreen from './screens/PracticeScreen';
import ViewDetailScreen from './screens/ViewDetailScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SuperviseScreen1" component={SuperviseScreen1} />
        <Stack.Screen name="SuperviseScreen2" component={SuperviseScreen2} />
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="PracticeScreen" component={PracticeScreen} />
        <Stack.Screen
          name="SessionDetailsScreen"
          component={SessionDetailsScreen}
        />
        <Stack.Screen name="ViewDetailScreen" component={ViewDetailScreen} />
        <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
