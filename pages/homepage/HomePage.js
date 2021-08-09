import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../components/Profile'
import Feed from '../../components/Feed'
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import OnboardingPage from './pages/onboarding page/OnboardingPage';
// import OnboardingBuffer from './pages/onboarding buffer page/OnboardingBuffer'

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff", }}>
      <Feed />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <Profile />
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function HomePage() {
  return (
    <>
      <Header
        // LinearGradientProps={{
        //   colors: ['red', 'pink'],
        //   start: { x: 0, y: 0.5 },
        //   end: { x: 1, y: 0.5 },
        // }}
        // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
        centerComponent={{ text: 'Zeta Demo', style: { color: '#000000' } }}
        backgroundColor="#ffffff"
        barStyle="light-content"
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <NavigationContainer backgroundColor="#ffffff">
        <Tab.Navigator tabBarOptions={{
          activeTintColor: '#e91e63',
          activeBackgroundColor: "#ffffff",
          inactiveBackgroundColor: "#ffffff"
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Feed') {
              return (
                <MaterialIcons name="dynamic-feed" size={24} color="black" />
              );
            } else if (route.name === 'Profile') {
              return (
                <MaterialIcons name="home" size={24} color="black" />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
        >
          <Tab.Screen name="Feed" component={HomeScreen} />
          <Tab.Screen name="Profile" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
        </>
  );
}