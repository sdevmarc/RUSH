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
    KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import axios from 'axios'
import address from '../../../config/host'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")

const Login = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        navigation.replace('DrawerRoutes')

        // try {
        //     if (values.username === '' || values.password === '') {
        //         Alert.alert('Warning', 'Please fill-in the required fields.')
        //     } else {
        //         const res = await axios.post(`http://${address}/api/login`, values)

        //         if (res.data.success) {
        //             navigation.navigate('Dashboard')
        //         } else {
        //             Alert.alert('Error', `${res.data.message}`)
        //         }
        //     }
        // } catch (error) {
        //     Alert.alert('Error', `Error sign up: ${error}`)
        // }
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
            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding">
                    <ScrollView>
                        <View style={{ height: height, justifyContent: 'center', alignItems: 'flex-start', gap: height * 0.03, marginHorizontal: width * 0.1 }}>
                            <Image source={Logo} style={{ width: '100%' }} resizeMode='contain' />
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: width * 0.09, fontWeight: 'bold' }}>
                                    Welcome!
                                </Text>
                                <Text style={{ fontSize: width * 0.03, color: '#8a8a8a' }}>
                                    Please login or sign up to continue our app
                                </Text>
                            </View>
                            <View style={{ width: '100%', marginVertical: height * 0.02, gap: 10 }}>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                        Email / Username
                                    </Text>
                                    <TextInput onChangeText={handleOnchangeUsername} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Email or username' />
                                </View>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                        Password
                                    </Text>
                                    <TextInput onChangeText={handleOnchangePassword} secureTextEntry={true} style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
                                    <TouchableOpacity>
                                        <Text style={{ fontSize: width * 0.03, fontWeight: 'bold', color: '#666666' }}>
                                            Forgot Password?
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: '100%', marginVertical: height * 0.02, gap: 16 }}>
                                <TouchableOpacity onPress={handleLogin} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                                    <Text style={{ fontSize: width * 0.035, color: 'white', fontWeight: 'bold' }}>
                                        Login
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSignUp} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: width * 0.005 }}>
                                    <Text style={{ fontSize: width * 0.03, fontWeight: 'bold' }}>
                                        Create Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </>
    )
}

export default Login
