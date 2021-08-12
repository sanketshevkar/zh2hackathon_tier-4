import React, { useState } from "react"
import {
    Modal,
    Button,
    Input,
    Icon,
    TextArea,
    FormControl,
    useToast,
} from "native-base"
import { View, Text } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

const PotModal = (props) => {
    const { potmodalVisible, setPotModalVisible, mobileNumber } = props
    const date = new Date()

    const intialFormattedDate = Moment(date).format('DD/MM/YYYY');

    const toast = useToast();

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        amount: 0,
        eta: 0,
        phoneNumber: parseInt(mobileNumber),
        autoDeduct: true
    })

    const [dateData, setDateData] = useState({
        formattedDate: Moment(date).format('DD/MM/YYYY'),
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
        const formattedTimeStamp = Moment(timeStamp).format('DD/MM/YYYY')
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
            eta: 0,
            phoneNumber: parseInt(mobileNumber),
            autoDeduct: true
        })

        setDateData({
            formattedDate: Moment(date).format('DD/MM/YYYY'),
            selectedDate: date,
            show: false,
        })

        setPotModalVisible(false)
    }

    const onFormSubmit = () => {
        //post request to submit form
        // console.log(formInput)
        fetch('http://13.233.146.7:8084/pot/create', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInput)
        }).then((response) => {
            console.log(response.status); toast.show({
                title: 'Success!',
                placement: 'bottom',
                // status: 'success',
            })
        }).catch((e) => {
            console.log(e)
            toast.show({
                title: 'Failed!',
                placement: 'bottom',
                // status: 'warning',
            });
        })
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
                                    amount: parseInt(value)
                                })}

                                defaultValue={formInput.amount.toString()}
                            />

                            <FormControl.Label mt={6}>Select Investment Period</FormControl.Label>

                            <View>
                                <Button variant="outline" borderColor="black" onPress={onPressDatePick} title="Show time picker!"><Text>{intialFormattedDate} {" "} - {" "} {dateData.formattedDate}</Text></Button>
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