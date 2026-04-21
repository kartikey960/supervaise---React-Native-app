import react from 'react';
import { Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Walkthrough1 from './screens/walkthrough1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Walkthrough2 from './screens/walkthrough2';
import Walkthrough3 from './screens/walkthrough3';
import SuperviseScreen1 from './screens/SuperviseScreen1';

import SuperviseScreen2 from './screens/SuperviseScreen2';
import SessionDetailsScreen from './screens/SessionDetailsScreen';
import SessionScreen from './screens/SessionScreen';
import ForgotPassword from './screens/ForgotPassword';
import OTPScreen from './screens/OTPScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
        <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
        <Stack.Screen name="Walkthrough3" component={Walkthrough3} />
        <Stack.Screen name="SuperviseScreen1" component={SuperviseScreen1} />
        <Stack.Screen name="SuperviseScreen2" component={SuperviseScreen2} />
        <Stack.Screen name="SessionScreen" component={SessionScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        <Stack.Screen
          name="SessionDetailsScreen"
          component={SessionDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
