import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import colors from '../../../constants/color';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DepartmentAction } from '../../../redux/actions/authAction';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../page/ThemeContext';

const dropDown1 = [

  {
    label: 'Default',
    value: 0
  },
  {
    label: 'A->Z',
    value: 1,
  },
  {
    label: 'Z->A',
    value: 2,
  },
];

const Users = () => {
  const widthAnimated = useSharedValue('65%');
  const widthAnimatedFilter = useSharedValue('30%');

  const styleSearchBox = useAnimatedStyle(() => {
    return {
      width: withTiming(widthAnimated.value, { duration: 800 }),
    };
  });
  const styleFilterBox = useAnimatedStyle(() => {
    return {
      width: withTiming(widthAnimatedFilter.value, { duration: 800 }),
    };
  });
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation()
  const [value, setValue] = useState(null);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [isFocusedFilter, setIsFocusedFilter] = useState(false);
  const [showSearch, setShowSearch] = useState('0');

  const [filterData, setFilterData] = useState();


  const fillterFunc = (filterval, searchval) => {
    switch (filterval) {
      case 0:
        return searchval
          ? department.filter(item => item.name.toLowerCase().includes(searchval.toLowerCase())
            || item.id.toLowerCase().includes(searchval.toLowerCase()))
          : department;

      case 1:
        return department.filter(item => item.name.toLowerCase().includes(searchval.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 2:
        return department.filter(item => item.name.toLowerCase().includes(searchval.toLowerCase())).sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        return department.filter(item =>
          item.name.toLowerCase().includes(searchval.toLowerCase())
          || item.id.toLowerCase().includes(searchval.toLowerCase())
        );
        break;
    }
  }
  const [isLoading, setIsLoading] = useState(false);
  const { department, user } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDepartment = async () => {
      setIsLoading(true);
      await dispatch(DepartmentAction(user?.accessToken, setFilterData));
      setIsLoading(false);
      // Mặc định chạy hiển thị danh sách trước khi ấn filter
    };
    fetchDepartment();
  }, []);
  const handleTouchDepartment = (key) => {
    navigation.navigate('DepartmentScreen', { key });
  }

  //Dark Mode
  const { isDarkMode } = useTheme()
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff', }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={styles.header}>
          <View>
            <Image
              style={styles.imgLogo}
              source={require('../../../img/avatar.png')}></Image>
          </View>
          <View>
            <Text style={{ color: isDarkMode ? '#FFFFFF' : colors.text }}>Welcome</Text>
            <Text style={[styles.text, {
              color: isDarkMode ? '#FFFFFF' : colors.text,
            }]}>{user.username}</Text>
          </View>
        </View>
        <View>
          <MaterialCIcons
            name="bell-outline"
            color={isDarkMode ? '#FFFFFF' : "black"}
            size={30}
          />
          <View style={styles.reddot}></View>
        </View>
      </View>
      <View style={{ marginTop: 40 }}>
        <View style={[styles.viewSearchDropdown]}>
          <Animated.View
            style={[
              styles.box,
              styleSearchBox,
              isFocusedSearch && {
                borderColor: colors.borderBlue,
                borderWidth: 1,
              },
              { justifyContent: isFocusedFilter ? 'center' : 'flex-start', backgroundColor: isDarkMode ? '#505050' : '#e1e9ee' },
            ]}>
            <AntIcon size={20} color={isDarkMode ? '#FFFFFF' : '#121212'} name="search1" />
            {!isFocusedFilter && (
              <TextInput
                style={{ paddingHorizontal: 5, width: '100%', color: isDarkMode ? '#FFFFFF' : '#121212' }}
                onFocus={() => {
                  widthAnimated.value = '65%';
                  widthAnimatedFilter.value = '30%';
                  setIsFocusedSearch(true);
                }}
                onEndEditing={() => {
                  widthAnimated.value = '65%';
                  widthAnimatedFilter.value = '30%';

                  setShowSearch(false), setIsFocusedSearch(false);
                }}
                placeholder="Search..."
                placeholderTextColor={isDarkMode ? '#FFFFFF' : '#9bacc5'}
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}></TextInput>
            )}
          </Animated.View>
          {/* )} */}
          {/* <Text>{showSearch}</Text> */}
          {/* {(showSearch == '2' || showSearch == '0') && ( */}
          <Animated.View style={[styles.boxFilter, styleFilterBox, {
            backgroundColor: isDarkMode ? '#505050' : '', borderRadius: 25

          }]}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocusedFilter && {
                  borderColor: colors.borderBlue,
                  borderWidth: 1,
                },
                {
                  backgroundColor: isDarkMode ? '#505050' : '#e1e9ee', borderColor: isDarkMode ? '#9bacc5' : '#e1e9ee'
                }
              ]}
              placeholderStyle={[styles.placeholderStyle, {
                color: isDarkMode ? '#FFFFFF' : '#9bacc5',
              }]}
              selectedTextStyle={[styles.selectedTextStyle, { color: isDarkMode ? "#FFFFFF" : '#9bacc5' }]}
              inputSearchStyle={styles.inputSearchStyle}

              iconStyle={[styles.iconStyle]}
              data={dropDown1}
              placeholder={
                !isFocusedFilter ? (
                  <MaterialCIcons
                    size={24}
                    style={{ color: isDarkMode ? '#FFFFFF' : '#9bacc5' }}
                    name="movie-filter-outline"></MaterialCIcons>
                ) : (
                  'Filter'
                )
              }
              maxHeight={300}
              labelField="label"
              valueField="value"
              onFocus={() => {
                setShowSearch('2');
                widthAnimatedFilter.value = '80%';
                setTimeout(() => {
                  setIsFocusedFilter(true);
                }, 700);
                widthAnimated.value = '13%';
              }}
              onBlur={() => {
                widthAnimatedFilter.value = '30%';
                widthAnimated.value = '65%';
                setShowSearch(false), setIsFocusedFilter(false);
              }}
              value={value}
              onChange={value => {
                setValue(value.value);
                setIsFocusedFilter(false);
                // handleFilterData(value.value);
              }}></Dropdown>
          </Animated.View>
          {/* )} */}
        </View>
        <Text
          style={{
            color: isDarkMode ? '#FFFFFF' : 'black',
            fontSize: 28,
            fontWeight: '700',
            padding: 10,
            marginTop: 10,
          }}>
          Department
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false} style={{ height: '78%', color: 'red' }}>
          <SafeAreaView>
            {isLoading ? (
              Array.from({ length: 5 }, (_, index) => (
                <View style={{ padding: 5, }} key={index} >
                  <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                    <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                      <SkeletonPlaceholder.Item width={355} height={85} borderRadius={10} />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                </View>
              ))
            ) : (
              <View >
                {fillterFunc(value, searchQuery)?.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => { handleTouchDepartment(item.key) }}
                  >
                    <View style={[styles.dataList, {
                      backgroundColor: isDarkMode ? '#313131' : '#e1e9ee',
                    }]} >
                      <View style={styles.dataItem}>
                        <View
                          style={{ alignItems: 'center', alignContent: 'center' }}>
                          <View style={{ padding: 10, borderColor: 'red' }}>
                            <Image
                              style={styles.logoItem}
                              source={require('../../../img/department.png')}></Image>
                          </View>
                        </View>
                        <View style={{ flexWrap: 'wrap' }}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: isDarkMode ? '#FFFFFF' : 'black',
                              fontWeight: '800',
                            }}>
                            {item.id}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"

                            style={{
                              fontSize: 18,
                              color: isDarkMode ? '#FFFFFF' : 'black',
                              fontWeight: '400',
                              maxWidth: 200
                            }}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{ alignItems: 'flex-end', paddingHorizontal: 10 }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: isDarkMode ? '#0D7BF8' : 'blue',
                              fontWeight: 'bold',
                            }}>
                            {item.male}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#ff1aee',
                              fontWeight: 'bold',
                            }}>
                            {item.female}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </SafeAreaView>
        </ScrollView>
      </View>
    </SafeAreaView >
  );
};
export default Users;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: '100%',
  },
  imgLogo: {
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: colors.borderBlue,
    borderWidth: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  header: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    fontSize: 20,
  },
  logoItem: {
    alignItems: 'center',
    width: 50,
    height: 50,
    shadowColor: 'gray',
    padding: 10,
    // borderWidth: 2,
    // borderColor: colors.borderBlue,
    // borderRadius: 10,
  },
  dataList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    // alignContent: 'center',
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  //Dropdown
  viewDropdown: {
    padding: 5,
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    borderRadius: 50,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  viewSearchDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  //Dropdown
  selectedValueContainer: {
    marginTop: 20,
  },
  selectedValueText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerDropdown: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    backgroundColor: '#e1e9ee',
  },
  // animation
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e9ee',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 50,
  },

  //icon notification
  reddot: {
    position: 'absolute',
    right: 3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
