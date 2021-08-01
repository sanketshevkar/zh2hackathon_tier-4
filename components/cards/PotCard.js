import React from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, View
} from "native-base";

function CardComponent(props) {
    return (
        <View style={{borderRadius: 30, borderWidth: 1, margin: 10, height: 200, width: 300, paddingTop: 10}}>
        <View
            style={{alignItems: 'center'}}
        >
            <Text style={{fontSize: 75}}>50%</Text>
            <Text style={{fontSize: 25}}>Education</Text>
            </View>
            <View style={{alignItems: 'center', right: 100, top: 16}}>
            <HStack style={{borderRadius: 30, borderWidth: 1, padding: 5}}>
            <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 12}}>+1  </Text>
            </View>
            <Text>100</Text>
            </HStack>
            </View>
            <View style={{alignItems: 'center', left: 100, bottom: 18}}>
            <HStack style={{borderRadius: 30, borderWidth: 1, padding: 5}}>
            <Text>Share</Text>
            </HStack>
            </View>
        </View>
    );
}

export default function PotCard() {
    return (
        <Center flex={1}>
            <CardComponent />
        </Center>
    );
}