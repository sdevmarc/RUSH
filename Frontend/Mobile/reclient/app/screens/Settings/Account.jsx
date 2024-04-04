import {
    View,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios'
import address from '../../../config/host'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

const Account = () => {
    const navigation = useNavigation()
    const [values, setValues] = useState([])



    const fetchData = async () => {
        const userId = await AsyncStorage.getItem('userId')
        const data = await axios.get(`http:${address}/api/getuser/${userId}`)
        setValues(data.data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddress = () => {
        navigation.navigate('Address')
    }

    const handleStartRenting = () => {
        navigation.navigate('ShopInformation')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: height * 0.12,
                        zIndex: 1,
                        backgroundColor: '#323d48',
                        paddingVertical: height * 0.009
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
                            onPress={() => navigation.openDrawer()}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white' }}>
                            Account
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <TouchableOpacity
                                style={{ width: '100%', gap: height * 0.003, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Account Details
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                        Username
                                    </Text>
                                    <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {values.username}
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                        Display Name
                                    </Text>
                                    <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {values.name}
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                        Contact Number
                                    </Text>
                                    <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {values.contactno}
                                    </Text>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.005, flexDirection: 'row', paddingHorizontal: width * 0.02, paddingVertical: height * 0.01, justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                        User Type
                                    </Text>
                                    <Text style={{ width: '50%', color: 'white', textAlign: 'right' }} numberOfLines={1} ellipsizeMode='tail'>
                                        {values.UserType}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleAddress}
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    My Addresses
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Account Security
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Bank Accounts/ Cards
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    My Likes
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleStartRenting}
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Start Renting
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </>
    )
}

export default Account