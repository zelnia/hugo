import {ss} from '../struttura/style.js';
import React, { useState, useEffect } from 'react';
import Footer from '../struttura/Footer.js';
import { Surface, Text, Divider } from 'react-native-paper';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {richiesta,getData,Grassetto,EtichettaSurface} from '../struttura/Utils.js';

export default function History({ navigation, route }) {
  const [utente, setutente] = useState([]);
  const [ritiri, setritiri] = useState([]);
    useEffect(() => {
      async function fetchData() {
        let Id_User = await getData('@Id_User');
        let richiestaritiri={
          "Operazione":'getRitiri',
          "Id_User":Id_User,
        }
        let datiritiri = await richiesta(richiestaritiri,'apiHugo');
        setritiri(datiritiri);
      }
      fetchData();
    }, []);
    return (
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Text  style={ss.h1}>Storico Ritiri</Text>
            {
              ritiri.map((r, index) => (
                <Surface key={"indrizzo_"+index} style={[ss.bordogrigio,ss.p10]}>
                  <Grassetto>Ritiro {r.Id}</Grassetto>
                  <Divider />
                  <EtichettaSurface etichetta="Data:" stilisurf={[ss.mt5]}>{r.Data}</EtichettaSurface>
                  <EtichettaSurface etichetta="Ora:">{r.Ora}</EtichettaSurface>
                  <EtichettaSurface etichetta="Totale:">{r.Totale}</EtichettaSurface>
                </Surface>
              ))
            }
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    );
}