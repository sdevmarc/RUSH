import {
    View,
    Text,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

const Orders = () => {
    const navigation = useNavigation()

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <View
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: height * 0.12,
                    zIndex: 1,
                    backgroundColor: '#323d48',
                    paddingVertical: height * 0.009
                }}
            >
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        paddingHorizontal: width * 0.05,
                        width: width,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        zIndex: 1
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                    >
                        <MaterialCommunityIcons name="dots-grid" size={width * 0.08} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: 'white' }}>
                        Orders
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                    <View style={{ width: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                        <Text>
                            Orders Text
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </>
    )
}

export default Orders