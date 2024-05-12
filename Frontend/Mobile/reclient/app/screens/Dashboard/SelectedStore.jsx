import {
    Animated,
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const SelectedStore = ({ route }) => {
    const [shopName, setShopName] = useState('')
    const [values, setValues] = useState([])
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.22, height * 0.14],
        extrapolate: 'clamp',
    })

    const opacityTitle1 = scrollY.interpolate({
        inputRange: [0, height * 0.2 - height * 0.05],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
        inputRange: [0, height * 0.15 - height * 0.05],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    })

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const { userId, storeId } = route.params
        const token = await AsyncStorage.getItem('token')

        const getStoreName = await axios.get(`http://${address}/api/getstore/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const res = await axios.get(`http://${address}/api/getproducts/${storeId}`)
        setValues(res.data.data)
        setShopName(getStoreName?.data?.data?.shopInformation?.shopName)
    }

    const handleSelectItem = async (item) => {
        navigation.navigate('SelectedItem', { id: item, shopName: shopName })
    }

    const handleBack = async () => {
        navigation.goBack()
    }

    const handleMessage = () => {
        const { userId } = route.params
        navigation.navigate('ChatPerson', { authorId: userId, storeName: shopName })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Animated.View style={{ position: 'absolute', width: '100%', height: headerHeight, overflow: 'hidden', zIndex: 1 }}>
                    <BlurView
                        intensity={50}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: `${Platform.OS === 'android' ? '#313c47' : 'none'}`
                        }}
                        tint="dark"
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: height * 0.07,
                                width: '100%',
                                paddingHorizontal: width * 0.05,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 1
                            }}>
                            <TouchableOpacity onPress={handleBack}>
                                <Ionicons name="chevron-back-circle" size={width * 0.08} color="#dedede" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                {shopName && (
                                    <Text style={{ fontSize: width * 0.04, color: Colors.whiteColor, fontFamily: 'Poppins-Bold' }}>
                                        {shopName}
                                    </Text>
                                )}

                            </Animated.View>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View
                            style={{
                                opacity,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                paddingHorizontal: width * 0.05,
                                paddingVertical: height * 0.02,
                            }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                {shopName && (
                                    <Text style={{ width: '60%', flexWrap: 'wrap', fontSize: width * 0.045, color: Colors.whiteColor, fontWeight: '700', fontFamily: 'Poppins-Bold' }} numberOfLines={2} ellipsizeMode='tail' >
                                        {shopName}
                                    </Text>

                                )}
                                <View style={{ gap: height * 0.01 }}>
                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.003,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#d7a152',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                            Follow
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleMessage}
                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.003,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#4a4c59',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                            Message
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </BlurView>
                </Animated.View>
                <ScrollView
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                    scrollEventThrottle={16}
                >
                    <View style={{ width: '100%', gap: height * 0.022, paddingHorizontal: width * 0.03, paddingTop: height * 0.24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, paddingHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.05, color: Colors.fontColor, fontFamily: 'Poppins-Regular' }}>
                                Products
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {values.map((item) => (
                                <TouchableOpacity
                                    key={item._id}
                                    onPress={() => handleSelectItem(item._id)}
                                    style={{
                                        width: width * 0.452,
                                        height: height * 0.3,
                                        borderRadius: height * 0.02,
                                        backgroundColor: '#4a4c59'
                                    }}
                                >
                                    <View style={{ width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start', padding: width * 0.03 }}>
                                        <View style={{ overflow: 'hidden', width: '100%', height: '80%', backgroundColor: 'white', borderRadius: height * 0.01 }}>
                                            <Image
                                                source={{ uri: item.productInformation.gallery[0].uri }}
                                                resizeMode='cover'
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text style={{ width: '100%', color: Colors.whiteColor, fontSize: width * 0.04, fontFamily: 'Poppins-Regular', flexWrap: 'wrap' }} numberOfLines={1} ellipsizeMode='tail' >
                                                {item.productInformation.productName}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: Colors.whiteColor,
                                                    backgroundColor: '#d7a152',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03,
                                                    fontFamily: 'Poppins-Regular'
                                                }}
                                            >
                                                Available
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default SelectedStore