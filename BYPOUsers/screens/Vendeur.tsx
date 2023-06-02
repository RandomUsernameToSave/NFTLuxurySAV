import {React,useState,useEffect} from 'react';
import { Formik, useFormik } from 'formik';
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
    TouchableOpacity,
    ImageBackground,
    Platform,
    PermissionsAndroid,
  } from 'react-native';
  import {NavigationContainer} from '@react-navigation/native';
  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  import LinearGradient from "react-native-linear-gradient"
  import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Lottie from 'lottie-react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Dirs, FileSystem} from 'react-native-file-access';
const Stack = createNativeStackNavigator();

// ({ handleChange, handleBlur, handleSubmit, values })
// faire un bp
// ce qui marche / ce qui marche à moitié / ce qui marche pas encore
// cout de setup
// faire remonter les slides témoignages
// On a validé le POC

export default function Vendeur (Product) {
    let bracket = '<';
    let product_id = Product.product_id;

    const [filePath, setFilePath] = useState({});
    const captureImage = async (type,formProps) => {
     
      let options = {
        mediaType: type,
        maxWidth: 300,
        maxHeight: 550,
      };
      let isCameraPermitted = await requestCameraPermission();

      if (isCameraPermitted ) {

        launchCamera(options, (response) => {
          console.log('Response = ', response);
  
          if (response.didCancel) {
            console.log('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            console.log('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            console.log('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            console.log(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.assets[0].base64);
          console.log('uri -> ', response.assets[0].uri);
          console.log('width -> ', response.assets[0].width);
          console.log('height -> ', response.assets[0].height);
          console.log('fileSize -> ', response.assets[0].fileSize);
          console.log('type -> ', response.assets[0].type);
          console.log('fileName -> ', response.assets[0].fileName);
          setFilePath(response)
      const newImage = FileSystem.fetch(response.assets[0].uri)
      .then(response => {
        return response;
      });
      this.setState({
      source: {
        uri: newImage.url,
      },
    });



          formProps.setFieldValue('image1', data);

        });
      }
    };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };
   
    // rajouter le selectionneur d'images

    return(
      <View style={{backgroundColor:'black',width:'100%',height:'100%'}}>
        
  
        <Text style={{color:'white'}}>
          Espace Vendeur
        </Text>
      

        <Formik initialValues={{ description: '', product_id:'', image1:null }} onSubmit={modificationProduct} > 
        {formProps  => (
    <View>

    <TextInput style={{color:'white'}} onChangeText={formProps.handleChange('description')}
      onBlur={formProps.handleBlur('description')}
      value={formProps.values.description} />
    <TextInput style={{color:'white'}} onChangeText={formProps.handleChange('product_id')}
      onBlur={formProps.handleBlur('product_id')}
      value={formProps.values.product_id} />

    <Button onPress={formProps.handleSubmit} title="Submit" />




    <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  backgroundColor: '#04b040',
                  borderRadius: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  alignItems: 'center',
                  shadowColor: '#E67E22',
                  shadowOpacity: 0.8,
                  elevation: 8,
                }}
                onPress={() => {
                  captureImage('photo',formProps);
                }}
              >
                <Text style={{color:'white'}}>Open</Text>
              </TouchableOpacity>

  </View>)}
</Formik>
          
        

        
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

const modificationProduct = (values) => {

  let data = new FormData();
  data.append("image1", values.photo1);
  data.append("description",values.description);
  data.append("product_id",values.product_id);
  console.log(data);
    fetch('http://10.0.2.2:3000/SAVVendeur', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
      },
      body: data,
  });
  
    console.log('successfully added to db')
}

