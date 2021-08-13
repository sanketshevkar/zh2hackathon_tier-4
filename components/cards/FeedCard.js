import React, { useState } from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, Button, useToast
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import PotCard from '../cards/PotCard'


function CardComponent({ user }) {
    const { likeCount, name, userName, feed, imageUrl } = user
    const [localLikeCount, setLocalLikeCount] = useState(likeCount)

    const {
        message,
        title,
        description,
        eta,
        amount,
        phoneNumber,
        autoDeduct,
        imageLink
    } = feed

    const pot = {
        title,
        description,
        eta,
        amount,
        phoneNumber,
        autoDeduct,
        imageUrl,
        currentAmount: amount
    }


    const toast = useToast();

    const onPressLike = () => {
        setLocalLikeCount(localLikeCount + 1)
    }

    const onPressBuy = () => {
        const reqBody = {
            title,
            description,
            eta,
            amount,
            phoneNumber,
            autoDeduct,
            imageLink,
        }
        fetch('http://13.233.146.7:8084/pot/create?forcedCreate=false', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqBody)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                const { value, days } = data;
                if (value === false) {
                    toast.show({
                        title: 'Pot creation failed! ',
                        placement: 'bottom',
                        // status: 'warning',
                    });
                } else {
                    fetch('http://13.233.146.7:8084/pot/create?forcedCreate=true', {
                        method: 'POST',
                        headers: {
                            // 'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reqBody)
                    }).then(response => console.log(response.status))
                    toast.show({
                        title: "Pot Created!",
                        placement: 'bottom',
                        // status: 'warning',
                    });
                }
            })
            .catch((e) => {
                console.log(e)
                toast.show({
                    title: 'Failed!',
                    placement: 'bottom',
                    // status: 'warning',
                });
            })
    }

    return (
        <Box
            bg="white"
            shadow={2}
            rounded="lg"
            width="95%"
        >
            <HStack>
                <Image
                    size="md"
                    borderRadius={100}
                    style={{ marginLeft: 10, marginTop: 10 }}
                    source={{
                        uri: imageLink,
                    }}
                    alt="https://pbs.twimg.com/profile_images/1309797238651060226/18cm6VhQ_400x400.jpg"
                >
                </Image>
                <Text color="#1DA1F2" style={{ marginTop: 40, marginLeft: 15, fontSize: 22 }}>{name}</Text></HStack>
            <Stack space={3} p={[4, 4, 8]} backgroundColor="#ffffff">
                <Text color="#1DA1F2" >{"@"}{userName}</Text>
                <PotCard pot={pot} />
                <HStack>

                    <Button onPress={onPressLike} size="md" variant="ghost"><AntDesign name="like1" size={25} color="black" /></Button>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 14 }}>{localLikeCount}{" likes"}</Text>
                    <Button onPress={onPressBuy} size="md" style={{ marginLeft: 60 }}>Add Pot</Button>
                </HStack>
            </Stack>
        </Box>
    );
}

export default function FeedCard({ user }) {
    return (
        <Center flex={1}>
            <CardComponent user={user} />
        </Center>
    );
}