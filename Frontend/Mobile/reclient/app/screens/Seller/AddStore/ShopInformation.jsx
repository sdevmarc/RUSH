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
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddressModal from '../../../components/AddressModal'
import Context from '../../../components/Context'

const { width, height } = Dimensions.get('window')

const ShopInformation = () => {
    const [IsPickupAddress, setIsPickupAddress] = useState('');
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [values, setValues] = useState({
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
        await axios.get('https://psgc.gitlab.io/api/provinces/025000000/municipalities')

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
        console.log(values)
    }

    const handleNext = async () => {
        navigation.navigate('BusinessInformation')

        // try {
        //     const dataShopInformation = JSON.stringify(values)
        //     await AsyncStorage.setItem('shopInfo', dataShopInformation)
        //     navigation.navigate('BusinessInformation')
        // } catch (error) {
        //     console.error(error)
        // }
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Shop Information' backgroundColor='#323d48' />
                <Context.Provider value={[IsModalOpen, setIsModalOpen]}>
                    <AddressModal title='municipality' onSelectMunicipality={(value) => handleOnChangeAddress('municipality', value)} />
                </Context.Provider>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Shop Name</Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('shopName', value)}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                    placeholder='What is your shop name?'
                                />
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                    Pickup Address
                                </Text>
                            </View>
                            {Platform.OS === 'ios'
                                ? (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => handleModal('municipality', true)}
                                            style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                        >
                                            <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                                    Municipality
                                                </Text>
                                                <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                                    {values.pickupAddress.municipality}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>

                                    </>
                                )
                                :
                                (
                                    <>
                                        <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.01 }}>
                                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                                <Text style={{ width: '50%', color: 'white', fontWeight: '500' }}>
                                                    Municipality
                                                </Text>
                                                <Picker
                                                    selectedValue={IsPickupAddress}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setIsPickupAddress(itemValue)
                                                    }}
                                                    mode='drop'
                                                    dropdownIconColor={'#000'}
                                                    dropdownIconRippleColor={'#d9d8d7'}
                                                    prompt='Select Municipality'
                                                    selectionColor={'#000'}
                                                    style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                                >
                                                    {
                                                        Platform.OS === 'ios' && <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="" value="" />
                                                    }
                                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Individual" value="Individual" />
                                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Business" value="Business" />
                                                </Picker>
                                            </View>

                                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                                <Text style={{ width: '50%', color: 'white', fontWeight: '500' }}>
                                                    Barangay
                                                </Text>
                                                <Picker
                                                    selectedValue={IsPickupAddress}
                                                    onValueChange={(itemValue, itemIndex) => {
                                                        setIsPickupAddress(itemValue)
                                                    }}
                                                    mode='drop'
                                                    dropdownIconColor={'#000'}
                                                    dropdownIconRippleColor={'#d9d8d7'}
                                                    prompt='Select Barangay'
                                                    selectionColor={'#000'}
                                                    style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                                >
                                                    {
                                                        Platform.OS === 'ios' && <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="" value="" />
                                                    }
                                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Individual" value="Individual" />
                                                    <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Business" value="Business" />
                                                </Picker>
                                            </View>
                                        </View>

                                    </>
                                )
                            }
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Barangay
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Where is your shop located?' />
                            </TouchableOpacity>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Email
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('email', value)}
                                    style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your email?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput
                                    onChangeText={(value) => handleOnChangeNames('mobileNumber', value)}
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