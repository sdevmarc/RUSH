import {
    View,
    Text,
    StatusBar,
    Dimensions,
    ScrollView,
    Image
} from 'react-native'
import React from 'react'
import * as Colors from '../../../../utils/colors'
import Navbar from '../../../components/Navbar'

const { width, height } = Dimensions.get('window')

export default function Unreturned() {
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Unreturned' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <Text style={{ fontWeight: '600', fontSize: height * 0.017 }}>
                                Unreturned Orders
                            </Text>
                            <View style={{ width: '100%', backgroundColor: Colors.idleColor, borderRadius: height * 0.01 }}>
                                <View style={{ overflow: 'hidden', width: '100%', height: height * 0.27, padding: height * 0.01, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: '100%', height: '70%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                                        <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: Colors.fontColor, borderRadius: height * 0.01 }}>
                                            <Image
                                                source={{ uri: 'http://source.unsplash.com/woman-standing-on-railing-w6Lb5Px8a6g' }}
                                                resizeMode='cover'
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.01 }}>
                                            <View style={{ width: '100%' }}>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                    Product Name
                                                </Text>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                    Titesasdasd
                                                </Text>
                                            </View>
                                            <View style={{ width: '100%' }}>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                    Store Name
                                                </Text>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                    Titesasdasd
                                                </Text>
                                            </View>
                                            <View style={{ width: '100%' }}>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', fontWeight: 'bold' }}>
                                                    Price
                                                </Text>
                                                <Text style={{ width: '100%', color: Colors.fontColor, textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                                    ₱ Titesasdasd.00
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={{ width: '100%', height: '30%', paddingVertical: height * 0.01, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: '100%', height: '100%', backgroundColor: Colors.semiblack, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01 }}>
                                            <Text
                                                style={{ color: Colors.whiteColor, fontSize: height * 0.02 }}
                                            >
                                                Unreturned
                                            </Text>
                                        </View>
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