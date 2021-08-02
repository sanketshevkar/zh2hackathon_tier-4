import React from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, View, Button, Divider
} from "native-base";
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons';

function CardComponent(props) {
    return (
        <View style={styles.card}>
            <Text style={{ fontSize: 10, paddingBottom: 2, marginLeft: 15 }}>smallcase</Text>
            <Divider />
            <HStack style={{marginBottom: 20}}>
            <Avatar size='lg' style={{margin: 10}} source={{uri: "https://assets.smallcase.com/images/smallcases/160/SCET_0005.png"}}></Avatar>
            <View style={{alignItems: 'center', marginLeft: 20}}>
            <Text style={{ fontSize: 50 }} uppercase={true} >Growth</Text>
            <HStack>
            <Entypo style={{paddingTop: 10}} name="line-graph" size={10} color="black" />
            <Text style={{ fontSize: 20, paddingTop: 2, marginLeft: 5, color: 'green' }}>50%</Text>
            </HStack>
            </View>
            </HStack>
            <Divider />
            <View style={{ alignItems: 'center', right: 105, top: 5 }}>
                <HStack>
                    <Button variant='link' small>
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
        height: 190, 
        width: 330,
        margin: 10, paddingTop: 10
    }
})

export default function SmallCaseCard() {
    return (
        <Center flex={1}>
            <CardComponent />
        </Center>
    );
}