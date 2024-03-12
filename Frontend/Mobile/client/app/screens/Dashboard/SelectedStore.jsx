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
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window')

const SelectedStore = () => {
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.1],
        outputRange: [height * 0.13, height * 0.06],
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

    const Products = [
        { id: 1, name: 'Sando', status: { isAvailable: 'Available', bgColor: '#008048' } },
        { id: 2, name: 'Skirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
        { id: 3, name: 'Shorts', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
        { id: 4, name: 'Shirt', status: { isAvailable: 'Available', bgColor: '#008048' } },
        { id: 5, name: 'Underwear', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
        { id: 6, name: 'Polo', status: { isAvailable: 'Rented', bgColor: '#e31243' } },
        { id: 7, name: 'Pajama', status: { isAvailable: 'Rented', bgColor: '#e31243' } }
    ]

    return (
        <>
            <View style={{ backgroundColor: '#EE3C3C' }}>
                <SafeAreaView>
                    <Animated.View style={{ width: width, height: headerHeight, paddingHorizontal: width * 0.05, backgroundColor: '#EE3C3C', gap: height * 0.01 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} >
                                <Ionicons name="menu" size={width * 0.08} color="white" />
                            </TouchableOpacity>
                            <Animated.View style={{ opacity: opacityTitle1 }}>
                                <Text style={{ fontSize: width * 0.05, color: '#fff', fontFamily: 'Poppins-Bold' }}>
                                    STORE
                                </Text>
                            </Animated.View>
                            <TouchableOpacity style={{ paddingHorizontal: width * 0.02, paddingVertical: width * 0.02 }}>
                                <Ionicons name="search" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Animated.View style={{ opacity }}>
                            <Text style={{ fontSize: width * 0.07, color: '#fff', fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                                Yacatiago Boutique
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

                        <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03, paddingBottom: height * 0.06 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                    <Ionicons name="storefront" size={24} color="#EE3C3C" />
                                    <Text style={{ fontSize: width * 0.047, color: '#EE3C3C', fontFamily: 'Poppins-Bold' }}>
                                        PRODUCTS
                                    </Text>
                                </View>
                                <ScrollView>
                                    <View style={{ flexDirection: 'row', gap: width * 0.02, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                        {Products.map((item) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                // onPress={handleSelectStore}
                                                style={{
                                                    width: width * 0.45,
                                                    height: height * 0.25,
                                                    // borderRadius: height * 0.01,
                                                    // backgroundColor: '#EE3C3C',
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
                                                            {item.status.isAvailable}
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
                                    </View>

                                </ScrollView>
                            </View>

                            {/* <View style={{ gap: height * 0.02, marginHorizontal: width * 0.03 }}>
                                <Text style={{ fontSize: width * 0.047, fontWeight: 'bold', color: '#222' }}>
                                    Products
                                </Text>
                                <ScrollView contentContainerStyle={{ flexDirection: 'row', gap: width * 0.04, flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                    {Products.map((item) => (
                                        <TouchableOpacity key={item.id} style={{
                                            width: width * 0.4,
                                            height: height * 0.25,
                                            borderRadius: height * 0.01,
                                            // backgroundColor: '#222',
                                            padding: width * 0.02
                                        }}
                                        >
                                            <View style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                                                <View style={{ width: '100%', height: '80%', backgroundColor: 'white' }}>
                                                    <Image
                                                        source={{ uri: 'https://source.unsplash.com/white-v-neck-shirt-on-brown-clothes-hanger-p8Drpg_duLw' }}
                                                        resizeMode='cover'
                                                        style={{ width: '100%', height: '100%' }} />
                                                </View>
                                                <View style={{ width: '100%', height: '20%', alignItems: 'flex-start' }}>
                                                    <Text style={{ color: '#222', fontWeight: 'bold', fontSize: width * 0.04 }} >
                                                        {item.name}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            color: '#fff',
                                                            fontWeight: 'bold',
                                                            backgroundColor: `${item.status.bgColor}`,
                                                            paddingHorizontal: width * 0.03,
                                                            paddingVertical: width * 0.005,
                                                            borderRadius: height * 0.005,
                                                            fontSize: width * 0.03
                                                        }}
                                                    >
                                                        {item.status.isAvailable}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View> */}
                        </View>
                    </ScrollView>
                </SafeAreaView>


            </View>
        </>
    )
}

export default SelectedStore
