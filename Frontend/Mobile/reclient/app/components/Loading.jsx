import { View, Text, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import * as Colors from '../../utils/colors'

const { width, height } = Dimensions.get('window')

export default function Loading({ title }) {
    return (
        <SafeAreaView style={{ position: 'absolute', zIndex: 1, width: width, height: height, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: width * 0.27, height: height * 0.12, borderRadius: height * 0.02, backgroundColor: Colors.idleColor, justifyContent: 'center', alignItems: 'center', gap: height * 0.01 }}>
                <ActivityIndicator size="large" />
                <Text style={{ fontWeight: '600', fontSize: height * 0.013 }}>
                    {title}
                </Text>
            </View>
        </SafeAreaView>
    )
}