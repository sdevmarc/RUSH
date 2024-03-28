import {
    Animated,
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    StatusBar,
    Platform
} from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window')

const Products = [
    { id: 1, name: 'Sando', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 2, name: 'Skirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 3, name: 'Shorts', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 4, name: 'Shirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
    { id: 5, name: 'Underwear', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 6, name: 'Polo', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
    { id: 7, name: 'Pajama', status: { isAvailable: 'Rented', bgColor: '#e31243' } }
]

const SelectedStore = () => {
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.22, height * 0.14],
        extrapolate: 'clamp',
    })

    const opacityTitle1 = scrollY.interpolate({
        inputRange: [0, height * 0.2 - height * 0.05],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
        inputRange: [0, height * 0.15 - height * 0.05],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const handleSelectItem = () => {
        navigation.navigate('SelectedItem')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Animated.View style={{ position: 'absolute', width: '100%', height: headerHeight, overflow: 'hidden', zIndex: 1 }}>
                    <BlurView
                        intensity={50}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: `${Platform.OS === 'android' ? '#313c47' : 'none'}`
                        }}
                        tint="dark"
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: height * 0.07,
                                width: '100%',
                                paddingHorizontal: width * 0.05,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                zIndex: 1
                            }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back-circle" size={width * 0.08} color="#dedede" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                <Text style={{ fontSize: width * 0.04, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    BARASSI
                                </Text>
                            </Animated.View>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View
                            style={{
                                opacity,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-start',
                                paddingHorizontal: width * 0.05,
                                paddingVertical: height * 0.02,
                            }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ width: '60%', flexWrap: 'wrap', fontSize: width * 0.045, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }} numberOfLines={2} ellipsizeMode='tail' >
                                    BARASSI
                                </Text>
                                <View style={{ gap: height * 0.01 }}>
                                    <TouchableOpacity

                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.003,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#d7a152',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                            Follow
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity

                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.003,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#4a4c59',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>
                                            Message
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </BlurView>
                </Animated.View>
                <ScrollView
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                    scrollEventThrottle={16}
                >
                    <View style={{ width: '100%', gap: height * 0.022, paddingHorizontal: width * 0.03, paddingTop: height * 0.24 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, paddingHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.05, color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                Products
                            </Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {Products.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={handleSelectItem}
                                    style={{
                                        width: width * 0.452,
                                        height: height * 0.25,
                                        borderRadius: height * 0.02,
                                        padding: width * 0.02,
                                        backgroundColor: '#4a4c59'
                                    }}
                                >
                                    <View style={{ width: '100%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                        <View style={{ overflow: 'hidden', width: '100%', height: '70%', backgroundColor: 'white', borderRadius: height * 0.015 }}>
                                            <Image
                                                source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                                resizeMode='cover'
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </View>
                                        <View style={{ width: '100%', alignItems: 'flex-start' }}>
                                            <Text style={{ color: '#fff', fontSize: width * 0.04, fontFamily: 'Poppins-Regular' }} >
                                                {item.name}
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    backgroundColor: '#d7a152',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03,
                                                    fontFamily: 'Poppins-Regular'
                                                }}
                                            >
                                                {item.status.isAvailable}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View >
        </>
    )
}

export default SelectedStore