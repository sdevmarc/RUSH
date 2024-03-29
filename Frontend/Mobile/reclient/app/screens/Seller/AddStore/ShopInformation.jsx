import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TextInput
} from 'react-native'
import React from 'react'
import Navbar from '../../../components/Navbar'
import { useNavigation } from '@react-navigation/native'
import BottomBar from '../../../components/BottomBar'

const { width, height } = Dimensions.get('window')

const ShopInformation = () => {
    const navigation = useNavigation()

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Shop Information' backgroundColor='#323d48' />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Shop Name
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your shop name?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Pickup Address
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Where is your your shop address?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Email
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your email?' />
                            </View>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                    Mobile Number
                                </Text>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='What is your mobile number?' />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <BottomBar title='Next' />
            </View>
        </>
    )
}

export default ShopInformation