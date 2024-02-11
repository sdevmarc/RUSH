import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import {useRouter} from 'expo-router'

const Login = () => {
    const router = useRouter()

    const handleSignUp = () => {
        router.navigate('screens/intro/Register')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.imageView}>
                        <Image source={Logo} style={{ width: 100 }} resizeMode='contain' />
                    </View>

                    <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Welcome!</Text>
                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Please login or sign up to continue our app</Text>
                    </View>
                    <View style={styles.formView}>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Email / Username</Text>
                            <TextInput style={styles.formInput} placeholder='Email or username' />
                        </View>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Password</Text>
                            <TextInput style={styles.formInput} placeholder='Password' />
                        </View>

                    </View>
                    <View style={{ gap: 20 }}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.LoginTouchableStyle}>
                                <Text style={styles.LoginTouchableText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSignUp} style={styles.SignUpTouchableStyle}>
                                <Text style={styles.SignUpTouchableText}>Sign Up</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.FacebookTouchableStyle}>
                                <Text style={styles.FacebookTouchableText}>Continue with Facebook</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.GoogleTouchableStyle}>
                                <Text style={styles.GoogleTouchableText}>Continue with Google</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </>

    )
}

export default Login

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingVertical: 60,
        paddingHorizontal: 25
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    LoginTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111'
    },
    LoginTouchableText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    GoogleTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2
    },
    GoogleTouchableText: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 15
    },
    SignUpTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2
    },
    FacebookTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b5999'
    },
    FacebookTouchableText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    },
    SignUpTouchableText: {
        color: '#111',
        fontWeight: 'bold',
        fontSize: 15
    },
    formView: {
        alignItems: 'center',
        gap: 20
    },
    formInput: {
        width: 360,
        height: 50,
        backgroundColor: '#e8e8e8',
        borderRadius: 10,
        padding: 10
    },
    form: {
        gap: 5
    }
})