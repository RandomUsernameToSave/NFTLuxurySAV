import {React,useState,useEffect} from 'react';
import {
    Image,
    Pressable,
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    FlatList,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    ImageBackground,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import LinearGradient from "react-native-linear-gradient"

import Lottie from 'lottie-react-native';

const Stack = createNativeStackNavigator();


export default function SuccessfullyAdded (Product) {
    let bracket = '<';
    let product_id = Product.product_id;

    let ListSAV = [{key:'Dropped in a shop -Paris-'},
                    {key:'Conducted to our workers -Anger-'},
                    {key:'André repared your product'}];
    
   


    return(
      <View style={{backgroundColor:'black',width:'100%',height:'100%'}}>
        
  
        <Text style ={{textAlign:'center',marginTop:40,fontWeight:'400', color:'white', fontSize:32}}>
          Congratulation !
        </Text>
        <Text style ={{textAlign:'center',marginTop:10,fontWeight:'300', color:'white', fontSize:18,paddingLeft:30,paddingRight:30}}>
          A new NFT has been added to the blockchain thanks to you.
        </Text>
        
        <Lottie source={require('../assets/img/success2.json')} autoPlay loop={false}/>
        

        
        <Pressable style={{position:"absolute",bottom:0,left:190}} onPress={()=>
          Product.navigation.navigate('Products')}>
            <Text style={{color:'#00b4fc',fontSize:18,fontWeight:'light',textAlign:'center',marginTop:20}}>Next ></Text>
        </Pressable>
  
      </View>
  
        
    )
  };
  


const styles = StyleSheet.create({
    View : {
      backgroundColor: 'black',
      justifyContent: 'center', 
      alignItems: 'center',
      width:'100%',
      height:'100%',
    },
    logo : {
      width:200,
      height:200,
      justifyContent: 'center', 
      alignItems: 'center'
  
    },
    shoes : {
      width:150,
      height:110,
      justifyContent: 'center', 
      alignItems: 'center',
      transform:[{translateX:25}]
  
    },
    Product : {
      width:350,
      height:350
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
      position:'absolute',bottom:10
    },
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'black'
    },
    title :{
      paddingLeft : 10,
      color:'white',
      fontSize:48,
      fontWeight:'bold'
    },
    date :{
      paddingLeft : 10,
      color:'white',
      fontSize:20,
      fontWeight:'regular'
    },
    description :{
      paddingLeft : 10,
      color:'white',
      fontSize:20,
      fontWeight:'thin'
    },
    buttonGold: {
      backgroundColor: '#DEAD00',
      padding:15,
      width: '40%',
      marginLeft:10,
      marginTop:20
    },
    circle : {
      borderRadius:20,
      height:40,
      width:40,
      borderColor:'white',
      borderWidth:2,
      
  
    }
  });