import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import * as Colors from '../../../utils/colors'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const DeliveryAddress = ({ route }) => {
    const navigation = useNavigation()
    const [values, setValues] = useState([])

    useFocusEffect(useCallback(() => {
        fetchAddress()
    }, []))

    const fetchAddress = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const res = await axios.get(`${address}/api/getaddress/${userId}`)
        setValues(res?.data?.data?.deliveryAddress)
    }

    const handleSetActiveAddress = async (index) => {
        const userId = await AsyncStorage.getItem('userId')
        const res = await axios.post(`${address}/api/activeaddress`, { index, userId })
        if (res?.data?.success) {
            Alert.alert(res?.data?.message)
        } else {
            Alert.alert(res?.data?.message)
        }
    }

    const handleAddAddress = async () => {
        const userId = await AsyncStorage.getItem('userId')
        navigation.navigate('AddAddress', { userId: userId })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='My Addresses' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            {values?.map((item) => (
                                <View
                                    key={item?._id}
                                    style={{ width: '100%', gap: height * 0.03, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}>
                                    <View
                                        style={{ width: '100%', gap: height * 0.01 }}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{ color: Colors.fontColor, fontSize: width * 0.035, fontWeight: '600' }}
                                            >
                                                Province
                                            </Text>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                                Nueva Vizcaya
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{ color: Colors.fontColor, fontSize: width * 0.035, fontWeight: '600' }}
                                            >
                                                Municipality
                                            </Text>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                                {item?.municipality}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{ color: Colors.fontColor, fontSize: width * 0.035, fontWeight: '600' }}
                                            >
                                                Barangay
                                            </Text>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                                {item?.barangay}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: width * 0.03 }}>
                                        <TouchableOpacity
                                            onPress={() => handleSetActiveAddress(item?._id)}
                                            style={{ width: '100%', height: height * 0.04, borderRadius: height * 0.01, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                                Set as default
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}

                            <TouchableOpacity
                                onPress={handleAddAddress}
                                style={{ width: '100%', height: height * 0.05, borderRadius: height * 0.01, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                    Add address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default DeliveryAddress