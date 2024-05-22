import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'expo-checkbox'
import axios from 'axios'
import address from '../../../config/host'
import { useNavigation } from '@react-navigation/native'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const Register = () => {
    const navigation = useNavigation()
    const [isChecked, setChecked] = useState(false);
    const [values, setValues] = useState({
        displayName: '',
        contactno: '',
        username: '',
        password: '',
        UserType: 'Rentee',
        profilePhoto: 'https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg'
    })

    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSignUp = async () => {
        try {
            if (values.displayName === '' || values.username === '' || values.password === '' || confirmPassword === '' || values.contactno === '') {
                Alert.alert('Warning', 'Please fill-in the required fields')
            } else {
                if (values.password === confirmPassword) {
                    if (isChecked) {
                        const res = await axios.post(`http://${address}/api/signup`, values)

                        if (res.data.success) {
                            navigation.replace('SuccessfulLogin')
                        } else {
                            Alert.alert('Error', `${res.data.message}`)
                        }
                    } else {
                        Alert.alert('Warning', 'Please check the terms and agreement!')
                    }
                } else {
                    Alert.alert('Warning', 'Password do not match!')
                }
            }
        } catch (error) {
            Alert.alert(`Error`, `Register error: ${error}`)
        }
    }

    const handleGoBack = () => {
        navigation.replace('CreateOrLogin')
    }

    const handleOnChangeName = (value) => {
        setValues({ ...values, displayName: value })
    }

    const handleOnChangeContactNo = (value) => {
        setValues({ ...values, contactno: value })
    }

    const handleOnChangeUsername = (value) => {
        setValues({ ...values, username: value.toLocaleLowerCase() })
    }

    const handleOnChangePassword = (value) => {
        setValues({ ...values, password: value })
    }

    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value)
    }

    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{
                            width: width,
                            paddingHorizontal: width * 0.05,
                            paddingVertical: height * 0.05,
                            justifyContent: 'center',
                            gap: height * 0.05
                        }}>
                            <View style={{ width: '100%', paddingTop: height * 0.03 }}>
                                <Text style={{ fontSize: width * 0.06, fontWeight: 'bold' }}>
                                    Create an account
                                </Text>
                                <Text style={{ fontSize: width * 0.03, color: Colors.idleColor }}>
                                    Please fill out the fields.
                                </Text>
                            </View>
                            <View style={{ marginVertical: height * 0.005, gap: height * 0.02 }}>
                                <View style={{ gap: height * 0.01 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '600' }}>
                                        Username
                                    </Text>
                                    <TextInput onChangeText={handleOnChangeUsername} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Username' />
                                </View>
                                <View style={{ gap: height * 0.01 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '600' }}>
                                        Display Name
                                    </Text>
                                    <TextInput onChangeText={handleOnChangeName} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Display Name' />
                                </View>
                                <View style={{ gap: height * 0.01 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '600' }}>
                                        Mobile Number
                                    </Text>
                                    <TextInput onChangeText={handleOnChangeContactNo} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Mobile Number' />
                                </View>
                                <View style={{ gap: height * 0.01 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '600' }}>
                                        Password
                                    </Text>
                                    <TextInput onChangeText={handleOnChangePassword} secureTextEntry={true} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
                                </View>
                                <View style={{ gap: height * 0.01 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '600' }}>
                                        Confirm Password
                                    </Text>
                                    <TextInput onChangeText={handleOnChangeConfirmPassword} secureTextEntry={true} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Confirm Password' />
                                </View>
                                <View style={{ flexDirection: 'row', gap: width * 0.02, alignItems: 'center', paddingHorizontal: width * 0.03 }}>
                                    <Checkbox style={{ margin: 0 }} value={isChecked} onValueChange={setChecked} />
                                    <Text style={{ fontSize: width * 0.03, color: '#8a8a8a' }}>
                                        By creating an account you have to agree with our terms and conditions.
                                    </Text>
                                </View>
                                <View style={{ paddingVertical: height * 0.01, gap: height * 0.02 }}>
                                    <TouchableOpacity
                                        onPress={handleSignUp}
                                        style={{ width: '100%', height: height * 0.07, backgroundColor: '#E1793C', paddingHorizontal: width * 0.03, borderRadius: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: width * 0.04 }}>
                                            Create account
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleGoBack}
                                        style={{ width: '100%', height: height * 0.07, backgroundColor: '#EFEFEF', paddingHorizontal: width * 0.03, borderRadius: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'black', fontSize: width * 0.04 }}>
                                            Go Back
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </View >
        </>

    )
}

export default Register
