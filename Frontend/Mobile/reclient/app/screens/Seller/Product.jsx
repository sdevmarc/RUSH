import {
    View,
    Text,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import { MaterialIcons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../components/Loading'

const { width, height } = Dimensions.get('window')

const Product = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [isSearch, setSearch] = useState([])

    useFocusEffect(useCallback(() => {
        fetchUserProducts()
    }, []))

    const fetchUserProducts = async () => {
        try {
            setIsLoading(true)
            const storeId = await AsyncStorage.getItem('storeId')

            const res = await axios.get(`http://${address}/api/getproducts/${storeId}`)
            console.log(res?.data)
            if (res?.data?.data.length > 0) {
                setProducts(res?.data?.data)
            } else {
                setProducts([])
                setImageLoading(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnPressAddProduct = () => {
        navigation.navigate('AddProduct')
    }

    const handleViewProduct = (value) => {
        navigation.navigate('SellerViewProduct', { id: value })
    }

    const handleOnChangeSearch = async (value) => {
        const storeId = await AsyncStorage.getItem('storeId')

        if (!value) {
            fetchUserProducts()
            setSearch([])
        } else {
            const res = await axios.get(`http://${address}/api/searchproduct/${storeId}/${value}`)
            setSearch(res?.data?.data)
        }

    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <Navbar title='Products' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <TextInput
                                onChangeText={(value) => handleOnChangeSearch(value)}
                                style={{ width: '100%', height: height * 0.06, paddingHorizontal: width * 0.03, borderRadius: height * 0.02, backgroundColor: Colors.idleColor }} placeholder='Search products here...' />
                            <TouchableOpacity
                                onPress={handleOnPressAddProduct}
                                style={{
                                    width: '100%',
                                    height: height * 0.06,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: Colors.orange,
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                    Add Product
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>

                            <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {
                                    isSearch.length > 0 ? (
                                        isSearch?.map((item) => (
                                            <TouchableOpacity
                                                key={item._id}
                                                onPress={() => handleViewProduct(item?._id)}
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
                                                                    Rate
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        products?.map((item) => (
                                            <TouchableOpacity
                                                key={item._id}
                                                onPress={() => handleViewProduct(item?._id)}
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
                                                                    Rate
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </ImageBackground>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}

export default Product