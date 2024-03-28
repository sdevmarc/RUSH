import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../components/Navbar'

const { width, height } = Dimensions.get('window')

const PaymentOption = () => {
  const navigation = useNavigation()

  return (
    <>
    <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
    <View style={{ width: width, height: height, backgroundColor: '#323d48' }}>
        <Navbar title='Payment Method' backgroundColor='#323d48' />
        <ScrollView>
            <View style={{ width: width, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>

            </View>
        </ScrollView>
    </View>
</>
  )
}

export default PaymentOption