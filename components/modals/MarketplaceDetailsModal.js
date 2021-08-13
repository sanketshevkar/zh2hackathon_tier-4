import React from "react"
import {
    Modal,
    Button,
    Input,
    VStack,
    Text,
    Center,
    NativeBaseProvider,
    HStack,
    Avatar,
    useToast
} from "native-base"
import { View } from "react-native"

const MarketplaceDetailsModal = (props) => {
    const { pot, detailmodalVisible, setDetailModalVisible, mobileNumber } = props;
    let { title, description, autoDeduct, amount, imageLink, eta } = pot;
    const reqBody = {
        title,
        description,
        eta,
        amount,
        phoneNumber: parseInt(mobileNumber),
        autoDeduct,
        imageLink
    }

    const toast = useToast()

    const onPressBuy = () => {
        console.log(reqBody)
        fetch('http://13.233.146.7:8084/pot/create?forcedCreate=false', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const { value, days } = data;
                if (value === false) {
                    toast.show({
                        title: 'Pot creation failed!',
                        placement: 'bottom',
                        // status: 'warning',
                    });
                } else {
                    fetch('http://13.233.146.7:8084/pot/create?forcedCreate=true', {
                        method: 'POST',
                        headers: {
                            // 'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reqBody)
                    }).then(response => console.log(response.status))
                    toast.show({
                        title: "Pot Created!",
                        placement: 'bottom',
                        // status: 'warning',
                    });
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
        setDetailModalVisible(false)
    }

    return (
        <View>
            <Modal isOpen={detailmodalVisible} onClose={setDetailModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Body>
                        <HStack>
                            <VStack style={{ marginRight: 50 }}>
                                <Text style={{ fontSize: 25, marginBottom: 16 }}>{pot.title}</Text>
                                <Text style={{ color: 'gray', paddingBottom: 16 }}>{pot.description}</Text>
                                <Text style={{ fontSize: 20, color: 'green' }}>₹{pot.amount}</Text>
                            </VStack>
                            <Avatar size='md' style={{ marginRight: 60 }} source={{ uri: pot.imageLink }}></Avatar>
                        </HStack>
                        <HStack marginTop={30}>
                            <VStack marginRight={120}>
                                <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>current amt</Text>
                                    <Text style={{ fontSize: 40 }}>{Math.floor(pot.currentAmount)}</Text>
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>ETA</Text>
                                    <Text style={{ fontSize: 40 }}>{pot.eta}</Text>
                                </VStack>
                            </VStack>
                            <VStack>
                                <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>remaining days</Text>
                                    <Text style={{ fontSize: 40 }}>{pot.remainingTime}</Text>
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>status</Text>
                                    <Text style={{ fontSize: 40 }}>{Math.floor((pot.currentAmount / pot.amount) * 100)}%</Text>
                                </VStack>
                            </VStack>
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{ paddingRight: 125, marginBottom: 10 }} size="lg">
                            <Button onPress={onPressBuy}
                            >Buy</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default MarketplaceDetailsModal