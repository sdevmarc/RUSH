import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Animated,
    Image
} from 'react-native'
import { useNavigation } from 'expo-router';
import React, { useRef } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

const Home = () => {
    const { width, height } = Dimensions.get('window')

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
        { id: 7, name: 'Clothes' },
        { id: 8, name: 'Clothes' },
        { id: 9, name: 'Clothes' },
        { id: 10, name: 'Clothes' },
        { id: 11, name: 'Clothes' },
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
                                    <MaterialIcons name="category" size={24} color="black" />
                                    <Text style={{ fontSize: width * 0.047, color: '#222', fontFamily: 'Poppins-Bold' }}>
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
                            <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                    <Ionicons name="storefront" size={24} color="black" />
                                    <Text style={{ fontSize: width * 0.047, color: '#222', fontFamily: 'Poppins-Bold' }}>
                                        STORES
                                    </Text>
                                </View>
                                <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.04, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                    {Stores.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={handleSelectStore}
                                            style={{
                                                width: width * 0.4,
                                                height: height * 0.25,
                                                // borderRadius: height * 0.01,
                                                backgroundColor: '#EE3C3C',
                                                padding: width * 0.02
                                            }}
                                        >
                                            <View style={{ width: '100%', height: '100%' }}>
                                                <View style={{ width: '100%', height: '80%', backgroundColor: 'white' }}>
                                                    <Image
                                                        source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                                        resizeMode='cover'
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </View>
                                                <View style={{ width: '100%', height: '20%', justifyContent: 'center', alignItems: 'flex-start'}}>
                                                    <Text style={{ color: '#fff', fontSize: width * 0.04, fontFamily: 'Poppins-Bold' }} >
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
                                                        {item.name}
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
                                        //         backgroundColor: '#EE3C3C',
                                        //         justifyContent: 'center',
                                        //         alignItems: 'center',
                                        //     }}>
                                        //     <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>
                                        //         {item.name}
                                        //     </Text>
                                        // </TouchableOpacity>
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
