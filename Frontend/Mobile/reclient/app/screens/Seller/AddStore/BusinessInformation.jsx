import {
    View,
    Text,
    ScrollView,
    Dimensions,
    StatusBar,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Alert
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import * as Colors from '../../../../utils/colors'

const { width, height } = Dimensions.get('window')

const BusinessInformation = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState({
        userId: '',
        shopInformation: {
            shopImage: '',
            shopName: '',
            pickupAddress: '',
            email: '',
            mobileNumber: ''
        },
        businessInformation: {
            sellerType: '',
            registeredName: {
                lastname: '',
                firstname: '',
                middlename: ''
            },
            registeredAddress: {
                city: 'South Luzon',
                province: 'Nueva Vizcaya',
                municipality: '',
                barangay: ''
            },
            taxIdentificationNumber: {
                taxNumber: '',
                certificateOfRegistration: '',
                businessName: ''
            }
        },
        termsAndConditions: false

    })
    const [IsSellerType, setIsSellerType] = useState('');
    const [IsTin, setIsTin] = useState('No');
    const [IsAgree, setIsAgree] = useState(false);
    const [IsToken, setToken] = useState('')

    useEffect(() => {
        fetchShopInfo()
    }, [])

    const pickerRef = useRef();

    function open() {
        pickerRef.current.focus();
    }

    function close() {
        pickerRef.current.blur();
    }

    const handleSubmit = async () => {
        try {
            const data = await axios.post(`${process.env.EXPO_PUBLIC_SERVER}/api/addstore`, values, {
                headers: {
                    Authorization: `Bearer ${IsToken}`
                }
            })

            if (data.data.success) {
                Alert.alert(data.data.message)
                removeData()
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DrawerRoutes' }]

                })
            } else {
                Alert.alert(data.data.message)
                removeData()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchShopInfo = async () => {
        try {
            const shopData = JSON.parse(await AsyncStorage.getItem('shopInfo'))
            const token = await AsyncStorage.getItem('token')
            const userId = await AsyncStorage.getItem('userId')

            setToken(token)
            setValues({
                ...values,
                userId: userId,
                shopInformation: {
                    shopImage: shopData.shopImage,
                    shopName: shopData.shopName,
                    pickupAddress: shopData.pickupAddress,
                    email: shopData.email,
                    mobileNumber: shopData.mobileNumber
                }
            })
        } catch (error) {
            console.error(`Error fetch Shop Info for IOS: ${error}`)
        }
    }


    const removeData = async () => {
        await AsyncStorage.removeItem('shopInfo')
        console.log('Data removed successfully')
    }

    const handleSellerType = (value) => {
        setValues(prevValues => ({
            ...prevValues,
            businessInformation: {
                ...prevValues.sellerType,
                sellerType: value
            }
        }))
    }

    const handleRegisteredName = (field, value) => {
        setValues(prevValues => ({
            ...prevValues,
            businessInformation: {
                ...prevValues.businessInformation,
                registeredName: {
                    ...prevValues.businessInformation.registeredName,
                    [field]: value
                }
            }
        }))
    }

    const handleRegisteredAddress = (field, value) => {
        setValues(prevValues => ({
            ...prevValues,
            businessInformation: {
                ...prevValues.businessInformation,
                registeredAddress: {
                    ...prevValues.businessInformation.registeredAddress,
                    [field]: value
                }
            }
        }))
    }

    const handleRegisteredTIN = (field, value) => {
        setValues(prevValues => ({
            ...prevValues,
            businessInformation: {
                ...prevValues.businessInformation,
                taxIdentificationNumber: {
                    ...prevValues.businessInformation.taxIdentificationNumber,
                    [field]: value
                }
            }
        }))
    }

    const handleTermsAndConditions = (value) => {
        setValues({
            ...values,
            termsAndConditions: value
        })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Business Information' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                            <View style={{ width: '100%', paddingTop: height * 0.1, paddingBottom: height * 0.2, gap: height * 0.03 }}>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        Seller Type
                                    </Text>
                                    <Picker
                                        selectedValue={IsSellerType}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setIsSellerType(itemValue)
                                            handleSellerType(itemValue)
                                        }}
                                        mode='drop'
                                        dropdownIconColor={'#000'}
                                        dropdownIconRippleColor={'#d9d8d7'}
                                        prompt='Select Business Type'
                                        selectionColor={'#000'}
                                        style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                    >
                                        {
                                            Platform.OS === 'android'
                                                ? null
                                                : <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="" value="" />
                                        }

                                        <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Individual" value="Individual" />
                                        <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Business" value="Business" />
                                    </Picker>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        REGISTERED NAME
                                    </Text>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Last Name
                                        </Text>
                                        <TextInput
                                            onChangeText={(value) => handleRegisteredName('lastname', value)}
                                            style={{
                                                height: height * 0.06,
                                                backgroundColor: '#e8e8e8',
                                                borderRadius: 10,
                                                paddingHorizontal: width * 0.05,
                                                fontSize: width * 0.035
                                            }}
                                            placeholder='What is your last name?'
                                        />
                                    </View>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            First Name
                                        </Text>
                                        <TextInput
                                            onChangeText={(value) => handleRegisteredName('firstname', value)}
                                            style={{
                                                height: height * 0.06,
                                                backgroundColor: '#e8e8e8',
                                                borderRadius: 10,
                                                paddingHorizontal: width * 0.05,
                                                fontSize: width * 0.035
                                            }}
                                            placeholder='What is your first name?'
                                        />
                                    </View>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Middle Name
                                        </Text>
                                        <TextInput
                                            onChangeText={(value) => handleRegisteredName('middlename', value)}
                                            style={{
                                                height: height * 0.06,
                                                backgroundColor: '#e8e8e8',
                                                borderRadius: 10,
                                                paddingHorizontal: width * 0.05,
                                                fontSize: width * 0.035
                                            }}
                                            placeholder='What is your middle name?'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        REGISTERED ADDRESS
                                    </Text>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Municipality
                                        </Text>
                                        <TextInput
                                            onChangeText={(value) => handleRegisteredAddress('municipality', value)}
                                            style={{
                                                height: height * 0.06,
                                                backgroundColor: '#e8e8e8',
                                                borderRadius: 10,
                                                paddingHorizontal: width * 0.05,
                                                fontSize: width * 0.035
                                            }}
                                            placeholder='What is your municipality?'
                                        />
                                    </View>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Barangay
                                        </Text>
                                        <TextInput
                                            onChangeText={(value) => handleRegisteredAddress('barangay', value)}
                                            style={{
                                                height: height * 0.06,
                                                backgroundColor: '#e8e8e8',
                                                borderRadius: 10,
                                                paddingHorizontal: width * 0.05,
                                                fontSize: width * 0.035
                                            }}
                                            placeholder='What is your barangay?'
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: 'bold' }}>
                                        TAXPAYER IDENTIFICATION NUMBER (TIN)
                                    </Text>
                                    <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Do you have a Taxpayer Identifation Number?
                                        </Text>
                                        <Picker
                                            selectedValue={IsTin}
                                            onValueChange={(itemValue, itemIndex) => setIsTin(itemValue)}
                                            mode='drop'
                                            dropdownIconColor={'#000'}
                                            dropdownIconRippleColor={'#d9d8d7'}
                                            selectionColor={'#000'}
                                            style={{ backgroundColor: '#d9d8d7', color: '#000', borderRadius: height * 0.01 }}
                                        >
                                            <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="No" value='No' />
                                            <Picker.Item color={Platform.OS === 'android' ? '#000' : '#000'} label="Yes" value='Yes' />
                                        </Picker>
                                    </View>
                                </View>
                                {IsTin === 'Yes'
                                    ? <View style={{ width: '100%', gap: height * 0.01 }}>
                                        <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                                Input 9 digit Taxpayer Identification Number (TIN)
                                            </Text>
                                            <TextInput
                                                onChangeText={(value) => handleRegisteredTIN('taxNumber', value)}
                                                style={{
                                                    height: height * 0.06,
                                                    backgroundColor: '#e8e8e8',
                                                    borderRadius: 10,
                                                    paddingHorizontal: width * 0.05,
                                                    fontSize: width * 0.035
                                                }}
                                                placeholder='Type your TIN here...'
                                            />
                                        </View>
                                        <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                                Upload Image Certification of Registration
                                            </Text>
                                            <TextInput
                                                onChangeText={(value) => handleRegisteredTIN('certificateOfRegistration', value)}
                                                style={{
                                                    height: height * 0.06,
                                                    backgroundColor: '#e8e8e8',
                                                    borderRadius: 10,
                                                    paddingHorizontal: width * 0.05,
                                                    fontSize: width * 0.035
                                                }}
                                                placeholder='Temporary, will fix soon'
                                            />
                                        </View>
                                        <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.03 }}>
                                            <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                                Business Name/ Style
                                            </Text>
                                            <TextInput
                                                onChangeText={(value) => handleRegisteredTIN('businessName', value)}
                                                style={{
                                                    height: height * 0.06,
                                                    backgroundColor: '#e8e8e8',
                                                    borderRadius: 10,
                                                    paddingHorizontal: width * 0.05,
                                                    fontSize: width * 0.035
                                                }}
                                                placeholder='What is your business name?'
                                            />
                                        </View>
                                    </View>
                                    : null}

                                <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.02, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.03 }}>
                                    <Checkbox style={{ margin: 0, backgroundColor: Colors.whiteColor }} value={IsAgree} onValueChange={(value) => {
                                        setIsAgree(value)
                                        handleTermsAndConditions(value)
                                    }} />
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                        AGREE TO TERMS AND CONDITIONS.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BottomBar title='Submit' redirect={handleSubmit} />
            </View >
        </>
    )
}

export default BusinessInformation


