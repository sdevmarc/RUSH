import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as Colors from '../../../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../components/Loading'
import Navbar from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'
import axios from 'axios'
import address from '../../../config/host'

const { width, height } = Dimensions.get('window')

export default function Report() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        subject: '',
        concern: ''
    })

    const handleSubmit = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const { subject, concern } = values

            if (!subject || !concern) {
                return Alert.alert('Error', 'Please fill-up the required fields!')
            }

            setIsLoading(true)

            const res = await axios.post(`${address}/api/addreport`, { userId, values })

            if (res?.data?.success) {
                Alert.alert('Success', res?.data?.message)
                navigation.goBack()
            } else {
                console.log(res?.data?.message)
                navigation.goBack()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

    }

    const handleOnChange = (e, value) => {
        setValues((prev) => ({
            ...prev,
            [e]: value
        }))
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <Navbar title='Report' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView>
                        <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: height * 0.02 }}>
                                    Fill-up the required fields
                                </Text>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>
                                        Subject
                                    </Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChange('subject', value)}
                                        style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='What is your last name?'
                                    />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>
                                        Message
                                    </Text>
                                    <View style={{ width: '100%', height: '50%', backgroundColor: Colors.idleColor, borderRadius: height * 0.01 }}>
                                        <TextInput
                                            style={{ width: '100%', height: '100%', padding: height * 0.01, color: Colors.fontColor }}
                                            placeholder='Enter your comment here...'
                                            multiline={true}
                                            numberOfLines={4}
                                            value={values?.concern}
                                            onChangeText={(value) => handleOnChange('concern', value)}
                                            returnKeyType="done"
                                            onSubmitEditing={Keyboard.dismiss}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView >
                </TouchableWithoutFeedback>
                <BottomBar title={`SUBMIT`} redirect={handleSubmit} />
            </View >
        </>
    )
}