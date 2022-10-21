import {ss} from '../struttura/style.js';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import Footer from '../struttura/Footer.js';
import { Surface, Text, Divider } from 'react-native-paper';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {richiesta,getData,Grassetto,EtichettaSurface} from '../struttura/Utils.js';

export default function Profilo({ navigation, route }) {

  const [utente, setutente] = useState([]);
  const [indirizzi, setindirizzi] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let richiestautente={
        "Operazione":'getUtente',
        "Id_User":Id_User,
      }
      let datiutente = await richiesta(richiestautente,'apiHugo');
      setutente(datiutente);
      setindirizzi(JSON.parse(datiutente.Indirizzi));
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
              indirizzi.map((indirizzo, index) => (
                <Surface key={"indrizzo_"+index} style={[ss.bordogrigio,ss.p10]}>
                  <Grassetto>Indirizzo {index+1}</Grassetto>
                  <Divider />
                  <EtichettaSurface etichetta="Via:" stilisurf={[ss.mt5]}>{indirizzo.Indirizzo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Civico:">{indirizzo.Civico}</EtichettaSurface>
                  <EtichettaSurface etichetta="Cap:">{indirizzo.Cap}</EtichettaSurface>
                  <EtichettaSurface etichetta="Città:">{indirizzo.Citta}</EtichettaSurface>
                  <EtichettaSurface etichetta="Provincia:">{indirizzo.Provincia}</EtichettaSurface>
                </Surface>
              ))
            }
          </View>
          <View style={[ss.centro]}>
            <Button onPress={async () => {navigation.navigate('Preautorizzazione');}}  mode="contained"  style={[ss.w100]}>Imposta Preautorizzazione</Button>
          </View>
        </ScrollView>
        <Footer no="profilo"/>
      </SafeAreaView>
    );
}