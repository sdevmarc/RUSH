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
    const [shopName, setShopName] = useState('')
    const [values, setValues] = useState([])

    useFocusEffect(useCallback(() => {
        fetchMessages()
    }, []))

    const fetchMessages = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const res = await axios.get(`http://${address}/api/getallmessages/${userId}`)

        // console.log(res?.data?.data)
        if (res?.data?.success) {
            setShopName(res?.data?.data?.shopName)
            setValues(res?.data?.data)
        } else {
            console.log(res?.data?.message)
        }
    }

    const handleChatPerson = async (value) => {
        navigation.navigate('ChatPerson', { messageId: value?._id, storeUserId: value?.shopUserId, shopName: value?.shopName })
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
                                            {item?.shopName}
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