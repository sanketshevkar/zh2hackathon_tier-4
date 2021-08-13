import React, { useState, useEffect } from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, View, Divider, Button, useToast
} from "native-base";
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import DetailsModal from "../modals/DetailsModal";

function CardComponent({ pot, users, setUsers }) {
    const [detailmodalVisible, setDetailModalVisible] = useState(false);
    const [color, setColor] = useState("green")

    const toast = useToast();

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
    }, []);

    if (pot.imageLink) {
        imageLink = pot.imageLink
    } else {
        imageLink = "https://assets.smallcase.com/images/smallcases/160/WRTMO_0004.png"
    }

    const onPressDetails = () => {
        setDetailModalVisible(true)
    }

    const onPressShare = () => {
        const sharedCard = {
            userID: users.length + 1,
            name: "Sanket Shevkar",
            userName: "sanketshevkar",
            feed: {
                message: "Hello folks!! I completed my goal.",
                title: pot.title,
                description: pot.description,
                eta: pot.eta
            },
            likeCount: 0,
            imageLink: "https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg"
        }
        // UserList.push(sharedCard)
        setUsers([
            ...users,
            sharedCard
        ])
        toast.show({
            title: 'Post Shared!',
            placement: 'bottom',
            // status: 'success',
        })
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
                <Button variant="link" onPress={onPressShare}>
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

export default function PotCard({ pot, users, setUsers }) {
    return (
        <Center >
            <CardComponent pot={pot} users={users} setUsers={setUsers} />
        </Center>
    );
}