import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    ScrollView,
    TextInput,
    Alert,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native'
import React, { useCallback, useState } from 'react'
import * as Colors from '../../utils/colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import address from '../../config/host'
import Loading from './Loading'
import * as ImagePicker from 'expo-image-picker'
import BottomBar from './BottomBar'

const { width, height } = Dimensions.get('window')

export default function RateProductModal({ isVisible, onClose }) {
    const [isLoading, setIsLoading] = useState(false)
    const [ratings, setRatings] = useState({ product: 0, service: 0 });
    const [comments, setComments] = useState('');

    const renderStars = (ratingType) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRatings({ ...ratings, [ratingType]: i })}>
                    <MaterialIcons
                        name={'star'}
                        size={height * 0.03}
                        color={ratings[ratingType] >= i ? Colors.orange : Colors.semiblack}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    }

    return (
        <>
            <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} presentationStyle="pageSheet">
                <View style={{ width: width, height: height, backgroundColor: Colors.backgroundColor }}>
                    {isLoading && <Loading title={`Loading`} />}
                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: height * 0.12,
                            overflow: 'hidden',
                            zIndex: 1,
                            backgroundColor: Colors.backgroundColor,
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
                                onPress={onClose}
                            >
                                <Ionicons name="chevron-back-circle" size={width * 0.08} color={Colors.black} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', height: '100%', position: 'absolute', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={{ fontSize: width * 0.05, fontWeight: 'bold', color: `${Colors.fontColor}` }}>
                                Rate
                            </Text>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <ScrollView>
                            <View style={{ width: width, height: height * 0.9, paddingHorizontal: width * 0.03, paddingVertical: height * 0.03 }}>
                                <View style={{ width: '100%', height: '100%', paddingTop: height * 0.1, gap: height * 0.01 }}>
                                    <Text style={{ color: Colors.fontColor, fontSize: height * 0.018 }}>
                                        Please rate the following
                                    </Text>
                                    <View style={{ overflow: 'hidden', width: '100% ', height: height * 0.12, backgroundColor: Colors.idleColor, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01, padding: height * 0.01 }}>
                                        <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '70%', height: '100%' }}>
                                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                    <Text style={{ color: Colors.fontColor, fontSize: height * 0.017, fontWeight: '600', gap: height * 0.01 }}>
                                                        Rate the product
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {renderStars('product')}
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                                    {ratings.product}/5
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                    <View style={{ overflow: 'hidden', width: '100% ', height: height * 0.12, backgroundColor: Colors.idleColor, justifyContent: 'center', alignItems: 'center', borderRadius: height * 0.01, padding: height * 0.01 }}>
                                        <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                                            <View style={{ width: '70%', height: '100%' }}>
                                                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                                    <Text style={{ color: Colors.fontColor, fontSize: height * 0.017, fontWeight: '600', gap: height * 0.01 }}>
                                                        Rate the service
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {renderStars('service')}
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ width: '30%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: Colors.fontColor, fontSize: height * 0.02, fontWeight: '600' }}>
                                                    {ratings.service}/5
                                                </Text>
                                            </View>

                                        </View>
                                    </View>
                                    <Text style={{ color: Colors.fontColor, fontSize: height * 0.018 }}>
                                        Do you have any comments?
                                    </Text>
                                    <View style={{ overflow: 'hidden', width: '100% ', height: height * 0.12, backgroundColor: Colors.idleColor, borderRadius: height * 0.01, padding: height * 0.01 }}>
                                        <View style={{ width: '100%', height: '100%', backgroundColor: Colors.semiblack, borderRadius: height * 0.01 }}>
                                            <TextInput
                                                style={{ width: '100%', height: '100%', padding: height * 0.01, color: Colors.whiteColor }}
                                                placeholder='Enter your comment here...'
                                                multiline={true}
                                                numberOfLines={4}
                                                value={comments}
                                                onChangeText={setComments}
                                                returnKeyType="done"
                                                onSubmitEditing={Keyboard.dismiss}
                                            />
                                        </View>
                                    </View>

                                </View>
                            </View>
                            <BottomBar title='RATE' />
                        </ScrollView >
                    </TouchableWithoutFeedback>
                </View >
            </Modal >
        </>
    )
}