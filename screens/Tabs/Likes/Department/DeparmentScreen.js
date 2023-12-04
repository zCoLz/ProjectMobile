import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useSelector } from 'react-redux';
import axios from 'axios';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
import colors from '../../../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../page/ThemeContext';
const dropDown1 = [
  {
    label: 'Default',
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
export default function DepartmentScreen({ route }) {
  //Animation
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

  const { key } = route.params;
  const { user } = useSelector(state => state.authReducer);
  const [isLoading, setIsLoading] = useState(null);
  const [choose, setChoose] = useState(0);
  const [value, setValue] = useState(null);
  const [isFocusedSearch, setIsFocusedSearch] = useState(false);
  const [isFocusedFilter, setIsFocusedFilter] = useState(false);
  const [error, setError] = useState(false);
  const navigation = useNavigation()

  const [department, setDepartment] = useState([]);
  useEffect(() => {
    // console.log('user', user?.error);
    const fetchDepartment = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://erp.lacty.com.vn:5000/user/department/${key}`,
          { headers: { 'X-Access-Token': user?.accessToken } },
        );
        const departmentData = response?.data;
        setDepartment(departmentData);
        // setIsLoading(false)
      } catch (error) {
        setError(error);
        console.error('Error fetching department:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartment();
  }, [key]);

  const [searchQuery, setSearchQuery] = useState('');
  const handSearch = text => {
    return department.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
  };
  const fillterFunc = (filterval, searchval) => {
    switch (filterval) {
      case 1:
        return department
          .filter(item =>
            item.name.toLowerCase().includes(searchval.toLowerCase()),
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 2:
        return department
          .filter(item =>
            item.name.toLowerCase().includes(searchval.toLowerCase()),
          )
          .sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        return department.filter(item =>
          item.name.toLowerCase().includes(searchval.toLowerCase()) ||
          item.id.toLowerCase().includes(searchval.toLowerCase()),
        );
        break;
    }
    // return department.sort((a, b) => a.name.localeCompare(b.name));
  };
  const { isDarkMode } = useTheme()

  return (
    <SafeAreaView style={{ backgroundColor: isDarkMode ? '#121212' : '#FFFFFF', padding: 10 }}>
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
      <View style={[styles.viewSearchDropdown]}>
        <Animated.View
          style={[
            styles.ViewSearchAnimation,
            styleSearchBox,
            isFocusedSearch && {
              borderColor: colors.borderBlue,
              borderWidth: 1,
            },
            { justifyContent: isFocusedFilter ? 'center' : 'flex-start', backgroundColor: isDarkMode ? '#505050' : '#e1e9ee', },
          ]}>
          <AntIcon size={20} color={isDarkMode ? '#FFFFFF' : '#121212'} name="search1" />
          {!isFocusedFilter && (
            <TextInput
              style={{ paddingHorizontal: 5, width: '100%', color: isDarkMode ? '#FFFFFF' : '#121212' }}
              placeholderTextColor={isDarkMode ? '#FFFFFF' : '#9bacc5'}
              autoCorrect={false}
              autoCapitalize="none"
              onFocus={() => {
                widthAnimated.value = '65%';
                widthAnimatedFilter.value = '30%';
                setIsFocusedSearch(true);
              }}
              onEndEditing={() => {
                widthAnimated.value = '65%';
                widthAnimatedFilter.value = '30%';
              }}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}></TextInput>
          )}
        </Animated.View>

        <Animated.View style={[styles.boxFilter, styleFilterBox]}>
          <Dropdown
            style={[
              styles.dropdown,
              isFocusedFilter && {
                borderColor: colors.borderBlue,
                borderWidth: 1,
              }, { backgroundColor: isDarkMode ? '#505050' : '#e1e9ee', borderColor: '#e1e1e1' }
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[styles.selectedTextStyle, { color: isDarkMode ? "#FFFFFF" : '#9bacc5' }]}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dropDown1}
            maxHeight={300}
            labelField="label"
            valueField="value"
            onFocus={() => {
              widthAnimatedFilter.value = '80%';
              setTimeout(() => {
                setIsFocusedFilter(true);
              }, 700);
              widthAnimated.value = '13%';
            }}
            onBlur={() => {
              widthAnimatedFilter.value = '30%';
              widthAnimated.value = '65%';
              setIsFocusedFilter(false);
            }}
            value={value}
            onChange={value => {
              setValue(value.value);
              setIsFocusedFilter(false);
              // handleFilterData(value.value);
            }}></Dropdown>
        </Animated.View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          height: '82%',
          backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
          borderRadius: 5,
          marginTop: 10,
        }}>
        {isLoading ? (
          Array.from({ length: 8 }, (_, index) => (
            <View key={index} style={{ padding: 10 }}>
              <SkeletonPlaceholder backgroundColor={isDarkMode ? '#313131' : '#e1e9ee'}>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                  <SkeletonPlaceholder.Item marginLeft={20} >
                    <SkeletonPlaceholder.Item width={280} height={20} />
                    <SkeletonPlaceholder.Item marginTop={6} width={150} height={20} />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          ))
        ) : (
          <View >
            {fillterFunc(value, searchQuery)?.map((item, index) => (
              <View key={index} style={{ padding: 10, }}>
                <Animated.View style={{ backgroundColor: isDarkMode ? '#313131' : '#e1e9ee', padding: 5, borderRadius: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PersonalDetails', { item })
                      setChoose(index);
                      // console.log('Index:', index);
                    }}>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        alignContent: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View>
                          {item.gender == 0 ? (
                            <View style={{}}>
                              <Image
                                style={{
                                  width: 50,
                                  height: 50,
                                  alignContent: 'center',
                                }}
                                source={require('../../../../img/female.png')}
                              />
                            </View>
                          ) : (
                            <View>
                              <Image
                                style={{
                                  width: 50,
                                  height: 50,
                                }}
                                source={require('../../../../img/male.png')}
                              />
                            </View>
                          )}
                        </View>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 10,
                              alignItems: 'flex-start',
                              justifyContent: 'flex-start',
                              alignContent: 'flex-start',
                            }}>
                            <View>
                              <Text
                                style={{
                                  color: isDarkMode ? '#FFFFFF' : '#212121',
                                  fontWeight: '700',
                                  fontSize: 16,
                                }}>
                                {item.name}
                                {/* {index} */}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: isDarkMode ? '#FFFFFF' : '#212121',
                                  fontSize: 15,
                                  fontWeight: '500',
                                }}>
                                {item.id}
                              </Text>
                            </View>
                          </View>
                          <View style={{ paddingHorizontal: 5 }}>
                            {/* {index == choose && ( */}
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: 15,
                                flexWrap: 'wrap',
                              }}>
                              <View>
                                {item.department_detail == null ? (
                                  ''
                                ) : (
                                  <Text
                                    style={{ color: isDarkMode ? '#FFFFFF' : '#212121', fontSize: 15 }}>
                                    {item.department_detail}
                                  </Text>
                                )}
                                {item.email == null ? (
                                  ''
                                ) : (
                                  <Text
                                    style={{
                                      color: isDarkMode ? '#FFFFFF' : '#212121',
                                      fontSize: 15,
                                      flexDirection: 'row',
                                    }}>
                                    Email: {item.email}
                                  </Text>
                                )}
                                {item.pwd == null ? (
                                  ''
                                ) : (
                                  <Text
                                    style={{
                                      color: isDarkMode ? '#FFFFFF' : '#212121',
                                      fontSize: 15,
                                      flexDirection: 'row',
                                    }}>
                                    Password: {item.pwd}
                                  </Text>
                                )}
                              </View>

                            </View>
                            {/* )} */}
                            <View>
                              <View
                                style={{ flexDirection: 'row' }}>
                                <View>
                                  {item.ip == null ? (
                                    ''
                                  ) : (
                                    <Text
                                      style={{
                                        color: isDarkMode ? '#FFFFFF' : '#212121',
                                        fontSize: 15,
                                      }}>
                                      {item.ip}
                                    </Text>
                                  )}
                                </View>
                              </View>
                              {/* <View
                                  style={{
                                    alignItems: '',
                                    flexDirection: 'column',
                                  }}>
                                  {item.tax == null ? (
                                    ''
                                  ) : (
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontSize: 15,
                                        gap: 10,
                                      }}>
                                      {item.tax}
                                    </Text>
                                  )}
                                </View> */}
                            </View>
                          </View>

                        </View>
                      </View>

                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                            }}>
                            <View style={{ alignItems: 'flex-end' }}>
                              <Text
                                style={{
                                  color: (() => {
                                    switch (item.status) {
                                      case 0:
                                        return 'red';
                                      case 1:
                                        return 'green';
                                      case 2:
                                        return 'green';
                                      default:
                                        return 'black';
                                    }
                                  })(),
                                }}>
                                {item.status == 0 ||
                                  item.status == 1 ||
                                  item.status == 2 ? (
                                  <Text style={{ fontSize: 18 }}>●</Text>
                                ) : null}
                              </Text>
                              <View style={{ alignItems: 'flex-end' }}>
                                <Text
                                  style={{
                                    color: isDarkMode ? '#FFFFFF' : '#212121',
                                    fontSize: 15,
                                    fontWeight: '500',
                                  }}>
                                  {item.pos}
                                </Text>
                              </View>
                            </View>
                            {/* {index === choose && ( */}
                            <View>
                              <Text style={{ color: isDarkMode ? '#FFFFFF' : '#212121', fontSize: 16 }}>
                                {item.age}
                              </Text>
                            </View>
                            {/* )} */}
                          </View>

                        </View>
                      </View>
                    </View>
                    {/* </View> */}
                  </TouchableOpacity>
                </Animated.View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      {/* <Text>DepartmentScreen {department.name}</Text> */}
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  viewSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1e9ee',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 50,
    borderWidth: 1,
    borderColor: '#9bacc5',
  },
  ViewSearchAnimation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 25,
    height: 50,
  },
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
    color: '#9bacc5',
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
    alignContent: 'center',
    paddingHorizontal: 10,
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
    backgroundColor: '#DDDDDD',
  },
});
