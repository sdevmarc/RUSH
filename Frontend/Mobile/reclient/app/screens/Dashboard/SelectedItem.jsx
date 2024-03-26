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
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.13, height * 0.11],
        extrapolate: 'clamp',
    })

    const handleAddtoCart = () => {
        navigation.navigate('Cart')
    }

    return (
        <>
            <StatusBar barStyle="light-content" />
            <View>
                <Animated.View style={{ position: 'absolute', width: width, height: height * 0.1, overflow: 'hidden', zIndex: 1 }}>
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
                            <Ionicons name="chevron-back-circle" size={height * 0.04} color="black" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <ScrollView>
                    <View style={{ width: width, height: height }}>
                        <View
                            style={{
                                overflow: 'hidden',
                                width: '100%',
                                height: '50%',
                                backgroundColor: 'white',
                                borderRadius: height * 0.006,
                                borderBottomEndRadius: 60,
                                borderBottomStartRadius: 60
                            }}
                        >
                            <Image
                                source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                resizeMode='cover'
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        <View style={{ width: '100%', height: '50%', paddingHorizontal: width * 0.03, paddingTop: height * 0.04, paddingBottom: height * 0.1, justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', gap: height * 0.01 }}>
                                <Text>Title</Text>
                                <Text>Availability</Text>
                                <Text style={{ textAlign: 'justify' }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta distinctio, unde possimus earum nobis architecto et nesciunt hic ex? Sit neque modi sequi autem temporibus culpa a odio dolorum facilis!
                                    Modi laboriosam perferendis quaerat veniam cupiditate animi consequuntur similique, nobis numquam in placeat, soluta esse aperiam illo ipsam! Eum doloremque, quo aspernatur a commodi dolorem! Officia accusamus aut laudantium illum!</Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: width * 0.01 }}>
                                <View
                                    style={{
                                        width: width * 0.35,
                                        height: height * 0.06,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: height * 0.015
                                    }}
                                >
                                    <Text>
                                        Price
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    onPress={handleAddtoCart}
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
                                        RENT
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default SelectedItem