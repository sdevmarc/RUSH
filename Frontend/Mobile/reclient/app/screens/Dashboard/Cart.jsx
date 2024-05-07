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
import React, { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import * as Colors from '../../../utils/colors'
import BottomBar from '../../components/BottomBar'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Context from '../../components/Context'
import Modal from '../../components/Modal'

const ShippingOption = [
    { id: 1, name: 'Pickup' },
    { id: 2, name: 'Cash-on-delivery' }
]

const paymentOptions = [
    { id: 1, name: 'Gcash' },
    { id: 2, name: 'Debit Card' }
]

const { width, height } = Dimensions.get('window')

const Cart = ({ route }) => {
    const [IsModalOpen, setIsModalOpen] = useState({
        shippingOption: false,
        paymentMethod: false
    })
    const [shopName, setShopName] = useState('')
    const [values, setValues] = useState([])
    const [details, setDetails] = useState({
        personalDetails: '',
        activeAddress: '',
        contactno: ''
    })
    const [IsCheckout, setCheckout] = useState({
        userId: '',
        sellerId: '',
        productId: '',
        checkout: {
            deliveryAddress: {
                municipality: '',
                barangay: ''
            },
            shippingOption: '',
            paymentMethod: '',
            paymentDetails: {
                merchandiseSubTotal: '',
                shippingSubTotal: '',
                totalPayment: ''
            },
            status: 'PENDING'
        }
    })
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            fetchProductItem()
            fetchAddressDetails()
        }, []))

    const handleCheckout = async () => {
        const res = await axios.post(`http://${address}/api/createtransaction`, IsCheckout)
        if (res?.data?.success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SuccessfulCheckout' }]
            })
        } else {
            Alert.alert(res?.data?.message)
        }

        // navigation.replace('SuccessfulCheckout')
    }

    const fetchProductItem = async () => {
        const { id, shopName } = route.params
        const res = await axios.get(`http://${address}/api/selectproduct/${id}`)
        setValues(res?.data?.data)
        setShopName(shopName)

        const merchandiseSubTotal = parseFloat(res?.data?.data?.productInformation?.price)
        const shippingSubTotal = parseFloat(res?.data?.data?.productInformation?.shippingFee)
        const totalPayment = merchandiseSubTotal + shippingSubTotal
        setCheckout((prev) => ({
            ...prev,
            sellerId: res?.data?.data?.storeId,
            productId: res?.data?.data?._id,
            checkout: {
                ...prev?.checkout,
                paymentDetails: {
                    ...prev?.checkout?.paymentDetails,
                    merchandiseSubTotal: merchandiseSubTotal,
                    shippingSubTotal: shippingSubTotal,
                    totalPayment: totalPayment
                }
            }
        }))
    }

    const fetchAddressDetails = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId')
            const res = await axios.get(`http://${address}/api/getactiveaddress/${userId}`)

            if (res?.data?.success) {
                setDetails((prev) => ({
                    ...prev,
                    personalDetails: res?.data?.data?.personalDetails,
                    contactno: res?.data?.data?.contactno
                }))
                setCheckout((prev) => ({
                    ...prev,
                    userId: userId,
                    checkout: {
                        ...prev?.checkout,
                        deliveryAddress: {
                            ...prev?.checkout?.deliveryAddress,
                            municipality: res?.data?.data?.ActiveAddress?.municipality,
                            barangay: res?.data?.data?.ActiveAddress?.barangay
                        }
                    }
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
        navigation.navigate('Address')
    }

    const handleShippingOption = () => {
        setIsModalOpen({
            shippingOption: true
        })
        // navigation.navigate('ShippingOption')
    }

    const handlePaymentOption = () => {
        setIsModalOpen({
            paymentMethod: true
        })
        // navigation.navigate('PaymentOption')
    }

    const handleOnChangeArrayOption = (e, value) => {
        try {
            console.log(value)
            setCheckout((prev) => ({
                ...prev,
                checkout: {
                    ...prev.checkout,
                    [e]: value
                }
            }))
        } catch (error) {
            console.log('Error handle onchange error: ', error)
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Context.Provider value={{ IsModalOpen, setIsModalOpen }}>
                    <Modal title={`Shipping Option`} onSelectedValue={(item) => handleOnChangeArrayOption('shippingOption', item)} fetchedData={ShippingOption} modalId={`shippingOption`} />
                    <Modal title={`Payment Method`} onSelectedValue={(item) => handleOnChangeArrayOption('paymentMethod', item)} fetchedData={paymentOptions} modalId={`paymentMethod`} />
                </Context.Provider>
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
                                        {IsCheckout?.checkout?.deliveryAddress?.municipality
                                            ?
                                            (
                                                <>
                                                    {IsCheckout?.checkout?.deliveryAddress?.barangay}, {IsCheckout?.checkout?.deliveryAddress?.municipality}, Nueva Vizcaya
                                                </>
                                            )
                                            :
                                            ' Please set an active address.'
                                        }
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
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold', fontSize: height * 0.013 }}>
                                            Product Name
                                        </Text>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01, fontSize: height * 0.015 }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values?.productInformation?.productName}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold', fontSize: height * 0.013 }}>
                                            Store Name
                                        </Text>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01, fontSize: height * 0.015 }} numberOfLines={1} ellipsizeMode='tail'>
                                            {shopName}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold', fontSize: height * 0.013 }}>
                                            Price
                                        </Text>
                                        <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01, fontSize: height * 0.015 }} numberOfLines={1} ellipsizeMode='tail'>
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
                                        {IsCheckout?.checkout?.shippingOption
                                            ? IsCheckout?.checkout?.shippingOption
                                            : 'Please choose a shipping option.'
                                        }
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
                                    {IsCheckout?.checkout?.paymentMethod
                                        ? IsCheckout?.checkout?.paymentMethod
                                        : 'Choose payment method'
                                    }
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
                                            P {IsCheckout?.checkout?.paymentDetails?.merchandiseSubTotal}.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Shipping Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P {IsCheckout?.checkout?.paymentDetails?.shippingSubTotal}.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                </ScrollView >
                <BottomBar subtitle={`Total Payment`} suboutput={`P ${IsCheckout?.checkout?.paymentDetails?.totalPayment}.00`} redirect={handleCheckout} title={`Checkout`} />
            </View >
        </>
    )
}

export default Cart