import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'
import * as Colors from '../../../utils/colors'

const { width, height } = Dimensions.get('window')

const DeliveryAddress = () => {
    const navigation = useNavigation()

    const handleAddAddress = () => {
        navigation.navigate('AddAddress')
    }

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                <Navbar title='My Addresses' backgroundColor={Colors.backgroundColor} tintColor={Colors.fontColor} />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    MARC EDISON D. SUAREZ
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    Address ni marc, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum perspiciatis aut maxime autem illum sed fugit? Doloribus harum voluptas vitae magni ad ab dicta! Nisi impedit voluptatibus expedita exercitationem similique.
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    +63 9333355555
                                </Text>
                                <View style={{ width: '100%', height: height * 0.04, borderRadius: height * 0.01, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                        Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.007, backgroundColor: Colors.idleColor, padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    MARC EDISON D. SUAREZ
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    Address ni marc, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum perspiciatis aut maxime autem illum sed fugit? Doloribus harum voluptas vitae magni ad ab dicta! Nisi impedit voluptatibus expedita exercitationem similique.
                                </Text>
                                <Text style={{ color: Colors.fontColor, textAlign: 'justify' }}>
                                    +63 9333355555
                                </Text>
                                <View style={{ width: '100%', height: height * 0.04, borderRadius: height * 0.01, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                        Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleAddAddress}
                                style={{ width: '100%', height: height * 0.05, borderRadius: height * 0.01, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={{ color: Colors.whiteColor, fontWeight: 'bold' }}>
                                    Add address
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default DeliveryAddress