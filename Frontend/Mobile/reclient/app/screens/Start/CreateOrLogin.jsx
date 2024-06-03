import { View, Text, StatusBar, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")

export default function CreateOrLogin() {
    const navigate = useNavigation()

    const handleCreateAccount = () => {
        navigate.replace('Register')
    }

    const handleLogin = () => {
        navigate.replace('Login')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, backgroundColor: 'transparent', zIndex: 1 }}>
                <ImageBackground source={{ uri: 'https://source.unsplash.com/gold-beats-wireless-headphones-bWZAPKm0zZE' }} style={{ position: 'absolute', width: width, height: height }} resizeMode='cover'>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.3)', width: '100%', height: '100%' }} />
                </ImageBackground>
                <View
                    style={{ width: width }}
                >
                    <View style={{ width: '100%', height: height, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <View style={{ width: '100%', gap: height * 0.03, paddingHorizontal: width * 0.07, paddingVertical: height * 0.03 }}>
                            <Text style={{ color: 'white', fontSize: width * 0.09, fontWeight: '700' }}>
                                Discover the best rental items!s
                            </Text>
                            <Text style={{ color: 'white', fontSize: width * 0.05 }}>
                                Rent na kayo please.
                            </Text>
                        </View>

                        <View style={{ width: '100%', height: height * 0.25, backgroundColor: 'white', borderTopStartRadius: height * 0.05, borderTopEndRadius: height * 0.05, paddingHorizontal: width * 0.05, paddingVertical: height * 0.03, justifyContent: 'center', alignItems: 'center', gap: height * 0.02 }}>
                            <TouchableOpacity
                                onPress={handleCreateAccount}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: '#E1793C', paddingHorizontal: width * 0.03, borderRadius: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontSize: width * 0.04 }}>
                                    Create new account
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogin}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: '#EFEFEF', paddingHorizontal: width * 0.03, borderRadius: height * 0.05, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: width * 0.04 }}>
                                    I already have an account
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}