import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import * as Colors from '../../../../utils/colors'
import Navbar from '../../../components/Navbar'
import axios from 'axios'
import address from '../../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

export default function Unreturned() {
    const [values, setValues] = useState([])

    useFocusEffect(useCallback(() => {
        fetchUnreturned()
    }, []))

    const fetchUnreturned = async () => {
        const sellerId = await AsyncStorage.getItem('storeId')
        const res = await axios.get(`http:${address}/api/viewstatustransactions/${sellerId}/seller/UNRETURNED`)

        if (res?.data?.success) {
            setValues(res?.data?.data)
        } else {
            Alert.alert(res?.data?.message)
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Unreturned' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            {values?.map((item) => (
                                <View
                                    key={item?.transaction?._id}
                                    style={{ width: '100%', backgroundColor: Colors.idleColor, borderRadius: height * 0.01 }}>
                                    <View style={{ overflow: 'hidden', width: '100%', height: height * 0.27, padding: height * 0.01, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '100%', height: '70%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                                            <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: Colors.fontColor, borderRadius: height * 0.01 }}>
                                                <Image
                                                    source={{ uri: item?.product?.productInformation?.gallery[0]?.uri }}
                                                    resizeMode='cover'
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </View>
                                            <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.01 }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                        Product Name
                                                    </Text>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                        {item?.product?.productInformation?.productName}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                        Store Name
                                                    </Text>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                        {item?.store?.shopInformation?.shopName}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                        Price
                                                    </Text>
                                                    <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                        ₱ {item?.product?.productInformation?.price}.00
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', height: '30%', padding: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}>
                                                <Text
                                                    style={{ color: Colors.whiteColor, fontSize: height * 0.02 }}
                                                >
                                                    Returned
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}