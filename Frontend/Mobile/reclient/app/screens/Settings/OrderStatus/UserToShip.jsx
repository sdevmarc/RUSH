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
import * as Colors from '../../../../utils/colors'
import Navbar from '../../../components/Navbar'
import axios from 'axios'
import address from '../../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../../components/Loading'

const { width, height } = Dimensions.get('window')

export default function UserToShip() {
    const navigation = useNavigation()
    const [values, setValues] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(useCallback(() => {
        fetchPending()
    }, []))


    const fetchPending = async () => {
        try {
            setIsLoading(true)
            const userId = await AsyncStorage.getItem('userId')
            const res = await axios.get(`http:${address}/api/viewstatustransactions/${userId}/user/PENDING`)

            if (res?.data?.success) {
                setValues(res?.data?.data)
            } else {
                console.log(res?.data?.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateToCancelled = async (value) => {
        try {
            setIsLoading(true)

            const updateTransaction = await axios.post(`http://${address}/api/updatetransactionstatus`, { status: 'CANCELLED', transactionId: value })
            if (updateTransaction?.data?.success) {
                Alert.alert('Success!', 'The product has been cancelled!')
                navigation.goBack()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleViewOrder = (value) => {
        navigation.navigate('UserViewOrder', { transactionId: value })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <Navbar title='To Ship' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
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
                                            <TouchableOpacity 
                                            onPress={() => handleUpdateToCancelled(item?.transaction?._id)}
                                            style={{ width: '47%', height: '100%', backgroundColor: Colors.semiblack, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}>
                                                <Text
                                                    style={{ color: Colors.whiteColor, fontSize: height * 0.02 }}
                                                >
                                                    Cancel Order
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => handleViewOrder(item?.transaction?._id)}
                                                style={{ width: '47%', height: '100%', backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}>
                                                <Text
                                                    style={{ color: Colors.whiteColor, fontSize: height * 0.02 }}
                                                >
                                                    View Order
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