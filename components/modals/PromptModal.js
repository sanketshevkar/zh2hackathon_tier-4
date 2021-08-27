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
    useToast,
} from "native-base"
import { View } from "react-native"

const PromptModal = (props) => {
    const { promptModal, setPromptModal, localdays, formInput, message, setPots } = props
    const toast = useToast();

    const onClickOk = () => {
        console.log(localdays)

            fetch('http://3.109.210.47:8085/pot/create?forcedCreate=true', {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formInput)
            }).then(response => response.json())
            .then((data) => {
                setPots(data)
            })
            toast.show({
                title: "Pot Created!",
                placement: 'bottom',
                // status: 'warning',
            });
        setPromptModal(false)
    }

    const onCancel = () => {
        setPromptModal(false)
    }

    return (
        <View>
            <Modal isOpen={promptModal} onClose={setPromptModal} avoidKeyboard>
                <Modal.Content>
                    <Modal.Header>Warning!</Modal.Header>
                    <Modal.Body>
                        <Text>{message} days</Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group variant="ghost" style={{ paddingRight: 70 }}>
                            <Button onPress={onClickOk}
                            >Ok</Button>
                            <Button onPress={onCancel}
                            >Cancel</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    )
}

export default PromptModal