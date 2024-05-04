import {
    View,
    Dimensions,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import * as Colors from '../../../utils/colors'
import BottomBar from '../../components/BottomBar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window')

const Cart = ({ route }) => {
    const [shopName, setShopName] = useState('')
    const [values, setValues] = useState([])
    const [details, setDetails] = useState({
        personalDetails: '',
        activeAddress: '',
        contactno: ''
    })
    const navigation = useNavigation()

    useEffect(() => {
        fetchProductItem()
        fetchAddressDetails()
    }, [])

    const handleCheckout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'SuccessfulCheckout' }]
        })
        // navigation.replace('SuccessfulCheckout')
    }

    const fetchProductItem = async () => {
        const { id, shopName } = route.params
        const res = await axios.get(`http://${address}/api/selectproduct/${id}`)
        setValues(res.data.data)
        setShopName(shopName)
    }

    const fetchAddressDetails = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const res = await axios.get(`http://${address}/api/getactiveaddress/${userId}`)

            if (res?.data?.success) {
                setDetails((prev) => ({
                    ...prev,
                    personalDetails: res?.data?.data?.personalDetails,
                    activeAddress: res?.data?.data?.ActiveAddress,
                    contactno: res?.data?.data?.contactno
                }))
            } else {
                Alert.alert(res?.data?.message)
            }
        } catch (error) {
            console.error("Error fetching address details:", error);
            Alert.alert("Failed to fetch address details. Please try again later.");
        }

    }

    const handleAddress = () => {
        navigation.replace('Address')
    }

    const handleShippingOption = () => {
        navigation.navigate('ShippingOption')
    }

    const handlePaymentOption = () => {
        navigation.navigate('PaymentOption')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Checkout' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <TouchableOpacity
                                onPress={handleAddress}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Delivery Address
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                        {details?.personalDetails?.firstname} {details?.personalDetails?.middlename} {details?.personalDetails?.lastname}
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }} numberOfLines={2} ellipsizeMode='tail'>
                                        {details?.activeAddress?.barangay}, {details?.activeAddress?.municipality}, Nueva Vizcaya
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                        {details?.contactno}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: '100%',
                                    height: height * 0.17,
                                    borderRadius: height * 0.01,
                                    overflow: 'hidden',
                                    padding: height * 0.01,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: Colors.idleColor
                                }}
                            >
                                <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: Colors.fontColor, borderRadius: height * 0.01 }}>
                                    <Image
                                        source={{ uri: values?.productInformation?.gallery[0]?.uri }}
                                        resizeMode='cover'
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.01 }}>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Product Name
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values?.productInformation?.productName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Store Name
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            {shopName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Price
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            ₱ {values?.productInformation?.price}.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={handleShippingOption}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Shipping Option
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                        Delivery
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontSize: width * 0.03 }}>
                                        Make sure your delivery address is set to your correct location.
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handlePaymentOption}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between', flexDirection: 'row' }}
                            >
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                    Payment Method
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    Choose payment method
                                </Text>

                            </TouchableOpacity>
                            <View
                                style={{ width: '100%', justifyContent: 'center', gap: height * 0.01 }}
                            >
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>Payment Details</Text>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Merchandise Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P18.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Shipping Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P58.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                </ScrollView >
                <BottomBar subtitle={`Total Payment`} suboutput={`₱ 94.00`} redirect={handleCheckout} title={`Checkout`} />
            </View >
        </>
    )
}

export default Cart