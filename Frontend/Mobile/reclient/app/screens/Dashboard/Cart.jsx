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

const Cart = () => {
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.13, height * 0.11],
        extrapolate: 'clamp',
    })

    const handleCheckout = () => {
        navigation.replace('SuccessfulCheckout')
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View>
                <View style={{ width: width, height: height * 0.1, overflow: 'hidden', zIndex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            paddingHorizontal: width * 0.05,
                            width: width,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            zIndex: 2
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Ionicons name="chevron-back-circle" size={height * 0.04} color="black" />
                        </TouchableOpacity>

                    </View>

                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold' }}>Checkout</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, height: height, gap: height * 0.005, paddingHorizontal: width * 0.03 }}>
                        <TouchableOpacity
                            style={{ width: '100%', height: '10%', justifyContent: 'center', marginTop: height * 0.03 }}
                        >
                            <Text>Delivery Address</Text>
                            <View style={{ width: '100%', paddingHorizontal: width * 0.03 }}>
                                <Text>Name</Text>
                                <Text>Contact no.</Text>
                                <Text>Address</Text>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                width: '100%',
                                height: '17%',
                                borderRadius: height * 0.03,
                                borderWidth: 1,
                                overflow: 'hidden',
                                padding: height * 0.01,
                                alignItems: 'center',
                                flexDirection: 'row',
                               
                            }}
                        >
                            <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: 'white', borderRadius: height * 0.02 }}>
                                <Image
                                    source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                    resizeMode='cover'
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </View>
                            <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.03 }}>
                                <Text>Title</Text>
                                <Text>Store Name</Text>
                                <Text>Price</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={{ width: '100%', height: '10%', justifyContent: 'center' }}
                        >
                            <Text>Shipping Option</Text>
                            <View style={{ width: '100%', paddingHorizontal: width * 0.03 }}>
                                <Text>Delivery</Text>
                                <Text>Make sure your delivery address is set to your correct location.</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ width: '100%', height: '3%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}
                        >
                            <Text>Payment Option</Text>
                            <Text>Cash on Delivery</Text>

                        </TouchableOpacity>
                        <View
                            style={{ width: '100%', height: '15%', justifyContent: 'center', gap: height * 0.01 }}
                        >
                            <Text>Payment Details</Text>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Merchandise Subtotal</Text>
                                    <Text>P18</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Shipping Subtotal</Text>
                                    <Text>P58</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text>Merchandise Subtotal</Text>
                                    <Text>P18</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: '25%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.01, alignItems: 'center' }}>
                            <View
                                style={{
                                    width: width * 0.35,
                                    height: height * 0.06,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}
                            >
                                <Text>
                                    Total Payment
                                </Text>
                                <Text>
                                    Price
                                </Text>
                            </View>

                            <TouchableOpacity
                            onPress={handleCheckout}
                                style={{
                                    width: width * 0.35,
                                    height: height * 0.06,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    backgroundColor: '#111',
                                    borderRadius: height * 0.015
                                }}
                            >
                                <Text style={{ color: 'white' }}>
                                    Checkout
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default Cart