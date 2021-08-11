import React from 'react'
import { Text, View, ScrollView } from 'react-native';
import FeedCard from  '../components/cards/FeedCard';

const Feed = () => {
    const items = [1, 2, 3, 4]
    return (
        <View>
            <ScrollView>
                {
                    items.map((i) => {
                        return (
                            <View key={i}>
                                <Text />
                                <FeedCard />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Feed
