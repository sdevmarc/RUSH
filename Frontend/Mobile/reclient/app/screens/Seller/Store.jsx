import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons, Foundation, Feather, Entypo, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../../config/host'
import * as Colors from '../../../utils/colors'

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
        console.log('From Store: ', res.data.data._id)
        await AsyncStorage.setItem('storeId', res.data.data._id)
    }

    const handleToShip = () => {
        navigation.navigate('ToShip')
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
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                <ImageBackground source={{ uri: 'https://source.unsplash.com/photo-of-woman-holding-white-and-black-paper-bags-_3Q3tsJ01nc' }} style={{ width: '100%', height: height * 0.25, }} resizeMode='cover'>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }}>
                                Ekopineds
                            </Text>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.008, backgroundColor: Colors.orange }}>
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
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.02, gap: height * 0.01 }}>
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
                                    21
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Cancelled
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    4
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Unreturned
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    14
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Reviews
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    5
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: width * 0.03 }}>
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
                                <Text style={{ color: Colors.fontColor, fontWeight: '600' }}>
                                    Performance
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
                                <Feather name="help-circle" size={24} color="black" />
                                <Text style={{ color: Colors.fontColor, fontWeight: '600' }}>
                                    Help Center
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>

    )
}

export default Store