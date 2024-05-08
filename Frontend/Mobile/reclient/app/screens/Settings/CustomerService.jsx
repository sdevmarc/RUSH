import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

export default function CustomerService() {
    const navigation = useNavigation()

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
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
                            Customer Service
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.016 }}>
                                Frequently Asked Questions
                            </Text>
                            <TouchableOpacity
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    How to return the borrowed item?
                                </Text>
                                <SimpleLineIcons name="arrow-right" size={20} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: '100%', height: height * 0.07, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.016, fontWeight: '600' }}>
                                    How to rent?
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