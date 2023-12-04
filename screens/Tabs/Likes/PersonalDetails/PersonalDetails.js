import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../../../constants/color';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Buffer } from 'buffer';
import { fetch } from 'whatwg-fetch';
import {
    differenceInYears,
    differenceInMonths,
    format,
    parseISO,
} from 'date-fns';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../page/ThemeContext';

const img = require('../../../../img/anhBeti.jpg');
export default function PersonalDetails({ route }) {
    const [personDetails, setPersonDetails] = useState([]);
    const { item } = route.params;
    const { id } = item;
    const { user } = useSelector(state => state.authReducer);
    const [clickImage, setClickImage] = useState(0);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const navigation = useNavigation();
    const { isDarkMode } = useTheme()

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://erp.lacty.com.vn:5000/user/${id}`, {
            headers: { 'X-Access-Token': user?.accessToken },
        })
            .then(response => response.json())
            .then(data => {
                const name = data[0]?.name;
                const address = data[0]?.address;
                const phone = data[0]?.phone_number;
                const formattedBirthday = format(
                    parseISO(data[0]?.birthday),
                    'dd/MM/yyyy',
                );
                const formattedDateCome = format(
                    parseISO(data[0]?.date_come),
                    'dd/MM/yyyy',
                );
                const age = differenceInYears(new Date(), parseISO(data[0]?.birthday));
                //Tính số năm, tháng đã vào làm
                const monthsWorked = differenceInMonths(
                    new Date(),
                    parseISO(data[0]?.date_come),
                );
                const yearsWorked = differenceInYears(
                    new Date(),
                    parseISO(data[0]?.date_come),
                );
                const months = monthsWorked % 12;
                let base64data = new Buffer(data[0].image).toString('base64');
                let zodiac = '';
                //Tính Cung Hoàng Đạo
                const formattedDate = format(parseISO(data[0]?.birthday), 'dd');
                const formattedMonth = format(parseISO(data[0]?.birthday), 'MM');
                const month = parseInt(formattedMonth);
                switch (month) {
                    case 1:
                        zodiac = formattedDate >= 20 ? 'Bảo Bình' : 'Ma Kết';
                        break;
                    case 2:
                        zodiac = formattedDate >= 20 ? 'Song Ngư' : 'Bảo Bình';
                        break;
                    case 3:
                        zodiac = formattedDate >= 21 ? 'Bạch Dương' : 'Song Ngư';
                        break;
                    case 4:
                        zodiac = formattedDate >= 21 ? 'Kim Ngưu' : 'Bạch Dương';
                        break;
                    case 5:
                        zodiac = formattedDate >= 22 ? 'Song Tử' : 'Kim Ngưu';
                        break;
                    case 6:
                        zodiac = formattedDate >= 22 ? 'Cự Giải' : 'Song Tử';
                        break;
                    case 7:
                        zodiac = formattedDate >= 23 ? 'Sư Tử' : 'Cự Giải';
                        break;
                    case 8:
                        zodiac = formattedDate >= 22 ? 'Xử Nữ' : 'Sư Tử';
                        break;
                    case 9:
                        zodiac = formattedDate >= 24 ? 'Thiên Bình' : 'Xử Nữ';
                        break;
                    case 10:
                        zodiac = formattedDate >= 23 ? 'Thiên Yết' : 'Thiên Bình';
                        break;
                    case 11:
                        zodiac = formattedDate >= 23 ? 'Nhân Mã' : 'Thiên Yết';
                        break;
                    case 12:
                        zodiac = formattedDate >= 23 ? 'Ma Kết' : 'Nhân Mã';
                        break;
                    default:
                        zodiac = 'Không xác định';
                        break;
                }
                //Sô chủ đạo
                let sum = 0;
                const number = formattedBirthday.replace(/\D/g, '');
                for (let i = 0; i < number.length; i++) {
                    sum += parseInt(number[i], 10);
                    while (sum > 9) {
                        sum = sum
                            .toString()
                            .split('')
                            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
                    }
                }
                const reducedData = {
                    name: name,
                    address: address,
                    phone: phone,
                    birthday: formattedBirthday,
                    date_come: formattedDateCome,
                    age: age,
                    monthsWorked: months,
                    yearsWorked: yearsWorked,
                    img: base64data,
                    zodiac: zodiac,
                    mainNumber: sum,
                };

                setPersonDetails(reducedData);
                setImageSize(base64data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id, user?.accessToken]);
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        const restoreActiveStatus = async () => {
            const storedLikes = await AsyncStorage.getItem('Likes');
            const parsedLikes = JSON.parse(storedLikes);
            const isItemLiked =
                parsedLikes && parsedLikes.some(likedItem => likedItem.id === item.id);
            setIsActive(isItemLiked);
        };
        restoreActiveStatus();
    }, []);
    const handleRemove = async () => {
        const getDataLikes = JSON.parse(await AsyncStorage.getItem('Likes'));
        if (getDataLikes) {
            const updatedLikes = await getDataLikes.filter(
                likedItem => likedItem.id != item.id,
            );
            await AsyncStorage.setItem('Likes', JSON.stringify(updatedLikes));
            setIsActive(false);
        }
        // console.log('data after removal', updatedLikes);
        item.image = '';
    };
    const handleActive = async () => {
        const getDataLikes = JSON.parse(await AsyncStorage.getItem('Likes'));
        if (getDataLikes == null) {
            setIsActive(!isActive);
            await AsyncStorage.setItem('Likes', JSON.stringify([item]));
        } else {
            let isIdPresent = false;

            for (let i = 0; i < getDataLikes.length; i++) {
                const likedItem = getDataLikes[i];

                if (likedItem.id === item.id) {
                    isIdPresent = true;
                    break;
                }
            }
            if (!isIdPresent) {
                await AsyncStorage.setItem(
                    'Likes',
                    JSON.stringify([...getDataLikes, item]),
                );
                setIsActive(!isActive);
            } else {
                // await AsyncStorage.setItem('Likes', JSON.stringify([...getDataLikes]));
                setIsActive(false);
                handleRemove();
            }
        }
        // console.log('data', getDataLikes);
        item.image = '';
    };
    const handleRotateImage = () => {
        const newRotate = (clickImage + 90) % 360;
        setClickImage(newRotate);
    };
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = e => {
        setScrollY(e.nativeEvent.contentOffset.y);
    };
    const calculateImageOpacity = () => {
        const maxScroll = 50;
        const opacity = 1 - scrollY / maxScroll;
        return opacity < 0 ? 0 : opacity;
    };
    const calculateContainerStyle = () => {
        return scrollY > 50 ? 'row' : 'column';
    };
    const calculateGapStyle = () => {
        return scrollY > 50 ? 20 : 0;
    };
    const calculateHeightStyle = () => {
        return scrollY > 50 ? 70 : 100;
    };
    const calculateWidthStyle = () => {
        return scrollY > 50 ? 70 : 100;
    };
    const calculateTextStyle = () => {
        return scrollY > 50 ? 18 : 22;
    };
    const calculatePaddingStyle = () => {
        return scrollY > 50 ? 10 : 0;
    };
    const calculateBottomStyle = () => {
        return scrollY > 50 ? 100 : 0;
    };

    return (
        <SafeAreaView style={{ backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }}>
            <StatusBar hidden />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                contentContainerStyle={{ height: 1000 }}
                scrollEventThrottle={16} stickyHeaderIndices={[0]} >
                <View style={{ flex: 1 }}>
                    <View style={{}}>
                        <ImageBackground
                            style={{
                                width: '100%',
                                height: 250,
                                maxHeight: 400,
                                justifyContent: 'center',
                                opacity: calculateImageOpacity(),
                            }}
                            source={require('../../../../img/anhdep.png')}>
                        </ImageBackground>
                        <View
                            style={{
                                // flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                position: 'absolute',
                                top: 0,
                                left: 20,
                                right: 20,
                                bottom: 200,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <View>
                                    {isDarkMode ?
                                        <Image source={require('../../../../img/arrow-left_white.png')} />
                                        :
                                        <Image source={require('../../../../img/arrow-left_black.png')} />
                                    }
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleActive}>
                                <View>
                                    {isDarkMode ? <Image
                                        source={
                                            isActive
                                                ? require('../../../../img/bookmark_yellow.png')
                                                : require('../../../../img/bookmark_white.png')
                                        }
                                    /> : <Image
                                        source={
                                            isActive
                                                ? require('../../../../img/bookmark_yellow.png')
                                                : require('../../../../img/bookmark.png')
                                        }
                                    />}
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ bottom: calculateBottomStyle() }}>
                        <View
                            style={{
                                alignItems: 'center',
                                // position: 'relative',
                                zIndex: 2,
                                // marginBottom: 15,
                                bottom: 60,
                                flexDirection: calculateContainerStyle(),
                                gap: calculateGapStyle(),
                                paddingHorizontal: calculatePaddingStyle(),
                            }}>
                            {isLoading ? (
                                <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                    <View style={{ width: 100, height: 100, borderRadius: 50 }} />
                                </SkeletonPlaceholder>
                            ) : (
                                <TouchableOpacity onPress={handleRotateImage}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            width: calculateWidthStyle(),
                                            height: calculateHeightStyle(),
                                            borderWidth: 2,
                                            borderColor: '#f2f6f9',
                                            borderRadius: 60,
                                            // opacity: calculateImageOpacity(),
                                            // transform: [{ rotate: clickImage }]
                                            transform: [{ rotate: `${clickImage}deg` }],
                                        }}
                                        source={{
                                            uri: `data:image/jpeg;base64,${personDetails.img}`,
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            {isLoading ? (
                                <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                    <View
                                        style={{
                                            width: 250,
                                            height: 28,
                                            borderRadius: 5,
                                            marginTop: 10,
                                        }}
                                    />
                                </SkeletonPlaceholder>
                            ) : (
                                <Text
                                    style={{
                                        marginTop: 10,
                                        fontSize: calculateTextStyle(),
                                        fontWeight: 'bold',
                                        color: isDarkMode ? '#FFFFFF' : 'black',
                                        textAlign: 'center',
                                    }}>
                                    {personDetails.name}
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 20,
                                gap: 10,
                                // position: 'relative',
                                bottom: 40,
                                height: 1000
                            }}>
                            <View>
                                <Text style={{ fontSize: 17, color: isDarkMode ? '#FFFFFF' : '#0d0d0d', fontWeight: '500' }}>
                                    Thông tin cá nhân
                                </Text>
                            </View>

                            <View style={{ gap: 10 }}>
                                <View
                                    style={[
                                        styles.viewText,
                                        {
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#dfdfdf',
                                            paddingBottom: 6,
                                        },
                                    ]}>
                                    <View style={{ width: 140 }}>
                                        <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : '#0d0d0d' }]}>Phone:</Text>
                                    </View>
                                    <View>
                                        {isLoading ? (
                                            <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                                <View style={{ width: 200, height: 20, borderRadius: 4 }} />
                                            </SkeletonPlaceholder>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const phone = personDetails.phone;
                                                    Linking.openURL(`https://zalo.me/${phone}`);
                                                }}>
                                                <Text
                                                    style={{ fontSize: 16, fontWeight: '400', color: isDarkMode ? '#FFFFFF' : '#0d0d0d' }}>
                                                    {personDetails.phone}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                                <View>
                                    <View
                                        style={[
                                            styles.viewText,
                                            {
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#dfdfdf',
                                                paddingBottom: 6,
                                            },
                                        ]}>
                                        <View style={{ width: 140 }}>
                                            <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>Date Come:</Text>
                                        </View>
                                        <View>
                                            {isLoading ? (
                                                <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                                    <View style={{ width: 200, height: 20, borderRadius: 4 }} />
                                                </SkeletonPlaceholder>
                                            ) : (
                                                <View style={[{ flexDirection: 'row' }]}>
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: '400',
                                                            color: isDarkMode ? '#FFFFFF' : 'black',
                                                        }}>
                                                        {personDetails.date_come}
                                                    </Text>
                                                    <Text style={[styles.textProfileBold, { color: isDarkMode ? '#FFFFFF' : 'black', }]}> - </Text>
                                                    {personDetails.yearsWorked == 0 ? (
                                                        ''
                                                    ) : (
                                                        <Text style={[styles.textProfileBold, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>
                                                            {personDetails.yearsWorked} năm{' '}
                                                        </Text>
                                                    )}
                                                    <Text style={[styles.textProfileBold, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>
                                                        {personDetails.monthsWorked} tháng
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.viewText,
                                        {
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#dfdfdf',
                                            paddingBottom: 6,
                                        },
                                    ]}>
                                    <View style={{ width: 140 }}>
                                        <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>Birthday:</Text>
                                    </View>
                                    <View>
                                        {isLoading ? (
                                            <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                                <View style={{ width: 200, height: 20, borderRadius: 4 }} />
                                            </SkeletonPlaceholder>
                                        ) : (
                                            <View style={[{ flexDirection: 'row' }]}>
                                                <Text
                                                    style={{ fontSize: 16, fontWeight: '400', color: isDarkMode ? '#FFFFFF' : 'black', }}>
                                                    {personDetails.birthday}
                                                </Text>
                                                <Text style={[styles.textProfileBold, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>
                                                    {' '}
                                                    - {personDetails.age} tuổi
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                                <View
                                    style={[
                                        styles.viewText,
                                        {
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#dfdfdf',
                                            paddingBottom: 6,
                                        },
                                    ]}>
                                    <View style={{ width: 140 }}>
                                        <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>Số chủ đạo:</Text>
                                    </View>
                                    {isLoading ? (
                                        <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                            <View style={{ width: 200, height: 20, borderRadius: 4 }} />
                                        </SkeletonPlaceholder>
                                    ) : (
                                        <Text style={{ fontSize: 16, fontWeight: '400', color: isDarkMode ? '#FFFFFF' : 'black', }}>
                                            {personDetails.mainNumber}
                                        </Text>
                                    )}
                                </View>
                                <View
                                    style={[
                                        styles.viewText,
                                        {
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#dfdfdf',
                                            paddingBottom: 6,
                                        },
                                    ]}>
                                    <View style={{ width: 140 }}>
                                        <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>Cung hoàng đạo:</Text>
                                    </View>
                                    {isLoading ? (
                                        <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                            <View style={{ width: 200, height: 20, borderRadius: 4 }} />
                                        </SkeletonPlaceholder>
                                    ) : (
                                        <Text style={{ fontSize: 16, fontWeight: '400', color: isDarkMode ? '#FFFFFF' : 'black', }}>
                                            {personDetails.zodiac}
                                        </Text>
                                    )}
                                </View>
                                <View
                                    style={[
                                        styles.viewText,
                                        {
                                            borderBottomWidth: 1,
                                            borderBottomColor: '#dfdfdf',
                                            paddingBottom: 6,
                                            alignItems: 'flex-start',
                                        },
                                    ]}>
                                    <View style={{ width: 140 }}>
                                        <Text style={[styles.textProfile, { color: isDarkMode ? '#FFFFFF' : 'black', }]}>Address:</Text>
                                    </View>
                                    {isLoading ? (
                                        <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                                            <View style={{ width: 200, height: 60, borderRadius: 4 }} />
                                        </SkeletonPlaceholder>
                                    ) : (
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: '400',
                                                color: isDarkMode ? '#FFFFFF' : 'black',
                                                flexWrap: 'wrap',
                                                flex: 1,
                                            }}>
                                            {personDetails.address}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    textProfile: {
        fontSize: 16,

    },
    textProfileBold: {
        fontSize: 16,
        fontWeight: '500',
    },
    viewText: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        gap: 10,
    },
    line: {
        height: 2,
        flex: 1,
        backgroundColor: colors.borderIcon,
    },
});
