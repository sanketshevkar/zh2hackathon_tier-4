import React, { useState, useEffect } from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, View, Divider, Button
} from "native-base";
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import DetailsModal from "../modals/DetailsModal";

function CardComponent({ pot }) {
    const [detailmodalVisible, setDetailModalVisible] = useState(false);
    const [color, setColor] = useState("green")

    let imageLink = "https://assets.smallcase.com/images/smallcases/160/WRTMO_0004.png"

    const colorChange = () => {
        const statusPercent = Math.floor((pot.currentAmount / pot.amount) * 100);
        if (statusPercent < 100) {
            setColor("red")
        }
    }

    useEffect(() => {
        // Update the document title using the browser API
        colorChange()
    },[]);

    if (pot.imageLink) {
        imageLink = pot.imageLink
    } else {
        imageLink = "https://assets.smallcase.com/images/smallcases/160/WRTMO_0004.png"
    }

    const onPressDetails = () => {
        setDetailModalVisible(true)
    }

    return (
        <View style={styles.card}>
            <DetailsModal pot={pot} detailmodalVisible={detailmodalVisible} setDetailModalVisible={setDetailModalVisible} color={color} imageLink={imageLink} />
            <Text style={{ fontSize: 10, paddingBottom: 2, marginLeft: 15 }}>pot</Text>
            <Divider />
            <View
                style={{ alignItems: 'center', marginBottom: 20 }}
            >
                <Avatar size='xl' style={{ margin: 10 }} source={{ uri: imageLink }}></Avatar>
                <Text style={{ fontSize: 20 }}>{pot.title}</Text>
                <HStack>
                    <FontAwesome5 style={{ paddingTop: 10 }} name="fill" size={10} color="black" />
                    <Text style={{ fontSize: 24, paddingTop: 2, marginLeft: 5, color: color }}>{Math.floor((pot.currentAmount / pot.amount) * 100)}%</Text>
                </HStack>
            </View>
            <Divider />
            <View style={{ alignItems: 'center', right: 105, top: 5 }}>
                <HStack>
                    <Button onPress={onPressDetails} variant='link' small>
                        <Entypo name="link" size={24} color="black" />
                    </Button>
                </HStack>
            </View>
            <View style={{ alignItems: 'center', left: 100, bottom: 44 }}>
                <Button variant="link">
                    <MaterialCommunityIcons name="share-all" size={24} color="black" />
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 30,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        height: 290,
        width: 300,
        margin: 10, paddingTop: 10
    }
})

export default function PotCard({ pot }) {
    return (
        <Center >
            <CardComponent pot={pot} />
        </Center>
    );
}