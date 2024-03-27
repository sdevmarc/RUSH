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

    const handleAddress = () => {
        navigation.navigate('Address')
    }

    const handleShippingOption = () => {
        navigation.navigate('ShippingOption')
    }

    const handlePaymentOption = () => {
        navigation.navigate('PaymentOption')
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
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
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="chevron-back-circle" size={height * 0.04} color="#8f8f8f" />
                        </TouchableOpacity>

                    </View>

                    <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white' }}>
                            Checkout
                        </Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <TouchableOpacity
                                onPress={handleAddress}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Delivery Address
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: 'white', textAlign: 'justify' }}>
                                        MARC EDISON D. SUAREZ
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify' }} numberOfLines={2} ellipsizeMode='tail'>
                                        Address ni marc, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum perspiciatis aut maxime autem illum sed fugit? Doloribus harum voluptas vitae magni ad ab dicta! Nisi impedit voluptatibus expedita exercitationem similique.
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify' }}>
                                        +63 933335555
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    width: '100%',
                                    height: height * 0.17,
                                    borderRadius: height * 0.01,
                                    overflow: 'hidden',
                                    padding: height * 0.01,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#4a4c59'
                                }}
                            >
                                <View style={{ overflow: 'hidden', width: '40%', height: '100%', backgroundColor: 'white', borderRadius: height * 0.02 }}>
                                    <Image
                                        source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                        resizeMode='cover'
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                </View>
                                <View style={{ width: '60%', height: '100%', padding: height * 0.01, justifyContent: 'center', gap: height * 0.01 }}>
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                            Product Name
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            Sando
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                            Store Name
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            Barassi
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                            Price
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify', paddingHorizontal: width * 0.01 }} numberOfLines={1} ellipsizeMode='tail'>
                                            ₱ 58
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={handleShippingOption}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01 }}
                            >
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                        Shipping Option
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                        Edit
                                    </Text>
                                </View>
                                <View style={{ width: '100%', paddingHorizontal: width * 0.03, gap: height * 0.007 }}>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '600' }}>
                                       Delivery
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify' }}>
                                       Make sure your delivery address is set to your correct location.
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={handlePaymentOption}
                                style={{ width: '100%', gap: height * 0.007, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between', flexDirection: 'row' }}
                            >
                                <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>
                                    Payment Method
                                </Text>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    Choose payment method
                                </Text>

                            </TouchableOpacity>
                            <View
                                style={{ width: '100%', justifyContent: 'center', gap: height * 0.01 }}
                            >
                                <Text style={{ color: 'white', textAlign: 'justify', fontWeight: 'bold' }}>Payment Details</Text>
                                <View style={{ width: '100%', gap: height * 0.01 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                            Merchandise Subtotal
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify' }}>
                                            P18.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                            Shipping Subtotal
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify' }}>
                                            P58.00
                                        </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500' }}>
                                            Merchandise Subtotal
                                        </Text>
                                        <Text style={{ color: 'white', textAlign: 'justify' }}>
                                            P18.00
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.01, alignItems: 'center' }}>
                                <View
                                    style={{
                                        width: width * 0.35,
                                        height: height * 0.06,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <Text style={{ color: 'white', textAlign: 'justify', fontWeight: '500', fontSize: width * 0.04 }}>
                                        Total Payment
                                    </Text>
                                    <Text style={{ color: 'white', textAlign: 'justify', fontSize: width * 0.05, fontWeight: 'bold' }}>
                                        ₱ 94.00
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={handleCheckout}
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
                                        Checkout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View >
                </ScrollView >
            </View >
        </>
    )
}

export default Cart