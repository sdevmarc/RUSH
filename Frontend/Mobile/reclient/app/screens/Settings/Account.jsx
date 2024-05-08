import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    ImageBackground
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons, Entypo } from '@expo/vector-icons'
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const Account = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const data = await axios.get(`http:${address}/api/getuser/${userId}`)
        setValues(data?.data?.data)
    }

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    const handleAddress = async () => {
        const userId = await AsyncStorage.getItem('userId')
        navigation.navigate('Address', { userId: userId })
    }

    const handleStartRenting = () => {
        navigation.navigate('ShopInformation')

    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, backgroundColor: Colors.backgroundColor }}>
                <ImageBackground source={{ uri: 'https://source.unsplash.com/man-wearing-black-notched-lapel-suit-jacket-in-focus-photography-WMD64tMfc4k' }} style={{ width: '100%', height: height * 0.25, }} resizeMode='cover'>
                    <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.05, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.05 }}>
                                {values.displayName}
                            </Text>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.03, paddingVertical: height * 0.008, backgroundColor: Colors.orange }}>
                                <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                    Edit Photo
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03 }}>
                            <Text style={{ color: Colors.whiteColor, fontWeight: '600', fontSize: width * 0.03 }}>
                                Followers: 30
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: height * 0.13,
                            overflow: 'hidden',
                            zIndex: 1,
                            paddingBottom: height * 0.009
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
                                <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.01, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                My Account
                            </Text>
                            <TouchableOpacity
                                style={{ width: '100%', gap: height * 0.01, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Account Details
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.02 }}>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Username
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.username}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Display Name
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.displayName}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            Contact Number
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.contactno}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: width * 0.02, justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                            User Type
                                        </Text>
                                        <Text style={{ width: '50%', color: Colors.fontColor, textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                            {values.UserType}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: width * 0.03 }}>
                            <TouchableOpacity
                                onPress={handleAddress}
                                style={{
                                    width: width * 0.29,
                                    height: height * 0.13,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: Colors.idleColor,
                                    borderRadius: height * 0.02,
                                    gap: height * 0.01
                                }}
                            >
                                <Entypo name="address" size={24} color="black" />
                                <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                    My Addresses
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleStartRenting}
                                style={{
                                    width: width * 0.29,
                                    height: height * 0.13,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: Colors.idleColor,
                                    borderRadius: height * 0.02,
                                    gap: height * 0.01
                                }}
                            >
                                <MaterialIcons name="sell" size={24} color="black" />
                                <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                    Start Renting
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: width * 0.29,
                                    height: height * 0.13,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: Colors.idleColor,
                                    borderRadius: height * 0.02,
                                    gap: height * 0.01
                                }}
                            >
                                <MaterialIcons name="manage-accounts" size={24} color="black" />
                                <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                    Account Settings
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    )
}

export default Account