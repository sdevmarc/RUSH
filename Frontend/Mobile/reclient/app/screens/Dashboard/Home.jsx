import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    Animated,
    StatusBar,
    TextInput,
    ImageBackground
} from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useFonts } from 'expo-font';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../../config/host'
import * as Colors from '../../../utils/colors'
import Loading from '../../components/Loading';

const { width, height } = Dimensions.get('window')

const Categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Clothes' },
    { id: 3, name: 'Electronic' },
    { id: 4, name: 'Accessories' },
    { id: 5, name: 'Homegoods' },
    { id: 6, name: 'Beauty' },
    { id: 7, name: 'Sports' },
    { id: 8, name: 'Toys' },
    { id: 9, name: 'Sports' },
    { id: 10, name: 'Food' },
    { id: 11, name: 'Pets' }
]

const Home = ({ route }) => {
    const [stores, setStores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)
    const navigation = useNavigation()
    const scrollY = useRef(new Animated.Value(0)).current;
    const [activeCategory, setActiveCategory] = useState(Categories[0].id);
    const scrollViewRef = useRef();

    useFocusEffect(useCallback(() => {
        fetchStores()
    }, []))

    const fetchStores = async () => {
        try {
            setIsLoading(true)
            const token = await AsyncStorage.getItem('token')

            const data = await axios.get(`http://${address}/api/getallstore`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (data?.data?.data.length === 0) {
                setIsLoading(false)
                setImageLoading(false)
                return
            } else {
                setStores(data?.data?.data)
            }
        } catch (error) {
            console.error(`Error Home: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }
    const handleCategoryPress = (item, index) => {
        setActiveCategory(item.id);
        scrollViewRef.current.scrollTo({
            x: index * (width * 0.2) - (width / 2) + (width * 0.1),
            animated: true,
        });
    }

    const handleSelectStore = async (item, id) => {
        navigation.navigate('SelectedStore', { userId: item, storeId: id })
    }

    const headerHeight = scrollY.interpolate({
        inputRange: [0, height * 0.2],
        outputRange: [height * 0.29, height * 0.14],
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

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                {(isLoading || imageLoading) && <Loading title={`Loading`} />}
                <Animated.View style={{ width: '100%', height: headerHeight }}>
                    <View
                        style={{
                            position: 'absolute',
                            top: height * 0.07,
                            width: '100%',
                            paddingHorizontal: width * 0.05,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 2
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            top: height * 0.07,
                            width: '100%',
                            paddingHorizontal: width * 0.05,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Animated.View style={{ opacity: opacityTitle1 }}>
                            <Text style={{ fontSize: width * 0.04, color: Colors.fontColor, fontFamily: 'Poppins-Bold' }}>
                                Home
                            </Text>
                        </Animated.View>
                    </View>
                    <Animated.View style={{ opacity, position: 'absolute', top: height * 0.14, paddingHorizontal: width * 0.05, width: width }}>
                        <Text style={{ fontSize: width * 0.05, fontWeight: '700', color: Colors.fontColor, fontFamily: 'Poppins-Bold' }}>
                            Discover
                        </Text>
                        <Text style={{ fontSize: width * 0.07, color: Colors.fontColor, fontWeight: '700', fontFamily: 'Poppins-Bold' }}>
                            The Best Rental Place in Nueva Vizcaya
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
                    <View style={{ width: width, gap: height * 0.022, paddingBottom: height * 0.5 }}>
                        <View style={{ width: '100%', gap: height * 0.02 }}>
                            <View style={{ width: '100%', paddingHorizontal: width * 0.03 }}>
                                <TextInput style={{ height: height * 0.06, backgroundColor: '#e8e8e8', borderRadius: 10, paddingHorizontal: width * 0.05, fontSize: width * 0.035 }} placeholder='Search for stores, items, categories...' />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: width * 0.03, paddingHorizontal: width * 0.03 }}>
                                <Text style={{ fontSize: width * 0.05, color: Colors.fontColor, fontFamily: 'Poppins-Bold' }}>
                                    Categories
                                </Text>
                            </View>
                            <ScrollView
                                ref={scrollViewRef}
                                contentContainerStyle={{
                                    paddingHorizontal: width * 0.03,
                                    paddingVertical: height * 0.0065,
                                    gap: width * 0.02,
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                {Categories.map((item) => (
                                    <TouchableOpacity
                                        key={item?.id}
                                        onPress={() => handleCategoryPress(item, item?.id)}
                                        style={{
                                            paddingHorizontal: width * 0.05,
                                            paddingVertical: height * 0.0065,
                                            borderRadius: height * 0.01,
                                            backgroundColor: activeCategory === item.id ? Colors.orange : Colors.idleColor,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins-Regular',
                                                color: activeCategory === item.id ? Colors.whiteColor : Colors.fontColor
                                            }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ width: '100%', gap: height * 0.022, paddingHorizontal: width * 0.03 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: width * 0.03 }}>
                                <Text style={{ fontSize: width * 0.05, color: Colors.fontColor, fontFamily: 'Poppins-Bold' }}>
                                    Rent Shops
                                </Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {stores.map((item) => (
                                    <TouchableOpacity
                                        key={item.userId}
                                        onPress={() => handleSelectStore(item.userId, item._id)}
                                        style={{
                                            overflow: 'hidden',
                                            width: width * 0.452,
                                            height: height * 0.3,
                                            borderRadius: height * 0.02,
                                            backgroundColor: '#4a4c59'
                                        }}
                                    >
                                        <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                                            <ImageBackground
                                                source={{ uri: `${item.shopInformation.shopImage}` }}
                                                onLoad={() => setImageLoading(false)}
                                                onError={() => setImageLoading(false)}
                                                resizeMode='cover'
                                                style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                                            >
                                                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.03, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Text style={{ width: '50%', color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }} numberOfLines={2} ellipsizeMode='tail'>
                                                            {item.shopInformation.shopName}
                                                        </Text>
                                                        <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }} numberOfLines={1} ellipsizeMode='tail'>
                                                            <MaterialIcons name="star" size={24} color={Colors.whiteColor} />
                                                        </Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>
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
