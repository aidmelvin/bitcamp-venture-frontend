import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from './src/screens/GetStarted';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import Toast from "react-native-toast-message";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Get Started" component={GetStarted} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
