import {React,useState} from 'react';
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

const Stack = createNativeStackNavigator();




export default function FicheProduit (Product) {
  const Bag = require('../assets/img/Bag.png');
  const shoes = require('../assets/img/shoes.png');
  let product_image = shoes;
  let product_id = Product.product_id;

    if (Product.image=='bag') {
      product_image = Bag
    }
    
    let Click = '>';
    return(
    <Pressable onPress={() =>
        Product.navigation.navigate('ProductPage',{image:product_image, product_id: product_id})}>
            
    
        <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
          <Image source={product_image} style={styles.logo} />
          <View style = {{width:200}}>
            <Text style = {{color:'white',fontWeight:'bold', fontSize:24}}>
              {Product.brand}
            </Text>
            <Text style = {{color:'white',fontWeight:'regular', fontSize:14}}>
              {Product.name}
            </Text>
            <Text style = {{color:'white',fontWeight:'regular', fontSize:14}}>
              {Product.description}
            </Text>
            <Text style= {{color:'darkgreen'}}>currentyl in SAV</Text>
          </View>
    
          <View >
            <Text style= {{color:'white',fontWeight:'800'}}>{Click}</Text>
          </View>
        </View>
        </Pressable>
        )
}



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