import * as React from 'react';
import { View, Text, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { useFormik } from "formik";
import { useAuthStore } from '../lib/store';
import shallow from "zustand/shallow";
import Toast from "react-native-toast-message";

export default function SignUp({ navigation }) {
  const [setJwt, setUser, jwt] = useAuthStore(state => [state.setJwt, state.setUser, state.jwt], shallow);

  const formik = useFormik({
    initialValues:{
      email: 'zachlefko@gmail.com',
      username: 'zach',
      password: 'bitcamp',
    },
    onSubmit: values => {
      if (values.email.trim() == '') {
        Toast.show({
          type: 'error',
          text1: 'Please enter an email'
        })
      } else if (values.username.trim() == '') {
        Toast.show({
          type: 'error',
          text1: 'Please enter a username'
        })
      } else if (values.password.trim() == '') {
        Toast.show({
          type: 'error',
          text1: 'Please enter a password'
        })
      }
      else {
        if (values.password.trim() != 'bitcamp') {
          Toast.show({
            type: 'error',
            text1: `Sorry! Your password is not the secret code.`
          })
        } else {
          setUser({
            email: values.email.trim(),
            username: values.username.trim(),
            password: values.password.trim(),
          });
          setJwt({ access: 'bitcamp', refresh: 'bytecamp' });
          navigation.navigate('Home');
        }
      }
    }
  })

  return (
    <View style={styles.onboardingFlexView}>
      <View style={{ flex: 1 }} />

      <Text style={styles.pageHead}>Sign Up</Text>
      <View style={{
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        margin: 10
      }}>
        <Text style={{ color: "#888888", textAlign: "center" }}>CHOOSE A{"\n"}PHOTO</Text>
      </View>
      <TextInput
        style={styles.textField}
        onChangeText={text => formik.setFieldValue('email', text)}
        value={formik.values.email}
        placeholder="email"
        autoCapitalize='none'
        autoCompleteType='email'
        keyboardType='email-address'
        textContentType='emailAddress'
      />

      <TextInput
        style={styles.textField}
        onChangeText={text => formik.setFieldValue('username', text)}
        value={formik.values.username}
        placeholder="username"
        autoCapitalize='none'
        autoCompleteType='username'
        textContentType='username'
      />

      <TextInput
        style={styles.textField}
        onChangeText={text => formik.setFieldValue('password', text)}
        value={formik.values.password}
        placeholder="password"
        autoCapitalize='none'
        autoCompleteType='password'
        textContentType='password'
      />

      <TouchableOpacity
        style={styles.callToActionButton}
        onPress={() => formik.handleSubmit()}
      >
        <Text style={styles.callToActionText}>Register</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }} />
    </View>
  );
};