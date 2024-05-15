import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Pressable
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Colors from '../../../utils/colors'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Navbar from '../../components/Navbar'

const { width, height } = Dimensions.get('window')

export default function ChatPerson({ route }) {
    const [shopName, setShopName] = useState()
    const [IsMessageId, setMessageId] = useState()
    const [details, setDetails] = useState([])
    const [values, setValues] = useState({
        messageId: null,
        userId: [],
        body: ''
    })
    const scrollViewRef = useRef(null)

    useFocusEffect(useCallback(() => {
        fetchMessages()
    }, []))

    useEffect(() => {
        // refresh()
    }, [])

    const refresh = () => {
        const interval = setInterval(fetchMessages, 1000)
        return () => clearInterval(interval)
    }

    const fetchMessages = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const routevar = route.params

        console.log(routevar.messageId)
        const res = await axios.get(`http://${address}/api/receivemessage/${routevar.messageId}/${userId}/${routevar.storeUserId}`)
        console.log(res?.data?.data?._id)
        // setDetails(res?.data?.data?.messages)
        setValues((prev) => ({
            ...prev,
            messageId: res?.data?.data?._id,
            userId: userId
        }))
    }

    const sendMessage = async () => {
        const routevar = route.params
        await axios.post(`http://${address}/api/sendmessage`, { values, storeUserId: routevar.storeUserId })
        fetchMessages()
        setValues((prev) => ({
            ...prev,
            body: '',
        }))
    }

    const handleOnChange = (value) => {
        setValues((prev) => ({
            ...prev,
            body: value,
        }))
    }

    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false })
        }
    }

    const handleContentSizeChange = () => {
        scrollToBottom();
    }

    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                    <Navbar title={'shopName'} backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                    <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }} onContentSizeChange={handleContentSizeChange}>
                        <View style={{ width: width, paddingVertical: height * 0.03 }}>
                            <View style={{ width: '100%', paddingTop: height * 0.1, paddingHorizontal: width * 0.03, gap: height * 0.01 }}>
                                {/* {details.map((item) => (
                                    <TouchableOpacity
                                        key={item._id}
                                        style={[item?.authorId === values?.userId
                                            ? {
                                                maxWidth: "70%",
                                                minWidth: '30%',
                                                padding: height * 0.013,
                                                backgroundColor: '#007bff',
                                                alignSelf: 'flex-end',
                                                borderRadius: height * 0.02,
                                                justifyContent: 'space-between'
                                            }
                                            :
                                            {
                                                maxWidth: "70%",
                                                minWidth: '30%',
                                                padding: height * 0.013,
                                                backgroundColor: Colors.orange,
                                                alignSelf: 'flex-start',
                                                borderRadius: height * 0.02,
                                                justifyContent: 'space-between'
                                            }

                                        ]} >
                                        <Text
                                            style={{ color: Colors.whiteColor }}
                                        >
                                            {item?.body}
                                        </Text>
                                        <Text
                                            style={{ color: Colors.whiteColor, textAlign: 'right', fontSize: height * 0.013, marginTop: height * 0.01 }}
                                        >
                                            {formatTime(item?.timestamp)}
                                        </Text>
                                    </TouchableOpacity>
                                ))} */}
                            </View>
                        </View>
                    </ScrollView>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ width: '100%', padding: height * 0.01 }}
                    >
                        <View style={{ width: '100%', height: height * 0.07, flexDirection: "row", justifyContent: 'space-between', alignItems: "center", borderTopWidth: 1, borderTopColor: "#dddddd" }}>
                            <TextInput
                                value={values.body}
                                onChangeText={(value) => handleOnChange(value)}
                                style={{ width: '75%', height: '65%', borderWidth: 1, borderColor: "#dddddd", borderRadius: 20, paddingHorizontal: 10, }} placeholder="Type Your message..." />
                            <TouchableOpacity
                                onPress={sendMessage}
                                style={{ width: '20%', height: '65%', backgroundColor: "#007bff", borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </KeyboardAvoidingView>
                    <View style={{ position: 'fixed', bottom: 0, width: '100%', height: height * 0.06 }} />
                </View >
            </KeyboardAvoidingView >
        </>
    )
}