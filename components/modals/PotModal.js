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
import PromptModal from './PromptModal'
import Moment from 'moment';

const PotModal = (props) => {
    const { potmodalVisible, setPotModalVisible, mobileNumber, pots, setPots } = props
    const date = new Date()

    const intialFormattedDate = Moment(date).format('DD/MM/YYYY');

    const toast = useToast();

    const [formInput, setFormInput] = useState({
        title: "",
        description: "",
        amount: 0,
        eta: 0,
        phoneNumber: mobileNumber,
        autoDeduct: true,
    })

    const [dateData, setDateData] = useState({
        formattedDate: Moment(date).format('DD/MM/YYYY'),
        selectedDate: date,
        show: false,
    })

    const [promptModal, setPromptModal] = useState(false)

    const [localdays, setLocalDays] = useState(0)

    const [message, setMessage] = useState("")

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
            eta: Math.abs(timPeriodInHours)
        })
    }

    const resetStates = () => {
        setFormInput({
            title: "",
            description: "",
            amount: 0,
            eta: 0,
            phoneNumber: mobileNumber,
            autoDeduct: true,
        })

        setDateData({
            formattedDate: Moment(date).format('DD/MM/YYYY'),
            selectedDate: date,
            show: false,
        })

        setPotModalVisible(false)
        setPromptModal(false)
    }

    const onDaysChange = (value) => {
        const hours = parseInt(value) * 24;
        console.log(hours)
        setFormInput({
            ...formInput,
            eta: hours
        })
    }

    const onFormSubmit = () => {
        //post request to submit form

        fetch('http://3.109.210.47:8085/pot/create?forcedCreate=false', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formInput)
        }).then(response => response.json())
            .then((data) => {
                console.log(data);
                const { value, days } = data;
                if (value === false) {
                    setMessage("Not possible, increase number of days!")
                    setPromptModal(true);
                    setLocalDays(days);
                } else {
                    setMessage(`Do you want to exceed the limit by ${days}`)
                    // fetch('http://3.109.210.47:8085/pot/create?forcedCreate=true', {
                    //     method: 'POST',
                    //     headers: {
                    //         // 'Accept': 'application/json, text/plain, */*',
                    //         'Content-Type': 'application/json'
                    //     },
                    //     body: JSON.stringify(formInput)
                    // }).then(response => console.log(response.status))
                    setPotModalVisible(false)
                    setPromptModal(true);
                    // toast.show({
                    //     title: "Pot Created!",
                    //     placement: 'bottom',
                    //     // status: 'warning',
                    // });
                }
            })
            .catch((e) => {
                console.log(e)
                toast.show({
                    title: 'Failed!',
                    placement: 'bottom',
                    // status: 'warning',
                });
            })
        // resetStates()
    }

    const onFormClose = () => {
        resetStates()
    }

    return (
        <View>
            <PromptModal promptModal={promptModal} setPromptModal={setPromptModal} formInput={formInput} localdays={localdays} message={message} setPots={setPots}></PromptModal>
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

                                defaultValue="0"
                            />

                            <FormControl.Label mt={6}>Set Investment Period (in days)</FormControl.Label>
                            <Input onChangeText={onDaysChange} />
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