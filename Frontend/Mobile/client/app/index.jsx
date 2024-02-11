import React from 'react'
import { Redirect, Link, useRouter } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const index = () => {
    const router = useRouter()

    const handleSplashScreen = () => {
        router.replace('screens/intro/GetStarted')
    }
    return (
        <>
            <View style={styles.Container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Splash Screen Kunware</Text>
                <TouchableOpacity onPress={handleSplashScreen}>Go to Site</TouchableOpacity>
            </View>
        </>


    )
}

export default index

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})