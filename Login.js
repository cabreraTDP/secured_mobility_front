import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, TextInput, Button,  } from 'react-native';
import { connect } from 'react-redux';
import Card from './src/Components/Card';
import * as RootNavigation from './src/RootNavigation';
import { Post } from './src/utils/axiosUtils';

const Login = () => {

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            const body = {email, password}
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
      <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <Text style={styles.label}>Correo electronico: </Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Text style={styles.label}>Contraseña: </Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <View style={styles.button}>
      <TouchableWithoutFeedback onPress={handleLogin} >
        
      <Text style={{ fontSize: 24, color: 'lightblue', fontWeight: 'bold' }}>Iniciar sesión</Text>
      </TouchableWithoutFeedback>
      </View>
    </View>
    
    )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60,
    color: 'white'
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: 'white'
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 50
  },
  container: {
    marginTop: 100,
    padding: 50,
    margin:20,
    backgroundColor: 'black'
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
    textAlign: 'center',
    marginLeft: 60
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
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 0,
    textAlign: "center",
    fontSize:25,
    fontWeight: 'bold'
  }
});

function mapStateToProps(state) {
  return { storess: state.store.stores };
} 

export default connect(mapStateToProps)(Login);

