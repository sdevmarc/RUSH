import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const ShippingOption = () => {
    const navigation = useNavigation()

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <View style={{ position: 'absolute', width: '100%', height: height * 0.1, overflow: 'hidden', zIndex: 1, backgroundColor: '#323d48', paddingVertical: height * 0.009 }}>
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
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name="chevron-back-circle" size={height * 0.04} color="#8f8f8f" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white' }}>
                            Shipping Option
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>

                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default ShippingOption