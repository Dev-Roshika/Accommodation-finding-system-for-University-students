

import React from 'react';
import {View,StyleSheet, SafeAreaView, Image, Text, Button,TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import COLORS from '../assets/consts/Colors'
const Profile = () =>
{

    return(

       
        <SafeAreaView style={styles.view}>
             
             <View style={styles.container}>
                    
                    <View>   
                            <Image source={require('../assets/images/benten.webp')} style={styles.image}/>
                            <View style={{ height: 200, width:35, marginTop:-40,marginLeft:130,borderRadius:360 }}>
                                    <Button 
                                    title="+" 
                                    color="#F94A29"
                                    
                                    />
                            </View>
                            <View style={styles.name}>
                                    <Text style={styles.Name}>BEN 10</Text>
                                    <Text style={styles.NameS}>student</Text>
                            </View>


                            <View style={{ height: 60, width:150, marginTop:80,marginLeft:20 }}>
                                    <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => alert('Button pressed!')}
                                        >
                                            <Text style={styles.buttonText}>Home</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{ height: 60, width:150, marginTop:15,marginLeft:20}}>
                                   <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => alert('Button pressed!')}
                                        >
                                            <Text style={styles.buttonText}>Profile</Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{ height: 60, width:150, marginTop:15,marginLeft:20}}>
                                    <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => alert('Button pressed!')}
                                        >
                                            <Text style={styles.buttonText}>Link1 </Text>
                                    </TouchableOpacity>
                            </View>
                            <View style={{ height: 60, width:150, marginTop:15,marginLeft:20 }}>
                                    <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => alert('Button pressed!')}
                                        >
                                            <Text style={styles.buttonText}>Link2</Text>
                                    </TouchableOpacity>
                            
                            </View>
                            
                            <View style={{ height: 60, width:150, marginTop:15,marginLeft:20}}>
                                    <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => alert('Button pressed!')}
                                        >
                                            <Text style={styles.buttonText}>Link3</Text>
                                    </TouchableOpacity>
                            </View>
                    </View> 

                    <View style={styles.columnOne}>
                            <Text style={styles.columnTwo}>Full Name:</Text>
                            <Text style={styles.columnTwo}>Reg-No:</Text>
                            <Text style={styles.columnTwo}>Faculty:</Text>
                            <Text style={styles.columnTwo}>Department:</Text>
                            <Text style={styles.columnTwo}>Address:</Text>
                            <Text style={styles.columnTwo}>Contact-No:</Text>
                            
                    </View>


                    <View style={styles.columnThree}>
                            
                        <Text style={styles.columnFour}>My Place</Text> 

                        <Text style={styles.columnFour}>My RoomMates</Text> 

                    </View>
                        
                    
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
   
      

    view:{

        margin:100,
        marginLeft:40
    },
    image:{
      height:180,
      width:'39%',
      borderRadius:380,
      
    },

    btn:{
        color:Colors.red

    },

    name:{
        marginTop:-100,
        marginLeft:10
    },

    Name:{
        fontSize:25,
        fontFamily:'Inter-SemiBold',
        
    },

    NameS:{
        fontSize:15,
        fontFamily:'Inter-SemiBold',
        color:"#7B8FA1",
        marginLeft:5
    },

    columnOne:{
        marginTop:-750,
        marginLeft:250,
        backgroundColor: 'white',
        width:300,
        height:300,
        borderRadius:10,
        borderWidth:2,
        borderColor: 'white',
        
        
    },

    columnFour:
    {
        backgroundColor: 'white',
        width:300,
        height:200,
        borderRadius:10,
        borderWidth:2,
        borderColor: 'white',
        marginBottom:20,
        paddingLeft:15,
        paddingTop:5,
        color:"#567189"
    },
    columnThree:{
        marginLeft:250,
        marginTop:70
    },
    columnTwo:
    {
        marginTop:20,
        margin:10,
        color:"#567189",
    },
    
   

    button: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 40,
        marginTop: -10,
        borderWidth: 3,
        borderColor:'#F94A29'
        
      },
      buttonText: {
        color: 'black',
        fontWeight: 'bold',
      },
   
})
export default Profile;