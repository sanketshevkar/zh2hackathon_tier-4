import React, {useState} from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Avatar, HStack, VStack } from 'native-base';
import { Button } from 'native-base';

const OnboardingPage = () => {
    const [mobileNumber, setMobileNumber] = React.useState(" ");
    const onPressVerify = () => {
        console.log(mobileNumber);
    }
    return (
        <View style= {{padding: 10}}>
            <VStack>
                <Text style={styles.text}>Verify your mobile number</Text>
                <TextInput
                style={styles.input}
                onChangeText={setMobileNumber}
                placeholder="Enter Mobile Number"
              />
              <Text style={styles.smtext}>Hint: Use number linked to your aadhar card</Text>
              <Button style={styles.button} onPress={onPressVerify}>Verify Mobile</Button>
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 4
    },
    text: {
        padding: 10,
        fontSize: 20
    },
    smtext: {
        padding: 10,
        paddingTop: 2,
        paddingBottom: 16,
        fontSize: 12,
    },
    button: { 
        backgroundColor: "black"
    }
  });

export default OnboardingPage
