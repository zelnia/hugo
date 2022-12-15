import {ss} from '../struttura/style.js';
import React, { useState, useEffect } from 'react';
import Footer from '../struttura/Footer.js';
import { Surface, Text, Divider,Button } from 'react-native-paper';
import {SafeAreaView, ScrollView, View,Alert} from 'react-native';
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
        setritiri(datiritiri.reverse());
      }
      fetchData();
    }, []);

    function alertCancellaRitiro(rid){
      Alert.alert(
        "Cancellazione ritiro",
        "Quest operazone cancellerà il ritiro "+rid+" e non sarà possibile annullarla. Sei sicuro?",
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
              let richiestacancellaRitiro={
                "Operazione":'cancellaRitiro',
                "Id_User":Id_User,
                "Id_Ritiro":rid,
              }
              try {
                richiesta(richiestacancellaRitiro,'apiHugo')
                .then(async (json) => {
                  alert("Ritiro cancellato");
                  setritiri(json);
                });
              } catch(e) {
                console.log('Errore richiestacancellaRitiro', richiestacancellaRitiro);
              }
            } 
          }
        ]
      );
    }

    return (
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Text  style={ss.h1}>Storico Ritiri</Text>
            {
              ritiri.length!=0 ?
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
                    <View style={[ss.centro,ss.w100,ss.px5, ss.mt15]}>
                      <Button color="#ffc107" onPress={()=>{alertCancellaRitiro(r.Id)}}  mode="contained"  style={[ss.w100]}>Cancella ritiro</Button>
                    </View>
                  </Surface>
                ))
              :
                <Surface style={[ss.bordogrigio,ss.p10,ss.w100,ss.mt5]}>
                  <Grassetto>Al momento non ci sono ritiri</Grassetto>
                </Surface>
            }
          </View>
        </ScrollView>
        <Footer  no="storico"/>
      </SafeAreaView>
    );
}