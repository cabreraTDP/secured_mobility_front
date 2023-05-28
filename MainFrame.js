import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as RootNavigation from './src/RootNavigation';
import {Picker} from '@react-native-picker/picker';

import Reportar from './src/Screens/Reportar';
import { useState } from 'react';
import Principal from './src/Screens/Principal';

export default function MainFrame({ navigation }) {
  const Stack = createNativeStackNavigator();
  const [currentPage, setCurrentPage] = useState('List');

  const [selectedLanguage, setSelectedLanguage] = useState()
  const handleReportar = async(e) => {
    e.preventDefault();

    try{
        const body = {tipo, user, ubicacion}
        const respuesta = await Post('/usuarios/signIn', body);
        console.log('respuesta',respuesta)
        if(true){
            RootNavigation.navigate('Home');
        }
    }catch(e){
        console.log('error Auth')
    }
    
};

  return (
    <View  style={styles.container}>
      <View style={{height: '7%', borderRadius: 10, marginTop:50, marginBottom:30}}>
      </View>

      

        <View style={{marginBottom:20}}>

          <Text style={{fontSize: 35, textAlign: 'center', fontWeight:'bold', color: 'white'}}>REPORTA</Text>
        </View>

        <Stack.Navigator initialRouteName='Reportar' screenOptions={{headerShown:false}} >
            <Stack.Screen name="Principal" component={Principal} />
        </Stack.Navigator>

      
      
      {//<View style={{ marginTop:0, display:'flex', flexDirection:'row', justifyContent:'space-around', paddingBottom:20, padding:10, backgroundColor: 'white', borderRadius: 50, marginBottom: 20, marginLeft: 20, marginRight: 20}}>
        //<Text onPress={()=>{RootNavigation.navigate('List'), setCurrentPage('List')}} style={currentPage==='List'?styles.selectedOption:styles.option}>List</Text>
        //<Text onPress={()=>{RootNavigation.navigate('Transfer'), setCurrentPage('Transfer')}} style={currentPage==='Transfer'?styles.selectedOption:styles.option}>Transfer</Text>
      //</View>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    marginTop: 0,
    marginBottom: 0,
    height: '100%',
    padding: 0,
    backgroundColor: 'black'
  },
  option: {
    fontSize:25, 
    alignSelf:'center',  
    padding:10, 
    fontWeight: 'bold',
    color: 'black'
  },
  selectedOption: {
    fontSize:25, 
    alignSelf:'center',  
    padding:10, 
    fontWeight: 'bold',
    color: 'black'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    margin:20,
    backgroundColor: "white",
    width:240,
    borderColor: 'black',
    borderWidth:1,
    borderRadius: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 0,
    textAlign: "center",
    fontSize:25,
    fontWeight: 'bold',
    backgroundColor: 'white'
  }
});
