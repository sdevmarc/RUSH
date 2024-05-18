import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import Navbar from '../../../components/Navbar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddressModal from '../../../components/AddressModal'
import Context from '../../../components//Context'
import * as Colors from '../../../../utils/colors'
import Loading from '../../../components/Loading'
import address from '../../../../config/host'

const { width, height } = Dimensions.get('window')

export default function EditAccountDetails({ route }) {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        userId: '',
        displayName: '',
        contactno: ''
    })

    useFocusEffect(useCallback(() => {
        fetchAccountDetails()
    }, []))

    const fetchAccountDetails = async () => {
        try {
            setIsLoading(true)
            const userId = await AsyncStorage.getItem('userId')
            const res = await axios.get(`http:${address}/api/getuser/${userId}`)

            setValues((prev) => ({
                ...prev,
                userId: userId,
                displayName: res?.data?.data?.displayName,
                contactno: res?.data?.data?.contactno
            }))
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateAccountDetails = async () => {
        try {
            const { userId, displayName, contactno } = values
            if (!userId || !displayName || !contactno) return Alert.alert('Error', 'Please fill-in the empty fields!')

            setIsLoading(true)
            const res = await axios.post(`http://${address}/api/updateaccountdetails`, values)

            if (res?.data?.success) {
                Alert.alert('Success', res?.data?.message)
                navigation.goBack()
            } else {
                res?.data?.message
                navigation.goBack()
            }

        } catch (error) {
            console.error(error)
        } finally {
            fetchAccountDetails()
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
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <Navbar title='Account Details' backgroundColor={Colors.backgroundColor} remove={() => removeData()} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Display Name
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChange('displayName', value)}
                                    value={values?.displayName}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your display name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChange('contactno', value)}
                                    value={values?.contactno}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your mobile number?' />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar title='UPDATE' redirect={handleUpdateAccountDetails} />
            </View>
        </>
    )
}