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
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
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
        outputRange: [height * 0.2, height * 0.11],
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
            <StatusBar barStyle="light-content" />
            <View>
                <Animated.View style={{ width: width, height: headerHeight, backgroundColor: '#ad3232' }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: height * 0.05,
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
                            <Ionicons name="menu" size={width * 0.08} color="white" />
                        </TouchableOpacity>
                        <Animated.View style={{ opacity: opacityTitle1 }}>
                            <Text style={{ fontSize: width * 0.04, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                Home
                            </Text>
                        </Animated.View>
                        <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                            <Ionicons name="search" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={{ opacity, position: 'absolute', top: height * 0.1, paddingHorizontal: width * 0.05, width: width }}>
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
                    <View style={{ paddingVertical: height * 0.03, gap: height * 0.03, backgroundColor: 'white' }}>
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                <MaterialIcons name="category" size={24} color="#ad3232" />
                                <Text style={{ fontSize: width * 0.047, color: '#ad3232', fontFamily: 'Poppins-Bold' }}>
                                    CATEGORIES
                                </Text>
                            </View>
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
                            </ScrollView>
                        </View>

                        {/* <View style={{ gap: height * 0.02, marginLeft: width * 0.03 }}>
                            <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                HOT TRENDS
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
                        </View> */}
                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03, paddingBottom: height * 0.06 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                <Ionicons name="storefront" size={24} color="#ad3232" />
                                <Text style={{ fontSize: width * 0.047, color: '#ad3232', fontFamily: 'Poppins-Bold' }}>
                                    STORES
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: width * 0.02, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                {Stores.map((item) => (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={handleSelectStore}
                                        style={{
                                            width: width * 0.45,
                                            height: height * 0.25,
                                            // borderRadius: height * 0.01,
                                            // backgroundColor: '#ad3232',
                                            padding: width * 0.02
                                        }}
                                    >
                                        <View style={{ width: '100%', height: '100%' }}>
                                            <View style={{ overflow: 'hidden', width: '100%', height: '80%', backgroundColor: 'white', borderRadius: height * 0.006 }}>
                                                <Image
                                                    source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                                    resizeMode='cover'
                                                    style={{ width: '100%', height: '100%' }}
                                                />
                                            </View>
                                            <View style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}>
                                                <Text style={{ color: '#222', fontSize: width * 0.04, fontFamily: 'Poppins-Bold' }} >
                                                    {item.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        color: '#fff',
                                                        backgroundColor: '#222',
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
                                    // <TouchableOpacity
                                    //     key={item.id}
                                    //     onPress={handleSelectStore}
                                    //     style={{
                                    //         width: width * 0.4,
                                    //         height: height * 0.2,
                                    //         borderRadius: height * 0.01,
                                    //         backgroundColor: '#ad3232',
                                    //         justifyContent: 'center',
                                    //         alignItems: 'center',
                                    //     }}>
                                    //     <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                    //         {item.name}
                                    //     </Text>
                                    // </TouchableOpacity>
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
