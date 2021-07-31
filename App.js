import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './components/Profile'
import Feed from './components/Feed'
import {
  NativeBaseProvider,
} from "native-base";

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Feed />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Profile />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Feed" component={HomeScreen} />
          <Tab.Screen name="Profile" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}