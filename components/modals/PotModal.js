import React, { useState } from "react"
import {
    Modal,
    Button,
    Input,
    Icon,
    TextArea,
    Select,
    Radio,
    FormControl,
    VStack,
    Text,
    Center,
    NativeBaseProvider,
} from "native-base"
import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const PotModal = (props) => {
    const { potmodalVisible, setPotModalVisible } = props
    const date = new Date()

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        amount: 0,
        eta: 0
    })

    const [dateData, setDateData] = useState({
        formattedDate: Moment(date).format('L'),
        selectedDate: date,
        show: false,
    })

    const onPressDatePick = () => {
        setDateData({
            ...dateData,
            show: true,
        })
    }

    const onDateChange = (value) => {
        const arrayObject = Object.values(value)[1]
        const timeStamp = Object.values(arrayObject)[0]
        const formattedTimeStamp = Moment(timeStamp).format('L')
        setDateData({
            show: false,
            selectedDate: timeStamp,
            formattedDate: formattedTimeStamp
        })
        const timePeriodInDays = timeStamp.getDate() - date.getDate()
        const timPeriodInHours = timePeriodInDays * 24;

        setFormInput({
            ...formInput,
            eta: timPeriodInHours
        })

    }

    const resetStates = () => {
        setFormInput({
            title: "",
            description: "",
            amount: 0,
            eta: 0
        })

        setDateData({
            formattedDate: Moment(date).format('L'),
            selectedDate: date,
            show: false,
        })

        setPotModalVisible(false)
    }

    const onFormSubmit = () => {
        //post request to submit form
        console.log(formInput)
        resetStates()
    }

    const onFormClose = () => {
        resetStates()
    }

    return (
        <View>
            <Modal isOpen={potmodalVisible} onClose={setPotModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Header>Pot Form</Modal.Header>
                    <Modal.Body>
                        <FormControl isRequired>
                            <FormControl.Label>Title</FormControl.Label>
                            <Input onChangeText={(value) => setFormInput({
                                ...formInput,
                                title: value
                            })}
                            />

                            <FormControl.Label mt={6}>Description</FormControl.Label>
                            <TextArea h={20} onChangeText={(value) => setFormInput({
                                ...formInput,
                                description: value
                            })} />

                            <FormControl.Label mt={6}>Savings Amount</FormControl.Label>
                            <Input InputLeftElement={
                                <Icon
                                    as={<FontAwesome name="rupee" size={20} color="black" />}
                                    size="md"
                                    m={2}
                                    _light={{
                                        color: "black",
                                    }}
                                    _dark={{
                                        color: "gray.300",
                                    }}
                                />
                            }
                                onChangeText={(value) => setFormInput({
                                    ...formInput,
                                    amount: value
                                })}

                                defaultValue={formInput.amount.toString()}
                            />

                            <FormControl.Label mt={6}>Select Investment Period</FormControl.Label>

                            <View>
                                <Button variant="outline" borderColor="black" onPress={onPressDatePick} title="Show time picker!">{dateData.formattedDate}</Button>
                            </View>
                            {dateData.show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={dateData.selectedDate}
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}


                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{ paddingRight: 70 }}>
                            <Button onPress={onFormSubmit}
                            >Submit</Button>
                            <Button
                                onPress={onFormClose}
                                colorScheme="secondary"
                            >
                                Close
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View >
    )
}

export default PotModal