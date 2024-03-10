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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';


const bgSample = require('../../../assets/bgIntro.png')
const { width, height } = Dimensions.get('window')


const Home = () => {
    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;
    // const headerBackground = scrollY.interpolate({
    //     inputRange: [0, height * 0.1],
    //     outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
    //     extrapolate: 'clamp',
    // })
    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.15, height * 0.05],
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
        { id: 1, name: 'Clothes' },
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
            <View style={{ backgroundColor: '#EE3C3C' }}>
                <SafeAreaView>
                    <Animated.View style={{ width: width, height: headerHeight, paddingHorizontal: width * 0.03, backgroundColor: '#EE3C3C', gap: height * 0.01 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <Ionicons name="menu" size={width * 0.08} color="white" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                <Text style={{ fontSize: width * 0.05, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    Home
                                </Text>
                            </Animated.View>
                            <TouchableOpacity >
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View style={{ opacity }}>
                            <Text style={{ fontSize: width * 0.05, fontWeight: '700', color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                Discover
                            </Text>
                            <Text style={{ fontSize: width * 0.07, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                                Our Rental Shops
                            </Text>
                        </Animated.View>

                    </Animated.View>

                    <ScrollView
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        scrollEventThrottle={16}
                    >

                        <View style={{ paddingVertical: height * 0.03, gap: height * 0.03, backgroundColor: 'white' }}>
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
                                            <Text style={{ fontFamily: 'Poppins-Regular' }}>{item.name}</Text>
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
                                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>{item.name}</Text>
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
                                            <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </ScrollView >
                </SafeAreaView>

            </View >
        </>

    )
}

export default Home
