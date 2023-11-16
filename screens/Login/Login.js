import { SafeAreaView, ScrollView, Text } from 'react-native';
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
import CheckBox from '@react-native-community/checkbox';
import colors from '../../constants/color';
// import { TextInput } from 'react-native-paper';

export default function Login({ navigation }) {
  const emailRef = useRef();
  const passRef = useRef();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [error, setError] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isSelected, setIsSelect] = useState(false)

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handSubmit = () => {
    console.log(navigation);
    if (email === '' || pass === '') {
      setError('Vui lòng nhập email và password');
    } else {
      // console.log(navigation);
      navigation.navigate('home');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
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
                color: colors.text,
              }}>
              Welcome Back!
            </Text>
          </View>
          <View style={{ gap: 10, padding: 10, width: 400 }}>
            <View>
              <Text style={styles.textEmailPass}>E-mail address</Text>
              <View
                style={[
                  styles.viewInputEmail,
                  {
                    borderColor: isFocusedEmail
                      ? colors.borderBlue
                      : colors.borderGray,
                  },
                ]}>
                <TextInput
                  onFocus={() => setIsFocusedEmail(true)}
                  onBlur={() => setIsFocusedEmail(false)}
                  style={styles.inputEmailPass}
                  ref={emailRef}
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
                style={{

                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginBottom: 2,
                }}>
                <View>
                  <Text style={styles.textEmailPass}>Password</Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontWeight: 800,
                      color: colors.text,
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
                  },
                ]}>
                <View>
                  <TextInput
                    onFocus={() => setIsFocusedPass(true)}
                    onBlur={() => setIsFocusedPass(false)}
                    style={styles.inputEmailPass}
                    ref={passRef}
                    secureTextEntry={isShowPassword}
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
              <CheckBox tintColors={{ true: colors.borderBlue, false: colors.borderGray }} value={isSelected} onValueChange={setIsSelect} />
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>
                Remmember me
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.line}></View>
              <Text>or</Text>
              <View style={styles.line}></View>
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
                <TouchableOpacity style={styles.touchIcon}>
                  <Image
                    style={styles.imgIcon}
                    source={require('../../img/facebook.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchIcon}>
                  <Image
                    style={styles.imgIcon}
                    source={require('../../img/google.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchIcon}>
                  <Image
                    style={styles.imgIcon}
                    source={require('../../img/apple.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
            <TouchableOpacity
              onPress={handSubmit}
              style={{
                backgroundColor: colors.backgroundColorLogin,
                padding: 12,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'white',
                  textAlign: 'center',
                  marginRight: 10,
                }}>
                Login
                <AntIcon size={16} name="arrowright" />
              </Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              Don't have an account ?{' '}
              <Text style={{ color: '#2053ec' }}>Sign up now</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
  },
  scrollview: {
    backgroundColor: colors.background,
  },
  viewBody: {
    alignItems: 'center',
  },
  inputEmailPass: {
    marginLeft: 5,
    width: 320,
    padding: 10,
    fontWeight: '600',
    fontSize: 16,
    color: colors.text,
  },

  viewInputEmail: {
    borderWidth: 2.2,
    borderRadius: 11,
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewInputPass: {
    borderWidth: 2.2,
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
  },
  line: {
    margin: 10,
    height: 1,
    flex: 1,
    backgroundColor: colors.borderGray,
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
    borderColor: colors.borderIcon,
    borderRadius: 15,
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
  textEmailPass: {
    color: colors.borderGray,
    fontWeight: '600',
    fontSize: 14,
    padding: 1,
  },
});
