import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView } from 'react-native';
import { Avatar, HStack, VStack } from 'native-base';
import { Button } from 'native-base';
import PotCard from '../components/cards/PotCard';
import InvestModal from '../components/modals/InvestModal';
import PotModal from '../components/modals/PotModal';

const Profile = ({ mobileNumber, users, setUsers }) => {
    const [pots, setPots] = useState([]);

    useEffect(() => {
        try {
            fetch(`http://3.109.210.47:8085/pot/details/all/${mobileNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(data => setPots(data));
        } catch (e) {
            console.error(e);
        }
    }, []);

    const [investmodalVisible, setInvestModalVisible] = useState(false);
    const [potmodalVisible, setPotModalVisible] = useState(false);

    const onPressInvest = () => {
        setInvestModalVisible(true)
    }

    const onPressPot = () => {
        setPotModalVisible(true)
    }

    return (
        <View style={{ backgroundColor: "#ffffff" }}>
            <InvestModal investmodalVisible={investmodalVisible} setInvestModalVisible={setInvestModalVisible} />
            <PotModal potmodalVisible={potmodalVisible} setPotModalVisible={setPotModalVisible} mobileNumber={mobileNumber} />
            <ScrollView>
                <View style={{ marginLeft: 20, marginTop: 20, backgroundColor: "#ffffff" }}>
                    <HStack>
                        <VStack style={{ alignItems: 'center' }}>
                            <Avatar
                                size="2xl"
                            source={{
                              uri: "https://upload.wikimedia.org/wikipedia/en/9/91/Ryan_Howard_%28The_Office%29.jpg",
                            }}
                            >
                                SS
                            </Avatar>
                            <Text style={{ marginTop: 10, marginLeft: 8 }}>@ryanhoward</Text>
                        </VStack>
                        <VStack style={{ alignItems: 'center' }}>
                            <Text style={{ marginBottom: 20, marginTop: 20, marginLeft: 30, fontSize: 20, fontWeight: '500' }}>Ryan Howard</Text>
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
                        <Button style={{ marginRight: 10 }} onPress={onPressPot}>Create POT</Button>
                        <Button style={{ marginLeft: 10 }} onPress={onPressInvest}>Set Savings Cap</Button>
                    </HStack>
                </View>

                {pots.map((pot, key) => {
                    return (
                        <View key={key}>
                            <PotCard pot={pot} users={users} setUsers={setUsers}/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Profile
