import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from "native-base";
import OnBoardingPage from './pages/OnBoardingPage';
import OnBoardingStatus from './pages/OnBoardingStatus';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

export default function App() {
  const [auth, setAuth] = React.useState(true);
  if(auth) {
    return(
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="onBoadingPage">
            <Stack.Screen name="OnBoardingPage" component={OnBoardingPage} />
            {/* <Stack.Screen name="OnBoardingStatus" component={()=><OnBoardingStatus setAuth={setAuth}/>} /> */}
            <Stack.Screen name="OnBoardingStatus">
              {props => <OnBoardingStatus {...props} setAuth={setAuth} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  } else {
    return(
      <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
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
    </NativeBaseProvider>
    )
  }
}