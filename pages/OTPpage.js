import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { VStack } from 'native-base';
import { Button } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsRetriever from 'react-native-sms-retriever';
import SmsAndroid from 'react-native-get-sms-android';

const OTPpage = ({ navigation, login, setpasscode, firstName, lastName, mobileNumber, passcode, otp, setOtp, resOtp }) => {
    
    const [error, setError] = React.useState("")

    const onPressVerify = () => {
        // if(resOtp !== otp){
        //     setError("Wrong Otp!!")
        // }else{
            navigation.navigate('Pin');
        // }
    }

    return (
        <View>
            <VStack style={{ padding: 10, marginTop: 100 }}>
                <Text>Enter OTP</Text>
                <OTPInputView
                    style={{ height: 200 }}
                    pinCount={4}
                    fontColor='black'
                    secureTextEntry
                    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => { setOtp(code) }}
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                />

                <Button style={styles.button} onPress={onPressVerify}>Finish</Button>


                <Text>{error}</Text>

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
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        fontWeight: 'bold',
        color: 'black',
        fontSize: 30
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
});

export default OTPpage;