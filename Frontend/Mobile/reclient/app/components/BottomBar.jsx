import {
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

const BottomBar = (props) => {

    return (
        <>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0, width: '100%',
                    height: height * 0.13,
                    backgroundColor: '#323d48',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: height * 0.015,
                    paddingHorizontal: width * 0.03
                }}>
                <View
                    style={{
                        width: width * 0.3,
                        height: height * 0.06,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        borderRadius: height * 0.015
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: '500', fontSize: width * 0.04 }}>
                        {props.subtitle}
                    </Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.05 }}>
                        {props.suboutput}
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={props.redirect}
                    style={{
                        width: width * 0.55,
                        height: height * 0.06,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#d7a152',
                        borderRadius: height * 0.02
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: width * 0.04 }}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default BottomBar