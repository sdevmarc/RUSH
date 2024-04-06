import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TextInput,
    Platform,
    TouchableOpacity,
    Image,
    Button
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
import * as ImagePicker from 'expo-image-picker'


const { width, height } = Dimensions.get('window')

const ShopInformation = () => {
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [IsAddress, setIsAddress] = useState([]);
    const [values, setValues] = useState({
        shopImage: 'https://cdn-icons-png.freepik.com/512/407/407861.png',
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
            await AsyncStorage.setItem('shopInfo', dataShopInformation)
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
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Shop Information' backgroundColor='#323d48' remove={() => removeData()} />
                <Context.Provider value={[IsModalOpen, setIsModalOpen]}>
                    <AddressModal onSelectMunicipality={(value) => handleOnChangeAddress('municipality', value)} />
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