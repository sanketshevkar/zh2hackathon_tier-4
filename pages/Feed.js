import React from 'react'
import { useReducer } from 'react';
import { Text, View, ScrollView } from 'react-native';
import FeedCard from  '../components/cards/FeedCard';

const Feed = (props) => {
    const {users, setUsers, mobileNumber} = props
    // setUsers({
    //     users,
    // })
    return (
        <View>
            <ScrollView>
                {
                    users.map((user) => {
                        return (
                            <View key={user.userID}>
                                <Text />
                                <FeedCard user={user} mobileNumber={mobileNumber}/>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default Feed
