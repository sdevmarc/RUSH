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
    KeyboardAvoidingView
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import { Checkbox } from 'expo-checkbox'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')

const Register = () => {
    const [isChecked, setChecked] = useState(false);
    const router = useRouter()

    const handleSignUp = () => {
        router.replace('screens/intro/Successful')
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
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Username' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Full Name
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Full Name' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Mobile Number' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Password
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Password' />
                            </View>
                            <View style={{ gap: 10 }}>
                                <Text style={{ fontSize: width * 0.035, fontWeight: 'bold' }}>
                                    Confirm Password
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Confirm Password' />
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

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollViewContainer: {
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
    SignUpTouchableStyle: {
        width: 360,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111'
    },
    SignUpTouchableText: {
        color: '#fff',
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
    },
    checkbox: {
        margin: 0,
    },
})