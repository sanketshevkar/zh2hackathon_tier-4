import React, {useState} from 'react'
import { Text, View, ScrollView } from 'react-native';
import { Avatar, HStack, VStack } from 'native-base';
import { Button } from 'native-base';
import PotCard from './cards/PotCard'
import SmallCaseCard from './cards/SmallCaseCard'
import InvestModal from './modals/InvestModal'

const Profile = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const onPressInvest = () => {
        setModalVisible(true)
    }

    return (
        <View style={{ backgroundColor: "#ffffff" }}>
        <InvestModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <ScrollView>
                <View style={{ marginLeft: 20, marginTop: 20, backgroundColor: "#ffffff" }}>
                    <HStack>
                        <VStack style={{ alignItems: 'center' }}>
                            <Avatar
                                size="2xl"
                            // source={{
                            //   uri: "https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg",
                            // }}
                            >
                                SS
                            </Avatar>
                            <Text style={{ marginTop: 10, marginLeft: 8 }}>@sanketshevkar</Text>
                        </VStack>
                        <VStack style={{ alignItems: 'center' }}>
                            <Text style={{ marginBottom: 20, marginTop: 20, marginLeft: 30, fontSize: 20, fontWeight: '500' }}>Sanket Shevkar</Text>
                            <HStack style={{ marginLeft: 20 }}>
                                <VStack style={{ alignItems: 'center', marginRight: 15 }}>
                                    <Text style={{ fontWeight: '700' }}>20</Text>
                                    <Text>followers</Text>
                                </VStack>
                                <VStack style={{ alignItems: 'center', marginLeft: 15 }}>
                                    <Text style={{ fontWeight: '700' }}>10</Text>
                                    <Text>following</Text>
                                </VStack>
                            </HStack>
                        </VStack>
                    </HStack>
                </View>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <HStack>
                        <Button style={{ marginRight: 10 }}>+ POT</Button>
                        <Button style={{ marginLeft: 10 }} onPress={onPressInvest}>+ INVEST</Button>
                    </HStack>
                </View>
                <Text/>
                <PotCard/>
                <SmallCaseCard/>
                <PotCard/>
                <PotCard/>
                <SmallCaseCard/>
            </ScrollView>
        </View>
    )
}

export default Profile
