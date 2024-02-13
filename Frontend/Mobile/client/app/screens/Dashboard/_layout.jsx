import { Tabs } from 'expo-router'
import React from 'react'
import { StatusBar, View, Dimensions, Text, TouchableOpacity, Alert } from 'react-native'

const TabsRoutes = () => {



    return (
        <Tabs>
            <Tabs.Screen name='Home' options={{ headerTitle: (props) => <CustomHomeHeader {...props} /> }} />
            <Tabs.Screen name='Cart' options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
        </Tabs>
    )
}

export default TabsRoutes

const CustomHomeHeader = () => {
    const click = () => {
        Alert.alert('Downloaded porn')
    }
    return (
        <View style={{ width: 300, height: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>

            <TouchableOpacity onPress={click}>
                <Text>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Menu</Text>
            </TouchableOpacity>
        </View>
    )
}