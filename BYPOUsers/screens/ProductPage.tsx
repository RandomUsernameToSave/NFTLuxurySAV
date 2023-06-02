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

const Stack = createNativeStackNavigator();


export default function ProductPageScreen (Product) {
    let bracket = '<';
    let product_id = Product.product_id;

    let ListSAV = [{key:'Dropped in a shop -Paris-'},
                    {key:'Conducted to our workers -Anger-'},
                    {key:'André repared your product'}];
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProduct = async ()=> {
      const resp = await fetch('http://10.0.2.2:3000/aftersale/'+product_id);
      const data = await resp.json()
  
      setData(data);
      setLoading(false);
    };
    useEffect(() => {
      fetchProduct();
    }, []);


    return(
      <View style={{backgroundColor:'black',width:'100%',height:'100%'}}>
        <Pressable  onPress={()=>
          Product.navigation.navigate('Products')}>
            <Text style={{color:'white',fontSize:35,fontWeight:'bold', marginLeft:30}}>{bracket}</Text>
          </Pressable>
  
        <Image source={Product.productImage} style={styles.Product} />
        <Text style={{color:'white',fontSize:48,fontWeight:'bold',marginLeft:20}}>
          GUCCI
        </Text>
        <Text style={{color:'white',fontWeight:'100',fontSize:24,marginLeft:20}}>
        backpack number 3
        </Text>
        <Text style={{color:'white',fontSize:12,marginLeft:20,width:'80%'}}>
        Gucci products are made with carefully selected materials. Please handle with care for longer product life.
        </Text>
  
        <Text style ={{textAlign:'center',marginTop:40,fontWeight:'100', color:'white', fontSize:32}}>
          SAV
        </Text>
        <FlatList
          data={data.data}
          renderItem={({item}) => <Text style={{color:'white',fontWeight:'200',marginLeft:30,marginTop:20}}>{item.description}</Text>}
        />
        
  
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