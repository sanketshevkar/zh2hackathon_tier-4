import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { VStack, Button } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const BirthDate = ({ navigation, dob, setDob }) => {

    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const onPressVerify = () => {
        setDob({
            date,
            month,
            year
        })
        console.log(dob, 'Line 19')
        navigation.navigate('PanCard');
    }

    // // const [dateFormat, setDateFormat] = useState(new Date(dob.year, dob.month, dob.date, 0, 0, 0, 0));
    // const [date, setDate] = useState(new Date())

    // const [show, setShow] = useState(false)

    // const onPressDatePick = () => {
    //     setShow(true)
    // }

    // const onDateChange = (value) => {
    //     const arrayObject = Object.values(value)[1]
    //     const timeStamp = Object.values(arrayObject)[0]


    //     const dateObj = {
    //         date: Moment(timeStamp).format('DD'),
    //         month: Moment(timeStamp).format('MM'),
    //         year: Moment(timeStamp).format('YYYY')
    //     }
    //     setDob(dateObj)

    //     const newDate = new Date(dateObj.year, -dateObj.month-1, dateObj.date, 0, 0, 0, 0);
    //     setDate(newDate);

    //     console.log(dob, 'Line 35')
    //     setShow(false)
    // }


    // return (
    //     <View>
    //         <VStack style={{ padding: 10 }}>
    //             <View>
    //                 <Button variant="outline" borderColor="black" onPress={onPressDatePick} title="Show time picker!"><Text>{dob.date}/{dob.month}/{dob.year}</Text></Button>
    //             </View>

    //             {show && (
    //                 <DateTimePicker
    //                     testID="dateTimePicker"
    //                     value={date}
    //                     display="default"
    //                     onChange={onDateChange}
    //                 />
    //             )}

    //         </VStack>
    //     </View>
    // )

    return (
        <View>
            <VStack style={{ padding: 10 }}>
                <Text>Enter Your BirthDate</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setDate(value)}
                    placeholder="Enter Date"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setMonth(value)}
                    placeholder="Enter Month"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setYear(value)}
                    placeholder="Enter Year"
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

export default BirthDate;