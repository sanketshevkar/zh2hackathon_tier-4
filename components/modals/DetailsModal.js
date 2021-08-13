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
    const { pot, detailmodalVisible, setDetailModalVisible, imageLink, color } = props;
    const toast = useToast()
    const onPressPay = () => {
        toast.show({
            title: "Payment Done!",
            placement: 'bottom',
            // status: 'warning',
        });
        setDetailModalVisible(false)
    }
    return (
        <View>
            <Modal isOpen={detailmodalVisible} onClose={setDetailModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Body>
                        <HStack>
                            <VStack style={{marginRight: 50}}>
                                <Text style={{fontSize: 30}}>{pot.title}</Text>
                                <Text style={{color: 'gray'}}>{pot.description}</Text>
                                <Text style={{fontSize: 20, color: color}}>₹{pot.amount}</Text>
                            </VStack>
                            <Avatar size='xl' style={{margin: 10}} source={{uri: imageLink}}></Avatar>
                        </HStack>
                        <HStack marginTop={30}>
                           <VStack marginRight={50}>
                               <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>current amt</Text>
                                    <Text style={{fontSize: 40}}>{Math.floor(pot.currentAmount)}</Text>
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>Time Period (days)</Text>
                                    <Text style={{fontSize: 40}}>{pot.eta}</Text>
                                </VStack>
                           </VStack>
                           <VStack>
                                <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>remaining days</Text>
                                    <Text style={{fontSize: 40}}>{pot.remainingTime}</Text>
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>status</Text>
                                    <Text style={{fontSize: 40}}>{Math.floor((pot.currentAmount/pot.amount)*100)}%</Text>
                                </VStack>
                           </VStack>
                        </HStack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group style={{paddingRight: 110, paddingBottom: 10}}>
                            <Button onPress={onPressPay}
                            >Pay Now</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default DetailsModal