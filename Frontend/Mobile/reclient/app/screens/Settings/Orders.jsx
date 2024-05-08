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
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const Orders = () => {
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
                            Orders
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, paddingHorizontal: width * 0.03, paddingTop: height * 0.13, gap: height * 0.01 }}>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Purchases
                            </Text>
                            <TouchableOpacity

                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    To Ship
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    0
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Cancelled
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    0
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Unreturned
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    0
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity

                                style={{ width: '100%', height: height * 0.09, backgroundColor: Colors.idleColor, borderRadius: height * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.05 }}>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    Reviews
                                </Text>
                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                    0
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Others
                            </Text>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: width * 0.03 }}>
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
                                    <Feather name="shopping-bag" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        My Likes
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
                                    <Ionicons name="analytics" size={24} color="black" />
                                    <Text style={{ width: '80%', color: Colors.fontColor, fontWeight: '600', textAlign: 'center' }}>
                                        Completed Orders
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}

export default Orders