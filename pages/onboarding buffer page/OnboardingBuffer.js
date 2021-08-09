import React, { useState } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Avatar, HStack, VStack } from 'native-base';
import { Button } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const OnboardingPage = ({navigation}) => {
    const testCondition = false

    return (
        <>
            {
                testCondition ?
                    <View>
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="checkmark-done-circle" size={150} color="green" style={{ marginTop: 150 }} />
                            <Text style={{ fontSize: 20, color: 'green' }}>Registration Successful !</Text>
                        </View>
                        <Button style={{ marginTop: 200 }} onPress={() => navigation.navigate('HomeScreen')}>Continue</Button>
                    </View>


                    :
                    <View>

                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Entypo name="circle-with-cross" size={150} color="red" style={{ marginTop: 150 }} />
                            <Text style={{ fontSize: 20, color: 'red' }}>Registration Failed !</Text>
                        </View>
                        <Button style={{ marginTop: 200 }} onPress={() => navigation.navigate('onBoardingScreen')}>Try Again!</Button>
                    </View>
            }
        </>

    )

}

export default OnboardingPage
