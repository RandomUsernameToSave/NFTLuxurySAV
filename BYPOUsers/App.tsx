import {React,useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import FicheProduit from './components/FicheProduit';
import ProductPageScreen from './screens/ProductPage';
import SuccessfullyAdded from './screens/SuccessfullyAdded';
import Vendeur from './screens/Vendeur';
import {
  Modal,
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from "react-native-linear-gradient"
import { ceil, color, FlipInEasyX } from 'react-native-reanimated';


const Stack = createNativeStackNavigator();

const AddProductDB = (product_name,image_link) => {

  fetch('http://10.0.2.2:3000/addProduct', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_link:image_link,
      product_name:product_name
  }),
});

  console.log('successfully added to db')
}


function App(): JSX.Element {
  const [index, setIndex] = useState(0);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Basic}
          options={{title: 'Welcome', headerShown:false}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Products" component={ProductScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductPage" component={ProductPage} options={{ headerShown: false }} />
        <Stack.Screen name='AddProduct' component={AddProduct} options={{ headerShown: false, presentation:'modal'}}  />
        <Stack.Screen name='SuccessfullyAdded' component={SuccessfullyAdded} options={{ headerShown: false}}  />
        <Stack.Screen name='Vendeur' component={Vendeur} options={{ headerShown: false}}  />
        
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}

const Basic = ({navigation}) => {



  const yourPicture = require ('./assets/img/logo.png');
  return (
  <View style={styles.View}>
    
          <Image source={yourPicture} style={styles.logo} />
          

          
          <Pressable style={styles.button} onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})}>
            <Text style={{color:'white'}}>Go in shop to connect</Text>
          </Pressable>
          <Pressable style={styles.button2} onPress={() =>
        navigation.navigate('Vendeur')}>
            <Text style={{color:'white'}}>Seller platform</Text>
          </Pressable>

        
  </View>
  )
  
}

const ProfileScreen = ({navigation, route}) => {
  let image =  require('./assets/img/fond1.jpg')
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}
      >
        <LinearGradient
   colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.5)']}
   style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%'
   }}/>
        
        <View style = {{position:'absolute',bottom:70}}>
          <Text style = {styles.title}>
            Fashion show
          </Text>
          <Text style = {styles.date}>
            29 juin 2023
          </Text>
          <Text style = {styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </Text>


          <Pressable style={styles.buttonGold} onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})}>
            <Text style={{color:'black', fontWeight:'bold', textAlign:'center'}}>Find out more</Text>
          </Pressable>

          
        </View>
        <View style= {{position:'absolute', bottom:30, display:'flex',flexDirection:'row',justifyContent:'center',width:'100%'}}>
        <Pressable onPress={() =>
        navigation.navigate('Products')}>
            <Text style={{color:'white', fontWeight:'regular', marginLeft:10}}>Events</Text>
        </Pressable>
        <Pressable  onPress={() =>
        navigation.navigate('Products')}>
            <Text style={{color:'white', fontWeight:'regular', marginLeft:10}}>Products</Text>
        </Pressable>
        </View>
        
        

          
        
      </ImageBackground>
    </View>
  )
};


const AddProduct = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => {AddProductDB('backpack number 4','bag')
        navigation.navigate('SuccessfullyAdded')}} title="Add a bag" />
        
      <Button onPress={() =>{ AddProductDB('shoes number 7','shoes')
        navigation.navigate('SuccessfullyAdded')}} title="Add shoes" />
    </View>
  );
};




const ProductScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchProduct = async ()=> {
  
    const resp = await fetch('http://10.0.2.2:3000/productList');
    const data = await resp.json()

    setData(data);
    setLoading(false);
  };



  const Bag = require('./assets/img/Bag.png');
  const shoes = require('./assets/img/shoes.png');
  let Click = '>';
  useEffect(() => {
    fetchProduct();
  }, []);

  

  return (
    <View style={{flex: 1, backgroundColor:'black'}}>
 
    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
        <Text style = {{color:'white',fontSize:24,fontWeight:'bold', margin:20}}>Your Products</Text>
        
        <Pressable style={styles.circle} onPress={() => navigation.navigate('AddProduct')}>
          <Text style={{color:'white',fontSize:24,fontWeight:'bold',textAlign:'center'}}>+</Text>
        </Pressable>
        
      
        

      </View>
    <FlatList style={{width:'100%', height:'100%',backgroundColor:'black'}}
            data={data.data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
              <FicheProduit description='Gucci products are made with carefully selected materials. Please handle with care for longer product life.'
               name={item.product_name} brand='GUCCI' image={item.image_link} navigation={navigation} product_id={item.product_id}/>
            )}
          />
    <View style= {{position:'absolute', bottom:30, display:'flex',flexDirection:'row',justifyContent:'center',width:'100%'}}>
        <Pressable onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})}>
            <Text style={{color:'white', fontWeight:'regular', marginLeft:10}}>Events</Text>
        </Pressable>
        <Pressable  onPress={() =>
        navigation.navigate('Products')}>
            <Text style={{color:'white', fontWeight:'regular', marginLeft:10}}>Products</Text>
        </Pressable>
        </View>

    </View>
    
  )
};

const ProductPage = ({navigation,route}) => {

  let ProductImage = route.params.image;
  let product_id = route.params.product_id;
  return (<ProductPageScreen navigation={navigation} productImage={ProductImage} product_id= {product_id}/>)
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
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    position:'absolute',top:10
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

export default App;
