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
import Pin from './pages/Pin';
import Name from './pages/Name';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import MarketPlace from './pages/MarketPlace';
import { UserList } from './UserList'
import BirthDate from './pages/BirthDate';
import PanCard from './pages/PanCard';
import OTPpage from './pages/OTPpage';
import SmsRetriever from 'react-native-sms-retriever';
import SmsAndroid from 'react-native-get-sms-android';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ users, setUsers, pots, setPots, mobileNumber }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#ffffff", }}>
      <Feed users={users} setUsers={setUsers} pots={pots} setPots={setPots} mobileNumber={mobileNumber} />
    </View>
  );
}

function SettingsScreen({ mobileNumber, users, setUsers, pots, setPots }) {
  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <Profile mobileNumber={mobileNumber} users={users} setUsers={setUsers} pots={pots} setPots={setPots} />
    </View>
  );
}

function MarketPlaceCollection({ mobileNumber, pots, setPots }) {
  return (
    <View style={{ backgroundColor: "#ffffff" }}>
      <MarketPlace mobileNumber={mobileNumber} pots={pots} setPots={setPots} />
    </View>
  )
}

export default function App() {
  const [auth, setAuth] = React.useState(false);
  const [firstName, setFirstName] = React.useState('');
  const [dob, setDob] = React.useState({
    date: "",
    month: "",
    year: ""
  });
  const [panCardNumber, setPanCardNumber] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('+918830921497');
  const [passcode, setpasscode] = React.useState('');
  const [login, setLogin] = React.useState(false);
  const [users, setUsers] = React.useState(UserList);
  const [resOtp, setResOtp] = React.useState("")
  const [otp, setOtp] = React.useState("");
  const [pots, setPots] = React.useState([]);

  var filter = {
    box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

    /**
     *  the next 3 filters can work together, they are AND-ed
     *  
     *  minDate, maxDate filters work like this:
     *    - If and only if you set a maxDate, it's like executing this SQL query:
     *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
     *    - Same for minDate but with "date >= minDate"
     */
    minDate: 0, // timestamp (in milliseconds since UNIX epoch)
    maxDate: 1729969784590, // timestamp (in milliseconds since UNIX epoch)
    bodyRegex: '(.*)', // content regex to match

    /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
    // read: 0, // 0 for unread SMS, 1 for SMS already read
    // _id: 1234, // specify the msg id
    // thread_id: 12 ,// specify the conversation thread_id
    address: '+919689929925', // sender's phone number
    // body: 'How are you?', // content to match

    // /** the next 2 filters can be used for pagination **/
    // indexFrom: 0, // start from index 0
    // maxCount: 10, // count of SMS to return each time
  };


  React.useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
          setLogin(true);
        } else {
          setMobileNumber(value.phoneNumber)
        }
      } catch (e) {
        // error reading value
      }
    }

    const checkMessage = async () => {
      await SmsAndroid.list(
        JSON.stringify(filter),
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (count, smsList) => {
          // console.log('Count: ', count);
          // console.log('List: ', smsList);
          var arr = JSON.parse(smsList);
          const messageObject = arr[0].body

          var numberPattern = /\d+/g;
          const messageAmount = messageObject.match(numberPattern)

          if (messageAmount) {
            const intAmount = parseInt(messageAmount[0])
            fetch(`http://3.109.210.47:8085/transact/deduct?phoneNumber=918830921497&amount=${intAmount}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              }
            }).then(res => res.json())
              .then((data) => {
                console.log(data)
              });
          }
        },
      );
    }

    getData();
    checkMessage();
  }, [])

  if (!auth && !login) {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Name">
            <Stack.Screen name="Name">
              {props => <Name {...props} setFirstName={setFirstName} setLastName={setLastName} />}
            </Stack.Screen>
            <Stack.Screen name="BirthDate">
              {props => <BirthDate {...props} dob={dob} setDob={setDob} />}
            </Stack.Screen>
            <Stack.Screen name="PanCard">
              {props => <PanCard {...props} panCardNumber={panCardNumber} setPanCardNumber={setPanCardNumber} />}
            </Stack.Screen>
            <Stack.Screen name="OnBoardingPage">
              {props => <OnBoardingPage {...props} setMobileNumber={setMobileNumber} mobileNumber={mobileNumber} firstName={firstName} lastName={lastName} panCardNumber={panCardNumber} dob={dob} setResOtp={setResOtp} />}
            </Stack.Screen>
            <Stack.Screen name="OTP">
              {props => <OTPpage {...props} setMobileNumber={setMobileNumber} otp={otp} setOtp={setOtp} resOtp={resOtp} />}
            </Stack.Screen>
            <Stack.Screen name="Pin">
              {props => <Pin {...props} auth={auth} setAuth={setAuth} setpasscode={setpasscode} firstName={firstName} lastName={lastName} mobileNumber={mobileNumber} passcode={passcode} />}
            </Stack.Screen>
            {/* <Stack.Screen name="OnBoardingStatus" component={()=><OnBoardingStatus setAuth={setAuth}/>} /> */}
            <Stack.Screen name="OnBoardingStatus">
              {props => <OnBoardingStatus {...props} setAuth={setAuth} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  } else if (login && !auth) {
    return (
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Name">
            <Stack.Screen name="Pin">
              {props => <Pin {...props} auth={auth} login={login} setAuth={setAuth} setpasscode={setpasscode} passcode={passcode} />}
            </Stack.Screen>
            {/* <Stack.Screen name="OnBoardingStatus" component={()=><OnBoardingStatus setAuth={setAuth}/>} /> */}
            {/* <Stack.Screen name="OnBoardingStatus">
              {props => <OnBoardingStatus {...props} setAuth={setAuth} />}
            </Stack.Screen> */}
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  } else {
    return (
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
                } else if (route.name === "Marketplace") {
                  return (
                    <AntDesign name="shoppingcart" size={24} color="black" />
                  )
                }
              },
              tabBarInactiveTintColor: 'gray',
              tabBarActiveTintColor: 'tomato',
            })}
          >
            <Tab.Screen name="Feed">
              {props => <HomeScreen {...props} users={users} setUsers={setUsers} pots={pots} setPots={setPots} mobileNumber={mobileNumber} />}
            </Tab.Screen>
            <Tab.Screen name="Marketplace">
              {props => <MarketPlaceCollection {...props} mobileNumber={mobileNumber} pots={pots} setPots={setPots} />}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {props => <SettingsScreen {...props} mobileNumber={mobileNumber} users={users} setUsers={setUsers} pots={pots} setPots={setPots} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    )
  }
}