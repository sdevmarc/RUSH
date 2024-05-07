import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native'
import React from 'react'
import * as Colors from '../../../../utils/colors'
import Navbar from '../../../components/Navbar'

const { width, height } = Dimensions.get('window')

export default function ToShip() {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='To Ship' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.02 }}>
                                Pending Orders
                            </Text>
                            <View style={{ width: '100%', gap: height * 0.03 }}>
                                <View
                                    style={{
                                        width: '100%',
                                        height: height * 0.20,
                                        borderRadius: height * 0.01,
                                        overflow: 'hidden',
                                        padding: height * 0.01,
                                        backgroundColor: Colors.idleColor,

                                    }}
                                >
                                    <View style={{ width: '100%', height: '80%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: height * 0.03 }}>
                                        <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: Colors.fontColor, borderRadius: height * 0.01 }}>
                                            <Image
                                                source={{ uri: 'https://source.unsplash.com/woman-stretching-her-arm-upward-8HqPXTToMn0' }}
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
                                                    The Product Nma
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                    Store Name
                                                </Text>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                    The Shop Nameasdasd
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                    Price
                                                </Text>
                                                <Text style={{ color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                    ₱ 0001.00
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View
                                        style={{ width: '100%', height: '15%', backgroundColor: 'black' }}
                                    >
                                        <TouchableOpacity
                                            style={{ width: '40%' }}
                                        >
                                            <Text></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}