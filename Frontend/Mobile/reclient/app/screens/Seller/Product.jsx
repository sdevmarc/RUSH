import {
    View,
    Text,
    Dimensions,
    StatusBar,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window')

const Product = () => {

    const navigation = useNavigation()

    const handleOnPressAddProduct = () => {
        navigation.navigate('AddProduct')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='Products' backgroundColor='#323d48' />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                            <TouchableOpacity

                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    View Products
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleOnPressAddProduct}
                                style={{
                                    padding: width * 0.03,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: width * 0.03,
                                    backgroundColor: '#4a4c59',
                                    borderRadius: height * 0.01
                                }}
                            >
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                                    Add Product
                                </Text>
                                <MaterialIcons name="arrow-forward-ios" size={width * 0.05} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView >
            </View >
        </>
    )
}

export default Product