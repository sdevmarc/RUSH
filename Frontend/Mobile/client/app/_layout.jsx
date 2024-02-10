import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name='screens/intro/LogInOrSignUp' options={{ headerTitle: 'Login', headerTitleAlign: 'center', headerShown: false }} />
        </Stack>
    )
}

export default Layout