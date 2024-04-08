import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../../config/host'

const { width, height } = Dimensions.get('window')

const Store = () => {
    const navigation = useNavigation()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const token = await AsyncStorage.getItem('token')

        const res = await axios.get(`http://${address}/api/getstore/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        await AsyncStorage.setItem('storeId', res.data._id)
    }

    const handleProduct = () => {
        navigation.navigate('Products')
    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: height * 0.12,
                        overflow: 'hidden',
                        zIndex: 1,
                        backgroundColor: '#323d48',
                        paddingVertical: height * 0.009
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
                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white' }}>
                            Renters Dashboard
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13 }}>
                        <View style={{ width: '100%', height: '60%', gap: height * 0.01 }}>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Manage Store Details
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleProduct()}
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Manage Products
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    height: '10%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Manage Orders
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default Store