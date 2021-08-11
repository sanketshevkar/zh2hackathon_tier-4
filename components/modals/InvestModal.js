import React from "react"
import {
    Modal,
    Button,
    Input,
    VStack,
    Text,
    Center,
    NativeBaseProvider,
} from "native-base"
import { View } from "react-native"

const InvestModal = (props) => {
    const { modalVisible, setModalVisible } = props
    return (
        <View>
            <Modal isOpen={modalVisible} onClose={setModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Header>Investment Form</Modal.Header>
                    <Modal.Body>
                        <Input mt={2} placeholder="Name" />
                        <Input mt={2} placeholder="Email" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{paddingRight: 70}}>
                            <Button onPress={() => {
                                setModalVisible(false)
                            }}
                            >SAVE</Button>
                            <Button
                                onPress={() => {
                                    setModalVisible(false)
                                }}
                                colorScheme="secondary"
                            >
                                CLOSE
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default InvestModal