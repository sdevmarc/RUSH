import {
    View,
    Dimensions,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Colors from '../../../utils/colors'
import Navbar from '../../components/Navbar'
import BottomBar from '../../components/BottomBar'

const { width, height } = Dimensions.get('window')

export default function Summary() {
    const navigation = useNavigation()

    const handleAccept = () => {
        Alert.alert('You have accepted the order successfully!')
        navigation.navigate('StoreDashboard')
    }
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Summary' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <View
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Delivery Address
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>

                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                        Sample Lastname, Sample FirstName, Sample Middle Name
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }} numberOfLines={2} ellipsizeMode='tail'>
                                        Sample Barangay, Sample Municipality, Nueva Vizcaya
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                        Sample Contact no
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: height * 0.17,
                                    borderRadius: height * 0.01,
                                    overflow: 'hidden',
                                    padding: height * 0.01,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: Colors.idleColor
                                }}
                            >
                                <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: Colors.fontColor, borderRadius: height * 0.01 }}>
                                    <Image
                                        source={{ uri: 'http://source.unsplash.com/woman-standing-on-railing-w6Lb5Px8a6g' }}
                                        resizeMode='cover'
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.01 }}>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Product Name
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            Sample P Name
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Store Name
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            Sample S Name
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                            Price
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            ₱ Sample.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                        Shipping Option
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '600' }}>
                                        Sample Shipping Option
                                    </Text>
                                    <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontSize: width * 0.03 }}>
                                        Make sure your delivery address is set to your correct location.
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between', flexDirection: 'row' }}
                            >
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                    Payment Method
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    Sample Delivery
                                </Text>

                            </View>
                            <View
                                style={{ width: '100%', justifyContent: 'center', gap: height * 0.01 }}
                            >
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>Payment Details</Text>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Merchandise Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P Sample.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: '500' }}>
                                            Shipping Subtotal
                                        </Text>
                                        <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                            P Sample.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View >
                </ScrollView >
                <BottomBar subtitle={`Total Payment`} suboutput={`P Sample.00`} redirect={handleAccept} title={`Accept`} />
            </View >
        </>
    )
}