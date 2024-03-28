import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Animated,
    Image,
    StatusBar
} from 'react-native'
import React, { useRef } from 'react'
import { Ionicons, MaterialIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const Categories = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronic' },
    { id: 3, name: 'Accessories' },
    { id: 4, name: 'Homegoods' },
    { id: 5, name: 'Beauty' },
    { id: 6, name: 'Sports' },
    { id: 7, name: 'Toys' },
    { id: 8, name: 'Sports' },
    { id: 9, name: 'Food' },
    { id: 10, name: 'Pets' }
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
    { id: 1, name: 'Barassi', category: 'Clothes' },
    { id: 2, name: 'Bloom', category: 'Beauty' },
    { id: 3, name: 'Gear', category: 'Accessories' },
    { id: 4, name: 'Thrive', category: 'Clothes' },
    { id: 5, name: 'Spark', category: 'Homegoods' },
    { id: 6, name: 'Luxe', category: 'Sports' },
    { id: 7, name: 'Swift', category: 'Clothes' },
    { id: 8, name: 'Ford', category: 'Electronic' },
    { id: 9, name: 'Suzuki', category: 'Electronic' },
    { id: 10, name: 'Mitsubishi', category: 'Electronic' },
    { id: 11, name: 'Toyota', category: 'Electronic' },
]

const Home = () => {
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

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleSelectStore = () => {
        navigation.navigate('SelectedStore')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Animated.View style={{ width: '100%', height: headerHeight, backgroundColor: '#313d49' }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: height * 0.07,
                            width: '100%',
                            paddingHorizontal: width * 0.05,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                            {/* <Entypo name="grid" size={width * 0.08} color="white" /> */}
                            {/* <Ionicons name="menu" size={width * 0.08} color="white" /> */}
                        </TouchableOpacity>
                        <Animated.View style={{ opacity: opacityTitle1 }}>
                            <Text style={{ fontSize: width * 0.04, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                Home
                            </Text>
                        </Animated.View>
                        <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                            <Ionicons name="search" size={width * 0.05} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{ opacity, position: 'absolute', top: height * 0.14, paddingHorizontal: width * 0.05, width: width }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: '700', color: '#fff', fontFamily: 'Poppins-Bold' }}>
                            Discover
                        </Text>
                        <Text style={{ fontSize: width * 0.07, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                            Our Rental Shops
                        </Text>
                    </Animated.View>
                </Animated.View>

                <ScrollView
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                    scrollEventThrottle={16}
                >
                    <View style={{ width: width, gap: height * 0.022, backgroundColor: '#313d49' }}>
                        <View style={{ width: '100%', gap: height * 0.02, paddingTop: height * 0.03 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, paddingHorizontal: width * 0.03 }}>
                                <Text style={{ fontSize: width * 0.05, color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                    Categories
                                </Text>
                            </View>
                            <ScrollView contentContainerStyle={{ gap: width * 0.02, paddingStart: width * 0.03 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity
                                    style={{
                                        paddingHorizontal: width * 0.05,
                                        paddingVertical: height * 0.0065,
                                        borderRadius: height * 0.01,
                                        backgroundColor: '#d7a152',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{ fontFamily: 'Poppins-Bold', color: 'white' }}>
                                        All
                                        </Text>
                                </TouchableOpacity>
                                {Categories.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.0065,
                                            borderRadius: height * 0.01,
                                            backgroundColor: '#4b4c59',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text style={{ fontFamily: 'Poppins-Regular', color: 'white' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', gap: height * 0.022, paddingHorizontal: width * 0.03 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                <Text style={{ fontSize: width * 0.05, color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                    Rent Shops
                                </Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {Stores.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={handleSelectStore}
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
                                                <Text style={{ color: '#fff', fontSize: width * 0.04, fontFamily: 'Poppins-Regular' }} numberOfLines={1} ellipsizeMode='tail' >
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
                                                    {item.category}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View >
                </ScrollView >
            </View >

        </>

    )
}

export default Home
