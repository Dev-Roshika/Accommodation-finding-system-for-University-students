import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text,Image,TextInput, View, Button, TouchableOpacity } from 'react-native';
import React from 'react'

function Login() {
  return (
    
    <View style={styles.container}>
     
        <View >
          <Text style={styles.title} >Let's sign in</Text> 
        </View>
       <View style={{width:'70%'}}>
          <TextInput style = {styles.textinput} placeholder='username'/>
          <TextInput style = {styles.textinput} secureTextEntry={true} placeholder='password'/>
        </View>
        <View style={styles.flex1}>
          <TouchableOpacity style={styles.flex2}>
              <Text style={styles.title}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex1}>
          <Text style={styles.title}>
            Not registered yet?  
          </Text>
          <TouchableOpacity >
              <Text style={styles.title}>Sign up</Text>
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
    },
    textinput:{
      width:'100%',
      margin:3,
      padding:5,
      borderColor:'black',
      borderWidth:2,
      borderRadius:10,
      backgroundColor:'white',
    },
    flex1:{
      flexDirection:'row',
      margin:3,
      padding:3,
    },
    flex2:{
      
      margin:3,
      padding:3,
    }
  });
  
export default Login