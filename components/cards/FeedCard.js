import React, { useState } from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading, Button,
} from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserList } from "../../UserList";

function CardComponent({ user }) {
    const { likeCount, imageLink, name, userName, feed } = user
    const [localLikeCount, setLocalLikeCount] = useState(likeCount)

    const onPressLike = () => {
        setLocalLikeCount(localLikeCount + 1)
    }

    return (
        <Box
            bg="white"
            shadow={2}
            rounded="lg"
            width="96%"
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
                <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
                    {feed.message}
                </Text>
                <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700" style={{fontWeight: "bold"}}>
                    {"Title"} - {feed.title}
                </Text>
                <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
                    {feed.description}
                </Text>
                <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
                    {feed.eta}
                </Text>
                <Button.Group >
                    <Button onPress={onPressLike} size="md" variant="ghost"><AntDesign name="like1" size={25} color="black" /></Button>
                    <Button onPress={onPressLike} size="md" variant="ghost"><Ionicons name="md-add-circle-sharp" size={30} color="black" /></Button>
                </Button.Group>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginRight: 100 }}>{localLikeCount}{" likes"}</Text>
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