import React from 'react'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'

const App = () => {
    return (
        <SafeAreaView style={styles.SafeView}>
            <View style={styles.Container}>
                <Text>Sample</Text>
            </View>
        </SafeAreaView>
    )
}

export default App

const styles = StyleSheet.create({
    SafeView: {
        flex: 1
    },
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})