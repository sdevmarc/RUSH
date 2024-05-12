import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

const { width, height } = Dimensions.get('window')

const Navbar = ({ backgroundColor, remove, tintColor, title }) => {
    const navigation = useNavigation()

    return (
        <View
            style={{
                position: 'absolute',
                width: '100%',
                height: height * 0.12,
                overflow: 'hidden',
                zIndex: 1,
                backgroundColor: `${backgroundColor}`,
                paddingVertical: height * 0.009,
                borderBottomWidth: 1,
                borderBottomColor: "#dddddd"
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
                <TouchableOpacity onPress={() => {
                    { remove }
                    navigation.goBack()
                }} >
                    <Ionicons name="chevron-back-circle" size={width * 0.08} color={tintColor} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: `${tintColor}` }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default Navbar