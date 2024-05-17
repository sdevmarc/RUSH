import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../components/Loading'

const { width, height } = Dimensions.get('window')

const Orders = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState({
        pending: '',
        cancelled: '',
        unreturned: '',
        review: '',
        completed: '',
        rating: ''
    })

    useFocusEffect(useCallback(() => {
        fetchOrderTransactions()
    }, []))

    const fetchOrderTransactions = async () => {
        try {
            setIsLoading(true)
            const userId = await AsyncStorage.getItem('userId')
            const res = await axios.get(`http://${address}/api/viewtransactions/${userId}/userId`)

            if (res?.data?.success) {
                setStatus((prev) => ({
                    ...prev,
                    pending: res?.data?.statusCount?.pending,
                    cancelled: res?.data?.statusCount?.cancelled,
                    unreturned: res?.data?.statusCount?.unreturned,
                    review: res?.data?.statusCount?.review,
                    completed: res?.data?.statusCount?.completed,
                    rating: res?.data?.statusCount?.rating
                }))
            } else {
                setStatus((prev) => ({
                    ...prev,
                    pending: '0',
                    cancelled: '0',
                    unreturned: '0',
                    completed: '0'
                }))
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    const handleToShip = () => {
        navigation.navigate('UserToShip')
    }

    const handleCancelled = () => {
        navigation.navigate('UserCancelled')
    }

    const handleToReturn = () => {
        navigation.navigate('UserToReturn')
    }

    const handleToReview = () => {
        navigation.navigate('UserToReview')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: height * 0.12,
                        zIndex: 1,
                        paddingVertical: height * 0.009,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: width * 0.05,
                            width: width,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            zIndex: 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleOpenDrawer}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: Colors.fontColor }}>
                            Orders
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Purchases
                            </Text>
                            <TouchableOpacity
                                onPress={handleToShip}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    To Ship
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {status?.pending}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCancelled}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Cancelled
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {status?.cancelled}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleToReturn}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    To Return
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {status?.unreturned}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleToReview}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    To Review
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {status?.rating}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Others
                            </Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: width * 0.03 }}>
                                <TouchableOpacity
                                    style={{
                                        width: width * 0.29,
                                        height: height * 0.13,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: Colors.idleColor,
                                        borderRadius: height * 0.02,
                                        gap: height * 0.01
                                    }}
                                >
                                    <Feather name="shopping-bag" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        My Likes
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        width: width * 0.29,
                                        height: height * 0.13,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: Colors.idleColor,
                                        borderRadius: height * 0.02,
                                        gap: height * 0.01
                                    }}
                                >
                                    <Ionicons name="analytics" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        Completed Orders
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}

export default Orders