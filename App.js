import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NativeBaseProvider
} from "native-base";
import OnboardingPage from './pages/onboarding page/OnboardingPage'
import OnboardingBuffer from './pages/onboarding buffer page/OnboardingBuffer'
import HomePage from './pages/homepage/HomePage'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="onBoardingScreen">
          <Stack.Screen name="onBoardingScreen" component={OnboardingPage} />
          <Stack.Screen name="checkAuthScreen" component={OnboardingBuffer} />
          <Stack.Screen name="HomeScreen" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}