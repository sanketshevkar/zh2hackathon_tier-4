import React from 'react'
import { Text, View, Image, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import CustomCard from './CustomCard'

const Feed = () => {
    const items = [1, 2, 3, 4]
    return (
        <View>
            <ScrollView>
                {
                    items.map((i) => {
                        return (
                            <CustomCard key={i} style={{marginTop: "2 rem"}}/>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default Feed
