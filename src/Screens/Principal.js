import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import { getAllStores, getInitialData } from '../redux/actions/store_actions';
import { GET_STORES } from '../redux/actions/types';
import store from '../redux/store';
import { Get, Post } from '../utils/axiosUtils';
import MapView, {Polygon} from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '../../config.js';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

function Principal({storess}) {

  const [stores, setStores] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [location, setLocation] = useState({
    coords: {
        latitude: '25.67507',
        longitude: '-100.31847'
    }
  });
  const [color, setColor] = useState('green')

  const [polygon, setPolygon] = useState([])

  const region = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0072,
    longitudeDelta: 0.0071,
  };

  const [showModal, setShowModal] = useState(false);
  const [tipo, setTipo] = useState(0)

  const [selectedLanguage, setSelectedLanguage] = useState()
  const handleReportar = async(e) => {
    e.preventDefault();

    try{
        const body = {tipo, user, location}
        const respuesta = await Post('/incidentes/crear', body);
        console.log('respuesta',respuesta)
        if(true){
            RootNavigation.navigate('Home');
        }
    }catch(e){
        console.log('error Auth')
    }
    
};

  useEffect(() => {
    (async () => {
      // Request permissions for location access
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // Get the current position
      const currentPosition = await Location.getCurrentPositionAsync({});
      setLocation(currentPosition);
      const zona = await Post('/zonas/consultar', {location:currentPosition})
        if(zona){
            setPolygon(zona.data.zona[0][0].map(coord => ({latitude:coord[1], longitude:coord[0]})))
            setColor(colores[zona.data.ranking])
        }
    })();
  }, []);

  useEffect(() => {
    const intervalId = setInterval( async () => { 
        // Request permissions for location access
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        // Get the current position
        const currentPosition = await Location.getCurrentPositionAsync({});
        setLocation(currentPosition);
        
        const zona = await Post('/zonas/consultar', {location:currentPosition})
        if(zona){
            setPolygon(zona.data.zona[0][0].map(coord => ({latitude:coord[1], longitude:coord[0]})))
            setColor(colores[zona.data.ranking])
        }
    }, 5000)
    return () => clearInterval(intervalId);
  }, [location, useState]);

  const colores = {
    10: 'red',
    9: 'red',
    8: 'red',
    7: 'redlight',
    6: 'redlight',
    5: 'blue',
    4: "lightblue",
    3: "lightblue",
    2: "green",
    1: "green",
    0: "green"
  }


  return (
    <>
    <View style={{height: '90%', margin:10}}>
    <View style={{ flex: 1 }}>
        <MapView
        style={{ flex: 1}}
        region={region}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Polygon
          coordinates={polygon}
          fillColor={color}
          strokeColor={color}
          strokeWidth={1}
        />
      </MapView>
        </View>
        </View>  
        <View style={{marginBottom:10, marginTop:50}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setShowModal(!showModal);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Reportar</Text>
              <Text style={{marginTop: 30, fontSize: 20}}>Tipo de delito:</Text>
              <Picker
              style={{borderColor:'black', borderWidth: 2, width: '100%'}}
                selectedValue={tipo}
                onValueChange={(itemValue, itemIndex) =>
                  setTipo(itemValue)
                }>
                <Picker.Item label="Homicidio" value="10" />
                <Picker.Item label="Secuestro" value="8" />
                <Picker.Item label="Robo a mano armada" value="6" />
                <Picker.Item label="Abuso sexual" value="4" />
                <Picker.Item label="Robo de auto" value="2" />
      
              </Picker>
      
              <TouchableWithoutFeedback onPress={handleReportar} >
      
                  <Text style={{ fontSize: 24, color: 'lightblue', fontWeight: 'bold' }}>Reportar</Text>
                  </TouchableWithoutFeedback>
          </View>
          </View>
        </Modal>
      </View>
      </>
    
  );
}

const styles = StyleSheet.create({
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

function mapStateToProps(state) {
  return { storess: state.store.stores };
} 

export default connect(mapStateToProps)(Principal);

