import {
    View,
    Dimensions,
    Text,
    StatusBar,
    ScrollView,
    Image,
    Alert,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as Colors from '../../../utils/colors'
import Navbar from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'
import address from '../../../config/host'

const { width, height } = Dimensions.get('window')

export default function Summary({ route }) {
    const navigation = useNavigation()
    const [values, setValues] = useState({
        transaction: {
            user: '',
            address: '',
            shippingOption: '',
            paymentMethod: '',
            paymentDetails: ''
        },
        product: '',
        store: ''
    })
    const [isAccept, setAccept] = useState({
        transactionId: '',
        status: 'UNRETURNED'
    })

    useFocusEffect(useCallback(() => {
        fetchData()
    }, []))

    const fetchData = async () => {
        const { transactionId } = route.params
        const res = await axios.get(`http://${address}/api/viewselectedtransaction/${transactionId}`)

        if (res?.data?.data?.transaction) {
            setValues((prev) => ({
                ...prev,
                transaction: {
                    user: res?.data?.data?.user,
                    address: res?.data?.data?.transaction?.checkout?.deliveryAddress,
                    shippingOption: res?.data?.data?.transaction?.checkout?.shippingOption,
                    paymentMethod: res?.data?.data?.transaction?.checkout?.paymentMethod,
                    paymentDetails: res?.data?.data?.transaction?.checkout?.paymentDetails
                },
                product: res?.data?.data?.product,
                store: res?.data?.data?.store?.shopInformation
            }))
            setAccept((prev) => ({
                ...prev,
                transactionId: transactionId
            }))
        } else {
            Alert.alert(res?.data?.message)
        }
    }

    const handleAccept = async () => {
        const res = await axios.post(`http://${address}/api/updatetransactionstatus`, isAccept)

        if(res?.data?.success) {
            Alert.alert('You have accepted the order successfully!')
            navigation.navigate('StoreDashboard')
        } else {
            Alert.alert(res?.data?.message)
        }
    }
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Summary' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <View
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
                                        {values?.transaction?.user?.personalDetails?.lastname}, {values?.transaction?.user?.personalDetails?.firstname}, {values?.transaction?.user?.personalDetails?.middlename}
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }} numberOfLines={2} ellipsizeMode='tail'>
                                        {values?.transaction?.address?.barangay}, {values?.transaction?.address?.municipality}, Nueva Vizcaya
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                        {values?.transaction?.user?.contactno}
                                    </Text>
                                </View>
                            </View>
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
                                        source={{ uri: values?.product?.productInformation?.gallery[0].uri }}
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
                                            {values?.product?.productInformation?.productName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Store Name
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values?.store?.shopName}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Price
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            ₱ {values?.product?.productInformation?.price}.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
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
                                        {values?.transaction?.shippingOption}
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontSize: width * 0.03 }}>
                                        Make sure your delivery address is set to your correct location.
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between', flexDirection: 'row' }}
                            >
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                    Payment Method
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    {values?.transaction?.paymentMethod}
                                </Text>

                            </View>
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
                                            P {values?.transaction?.paymentDetails?.merchandiseSubTotal}.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Shipping Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P {values?.transaction?.paymentDetails?.shippingSubTotal}.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                </ScrollView >
                <BottomBar subtitle={`Total Payment`} suboutput={`P ${values?.transaction?.paymentDetails?.totalPayment}.00`} redirect={handleAccept} title={`Accept`} />
            </View >
        </>
    )
}