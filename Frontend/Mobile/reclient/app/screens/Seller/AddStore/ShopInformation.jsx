import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native'
import React, { useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')

const ShopInformation = () => {
    const [values, setValues] = useState({
        shopName: '',
        pickupAddress: '',
        email: '',
        mobileNumber: ''
    })

    const navigation = useNavigation()

    const handleOnChangeShopName = (value) => {
        setValues({ ...values, shopName: value })
    }
    const handleOnChangePickupAddress = (value) => {
        setValues({ ...values, pickupAddress: value })
    }
    const handleOnChangeEmail = (value) => {
        setValues({ ...values, email: value })
    }
    const handleOnChangeMobileNumber = (value) => {
        setValues({ ...values, mobileNumber: value })
    }

    const handleNext = async () => {
        try {
            const dataShopInformation = JSON.stringify(values)
            await AsyncStorage.setItem('shopInfo', dataShopInformation)
            navigation.navigate('BusinessInformation')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Shop Information' backgroundColor='#323d48' />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Shop Name
                                </Text>
                                <TextInput
                                    onChangeText={handleOnChangeShopName}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your shop name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Pickup Address
                                </Text>
                                <TextInput
                                    onChangeText={handleOnChangePickupAddress}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Where is your shop located?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Email
                                </Text>
                                <TextInput
                                    onChangeText={handleOnChangeEmail}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your email?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    onChangeText={handleOnChangeMobileNumber}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your mobile number?' />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar title='Next' redirect={handleNext} />
            </View>
        </>
    )
}

export default ShopInformation