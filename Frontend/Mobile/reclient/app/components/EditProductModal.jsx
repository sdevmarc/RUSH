import {
    View,
    Dimensions,
    Text,
    ScrollView,
    Modal,
    TextInput,
    Alert,
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import * as Colors from '../../utils/colors'
import axios from 'axios'
import address from '../../config/host'
import Loading from './Loading'
import BottomBar from './BottomBar'
import Navbar from './Navbar'

const { width, height } = Dimensions.get('window')

export default function EditProductModal({ isVisible, onClose, data }) {
    const [isLoading, setIsLoading] = useState(false)
    const [details, setDetails] = useState({
        productName: '',
        productDescription: '',
        price: '',
        shippingFee: ''
    })

    useFocusEffect(useCallback(() => {
        fetchProductItem()
    }, []))

    const fetchProductItem = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${address}/api/selectproduct/${data}/false`)

            if (res?.data?.success) {
                setDetails((prev) => ({
                    ...prev,
                    productName: res?.data?.data?.productInformation?.productName,
                    productDescription: res?.data?.data?.productInformation?.productDescription,
                    price: res?.data?.data?.productInformation?.price,
                    shippingFee: res?.data?.data?.productInformation?.shippingFee
                }))
            }


        } catch (error) {
            console.error(`Error Selected Item: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateDetails = async () => {
        try {
            const { productName, productDescription, price, shippingFee } = details

            if (!productName || !productDescription || !price || !shippingFee) {
                Alert.alert('Error', 'Blank fields are not allowed!')
                fetchProductItem()
                return
            }

            setIsLoading(true)
            const productInformation = {
                productName,
                productDescription,
                price,
                shippingFee
            }
            const updateProduct = await axios.post(`${address}/api/updateproductdetails`, { productId: data, productInformation })

            console.log(updateProduct?.data)

            if (updateProduct?.data?.success) {
                Alert.alert('Success!', updateProduct?.data?.message)
                onClose()
            } else {
                Alert.alert('Error', updateProduct?.data?.message)
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOnChange = (e, value) => {
        setDetails((prev) => ({
            ...prev,
            [e]: value
        }))
    }

    return (
        <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <Navbar backgroundColor={Colors.backgroundColor} tintColor={Colors.black} title={'Edit Product'} />
                <ScrollView>
                    <View style={{ width: width, paddingTop: height * 0.13 }}>
                        <View style={{ width: '100%', gap: width * 0.03, paddingHorizontal: width * 0.03, paddingBottom: height * 0.2 }}>
                            <Text style={{ fontSize: width * 0.05, color: Colors.fontColor, fontFamily: 'Poppins-Regular' }}>
                                Product Details
                            </Text>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Product Name
                                </Text>
                                <TextInput
                                    value={details?.productName}
                                    onChangeText={(value) => handleOnChange('productName', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your display name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Product Description
                                </Text>
                                <TextInput
                                    value={details?.productDescription}
                                    onChangeText={(value) => handleOnChange('productDescription', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your display name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Price
                                </Text>
                                <TextInput
                                    value={details?.price}
                                    onChangeText={(value) => handleOnChange('price', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your display name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Shipping Fee
                                </Text>
                                <TextInput
                                    value={details?.shippingFee}
                                    onChangeText={(value) => handleOnChange('shippingFee', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your display name?' />
                            </View>
                        </View>
                    </View>
                </ScrollView >
            </View >
            <BottomBar title={`UPDATE`} redirect={handleUpdateDetails} />
        </Modal >
    )
}