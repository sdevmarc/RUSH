import {
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    Animated
} from 'react-native'
import { useNavigation } from 'expo-router';
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';



const bgSample = require('../../../assets/bgIntro.png')
const { width, height } = Dimensions.get('window')



const Home = () => {
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

    const Categories = [
        { id: 1, name: 'Clothes' },
        { id: 2, name: 'Clothes' },
        { id: 3, name: 'Clothes' },
        { id: 4, name: 'Clothes' },
        { id: 5, name: 'Clothes' },
        { id: 6, name: 'Clothes' },
        { id: 7, name: 'Clothes' }
    ]

    const Trends = [
        { id: 1, name: 'Clothes', navigate: handleSelectStore },
        { id: 2, name: 'Clothes' },
        { id: 3, name: 'Clothes' },
        { id: 4, name: 'Clothes' },
        { id: 5, name: 'Clothes' },
        { id: 6, name: 'Clothes' },
        { id: 7, name: 'Clothes' }
    ]

    const Stores = [
        { id: 1, name: 'Clothes' },
        { id: 2, name: 'Clothes' },
        { id: 3, name: 'Clothes' },
        { id: 4, name: 'Clothes' },
        { id: 5, name: 'Clothes' },
        { id: 6, name: 'Clothes' },
        { id: 7, name: 'Clothes' }
    ]

    const handleSelectStore = () => {
        navigation.navigate('SelectedStore')
    }

    return (
        <>
            <View style={{ backgroundColor: '#fff' }}>
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
                            <Text style={{ fontSize: width * 0.08, fontWeight: 'bold', color: '#fff' }}>Discover</Text>
                            <Text style={{ fontSize: width * 0.045, color: '#fff', fontWeight: 'bold' }}>Our Rental Shops</Text>
                        </View>
                    </ImageBackground>
                    <View style={{ paddingVertical: height * 0.03, gap: height * 0.03 }}>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Categories
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.02 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {Categories.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.0065,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#fff',
                                            borderWidth: width * 0.003
                                        }}>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                                {/* <TouchableOpacity
                                    style={{
                                        paddingHorizontal: width * 0.05,
                                        paddingVertical: height * 0.0065,
                                        borderRadius: height * 0.01,
                                        backgroundColor: '#222',
                                        borderWidth: width * 0.003
                                    }}>
                                    <Text style={{ color: '#fff' }}
                                    >
                                        Clothes
                                    </Text>
                                </TouchableOpacity> */}
                            </ScrollView>
                        </View>

                        <View style={{ gap: height * 0.02, marginLeft: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Hot Trends 🔥
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.02 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {Trends.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={handleSelectStore}
                                        style={{
                                            width: width * 0.55,
                                            height: height * 0.25,
                                            borderRadius: height * 0.01,
                                            backgroundColor: 'grey',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={{ color: '#fff' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                Stores 😍
                            </Text>
                            <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.04, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {Stores.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={handleSelectStore}
                                        style={{
                                            width: width * 0.4,
                                            height: height * 0.2,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#222',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Text style={{ color: '#fff' }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>

    )
}

export default Home
