import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './components/Profile'
import Feed from './components/Feed'
import {
  NativeBaseProvider
} from "native-base";
import { Header } from 'react-native-elements';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffe6", }}>
      <Feed />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Profile />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <Header
        // LinearGradientProps={{
        //   colors: ['red', 'pink'],
        //   start: { x: 0, y: 0.5 },
        //   end: { x: 1, y: 0.5 },
        // }}
        // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
        centerComponent={{ text: 'Zeta Demo', style: { color: '#000000' } }}
        backgroundColor="#ffffe6"
        barStyle="light-content"
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <NavigationContainer backgroundColor="#ffffe6">
        <Tab.Navigator tabBarOptions={{
          activeTintColor: '#e91e63',
          activeBackgroundColor: "#ffffe6",
          inactiveBackgroundColor: "#ffffe6"
        }}>
          <Tab.Screen name="Feed" component={HomeScreen} />
          <Tab.Screen name="Profile" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}