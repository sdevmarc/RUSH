import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Colors from '../../../utils/colors'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../../components/Navbar'

const { width, height } = Dimensions.get('window')

export default function Chat() {
    const navigation = useNavigation()
    const [values, setValues] = useState([])

    useFocusEffect(useCallback(() => {
        fetchMessages()
    }, []))

    const fetchMessages = async () => {
        const userId = await AsyncStorage.getItem('userId')

        const res = await axios.get(`http://${address}/api/getallmessages/${userId}`)
        // console.log(res?.data?.checkUsers)

        if (res?.data?.success) {
            setValues(res?.data?.checkUsers)
        } else {
            console.log(res?.data?.message)
        }
    }

    const handleChatPerson = (value) => {
        console.log('From Chat, authorId: ', value?.members?.user2)
        navigation.navigate('ChatPerson', { authorId: value?.members?.user2, storeName: value?.name })
    }
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Messages' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.09 }}>
                            {values?.map((item) => (
                                <TouchableOpacity
                                    key={item?._id}
                                    onPress={() => handleChatPerson(item)}
                                    style={{ width: '100%', height: height * 0.08, backgroundColor: Colors.idleColor, borderWidth: 1, borderColor: '#dddddd', padding: height * 0.01, justifyContent: 'center', alignItems: 'center', gap: height * 0.005 }}>
                                    <View style={{ width: '100%' }}>
                                        <Text
                                            style={{ width: '100%', color: Colors.fontColor, fontWeight: '600' }}
                                        >
                                            {item?.name}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', }}>
                                        <Text style={{ color: Colors.fontColor }}>
                                            {item?.messages[item?.messages.length - 1]?.body}
                                        </Text>
                                        <Text style={{ color: Colors.fontColor }}>
                                            {new Date(item?.messages[item?.messages.length - 1]?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}