import React from 'react'
import { Stack } from 'expo-router'
import { Tabs } from 'expo-router/tabs';

const Layout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='screens/intro/GetStarted' options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name='screens/intro/OnBoarding' options={{ headerTitle: 'OnBoarding', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name='screens/intro/Login' options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name='screens/intro/Register' options={{ headerTitle: 'Register', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name='screens/intro/Successful' options={{ headerTitle: 'Successful', headerTitleAlign: 'center', headerShown: false }} />
                <Stack.Screen name='screens/Dashboard' options={{ headerTitle: 'Home', headerTitleAlign: 'center', headerShown: false }} />
            </Stack>
            
        </>

    )
}

export default Layout