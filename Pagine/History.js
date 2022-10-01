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
                <Surface key={"indrizzo_"+index} style={[ss.bordogrigio,ss.p10,ss.w100,ss.mt5]}>
                  <Grassetto>Ritiro {r.Id}</Grassetto>
                  <Divider />
                  <EtichettaSurface etichetta="Data:" stilisurf={[ss.mt5]}>{r.Data}</EtichettaSurface>
                  <EtichettaSurface etichetta="Ora:">{r.Ora}</EtichettaSurface>
                  <EtichettaSurface etichetta="Totale:">{r.Totale}</EtichettaSurface>
                  <EtichettaSurface etichetta="Mancia:">{r.Mancia_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Lista Spesa:">{r.Cosa_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Dove:">{r.Note}</EtichettaSurface>
                  <EtichettaSurface etichetta="Note:">{r.Note2}</EtichettaSurface>
                  <EtichettaSurface etichetta="Tipo pagamento:">{r.Pagamento_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Chiamami:">{r.Chiamami_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Sostituzione:">{r.Sostituisci_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Spesa Max:">{r.Spesamax_Hugo}</EtichettaSurface>
                  <EtichettaSurface etichetta="Servizio scelto:">{r.Servizio_Hugo}</EtichettaSurface>
                </Surface>
              ))
            }
          </View>
        </ScrollView>
        <Footer  no="storico"/>
      </SafeAreaView>
    );
}