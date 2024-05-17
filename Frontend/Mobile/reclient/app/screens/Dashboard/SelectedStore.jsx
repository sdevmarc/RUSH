import {
    Animated,
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform,
    Linking,
    Alert,
    ImageBackground
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'
import Loading from '../../components/Loading';

const { width, height } = Dimensions.get('window')

const SelectedStore = ({ route }) => {
    const [shopName, setShopName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
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

    useFocusEffect(useCallback(() => {
        fetchProducts()
    }, []))

    const fetchProducts = async () => {
        try {
            setIsLoading(true)
            const { userId, storeId } = route.params
            const token = await AsyncStorage.getItem('token')

            const getStoreName = await axios.get(`http://${address}/api/getstore/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMobileNumber(getStoreName?.data?.data?.shopInformation?.mobileNumber)

            const res = await axios.get(`http://${address}/api/getproducts/${storeId}`)

            if (res?.data?.data.length === 0) {
                setImageLoading(false)
            }

            setValues(res?.data?.data)
            setShopName(getStoreName?.data?.data?.shopInformation?.shopName)
        } catch (error) {
            console.log('Error', error);
        } finally {
            setIsLoading(false)
        }

    }

    const handleSelectItem = async (item) => {
        navigation.navigate('SelectedItem', { id: item, shopName: shopName })
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const handleMessage = async () => {
        const message = `Hi ${shopName}, I'd like to chat with you.`
        const phoneNumber = mobileNumber

        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

        const openMessage = await Linking.canOpenURL(url)
        if (openMessage) {
            return Linking.openURL(url)
        } else {
            Alert.alert('Error', 'Unable to open the messaging app.')
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <ImageBackground source={{ uri: 'https://source.unsplash.com/photo-of-woman-holding-white-and-black-paper-bags-_3Q3tsJ01nc' }} style={{ width: '100%', height: height * 0.25, }} resizeMode='cover'>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }} numberOfLines={2} ellipsizeMode='tail'>
                                {shopName}
                            </Text>
                            <View style={{ gap: height * 0.01 }}>
                                <TouchableOpacity style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.006, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                        Follow
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleMessage}
                                    style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.006, backgroundColor: Colors.idleColor, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                        Message
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
                                onPress={handleBack}
                            >
                                <Ionicons name="chevron-back-circle" size={width * 0.08} color="#dedede" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingTop: height * 0.02, gap: height * 0.01, paddingBottom: height * 0.5 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
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
                                        overflow: 'hidden',
                                        width: width * 0.452,
                                        height: height * 0.3,
                                        borderRadius: height * 0.02,
                                        backgroundColor: '#4a4c59'
                                    }}
                                >
                                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                        <ImageBackground
                                            source={{ uri: item?.productInformation?.gallery[0]?.uri }}
                                            resizeMode='cover'
                                            style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                                            onLoad={() => setImageLoading(false)}
                                            onError={() => setImageLoading(false)}
                                        >
                                            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.03, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }} numberOfLines={2} ellipsizeMode='tail'>
                                                        {item?.productInformation?.productName}
                                                    </Text>
                                                    <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }} numberOfLines={2} ellipsizeMode='tail'>
                                                        Rate
                                                    </Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
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