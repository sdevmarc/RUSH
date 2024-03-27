import {
    View,
    Dimensions,
    Text,
    StatusBar,
    Animated,
    TouchableOpacity,
    ScrollView,
    Image,
    Button
} from 'react-native'
import React, { useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const SelectedItem = () => {
    const navigation = useNavigation()

    const handleAddtoCart = () => {
        navigation.navigate('Cart')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <View style={{ position: 'absolute', width: '100%', height: '10%', overflow: 'hidden', zIndex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: width * 0.05,
                            width: width,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name="chevron-back-circle" size={width * 0.09} color="#8f8f8f" />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, backgroundColor: '#323d48' }}>
                        <View style={{ width: '100%', height: height * 0.5, padding: height * 0.015, paddingTop: height * 0.04 }}>
                            <View
                                style={{
                                    overflow: 'hidden',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'white',
                                    borderRadius: height * 0.04

                                }}
                            >
                                <Image
                                    source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                        </View>

                        <View style={{ width: '100%', height: height * 0.5, paddingHorizontal: width * 0.03, paddingBottom: height * 0.1, justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ width: width * 0.7, color: 'white', fontWeight: 'bold', fontSize: width * 0.07, flexWrap: 'wrap' }} >
                                        Sando
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: width * 0.02,
                                            paddingVertical: height * 0.0065,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#d7a152',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                            Available
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>
                                        Shipping Availability
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: width * 0.03 }}>
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal: width * 0.05,
                                                paddingVertical: height * 0.0065,
                                                borderRadius: height * 0.01,
                                                backgroundColor: '#d7a152',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                                Delivery
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal: width * 0.05,
                                                paddingVertical: height * 0.0065,
                                                borderRadius: height * 0.01,
                                                backgroundColor: '#d7a152',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                            <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                                Pickup
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>
                                        Description
                                    </Text>
                                    <Text style={{ textAlign: 'justify', color: 'white', fontSize: width * 0.03 }}>
                                        - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta distinctio, unde possimus earum nobis architecto et nesciunt hic ex? Sit neque modi sequi autem temporibus culpa a odio dolorum facilis!
                                        Modi laboriosam perferendis quaerat veniam cupiditate animi consequuntur similique, nobis numquam in placeat, soluta esse aperiam illo ipsam! Eum doloremque, quo aspernatur a commodi dolorem! Officia accusamus aut laudantium illum!
                                    </Text>
                                </View>

                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.01 }}>
                                <View
                                    style={{
                                        width: width * 0.3,
                                        height: height * 0.06,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        borderRadius: height * 0.015
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: '500', fontSize: width * 0.04 }}>
                                       Price
                                    </Text>
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.05 }}>
                                        ₱ 105.00
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={handleAddtoCart}
                                    style={{
                                        width: width * 0.55,
                                        height: height * 0.06,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#d7a152',
                                        borderRadius: height * 0.02
                                    }}
                                >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>
                                        RENT
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

export default SelectedItem