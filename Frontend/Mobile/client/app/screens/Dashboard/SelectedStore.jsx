import {
    Animated,
    ScrollView,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    Image
} from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router'

const SelectedStore = () => {
    const { width, height } = Dimensions.get('window')
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;
    const headerBackground = scrollY.interpolate({
        inputRange: [0, height * 0.1],
        outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)'],
        extrapolate: 'clamp',
    })
    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.1],
        outputRange: [height * 0.13, height * 0.12],
        extrapolate: 'clamp',
    })

    return (
        <>
            <View>
                <Animated.View style={{ backgroundColor: headerBackground, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1, height: headerHeight, justifyContent: 'flex-end', paddingHorizontal: width * 0.03, paddingVertical: height * 0.02 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TextInput placeholder='Search...' style={{ backgroundColor: '#fff', paddingHorizontal: width * 0.03, borderRadius: height * 0.007, width: width * 0.7, height: height * 0.04, fontSize: width * 0.035 }} />
                        <TouchableOpacity onPress={() => navigation.openDrawer()} >
                            <Ionicons name="menu" size={width * 0.08} color="white" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                >
                    <ImageBackground source={{ uri: 'https://source.unsplash.com/woman-wearing-black-and-white-floral-dress-walks-inside-dark-room-tH_Byj_IWbo' }}
                        resizeMode='cover'
                        style={{ width: width, height: width * 0.5, justifyContent: 'flex-end', gap: width * 0.04 }}>

                        <View style={{
                            paddingHorizontal: width * 0.03,
                        }}>
                            <Text
                                style={{
                                    fontSize: width * 0.07,
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }}
                            >
                                Melton Boutique
                            </Text>
                            <Text
                                style={{
                                    fontSize: width * 0.045,
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}
                            >
                                Clothes
                            </Text>
                        </View>
                    </ImageBackground>
                    <View style={{ paddingVertical: height * 0.03, gap: height * 0.03 }}>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Products
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.04, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#222',
                                                    fontWeight: 'bold',
                                                    fontSize: width * 0.04
                                                }}
                                            >
                                                Sando
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#008048',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Available
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#222',
                                                    fontWeight: 'bold',
                                                    fontSize: width * 0.04
                                                }}
                                            >
                                                Underwear
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#008048',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Available
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#222',
                                                    fontWeight: 'bold',
                                                    fontSize: width * 0.04
                                                }}
                                            >
                                                Skirt
                                            </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#008048',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Available
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text 
                                            style={{ 
                                                color: '#222', 
                                                fontWeight: 'bold', 
                                                fontSize: width * 0.04 
                                                }}>
                                                    Clothes
                                                    </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#e31243',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Rented
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text 
                                            style={{ 
                                                color: '#222', 
                                                fontWeight: 'bold', 
                                                fontSize: width * 0.04 
                                                }}>
                                                    Clothes
                                                    </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#e31243',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Rented
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    width: width * 0.4,
                                    height: height * 0.25,
                                    borderRadius: height * 0.01,
                                    // backgroundColor: '#222',
                                    padding: width * 0.02
                                }}
                                >
                                    <View
                                        style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}
                                    >
                                        <View
                                            style={{ width: '100%', height: '80%', backgroundColor: 'white' }}
                                        >
                                            <Image source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }} resizeMode='cover' style={{ width: '100%', height: '100%' }} />
                                        </View>
                                        <View
                                            style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}
                                        >
                                            <Text 
                                            style={{ 
                                                color: '#222', 
                                                fontWeight: 'bold', 
                                                fontSize: width * 0.04 
                                                }}>
                                                    Clothes
                                                    </Text>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#e31243',
                                                    paddingHorizontal: width * 0.03,
                                                    paddingVertical: width * 0.005,
                                                    borderRadius: height * 0.005,
                                                    fontSize: width * 0.03
                                                }}
                                            >
                                                Rented
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default SelectedStore
