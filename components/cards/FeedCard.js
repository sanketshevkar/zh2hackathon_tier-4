import React from "react";
import {
    VStack, HStack, Avatar, Image, Text, NativeBaseProvider,
    AspectRatio, Center, Box, Stack, Heading
} from "native-base";

function CardComponent(props) {
    return (
        <Box
            bg="white"
            shadow={2}
            rounded="lg"
            maxWidth="96%"
        >
            <Image source={{ uri: "https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" }} alt="image base" resizeMode="cover" height={150} roundedTop="md" />
            <Text bold position="absolute" color="white" top={2} m={[4, 4, 8]}>
                NEWS
            </Text>
            <Stack space={3} p={[4, 4, 8]} backgroundColor="#ffffff">
                <Text color="gray.400">June 22, 2021</Text>
                <Heading size={["md", "lg", "md"]} noOfLines={2}>
                    The Stunning Dawki River in Meghalaya is So Clear That Boats Appear
                    Floating in Air
                </Heading>
                <Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
                    With lush green meadows, rivers clear as crystal, pine-covered
                    hills, gorgeous waterfalls, lakes and majestic forests, the
                    mesmerizing. Meghalaya is truly a Nature lover’s paradise…
                </Text>
            </Stack>
        </Box>
    );
}

export default function FeedCard() {
    return (
        <Center flex={1}>
            <CardComponent />
        </Center>
    );
}