import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import colors from '../../constants/color';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../screens/page/ThemeContext';

export default function BottomTab({ currentRouteName }) {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  // console.log(currentRouteName);
  return (
    <SafeAreaView
      style={{
        borderTopColor: isDarkMode ? '#313131' : '#d6d6d6',
        borderTopWidth: 1,
        backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
      }}>
      <View style={styles.viewBottom}>
        <View style={styles.viewTouchIcon}>
          <TouchableOpacity
            onPressIn={() => navigation.navigate('users')}
            style={[
              styles.viewTouch,
              {
                backgroundColor: [
                  'users',
                  'DepartmentScreen',
                  'PersonalDetails',
                ].includes(currentRouteName)
                  ? colors.backgroundPink
                  : isDarkMode
                    ? '#121212'
                    : '#FFFFFF',
              },
            ]}>
            <View style={styles.viewBodyItem}>
              {
                ['users', 'DepartmentScreen', 'PersonalDetails'].includes(
                  currentRouteName,
                ) ? (
                  <Image
                    style={{ width: 36, height: 28 }}
                    source={require('../../img/users-solid_.png')}
                  />
                ) : isDarkMode ? (
                  <Image
                    style={{ width: 36, height: 28 }}
                    source={require('../../img/users-solid_white.png')}
                  />
                ) : (<Image
                  style={{ width: 36, height: 28 }}
                  source={require('../../img/users-line_.png')}
                />)
              }
              <Text
                style={[
                  styles.TextIcon,
                  {
                    color: [
                      'users',
                      'DepartmentScreen',
                      'PersonalDetails',
                    ].includes(currentRouteName)
                      ? colors.pinkColor
                      : isDarkMode
                        ? 'white'
                        : 'black',
                  },
                ]}>
                User
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTouchIcon}>
          <TouchableOpacity
            onPressIn={() => navigation.navigate('likes')}
            style={[
              styles.viewTouch,
              {
                backgroundColor:
                  currentRouteName === 'likes'
                    ? colors.backgroundPink : isDarkMode ? '#121212'
                      : '#FFFFFF'
              },
            ]}>
            <View style={styles.viewBodyItem}>
              <AntIcon
                color={'black'}
                style={{
                  color:
                    currentRouteName === 'likes' ? colors.pinkColor : isDarkMode ? '#FFFFFF' : '#121212',
                }}
                size={24}
                name={currentRouteName === 'likes' ? 'heart' : 'hearto'}
              />
              <Text
                style={[
                  styles.TextIcon,
                  {
                    color:
                      currentRouteName === 'likes' ? colors.pinkColor : isDarkMode ? '#FFFFFF' : 'black',
                  },
                ]}>
                Likes
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTouchIcon}>
          <TouchableOpacity
            onPressIn={() => navigation.navigate('profile')}
            style={[
              styles.viewTouch,
              {
                backgroundColor:
                  currentRouteName === 'profile'
                    ? colors.backgroundPink : isDarkMode ? '#121212' : '#FFFFFF'

              },
            ]}>
            <View style={styles.viewBodyItem}>
              <FontIcon
                color={'black'}
                style={{
                  color:
                    currentRouteName === 'profile' ? colors.pinkColor : isDarkMode ? '#FFFFFF' : 'black',
                }}
                size={24}
                name={
                  currentRouteName === 'profile'
                    ? 'user-circle-o'
                    : 'user-circle'
                }
              />
              <Text
                style={[
                  styles.TextIcon,
                  {
                    color:
                      currentRouteName === 'profile'
                        ? colors.pinkColor : isDarkMode ? '#FFFFFF'
                          : 'black',
                  },
                ]}>
                Profile
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  viewBottom: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,

    paddingHorizontal: 10,
  },
  viewBodyItem: {
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    color: colors.pinkColor,
  },
  viewTouchIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 100,
    width: '33%',
  },
  viewTouch: {
    borderRadius: 10,
    padding: 5,
    width: 80,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  TextIcon: {
    fontSize: 12,
  },
});
