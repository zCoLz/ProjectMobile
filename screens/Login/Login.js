import { Dimensions, KeyboardAvoidingView, SafeAreaView, ScrollView, Text } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import EntyIcon from 'react-native-vector-icons/Entypo';
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import CheckBox from '@react-native-community/checkbox';
import colors from '../../constants/color';
import BottomTab from '../../components/BottomTab/BottomTab';
import { useNavigation } from '@react-navigation/native';
import { LoginAction } from '../../redux/actions/authAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../page/ThemeContext';


export default function Login() {

  const emailRef = useRef();
  const passRef = useRef();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false)
  const navigation = useNavigation()
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const dispatch = useDispatch()
  const { errorLogin } = useSelector((state) => state.authReducer)
  const handleSubmitLogin = () => {
    dispatch(LoginAction(email, pass, navigation));
  }
  const handleCheckBoxRememberMe = async () => {
    if (!rememberMe) {
      // console.log('true or false', rememberMe);
      await AsyncStorage.setItem('RememberMe', 'true')
    } else {
      await AsyncStorage.removeItem('removeUser');
    }
    setRememberMe(!rememberMe);
  }
  const { isDarkMode } = useTheme()
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#FFFFFF' }]}>
      <KeyboardAvoidingView enabled>
        <ScrollView style={[styles.scrollview, { height: '100%', backgroundColor: isDarkMode ? '#121212' : colors.background, }]}>
          <View style={styles.viewBody}>
            <View>
              <Image
                style={styles.imgLogin}
                source={require('../../img/login.png')}></Image>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '900',
                  paddingTop: 10,
                  paddingBottom: 10,
                  color: isDarkMode ? "#FFFFFF" : colors.text,
                }}>
                Welcome Back!
              </Text>
            </View>
            <View style={[{ gap: 10, padding: 10, width: 400 }, { width: '95%' }]}>
              <View>
                <Text style={[styles.textEmailPass, {
                  width: "100%", color: isDarkMode ? '#FFFFFF' : colors.borderGray
                }]}>E-mail address</Text>
                <View
                  style={[
                    styles.viewInputEmail,
                    {
                      borderColor: isFocusedEmail
                        ? colors.borderBlue
                        : colors.borderGray,
                      backgroundColor: isDarkMode ? '#303030' : ''

                    },
                  ]}>
                  <TextInput
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    style={[styles.inputEmailPass, {
                      width: '90%', color: isDarkMode ? '#FFFFFF' : colors.text,
                    }]}
                    ref={emailRef}
                    placeholderTextColor={isDarkMode ? '#FFFFFF' : '#212121'}
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    value={email}></TextInput>

                  <AntIcon
                    name="mail"
                    size={18}
                    style={[
                      {
                        marginRight: 15,
                        fontWeight: 'bold',
                        color: isFocusedEmail
                          ? colors.borderBlue
                          : colors.borderGray,
                      },
                    ]}
                  />
                </View>
              </View>
              <View>
                <View
                  style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: 2,
                  }, { width: '100%' }]}>
                  <View>
                    <Text style={[styles.textEmailPass, { color: isDarkMode ? '#FFFFFF' : colors.borderGray }]}>Password</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontWeight: 800,
                        color: isDarkMode ? '#FFFFFF' : colors.text,
                        textDecorationLine: 'underline',
                      }}>
                      Forgot password?
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.viewInputPass,
                    {
                      borderColor: isFocusedPass
                        ? colors.borderBlue
                        : colors.borderGray,
                      backgroundColor: isDarkMode ? '#303030' : ''
                    },
                  ]}>
                  <View>
                    <TextInput
                      onFocus={() => setIsFocusedPass(true)}
                      onBlur={() => setIsFocusedPass(false)}
                      style={[styles.inputEmailPass, {
                        width: '90%', color: isDarkMode ? '#FFFFFF' : colors.text,
                      }]}
                      ref={passRef}
                      secureTextEntry={isShowPassword}
                      placeholderTextColor={isDarkMode ? '#FFFFFF' : '#212121'}
                      placeholder="Enter your password"
                      onChangeText={text => setPass(text)}
                      value={pass}></TextInput>
                  </View>
                  <TouchableOpacity onPress={handleShowPassword}>
                    {isShowPassword ? (
                      <EntyIcon
                        name="eye"
                        size={18}
                        style={[
                          {
                            marginRight: 15,
                            fontWeight: 'bold',
                            color: isFocusedPass
                              ? colors.borderBlue
                              : colors.borderGray,
                          },
                        ]}
                      />
                    ) : (
                      <EntyIcon
                        name="eye-with-line"
                        size={18}
                        style={[
                          {
                            marginRight: 15,
                            fontWeight: 'bold',
                            color: isFocusedPass
                              ? colors.borderBlue
                              : colors.borderGray,
                          },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox tintColors={{ true: colors.borderBlue, false: colors.borderGray }} value={rememberMe} onValueChange={handleCheckBoxRememberMe} />
                <Text style={{ color: isDarkMode ? '#FFFFFF' : colors.text, fontWeight: 'bold' }}>
                  Remember me
                </Text>
              </View>
              {
                errorLogin ? (<Text style={{ color: 'red', fontSize: 16 }}>{errorLogin}</Text>) : ''
              }
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.line, {
                  backgroundColor: isDarkMode ? '#313131' : colors.borderIcon,
                }]}></View>
                <Text style={{ color: isDarkMode ? '#FFFFFF' : colors.borderGray }}>or</Text>
                <View style={[styles.line, { backgroundColor: isDarkMode ? '#313131' : colors.borderIcon, }]}></View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginLeft: 60,
                    marginRight: 60,
                    // alignItems: 'center',
                    // textAlign: 'center',
                  }}>
                  <TouchableOpacity style={[styles.touchIcon, {
                    borderColor: isDarkMode ? '#313131' : colors.borderIcon,
                  }]}>
                    <Image
                      style={styles.imgIcon}
                      source={require('../../img/facebook.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.touchIcon, {
                    borderColor: isDarkMode ? '#313131' : colors.borderIcon,
                  }]}>
                    <Image
                      style={styles.imgIcon}
                      source={require('../../img/google.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.touchIcon, {
                    borderColor: isDarkMode ? '#313131' : colors.borderIcon,
                  }]}>
                    <Image
                      style={styles.imgIcon}
                      source={require('../../img/apple.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={handleSubmitLogin}
                style={{
                  backgroundColor: isDarkMode ? '#d3d3d3' : colors.backgroundColorLogin,
                  padding: 12,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: isDarkMode ? 'black' : 'white',
                    textAlign: 'center',
                    marginRight: 10,
                  }}>
                  Login
                  <AntIcon size={18} name="arrowright" />
                </Text>
              </TouchableOpacity>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', color: isDarkMode ? '#FFFFFF' : '#121212' }}>
                Don't have an account ?
                <Text style={{ color: '#2053ec' }}> Sign up now</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {/* {renderBottomTab()} */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  keyBoard: {
    flex: 1
  },
  scrollview: {
    flexGrow: 2,
  },
  viewBody: {
    alignItems: 'center',
  },
  inputEmailPass: {
    marginLeft: 5,
    padding: 10,
    fontWeight: '600',
    fontSize: 16,
  },

  viewInputEmail: {
    borderColor: colors.borderIcon,
    borderWidth: 1.5,
    borderRadius: 11,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInputPass: {
    borderColor: colors.borderIcon,
    borderWidth: 1.5,
    borderRadius: 11,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgLogin: {
    marginTop: 40,
    width: 240,
    height: 240,
    borderRadius: 10
  },
  line: {
    margin: 10,
    height: 1,
    flex: 1,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.text,
  },
  touchIcon: {
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
  textEmailPass: {
    fontWeight: '600',
    fontSize: 14,
    padding: 1,
  },
});
