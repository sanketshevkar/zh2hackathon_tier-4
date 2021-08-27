import React, { useState } from "react"
import {
    Modal,
    Button,
    Input,
    Icon,
    VStack,
    Text,
    Center,
    NativeBaseProvider,
    useToast
} from "native-base"
import { View } from "react-native"
import { Entypo } from '@expo/vector-icons';

const InvestModal = (props) => {
    const { investmodalVisible, setInvestModalVisible, mobileNumber } = props
    const [multiplier, setMultiplier] = useState(1);

    const tempMobileNumber = mobileNumber.slice(1, 13)

    const toast = useToast()

    const onPressMultiplier = () => {
        fetch(`http://3.109.210.47:8085/transact/setMultiplier?phoneNumber=${tempMobileNumber}&multiplier=${multiplier}`, {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                toast.show({
                    title: `Multiplier set to ${data}`,
                    placement: 'bottom',
                    // status: 'warning',
                });
            })
            .catch((err) => {
                console.log(err)
                toast.show({
                    title: `Multiplier not set!!`,
                    placement: 'bottom',
                    // status: 'warning',
                });
            })
        setInvestModalVisible(false)
    }

    return (
        <View>
            <Modal isOpen={investmodalVisible} onClose={setInvestModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Header>Multiplier</Modal.Header>
                    <Modal.Body>
                        <Input mt={2} placeholder="Enter Multiplier"
                            InputRightElement={
                                <Icon
                                    as={<Entypo name="cross" size={24} color="black" />}
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
                            onChangeText={(value) => setMultiplier(value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{ paddingRight: 120 }}>
                            <Button onPress={onPressMultiplier}
                            >SET</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default InvestModal