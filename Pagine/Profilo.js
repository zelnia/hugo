import {ss} from '../struttura/style.js';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import Footer from '../struttura/Footer.js';
import { Surface, Text, Divider } from 'react-native-paper';
import {SafeAreaView, ScrollView, View,Alert} from 'react-native';
import {richiesta,getData,Grassetto,EtichettaSurface} from '../struttura/Utils.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

export default function Profilo({ navigation, route }) {

  const [utente, setutente] = useState([]);
  const [indirizzi, setindirizzi] = useState([]);

  

  const alertCancella = () => Alert.alert(
    "Cancellazione utente",
    "Quest operazone cancellerà il tuo utente dai nostri server e non sarà possibile annullarla. Sei sicuro?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { 
        text: "OK", 
        onPress: async () => {
          let Id_User = await getData('@Id_User');
          let richiestacancellautente={
            "Operazione":'cancellaUtente',
            "Id_User":Id_User,
          }
          try {
            richiesta(richiestacancellautente,'apiHugo')
            .then(async (json) => {
              await AsyncStorage.clear().then(()=>{
                alert("Logout effettuato");
                navigation.navigate('LogIn');
              });
            });
          } catch(e) {
            // remove error
          }
        } 
      }
    ]
  );
  const alertCancellaPreautorizzazione = () => Alert.alert(
    "Cancellazione Preautorizzazione",
    "Questa operazone cancelleràla preautorizzazione per il tuo utente. Sei sicuro?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { 
        text: "OK", 
        onPress: async () => {
          let Id_User = await getData('@Id_User');
          let richiestacancellapreautorizzazione={
            "Operazione":'cancellaPreautorizzazione',
            "Id_User":Id_User,
          }
          try {
            richiesta(richiestacancellapreautorizzazione,'apiHugo')
            .then(async (json) => {
              alert("Operazione effettuata");
            });
          } catch(e) {
            // remove error
          }
        } 
      }
    ]
  );



  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      if(typeof(Id_User)!==null){
        let richiestautente={
          "Operazione":'getUtente',
          "Id_User":Id_User,
        }
        let datiutente = await richiesta(richiestautente,'apiHugo');
        setutente(datiutente);
        let richiestaindirizzi={
          "Operazione":'getIndirizzi',
          "Id_User":Id_User,
        }
        let datiindirizzi = await richiesta(richiestaindirizzi,'apiHugo');
        if(typeof(datiindirizzi)!==null){
          setindirizzi(datiindirizzi);
        }
      } else {
        navigation.navigate('Accesso');
      }
    }
    fetchData();
  }, []);

    return (
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Text  style={ss.h1}>Profilo</Text>
            <EtichettaSurface etichetta="Nominativo:">{utente.Nominativo}</EtichettaSurface>
            <EtichettaSurface etichetta="Email:">{utente.Email}</EtichettaSurface>
            <EtichettaSurface etichetta="Telefono:">{utente.Telefono}</EtichettaSurface>
            <EtichettaSurface etichetta="Codice Amico:">{utente.Codice_Amico}</EtichettaSurface>
            <EtichettaSurface etichetta="Telefono:">{utente.Telefono}</EtichettaSurface>
            <EtichettaSurface etichetta="Saldo:">{utente.Saldo}</EtichettaSurface>
          </View>
          <View style={[ss.p10]}>
            <Text  style={[ss.h1,ss.textcentro]}>Indirizzi:</Text>
            {
              indirizzi!==null ?
                indirizzi.map((indirizzo, index) => (
                  <Surface key={"indrizzo_"+index} style={[ss.bordogrigio,ss.p10, ss.mt10]}>
                    <Grassetto>Indirizzo {index+1}</Grassetto>
                    <Divider />
                    <EtichettaSurface etichetta="Via:" stilisurf={[ss.mt5]}>{indirizzo.Via}</EtichettaSurface>
                    <EtichettaSurface etichetta="Civico:">{indirizzo.Civico}</EtichettaSurface>
                    <EtichettaSurface etichetta="Cap:">{indirizzo.Cap}</EtichettaSurface>
                    <EtichettaSurface etichetta="Città:">{indirizzo.Citta}</EtichettaSurface>
                    <EtichettaSurface etichetta="Provincia:">{indirizzo.Provincia}</EtichettaSurface>
                  </Surface>
                ))
              :
              <Text  style={[ss.textcentro]}>Nessun indirizzo in memoria.</Text>
            }
          </View>
          <View style={[ss.centro,ss.w100,ss.mb15,ss.px5]}>
            <Button color="#00a1ae" onPress={async () => {navigation.navigate('RicaricaSaldo');}}  mode="contained"  style={[ss.w100]}>Ricarica il saldo</Button>
          </View>
          <View style={[ss.centro,ss.w100,ss.mb15,ss.px5]}>
            <Button onPress={async () => {navigation.navigate('Preautorizzazione');}}  mode="contained"  style={[ss.w100]}>Imposta Preautorizzazione</Button>
          </View>
          <View style={[ss.centro,ss.w100,ss.mb15,ss.px5]}>
            <Button onPress={alertCancellaPreautorizzazione}  mode="outlined"  style={[ss.w100]}>Cancella preautorizzazione</Button>
          </View>
          <Divider />
          <View style={[ss.centro,ss.w100,ss.px5]}>
            <Button color="#ffc107" onPress={alertCancella}  mode="contained"  style={[ss.w100]}>Cancella utente</Button>
          </View>
          <View style={[ss.centro,ss.w100,ss.mt15,ss.px5]}>
            <Button color="#00a1ae" onPress={()=>{Linking.openURL('https://hugopersonalshopper.it/candidatura.html');}}  mode="outlined"  style={[ss.w100]}>Diventa un Hugò</Button>
          </View>
        </ScrollView>
        <Footer no="profilo"/>
      </SafeAreaView>
    );
}