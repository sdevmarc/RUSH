import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TextInput,
    Platform,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AddressModal from '../../../components/AddressModal'
import Context from '../../../components/Context'
import * as Colors from '../../../../utils/colors'

const { width, height } = Dimensions.get('window')

const ShopInformation = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [IsAddress, setIsAddress] = useState([]);
    const [values, setValues] = useState({
        shopImage: 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg',
        shopName: '',
        pickupAddress: {
            municipality: '',
            barangay: ''
        },
        email: '',
        mobileNumber: ''
    })

    const navigation = useNavigation()

    useEffect(() => {
        fetchAddress()
    }, [])

    const fetchAddress = async () => {
        const data = await axios.get('https://psgc.gitlab.io/api/provinces/025000000/municipalities')
        const sortedData = data.data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        })
        setIsAddress(sortedData);
    }

    const handleModal = (e, value) => {
        setIsModalOpen((prevValue) => ({
            ...prevValue,
            [e]: value
        }))
    }

    const handleOnChangeNames = (e, value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [e]: value
        }))
    }

    const handleOnChangeAddress = (e, value) => {
        setValues((prevValue) => ({
            ...prevValue,
            pickupAddress: {
                ...prevValue.pickupAddress,
                [e]: value
            }
        }))
    }

    const handleNext = async () => {
        // navigation.navigate('BusinessInformation')
        try {
            const dataShopInformation = JSON.stringify(values)
            const data = await AsyncStorage.setItem('shopInfo', dataShopInformation)
            navigation.navigate('BusinessInformation')
        } catch (error) {
            console.error(error)
        }
    }

    const removeData = async () => {
        await AsyncStorage.removeItem('shopInfo')
        console.log('Data removed successfully')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Shop Information' backgroundColor={Colors.backgroundColor} remove={() => removeData()} tintColor={Colors.fontColor} />
                <Context.Provider value={[IsModalOpen, setIsModalOpen]}>
                    <AddressModal onSelectMunicipality={(value) => handleOnChangeAddress('municipality', value)} />
                </Context.Provider>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>Shop Name</Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('shopName', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your shop name?'
                                />
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                    Pickup Address
                                </Text>
                            </View>
                            {Platform.OS === 'ios'
                                ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleModal('municipality', true)}
                                            style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                        >
                                            <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                                    Municipality
                                                </Text>
                                                <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                                    {values.pickupAddress.municipality}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </>
                                )
                                :
                                (
                                    <>
                                        <View style={{ width: '100%', gap: height * 0.01 }}>
                                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                                    Municipality
                                                </Text>
                                                <Picker
                                                    selectedValue={values.pickupAddress.municipality}
                                                    onValueChange={(value) => handleOnChangeAddress('municipality', value)}
                                                    mode='drop'
                                                    dropdownIconColor={'#000'}
                                                    dropdownIconRippleColor={'#d9d8d7'}
                                                    prompt='Select Municipality'
                                                    selectionColor={'#000'}
                                                    style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                                >
                                                    {
                                                        Platform.OS === 'android' && <Picker.Item color={Platform.OS === 'android' && '#000'} label="" value="" />
                                                    }
                                                    {
                                                        IsAddress.map((item) => (
                                                            <Picker.Item key={item.code} color={Platform.OS === 'android' && '#000'} label={item.name} value={item.name} />
                                                        ))
                                                    }

                                                </Picker>
                                            </View>
                                        </View>

                                    </>
                                )
                            }
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Barangay
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Where is your shop located?' />
                            </TouchableOpacity>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Email
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('email', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your email?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('mobileNumber', value)}
                                    style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your mobile number?' />
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