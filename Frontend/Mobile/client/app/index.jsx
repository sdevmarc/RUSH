import React from 'react'
import { Redirect, Link } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const index = () => {
    return (
        <>
            <View style={styles.Container}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Splash Screen Kunware</Text>
                <Link href={'/screens/intro/LogInOrSignUp'}>Go to Site</Link>
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