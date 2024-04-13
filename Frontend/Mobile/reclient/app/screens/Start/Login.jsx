import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    ImageBackground
} from 'react-native'
import React, { useState } from 'react'
import Logo from '../../../assets/LogoDark.png'
import axios from 'axios'
import address from '../../../config/host'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get("window")

const Login = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        // navigation.replace('DrawerRoutes')

        try {
            if (values.username === '' || values.password === '') {
                Alert.alert('Warning', 'Please fill-in the required fields.')
            } else {
                const res = await axios.post(`http://${address}/api/login`, values)

                if (res.data.success) {
                    await AsyncStorage.setItem('token', res.data.token)
                    await AsyncStorage.setItem('userId', res.data.userId)
                    navigation.replace('DrawerRoutes')
                } else {
                    Alert.alert('Error', `${res.data.message}`)
                }
            }
        } catch (error) {
            Alert.alert('Error', `Error sign up: ${error}`)
            console.log(error)
        }
    }

    const handleSignUp = () => {
        navigation.replace('Register')
    }

    const handleOnchangeUsername = (value) => {
        setValues({ ...values, username: value })
    }

    const handleOnchangePassword = (value) => {
        setValues({ ...values, password: value })
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <LinearGradient
                colors={[Colors.primaryColor, '#5b6063']}
                style={{ position: 'absolute', width: width, height: height }}
            />
            <View style={{ width: width, backgroundColor: 'transparent', zIndex: 1 }}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{
                            width: width,
                            height: height,
                            paddingHorizontal: width * 0.07,
                            justifyContent: 'center',
                            gap: height * 0.01
                        }}
                        >
                            <View style={{ width: '100%', justifyContent: 'center' }}>
                                <Text style={{ color: Colors.fontColor, fontWeight: 'bold', fontSize: height * 0.05 }}>
                                    Welcome!
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontWeight: '500', fontSize: height * 0.015 }}>
                                    Please login or sign up to continue our app
                                </Text>
                            </View>

                            <View style={{ paddingVertical: height * 0.02, gap: 10 }}>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: 'bold', color: Colors.whiteColor }}>
                                        Email / Username
                                    </Text>
                                    <TextInput onChangeText={handleOnchangeUsername} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Email or username' />
                                </View>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: 'bold', color: Colors.whiteColor }}>
                                        Password
                                    </Text>
                                    <TextInput onChangeText={handleOnchangePassword} secureTextEntry={true} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: width * 0.03, fontWeight: 'bold', color: Colors.idleColor }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingVertical: height * 0.03, gap: height * 0.016 }}>
                                <TouchableOpacity onPress={handleLogin} style={{ height: height * 0.06, borderRadius: height * 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.accent }}>
                                    <Text style={{ fontSize: width * 0.035, color: 'white', fontWeight: 'bold' }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSignUp} style={{ height: height * 0.06, borderRadius: height * 0.1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                                    <Text style={{ fontSize: width * 0.03, fontWeight: 'bold' }}>
                                        Create Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}

export default Login
