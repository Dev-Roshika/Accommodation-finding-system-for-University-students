import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Image,TextInput, View, Button, TouchableOpacity, Pressable } from 'react-native';
import React, { useState , useCallback} from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign } from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {useTogglePasswordVisibility} from '../hooks/useTogglePasswordVisibility'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const {passwordVisibility,rightIcon,handlePasswordVisibility} = useTogglePasswordVisibility();
  
  //Fonts 
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../assets/fonts/Inter-Bold.otf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.otf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.otf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.otf'),
    'Inter-Thin': require('../assets/fonts/Inter-Thin.otf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.container}>
        <View >
          <Text style={styles.Main_title} >Login</Text> 
        </View>
        <View style={{width:'90%',alignItems:'center'}}>
          <TextInput 
              style = {styles.textinput} 
              placeholder='Username'
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              style = {styles.textinput} 
              secureTextEntry={passwordVisibility}
              placeholder='Password'
              autoCorrect={false}
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              onChangeText={(password) => setUsername(password)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons name={rightIcon} size = {22} color="#232323" />
            </Pressable>
            </View>
        <View style={styles.flex1}>
          <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.login_button}>Login</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgot_button}>Forgot Password?</Text> 
        </TouchableOpacity>

        <View style={styles.flex1}>
          <Text style={styles.title}>
            Not registered yet?  
          </Text>
          <TouchableOpacity >
              <Text style={styles.signup_button}>Sign up</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      margin:5,
      color :'black',
      fontSize: 17,
      fontFamily:'Inter-Bold',
    },
    Main_title:{
      margin:5,
      color :'red',
      fontSize: 25,
      fontFamily:'Inter-Bold',
    },
    signup_button:{
      margin:5,
      color :'black',
      fontSize: 17,
      color:"red",
      fontWeight: "Inter-Thin"
    },
    login_button:{
      margin:5,
      color :'black',
      fontSize: 17,
      color:"white",
      fontWeight: "bold"
    },
    textinput:{
      width:'100%',
      margin:3,
      borderColor:'black',
      borderWidth:2,
      borderRadius:10,
      backgroundColor:'white',
      width:'70%',
      margin:7,
      padding:5,
      paddingLeft:15,
       fontFamily:'Inter-SemiBold'
    },
    flex1:{
      flexDirection:'row',
      margin:3,
      padding:3,
    },
    loginBtn:{
      marginTop:20,
      padding:3,
      width:"50%",
      alignItems:"center",
      backgroundColor: "red",
      borderRadius:15,
    },
    forgot_button:{
      height:30,
      marginTop:10,
      maginBottom:30,
      fontFamily:"Inter-Thin"
    }
  });
  
export default Login