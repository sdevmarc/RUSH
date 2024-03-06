import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    Alert
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get("window")


const Login = () => {
    const router = useRouter()

    const handleSignUp = () => {
        router.replace('screens/intro/Register')
    }

    const handleLogin = () => {
        router.navigate('screens/Dashboard')
    }

    const handleSubmit = () => {
        Alert.alert('Success')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
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
                            <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Email or username' />
                        </View>
                        <View style={{ gap: 10 }}>
                            <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                Password
                            </Text>
                            <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
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
                        <TouchableOpacity style={{ height: height * 0.06, borderRadius: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderWidth: width * 0.005 }}>
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
