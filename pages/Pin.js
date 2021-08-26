import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { VStack } from 'native-base';
import { Button } from 'native-base';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SmsRetriever from 'react-native-sms-retriever';
import SmsAndroid from 'react-native-get-sms-android';

const Pin = ({ navigation, auth, login, setAuth, setpasscode, firstName, lastName, mobileNumber, passcode }) => {
    const onPressVerify = () => {
        setAuth(true);
    }

    const moment = new Date()

    // const onSmsListenerPressed = async () => {
    //     try {
    //       const registered = await SmsRetriever.startSmsRetriever();
    //       if (registered) {
    //         SmsRetriever.addSmsListener(event => {
    //           console.log(event.message, 'Line 73 app.js');
    //           // SmsRetriever.removeSmsListener();
    //         }); 
    //       }
    //     } catch (error) {
    //       console.log(JSON.stringify(error));
    //     }
    //   };

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
        maxDate: 1729969784590 , // timestamp (in milliseconds since UNIX epoch)
        bodyRegex: '(.*)How are you(.*)', // content regex to match

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



    const onPressAuth = async () => {
        try {
            // fetch('http://13.233.146.7:8084/auth/signup', {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({firstName: firstName,lastName: lastName,phoneNumber: mobileNumber,pin: passcode, type: "string"})
            // }).then(async(res)=>{
            //     if(res.status===200){
            //         try {
            //             const jsonValue = JSON.stringify({firstName: firstName, lastName: lastName, phoneNumber: mobileNumber, pin: passcode})
            //             await AsyncStorage.setItem('@storage_Key', jsonValue)
            //         } catch (e) {
            //             console.log(e);
            //         }
            //         setAuth(true);
            //     }
            // });
            setAuth(true);
            SmsAndroid.list(
                JSON.stringify(filter),
                (fail) => {
                    console.log('Failed with this error: ' + fail);
                },
                (count, smsList) => {
                    console.log('Count: ', count);
                    console.log('List: ', smsList);
                    var arr = JSON.parse(smsList);

                    arr.forEach(function (object) {
                        // console.log('Object: ' + object);
                        console.log('-->' + object.date);
                        console.log('-->' + object.body);
                    });
                },
            );

        } catch (e) {
            console.error(e);
        }
    }

    if (!login) {
        return (
            <View>
                <VStack style={{ padding: 10, marginTop: 100 }}>
                    <Text>Set New Passcode</Text>
                    <OTPInputView
                        style={{ height: 200 }}
                        pinCount={4}
                        fontColor='black'
                        secureTextEntry
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => { setpasscode(code) }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                    <Text style={styles.smtext}>For test purpose enter 1234</Text>
                    <Button style={styles.button} onPress={onPressAuth}>Finish</Button>
                </VStack>
            </View>
        )
    } else {
        return (
            <View>
                <VStack style={{ padding: 10, marginTop: 100 }}>
                    <Text>Enter Passcode</Text>
                    <OTPInputView
                        style={{ height: 200 }}
                        pinCount={4}
                        fontColor='black'
                        secureTextEntry
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => { setpasscode(code) }}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                    <Text style={styles.smtext}>For test purpose enter 1234</Text>
                    <Button style={styles.button} onPress={onPressVerify}>Go</Button>
                </VStack>
            </View>
        )
    }
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

export default Pin