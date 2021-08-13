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
    Avatar
} from "native-base"
import { View } from "react-native"

const DetailsModal = (props) => {
    const { pot, detailmodalVisible, setDetailModalVisible, imageLink, color } = props;
    return (
        <View>
            <Modal isOpen={detailmodalVisible} onClose={setDetailModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Body>
                        <HStack>
                            <VStack style={{marginRight: 50}}>
                                <Text style={{fontSize: 50}}>{pot.title}</Text>
                                <Text style={{color: 'gray'}}>{pot.description}</Text>
                                <Text style={{fontSize: 50, color: color}}>₹{pot.amount}</Text>
                            </VStack>
                            <Avatar size='xl' style={{margin: 10}} source={{uri: imageLink}}></Avatar>
                        </HStack>
                        <HStack marginTop={30}>
                           <VStack marginRight={120}>
                               <VStack marginBottom={30} alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>current amt</Text>
                                    <Text style={{fontSize: 40}}>{Math.floor(pot.currentAmount)}</Text>
                                </VStack>
                                <VStack alignItems='center'>
                                    <Text style={{fontSize: 10, color: 'gray'}}>ETA</Text>
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
                        <Button.Group variant="ghost" style={{paddingRight: 70}}>
                            <Button onPress={() => {
                                setDetailModalVisible(false)
                            }}
                            >DELETE</Button>
                            <Button
                                onPress={() => {
                                    setDetailModalVisible(false)
                                }}
                                colorScheme="secondary"
                            >
                                EDIT
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default DetailsModal