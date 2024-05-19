import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../../config/host'
import * as Colors from '../../../utils/colors'
import Loading from '../../components/Loading'

const { width, height } = Dimensions.get('window')

const Store = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState([])
    const [status, setStatus] = useState({
        pending: '',
        cancelled: '',
        unreturned: '',
        completed: '',
        rating: ''
    })

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const sellerId = await AsyncStorage.getItem('storeId')
            const userId = await AsyncStorage.getItem('userId')
            const token = await AsyncStorage.getItem('token')

            const getStore = await axios.get(`http://${address}/api/getstore/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (getStore?.data?.success) {
                await AsyncStorage.setItem('storeId', getStore.data.data._id)
                setValues(getStore?.data?.data)

                const getTransactions = await axios.get(`http://${address}/api/viewtransactions/${sellerId}/sellerId`)

                if (getTransactions?.data?.success) {
                    setStatus((prev) => ({
                        ...prev,
                        pending: getTransactions?.data?.statusCount?.pending,
                        cancelled: getTransactions?.data?.statusCount?.cancelled,
                        unreturned: getTransactions?.data?.statusCount?.unreturned,
                        completed: getTransactions?.data?.statusCount?.completed,
                        rating: getTransactions?.data?.statusCount?.rating
                    }))
                } else {
                    setStatus((prev) => ({
                        ...prev,
                        pending: '0',
                        cancelled: '0',
                        unreturned: '0',
                        completed: '0',
                        rating: '0'
                    }))
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleToShip = () => {
        navigation.navigate('ToShip')
    }

    const handleCancelled = () => {
        navigation.navigate('Cancelled')
    }

    const handleUnreturned = () => {
        navigation.navigate('Unreturned')
    }

    const handleReviews = () => {
        navigation.navigate('Reviews')
    }

    const handleProduct = () => {
        navigation.navigate('Products')
    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    const handleOnVisitShop = () => {
        navigation.navigate('VisitShop')
    }

    const handleHelpCenter = () => {
        navigation.navigate('CustomerService')
    }

    const handleCompleted = () => {
        navigation.navigate('Completed')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <ImageBackground source={{ uri: values?.shopInformation?.shopImage }} style={{ width: '100%', height: height * 0.25, }} resizeMode='cover'>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }} numberOfLines={2} ellipsizeMode='tail'>
                                {values?.shopInformation?.shopName}
                            </Text>
                            <TouchableOpacity
                                onPress={handleOnVisitShop}
                                style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.008, backgroundColor: Colors.orange }}
                            >
                                <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                    Visit Shop
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03 }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Rating 3.5
                            </Text>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Followers 30
                            </Text>
                        </View>

                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: height * 0.13,
                            overflow: 'hidden',
                            zIndex: 1,
                            paddingBottom: height * 0.009
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
                                onPress={() => handleOpenDrawer()}
                            >
                                <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingTop: height * 0.02, gap: height * 0.01, paddingBottom: height * 0.5 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Order Status
                            </Text>
                            <TouchableOpacity
                                onPress={handleToShip}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    To Ship
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {
                                        status?.pending && status?.pending
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCancelled}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Cancelled
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {
                                        status?.cancelled && status?.cancelled
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleUnreturned}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Unreturned
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {
                                        status?.unreturned && status?.unreturned
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleReviews}
                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Reviews
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    {
                                        status?.rating && status?.rating
                                    }
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Others
                            </Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: width * 0.03, flexWrap: 'wrap' }}>
                                <TouchableOpacity
                                    onPress={() => handleProduct()}
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
                                    <Text style={{ color: Colors.fontColor, fontWeight: '600' }}>
                                        Products
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleCompleted}
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
                                    <Text style={{ color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        Completed Orders
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleHelpCenter}
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
                                    <Feather name="help-circle" size={24} color="black" />
                                    <Text style={{ color: Colors.fontColor, fontWeight: '600' }}>
                                        Help Center
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default Store