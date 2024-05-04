import {
    View,
    Dimensions,
    Text,
    StatusBar,
    Animated,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import axios from 'axios'
import address from '../../../config/host'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const SelectedItem = ({ route }) => {
    const [values, setValues] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        fetchProductItem()
    }, [])

    const fetchProductItem = async () => {
        const { id, shopName } = route.params
        console.log(shopName)
        const res = await axios.get(`http://${address}/api/selectproduct/${id}`)
        setValues(res.data.data)
    }

    const handleAddtoCart = () => {
        const { id, shopName } = route.params
        console.log(shopName)
        navigation.navigate('Cart', { id: id, shopName })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar backgroundColor='none' tintColor={Colors.black} />
                <ScrollView>
                    <View style={{ width: width, paddingTop: height * 0.09 }}>
                        <View style={{ width: '100%', height: height * 0.5, padding: height * 0.015, paddingTop: height * 0.04 }}>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: height * 0.04

                                }}
                            >
                                {values.productInformation && values.productInformation.gallery && (
                                    <Image
                                        source={{ uri: values.productInformation.gallery[0].uri }}
                                        resizeMode='cover'
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={{ width: '100%', height: height * 0.5, paddingHorizontal: width * 0.03, paddingBottom: height * 0.1, justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    {values.productInformation && values.productInformation.productName && (
                                        <Text style={{ width: width * 0.7, color: Colors.fontColor, fontWeight: 'bold', fontSize: width * 0.07, flexWrap: 'wrap' }} >
                                            {values.productInformation.productName}
                                        </Text>
                                    )}

                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: width * 0.02,
                                            paddingVertical: height * 0.0065,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#d7a152',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: Colors.whiteColor }}>
                                            Available
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: width * 0.04 }}>
                                        Shipping Availability
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: width * 0.03 }}>
                                        {values.productInformation && values.productInformation.shippingAvailability && (
                                            values.productInformation.shippingAvailability.map((item) => (
                                                <TouchableOpacity
                                                    key={item._id}
                                                    style={{
                                                        paddingHorizontal: width * 0.05,
                                                        paddingVertical: height * 0.0065,
                                                        borderRadius: height * 0.01,
                                                        backgroundColor: '#d7a152',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                    <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                                        {item.shippingName}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))
                                        )}

                                    </View>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: width * 0.04 }}>
                                        Description
                                    </Text>
                                    {values.productInformation && values.productInformation.productDescription && (
                                        <Text style={{ textAlign: 'justify', color: Colors.fontColor, fontSize: width * 0.03 }}>
                                            {values.productInformation.productDescription}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView >
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0, width: '100%',
                        height: height * 0.13,
                        backgroundColor: Colors.backgroundColor,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: height * 0.015,
                        paddingHorizontal: width * 0.03
                    }}>
                    <View
                        style={{
                            width: width * 0.3,
                            height: height * 0.06,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            borderRadius: height * 0.015
                        }}
                    >
                        <Text style={{ color: Colors.fontColor, fontWeight: '500', fontSize: width * 0.04 }}>
                            Price
                        </Text>
                        {values.productInformation && values.productInformation.productDescription && (
                            <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: width * 0.05 }}>
                                ₱ {values.productInformation.price}.00
                            </Text>
                        )}

                    </View>

                    <TouchableOpacity
                        onPress={handleAddtoCart}
                        style={{
                            width: width * 0.55,
                            height: height * 0.06,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#d7a152',
                            borderRadius: height * 0.02
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>
                            RENT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        </>
    )
}

export default SelectedItem