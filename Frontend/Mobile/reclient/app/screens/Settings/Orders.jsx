import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import * as Color from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const Orders = () => {
    const navigation = useNavigation()

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
                            Orders
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01, paddingBottom: height * 0.2 }}>
                            <TouchableOpacity style={{ width: '100%', height: height * 0.23, backgroundColor: Color.secondaryColor, borderRadius: height * 0.01, overflow: 'hidden' }}>
                                <View style={{ width: '100%', height: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width * 0.02 }}>
                                    <View style={{ width: '40%', height: '90%', overflow: 'hidden', backgroundColor: 'black', borderRadius: height * 0.01 }}>
                                        <Image source={{ uri: 'source.unsplash.com/a-man-with-pink-hair-looking-up-at-the-sky-kY_0Xv0_rNs' }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                                    </View>
                                    <View style={{ width: '60%', flexDirection: 'rwo', paddingHorizontal: width * 0.02, gap: height * 0.01 }}>
                                        <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>
                                                Product Name:
                                            </Text>
                                            <Text style={{ width: '100%', color: 'white' }} numberOfLines={1} ellipsizeMode='tail' >
                                                The Product
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>
                                                Store Name:
                                            </Text>
                                            <Text style={{ width: '100%', color: 'white' }} numberOfLines={1} ellipsizeMode='tail' >
                                                The Product
                                            </Text>
                                        </View>
                                        <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <Text style={{ color: 'white', fontWeight: '500' }}>
                                                Total Fee:
                                            </Text>
                                            <Text style={{ width: '100%', color: 'white' }} numberOfLines={1} ellipsizeMode='tail' >
                                                P 100.00
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: '20%', paddingHorizontal: width * 0.02 }}>
                                    <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: Color.accent, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}>
                                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                                            RATE ITEM
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View >
                </ScrollView >
            </View >
        </>
    )
}

export default Orders