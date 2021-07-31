import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native';
import CustomCard from './CustomCard'

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
                                <CustomCard />
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Feed
