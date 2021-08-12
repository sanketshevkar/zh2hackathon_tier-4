import React from 'react';
import { Text, View} from 'react-native';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const OnBoardingStatus = ({navigation, setAuth}) => {
    const testCondition = false

    const onRegistrationSuccessful = () => {
        navigation.navigate('HomePage');
        setAuth(false)
    }

    const onRegistrationFail = () => {
        navigation.navigate('OnBoardingPage');
        setAuth(false)
    }
    
    if(testCondition) {
        return(
            <View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="checkmark-done-circle" size={150} color="green" style={{ marginTop: 150 }} />
                    <Text style={{ fontSize: 20, color: 'green' }}>Registration Successful !</Text>
                </View>
                <Button style={{ marginTop: 200 }} onPress={onRegistrationSuccessful}>Continue</Button>
            </View>
        );
    } else {
        return(
            <View>
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Entypo name="circle-with-cross" size={150} color="red" style={{ marginTop: 150 }} />
                    <Text style={{ fontSize: 20, color: 'red' }}>Registration Failed !</Text>
                </View>
                <Button style={{ marginTop: 200 }} onPress={onRegistrationFail}>Try Again!</Button>
            </View>
        )
    }
}

export default OnBoardingStatus;
