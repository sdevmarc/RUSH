import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../../components/Loading'
import * as WebBrowser from 'expo-web-browser'

const { width, height } = Dimensions.get('window')

const Settings = () => {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false)

    useFocusEffect(useCallback(() => {
        fetchToken()
    }, []))

    const fetchToken = async () => {
        try {
            setIsLoading(true)
            const token = await AsyncStorage.getItem('token')
            if (!token) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'CreateOrLogin' }]
                })
            }

        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    const handleLogout = async () => {
        try {
            setIsLoading(true)
            await AsyncStorage.clear()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            fetchToken()
        }
    }

    const handleCommunityPolicies = async () => {
        await WebBrowser.openBrowserAsync("https://www.notion.so/RUSH-Rent-up-and-Share-Community-Policy-5775facf14534810963836ef96029d7c?pvs=4")
    }

    const handleRushPolicies = async () => {
        await WebBrowser.openBrowserAsync("https://www.notion.so/RUSH-Rent-up-and-Share-Policies-cd0e7e9ec0b94409bb64dd3c3c15e01f?pvs=4")
    }

    const handleGiveUsFeedBack = () => {
        Alert.alert('Coming Soon!', 'The app is still in alpha testing, stay tuned!')
    }

    const handleReport = () => {
        navigation.navigate('Report')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {isLoading && <Loading title={`Loading`} />}
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: height * 0.12,
                        zIndex: 1,
                        paddingVertical: height * 0.009,
                        backgroundColor: Colors.backgroundColor
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: width * 0.05,
                            width: width,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            zIndex: 1
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleOpenDrawer}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: Colors.fontColor }}>
                            Settings
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <TouchableOpacity
                                onPress={handleCommunityPolicies}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    Community Policies
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleRushPolicies}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    RUSh Policies
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleGiveUsFeedBack}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    Give us a feedback!
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleReport}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    Report
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleLogout}
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    Logout
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}

export default Settings