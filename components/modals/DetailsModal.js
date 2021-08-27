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

const DetailsModal = (props) => {
    const { pot, detailmodalVisible, setDetailModalVisible, imageLink, color, setPots } = props;
    const { id, currentAmount, amount } = pot

    console.log(pot)

    const toast = useToast()
    const onPressPay = () => {
        fetch(`http://3.109.210.47:8085/transact/re-deduct?phoneNumber=918830921497&potId=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then((data) => {
                console.log(data)
                setPots(data)
                toast.show({
                    title: "Payment Done!",
                    placement: 'bottom',
                    // status: 'warning',
                });
            });


        setDetailModalVisible(false)
    }

    return (
        <View>
            <Modal isOpen={detailmodalVisible} onClose={setDetailModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Body>
                        <HStack>
                            <VStack style={{ marginRight: 50 }}>
                                <Text style={{ fontSize: 30 }}>{pot.title}</Text>
                                <Text style={{ color: 'gray' }}>{pot.description}</Text>

                                <Text style={{ fontSize: 20, color: color }}>₹{pot.amount}</Text>
                            </VStack>
                            <Avatar size='xl' style={{ margin: 10 }} source={{ uri: imageLink }}></Avatar>
                        </HStack>
                        <HStack marginTop={30}>
                            <VStack marginRight={50}>
                                <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>current amt</Text>
                                    {
                                        currentAmount === -1 ? (
                                            <Text style={{ fontSize: 40 }}>{Math.floor(pot.amount)}</Text>
                                        ) : (
                                            <Text style={{ fontSize: 40 }}>{Math.floor(pot.currentAmount)}</Text>
                                        )
                                    }
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{ fontSize: 10, color: 'gray' }}>Time Period (days)</Text>
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
                                    {
                                        currentAmount === -1 ? (
                                            <Text style={{ fontSize: 40 }}>100%</Text>
                                        ) : (
                                            <Text style={{ fontSize: 40 }}>{Math.floor((pot.currentAmount / pot.amount) * 100)}%</Text>
                                        )
                                    }

                                </VStack>
                            </VStack>
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group style={{ paddingRight: 110, paddingBottom: 10 }}>
                            {
                                currentAmount === -1 ? (
                                    <Text >Pot Full</Text>
                                ) : (
                                    <Button onPress={onPressPay}
                                    >Pay Now</Button>
                                )
                            }

                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default DetailsModal