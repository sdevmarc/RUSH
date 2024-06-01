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
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import { Checkbox } from 'expo-checkbox'
import { useRouter } from 'expo-router'
import axios from 'axios'
import address from '../../../config/host'

const { width, height } = Dimensions.get('window')

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        contactno: '',
        username: '',
        password: ''

    })
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isChecked, setChecked] = useState(false);
    const router = useRouter()

    const handleSignUp = async () => {
        try {
            if (values.name === '' || values.username === '' || values.password === '' || confirmPassword === '' || values.contactno === '') {
                Alert.alert('Warning', 'Please fill-in the required fields')
            } else {
                if (values.password === confirmPassword) {
                    if (isChecked) {
                        const res = await axios.post(`http://${address}/api/signup`, values)

                        if (res.data.success) {
                            router.replace('screens/intro/Successful')
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

    const handleOnChangeName = (value) => {
        setValues({ ...values, name: value })
    }

    const handleOnChangeContactNo = (value) => {
        setValues({ ...values, contactno: value })
    }

    const handleOnChangeUsername = (value) => {
        setValues({ ...values, username: value })
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

            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView >
                        <View style={{ width: width, height: height * 0.2, justifyContent: 'center' }}>
                            <Image source={Logo} style={{ width: width }} resizeMode='contain' />
                        </View>
                        <View style={{ width: width, marginHorizontal: width * 0.1 }}>
                            <Text style={{ fontSize: width * 0.09, fontWeight: 'bold' }}>
                                Sign Up!
                            </Text>
                            <Text style={{ fontSize: width * 0.03, color: '#8a8a8a' }}>
                                Create a new account
                            </Text>
                        </View>

                        <View style={{ marginHorizontal: width * 0.1, marginVertical: height * 0.02, gap: 10 }}>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Username
                                </Text>
                                <TextInput onChangeText={handleOnChangeUsername} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Username' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Full Name
                                </Text>
                                <TextInput onChangeText={handleOnChangeName} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Full Name' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput onChangeText={handleOnChangeContactNo} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Mobile Number' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Password
                                </Text>
                                <TextInput onChangeText={handleOnChangePassword} secureTextEntry={true} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
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
                            <TouchableOpacity onPress={handleSignUp} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', marginVertical: height * 0.01 }}>
                                <Text style={{ fontSize: width * 0.035, color: 'white', fontWeight: 'bold' }}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </>

    )
}

export default Register
