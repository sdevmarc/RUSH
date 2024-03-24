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
    Button
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import { useRouter } from 'expo-router'
import axios from 'axios'
import address from '../../../config/host'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession()

const { width, height } = Dimensions.get("window")

const Login = () => {
    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest()

    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const router = useRouter()

    const handleLogin = async () => {
        try {
            if (values.username === '' || values.password === '') {
                Alert.alert('Warning', 'Please fill-in the required fields.')
            } else {
                const res = await axios.post(`http://${address}/api/login`, values)

                if (res.data.success) {
                    router.navigate('screens/Dashboard')
                } else {
                    Alert.alert('Error', `${res.data.message}`)
                }
            }
        } catch (error) {
            Alert.alert('Error', `Error sign up: ${error}`)
        }
    }

    const handleSignUp = () => {
        router.replace('screens/intro/Register')
    }

    const handleOnchangeUsername = (value) => {
        setValues({ ...values, username: value })
    }

    const handleOnchangePassword = (value) => {
        setValues({ ...values, password: value })
    }

    useEffect(() => {
        console.log(response)

        // if (response && response.type === 'success') {
        //     const { authentication: { accessToken } } = response;
        //     const fetchUser = async () => {
        //         try {
        //             const user = await fetchUserInfo(accessToken);
        //             console.log(user.family_name);
        //             // Alert.alert(user.family_name)
        //             // You may want to setUserInfo here

        //         } catch (error) {
        //             console.error("Error fetching user info:", error);
        //         }
        //     };
        //     fetchUser();
        // }
    }, [response])

    const AuthGoogle = async () => {
        if (response.type === 'success') {
            const { authentication: { accessToken } } = response;
            const fetchUser = async () => {
                try {
                    const user = await fetchUserInfo(accessToken);
                    console.log(user.family_name);
                    // Alert.alert(user.family_name)
                    // You may want to setUserInfo here

                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            };
            fetchUser();
        }

    }

    async function fetchUserInfo(token) {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        return await response.json();
    }

    const getUserInfo = async (token) => {
        if (!token) return
        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me',
                {
                    headers: { Authorization: `Bearer ${token}` }
                })

            const user = await response.json()
            await AsyncStorage.setItem("@user", JSON.stringify(user))
        } catch (error) {

        }

    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>


                <Text>Google Auth</Text>
                <Button title='Sign in with Google' onPress={() => promptAsync()} />
                <Button title='Delete local storage' onPress={() => AsyncStorage.removeItem("@user")} />



                <ScrollView>
                    <View style={{ width: width, height: height * 0.2, justifyContent: 'center' }}>
                        <Image source={Logo} style={{ width: width }} resizeMode='contain' />
                    </View>
                    <View style={{ width: width, marginHorizontal: width * 0.1 }}>
                        <Text style={{ fontSize: width * 0.09, fontWeight: 'bold' }}>
                            Welcome!
                        </Text>
                        <Text style={{ fontSize: width * 0.03, color: '#8a8a8a' }}>
                            Please login or sign up to continue our app
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: width * 0.1, marginVertical: height * 0.02, gap: 10 }}>
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
                    <View style={{ marginHorizontal: width * 0.1, marginVertical: height * 0.02, gap: 16 }}>
                        <TouchableOpacity onPress={handleLogin} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                            <Text style={{ fontSize: width * 0.035, color: 'white', fontWeight: 'bold' }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', fontSize: width * 0.03, fontWeight: 'bold' }}>-------------------- or --------------------</Text>
                        <TouchableOpacity onPress={handleSignUp} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: width * 0.005 }}>
                            <Text style={{ fontSize: width * 0.03, fontWeight: 'bold' }}>
                                Create Account
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={AuthGoogle} style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: width * 0.005 }}>
                            <Text style={{ fontSize: width * 0.03, fontWeight: 'bold' }}>
                                Continue with Google
                            </Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Login
