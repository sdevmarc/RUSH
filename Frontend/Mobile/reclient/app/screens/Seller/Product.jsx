import {
    View,
    Text,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import { MaterialIcons } from '@expo/vector-icons'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const Product = () => {
    const navigation = useNavigation()

    const handleOnPressAddProduct = () => {
        navigation.navigate('AddProduct')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='Products' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <TextInput style={{ width: '100%', height: height * 0.06, paddingHorizontal: width * 0.03, borderRadius: height * 0.02, backgroundColor: Colors.idleColor }} placeholder='Search products here...' />
                            <TouchableOpacity
                                onPress={handleOnPressAddProduct}
                                style={{
                                    width: '100%',
                                    height: height * 0.06,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: Colors.orange,
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                    Add Product
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>

                            <View style={{ width: '100%', flexDirection: 'row', gap: width * 0.03, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    // key={item.userId}
                                    // onPress={() => handleSelectStore(item.userId, item._id)}
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
                                            // source={{ uri: `${item.shopInformation.shopImage}` }}
                                            source={{ uri: `https://source.unsplash.com/man-wearing-black-notched-lapel-suit-jacket-in-focus-photography-WMD64tMfc4k` }}
                                            resizeMode='cover'
                                            style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                                        >
                                            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-start', padding: width * 0.03, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }}>
                                                        {/* {item.shopInformation.shopName} */}
                                                        asdasdasd
                                                    </Text>
                                                    <Text style={{ color: Colors.whiteColor, fontWeight: '700', fontSize: width * 0.04 }}>
                                                        Rate
                                                    </Text>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                    </View>



                </ScrollView >
            </View >
        </>
    )
}

export default Product