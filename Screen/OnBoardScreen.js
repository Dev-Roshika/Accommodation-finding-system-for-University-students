import { StatusBar } from 'expo-status-bar';
import React , {useCallback} from 'react'
import {View,StyleSheet, SafeAreaView, Image, Text, Pressable} from 'react-native';
import COLORS from '../assets/consts/Colors'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
function OnBoardScreen({navigation}) {
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
//Fonts end of code

  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor = {COLORS.transparent}/>
      <Image source={require('../assets/images/OnBoardScreenPic.jpg')} style={styles.image}/>

      <View style={{paddingHorizontal:20,paddingTop:30}}>
        <View>
          <Text style = {styles.title}>Find your</Text>
          <Text style = {styles.title2}>Accomodations</Text>
        </View>
        <View style={{marginTop:20}}>
          <Text style={styles.textStyle}>This app is only for University of Jaffna</Text>
          <Text style={styles.textStyle}>Students.</Text>
        </View>
      </View>
      <View style = {{flex:1,justifyContent:'flex-end',paddingHorizontal:10,paddingTop:20}}>
      <Pressable onPress={() => navigation.navigate('profile')}>
        <View style = {styles.btn}>
            <Text style = {{color:COLORS.white}}>Get Started</Text>
        </View>
      </Pressable>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  image:{
    height:520,
    width:'100%',
    borderBottomRightRadius:150,
  },
  title:{
    fontSize:32,
    fontFamily:'Inter-SemiBold',
  },
  title2:{
    fontSize:32,
    color:COLORS.red,
    fontFamily:'Inter-Bold',
  },
  textStyle:{
    fontSize:16,
    color:COLORS.grey,
    fontFamily:'Inter-Regular',
  },
  btn:{
    height:60,
    marginHorizontal:20,
    backgroundColor:COLORS.dark,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
});
export default OnBoardScreen