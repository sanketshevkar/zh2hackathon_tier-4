import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { VStack } from 'native-base';
import { Button } from 'native-base';

const Name = ({navigation, setFirstName, setLastName}) => {
    const onPressVerify = () => {
        navigation.navigate('OnBoardingPage');
    }
    return (
        <View>
            <VStack style={{ padding: 10 }}>
                <Text>Enter Your Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFirstName}
                    placeholder="Enter First Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setLastName}
                    placeholder="Enter Last Name"
                />
                <Button style={styles.button} onPress={onPressVerify}>Next</Button>
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
    }
});

export default Name;