import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from '../../../assets/LogoDark.png'
import { Checkbox } from 'expo-checkbox'

const Register = () => {
    const [isChecked, setChecked] = useState(false);
    return (
        <>
            <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
            <SafeAreaView style={styles.safeAreaViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.imageView}>
                        <Image source={Logo} style={{ width: 100 }} resizeMode='contain' />
                    </View>
                    <View>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign Up</Text>
                        <Text style={{ fontSize: 13, color: '#8a8a8a' }}>Create a new account</Text>
                    </View>
                    <View style={styles.formView}>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Username</Text>
                            <TextInput style={styles.formInput} placeholder='Username' />
                        </View>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Email</Text>
                            <TextInput style={styles.formInput} placeholder='Email' />
                        </View>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Password</Text>
                            <TextInput style={styles.formInput} placeholder='Password' />
                        </View>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Confirm Password</Text>
                            <TextInput style={styles.formInput} placeholder='Confirm Password' />
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', paddingHorizontal: 25 }}>
                            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                            <Text style={{ fontSize: 13, color: '#8a8a8a' }}>
                                By creating an account you have to agree with our terms and conditions.
                            </Text>
                        </View>

                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.SignUpTouchableStyle}>
                            <Text style={styles.SignUpTouchableText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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