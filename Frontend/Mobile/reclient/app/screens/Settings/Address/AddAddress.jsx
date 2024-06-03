import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TextInput,
    Platform,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Colors from '../../../../utils/colors'
import Navbar from '../../../components/Navbar'
import AddressModal from '../../../components/AddressModal'
import Context from '../../../components/Context'
import { Picker } from '@react-native-picker/picker'
import BottomBar from '../../../components/BottomBar'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const AddAddress = ({ route }) => {
    const navigation = useNavigation()
    const [IsModalOpen, setIsModalOpen] = useState(false)
    const [values, setValues] = useState({
        userId: '',
        personalDetails: {
            lastname: '',
            firstname: '',
            middlename: ''
        },
        deliveryAddress: []
    })

    useEffect(() => {
        fetchUserId()
    }, [])

    const fetchUserId = async () => {
        const { userId } = route.params
        setValues((prevValue) => ({
            ...prevValue,
            userId: userId
        }))
        setValues((prev) => ({
            ...prev,
            deliveryAddress: {
                ...prev?.deliveryAddress,
                isActive: 'inactive'
            }
        }))
    }

    const handleSubmit = async () => {
        const { personalDetails, deliveryAddress } = values
        const { lastname, firstname, middlename } = personalDetails

        if (!lastname || !firstname || !middlename || deliveryAddress.length <= 0) return Alert.alert('Error', "Please fill in the required field!")

        const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER}/api/addaddress`, values)

        if (res.data.success) {
            Alert.alert(res.data.message)
            navigation.goBack()
        } else {
            Alert.alert(res.data.message)
        }
    }

    const handleModalState = (value) => {
        setIsModalOpen((prevValue => !prevValue))
    }

    const handleOnChangeName = (e, value) => {
        setValues((prevValue) => ({
            ...prevValue,
            personalDetails: {
                ...prevValue?.personalDetails,
                [e]: value
            }
        }))
    }

    const handleOnChangeAddress = (e, value) => {
        setValues((prevValue) => ({
            ...prevValue,
            deliveryAddress: {
                ...prevValue?.deliveryAddress,
                [e]: value
            }
        }))
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Add Address' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <Context.Provider value={[IsModalOpen, setIsModalOpen]}>
                    <AddressModal onSelectMunicipality={(value) => handleOnChangeAddress('municipality', value)} />
                </Context.Provider>

                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: height * 0.02 }}>Personal Details</Text>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>Last Name</Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeName('lastname', value)}
                                        style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='What is your last name?'
                                    />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>First Name</Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeName('firstname', value)}
                                        style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='What is your first name?'
                                    />
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>Middle Name</Text>
                                    <TextInput
                                        onChangeText={(value) => handleOnChangeName('middlename', value)}
                                        style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='What is your middle name?'
                                    />
                                </View>
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: height * 0.02 }}>Delivery Address</Text>
                                <View style={{ width: '100%', gap: height * 0.01, paddingHorizontal: width * 0.01 }}>
                                    <View style={{ width: '100%', gap: height * 0.01 }}>
                                        <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>Municipality</Text>

                                        <>
                                            <TouchableOpacity
                                                onPress={() => handleModalState(true)}
                                                style={{ width: '100%', gap: height * 0.003, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                                            >
                                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                                        Municipality
                                                    </Text>
                                                    <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                                        {values?.deliveryAddress?.municipality ? values?.deliveryAddress?.municipality : 'Add Municipality'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                        </>

                                    </View>

                                    <View style={{ width: '100%', gap: height * 0.01 }}>
                                        <Text style={{ color: Colors.fontColor, fontWeight: '500' }}>Barangay</Text>
                                        <TextInput
                                            onChangeText={(value) => handleOnChangeAddress('barangay', value)}
                                            style={{ height: height * 0.06, backgroundColor: Colors.idleColor, borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                            placeholder='What is your barangay?'
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar title={`Submit`} redirect={handleSubmit} />
            </View >
        </>
    )
}

export default AddAddress