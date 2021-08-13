import React from "react"
import {
    Modal,
    Button,
    Input,
    Icon,
    VStack,
    Text,
    Center,
    NativeBaseProvider,
} from "native-base"
import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const InvestModal = (props) => {
    const { investmodalVisible, setInvestModalVisible } = props
    return (
        <View>
            <Modal isOpen={investmodalVisible} onClose={setInvestModalVisible} avoidKeyboard>
                <Modal.Content>
                    <Modal.Header>Saving Cap</Modal.Header>
                    <Modal.Body>
                        <Input mt={2} placeholder="Transaction Amount"
                            InputLeftElement={
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
                        />
                        <Input mt={2} placeholder="Set Limit"
                            InputRightElement={
                                <Icon
                                    as={<Feather name="percent" size={24} color="black" />}
                                    size="md"
                                    m={2}
                                    _light={{
                                        color: "black",
                                    }}
                                    _dark={{
                                        color: "gray.300",
                                    }}
                                />

                            } />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{ paddingRight: 70 }}>
                            <Button onPress={() => {
                                setInvestModalVisible(false)
                            }}
                            >SET</Button>
                            <Button
                                onPress={() => {
                                    setInvestModalVisible(false)
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