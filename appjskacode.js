import react from 'react';
import { Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import Walkthrough1 from './screens/walkthrough1';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Walkthrough2 from './screens/walkthrough2';
import Walkthrough3 from './screens/walkthrough3';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
        <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
        <Stack.Screen name="Walkthrough3" component={Walkthrough3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
