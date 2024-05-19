import {
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    ImageBackground
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'
import Loading from '../../components/Loading';
import RNModal from '../../components/RNModal';

const { width, height } = Dimensions.get('window')

export default function VisitShop() {
    const [details, setDetails] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    const [values, setValues] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)
    const navigation = useNavigation()

    useFocusEffect(useCallback(() => {
        fetchProducts()
    }, []))

    const fetchProducts = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const storeId = await AsyncStorage.getItem('storeId')
            const token = await AsyncStorage.getItem('token')

            setIsLoading(true)
            const getStoreName = await axios.get(`http://${address}/api/getstore/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDetails(getStoreName?.data?.data)

            const res = await axios.get(`http://${address}/api/getproducts/${storeId}`)

            // if (res?.data?.data.length === 0 || getStoreName?.data?.data?.shopInformation?.shopImage) {
            //     setImageLoading(false)
            // }

            setValues(res?.data?.data)
        } catch (error) {
            console.log('Error', error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleSelectItem = async (item) => {
        navigation.navigate('SelectedItem', { id: item, shopName: values?.shopInformation?.shopName })
    }

    const handleBack = () => {
        navigation.goBack()
    }

    const handleOnClickEditShop = () => {
        setIsModalVisible(true)
    }

    const handleCloseModal = () => {
        setIsModalVisible(false)
        fetchProducts()
    }


    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <RNModal isVisible={isModalVisible} onClose={handleCloseModal} />
                <ImageBackground
                    source={{ uri: details?.shopInformation?.shopImage }}
                    style={{ width: '100%', height: height * 0.25, }}
                    resizeMode='cover'
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                >
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }} numberOfLines={2} ellipsizeMode='tail'>
                                {details?.shopInformation?.shopName}
                            </Text>
                            <View style={{ gap: height * 0.01 }}>
                                <TouchableOpacity
                                    onPress={handleOnClickEditShop}
                                    style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.006, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                        Edit Shop
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03 }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Rating 3.5
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
                                        borderRadius: height * 0.01,
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
                                                        <MaterialIcons name="star" size={24} color={Colors.whiteColor} />
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