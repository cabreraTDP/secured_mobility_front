import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import Card from '../Components/Card';
import { getAllStores, getInitialData } from '../redux/actions/store_actions';
import { GET_STORES } from '../redux/actions/types';
import store from '../redux/store';
import { Get } from '../utils/axiosUtils';

function List({storess}) {

  const [stores, setStores] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');



  return (
    <>
    <TouchableOpacity 
    activeOpacity={0.2} 
    onPressOut={() => {setShowModal(!showModal)}}
  >
        <View style={{marginBottom:10, marginTop:50}}>

          {stores.map((store) => 
            <Card onSelect={selectCity} store={store} key={store.city}/>
          )}
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
                <Text style={styles.modalText}>UBICACION</Text>
            </View>
            </View>
          </Modal>
          <View style={{marginLeft: '5%', marginRight: '5%', height: '95%', backgroundColor: 'white', borderRadius: 50}}>
            <View style={{padding: 20}}>
                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 10}}>Ubicación</Text>
                <View style={{backgroundColor: 'red', borderRadius: 20,  marginTop: 50, height: 60}}>
                    <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', textAlignVertical: 'center', marginTop: 15 }}>Reporta un delito</Text>
                </View>
            </View>

          </View>
        </View>
        </TouchableOpacity>

<View style={{marginTop:0, display:'flex', flexDirection:'row', justifyContent:'space-around', paddingBottom:10, padding:10, backgroundColor: 'steelblue', borderRadius: 50, marginBottom: 20, marginLeft: 20, marginRight: 20}}>
<TouchableWithoutFeedback  onPress={() => {setShowModal(!showModal)}}>
  
  <Text style={{fontSize: 25, color:'white', fontWeight: 'bold'}}>Reportar</Text>
</TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(List);

