import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'

const { width, height } = Dimensions.get('window')

const DeliveryAddress = () => {
    const navigation = useNavigation()

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
                <Navbar title='My Addresses' backgroundColor='#323d48' />
                <ScrollView>
                    <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                        <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.02 }}>
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.007, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    MARC EDISON D. SUAREZ
                                </Text>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    Address ni marc, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum perspiciatis aut maxime autem illum sed fugit? Doloribus harum voluptas vitae magni ad ab dicta! Nisi impedit voluptatibus expedita exercitationem similique.
                                </Text>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    +63 9333355555
                                </Text>
                                <View style={{ width: '100%', height: height * 0.04, borderRadius: height * 0.01, backgroundColor: '#d7a152', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '100%', gap: height * 0.007, backgroundColor: '#4a4c59', padding: width * 0.03, borderRadius: height * 0.01, justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    MARC EDISON D. SUAREZ
                                </Text>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    Address ni marc, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum perspiciatis aut maxime autem illum sed fugit? Doloribus harum voluptas vitae magni ad ab dicta! Nisi impedit voluptatibus expedita exercitationem similique.
                                </Text>
                                <Text style={{ color: 'white', textAlign: 'justify' }}>
                                    +63 9333355555
                                </Text>
                                <View style={{ width: '100%', height: height * 0.04, borderRadius: height * 0.01, backgroundColor: '#d7a152', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                        Edit
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '100%', height: height * 0.05, borderRadius: height * 0.01, backgroundColor: '#d7a152', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>
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