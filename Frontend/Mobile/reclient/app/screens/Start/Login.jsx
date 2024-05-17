import {
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
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import address from '../../../config/host'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get("window")

const Login = () => {
    const navigation = useNavigation()
    const passwordInputRef = useRef(null)
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
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

    const handleGoBack = () => {
        navigation.replace('CreateOrLogin')
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
            <View style={{ width: width, backgroundColor: Colors.backgroundColor, zIndex: 1 }}>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{
                            width: width,
                            paddingHorizontal: width * 0.05,
                            paddingVertical: height * 0.05,
                            justifyContent: 'center',
                            gap: height * 0.01
                        }}
                        >
                            <View style={{ width: '100%', height: height * 0.45, overflow: 'hidden', borderRadius: width * 0.07, marginTop: height * 0.03, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                                <ImageBackground source={{ uri: 'https://source.unsplash.com/two-person-shaking-hands-near-white-painted-wall-9cd8qOgeNIY' }} style={{ width: '100%', height: '100%', }} resizeMode='cover'>
                                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                        <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.045 }}>
                                            Rent-up and share!
                                        </Text>
                                        <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.09 }}>
                                            Login
                                        </Text>
                                    </View>

                                </ImageBackground>
                            </View>
                            <View style={{ paddingVertical: height * 0.01, gap: 10 }}>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '500', color: Colors.fontColor }}>
                                        Username
                                    </Text>
                                    <TextInput
                                        onChangeText={handleOnchangeUsername}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='Enter your username'
                                        returnKeyType='next'
                                        onSubmitEditing={() => {
                                            passwordInputRef.current.focus()
                                        }} />
                                </View>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: '500', color: Colors.fontColor }}>
                                        Password
                                    </Text>
                                    <TextInput
                                        onChangeText={handleOnchangePassword} secureTextEntry={true}
                                        style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }}
                                        placeholder='Enter your password'
                                        returnKeyType='go'
                                        onSubmitEditing={handleLogin} // Submit login when 'go' button is pressed
                                        ref={passwordInputRef} />
                                </View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: width * 0.03, fontWeight: '600', color: Colors.fontColor }}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ paddingVertical: height * 0.01, gap: height * 0.02 }}>
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    style={{ width: '100%', height: height * 0.07, backgroundColor: '#E1793C', paddingHorizontal: width * 0.03, borderRadius: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontSize: width * 0.04 }}>
                                        Login
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
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    )
}

export default Login
