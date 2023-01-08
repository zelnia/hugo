import {ss} from '../struttura/style.js';
import React, { useState, useEffect } from 'react';
import Footer from '../struttura/Footer.js';
import { Surface, Text, Divider,Button } from 'react-native-paper';
import {SafeAreaView, ScrollView, View,Alert} from 'react-native';
import {richiesta,getData,Grassetto,EtichettaSurface} from '../struttura/Utils.js';
import { useIsFocused } from "@react-navigation/native";

export default function Archivio({ navigation, route }) {
  // var listaritiri=[];
  const [utente, setutente] = useState([]);
  const [listaservizi, setlistaservizi] = useState([]);
  const [ritiri, setritiri] = useState([]);
  // if(typeof(route?.params?.listaritiri)!=="undefined"){
  //   setritiri(route.params.listaritiri);
  // }
  const isFocused = useIsFocused();
  const nomimetodi=["Carta","Preautorizzazione su carta","Saldo","Contanti"];
    useEffect(() => {
      if(isFocused){ 
        fetchData();
      }
    }, [isFocused]);

    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let richiestaritiri={
        "Operazione":'getRitiri',
        "Id_User":Id_User,
      }
      let datiritiri = await richiesta(richiestaritiri,'apiHugo');
      
      let richiestaservizi={"Operazione":'getServizi2',"Id_User":Id_User}
      let elencoservizi = await richiesta(richiestaservizi);
      elencoservizi.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      // console.log('elencoservizi', elencoservizi);

      setlistaservizi(elencoservizi);
      setritiri(datiritiri.reverse());
    }


    // async function alertCancellaRitiro(rid){
    //   Alert.alert(
    //     "Cancellazione ritiro",
    //     "Quest operazone cancellerà il ritiro "+rid+" e non sarà possibile annullarla. Sei sicuro?",
    //     [
    //       {
    //         text: "No",
    //         onPress: () => console.log("Cancel Pressed"),
    //         style: "cancel"
    //       },
    //       { 
    //         text: "OK", 
    //         onPress: async () => {
    //           let Id_User = await getData('@Id_User');
    //           let richiestacancellaRitiro={
    //             "Operazione":'cancellaRitiro',
    //             "Id_User":Id_User,
    //             "Id_Ritiro":rid,
    //           }
    //           try {
    //             richiesta(richiestacancellaRitiro,'apiHugo')
    //             .then(async (json) => {
    //               alert("Ritiro cancellato");
    //               setritiri(json.reverse());
    //             });
    //           } catch(e) {
    //             console.log('Errore richiestacancellaRitiro', richiestacancellaRitiro);
    //           }
    //         } 
    //       }
    //     ]
    //   );
    //   // let Id_User = await getData('@Id_User');
    //   // let richiestacancellaRitiro={
    //   //   "Operazione":'cancellaRitiro',
    //   //   "Id_User":Id_User,
    //   //   "Id_Ritiro":rid,
    //   // }
    //   // try {
    //   //   richiesta(richiestacancellaRitiro,'apiHugo')
    //   //   .then(async (json) => {
    //   //     alert("Ritiro cancellato");
    //   //     setritiri(json.reverse());
    //   //   });
    //   // } catch(e) {
    //   //   console.log('Errore richiestacancellaRitiro', richiestacancellaRitiro);
    //   // }
    // }

    return (
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Text  style={ss.h1}>Archivio Storico Servizi</Text>
            {
              ritiri.length!=0 ?
                ritiri.map((r, index) => (
                  <Surface key={"indrizzo_"+index} style={[ss.bordogrigio,ss.p10,ss.w100,ss.mt5]}>
                    <Grassetto>Servizio {r.Id}</Grassetto>
                    <Divider />
                    <EtichettaSurface etichetta="Data:" stilisurf={[ss.mt5]}>{r.Data}</EtichettaSurface>
                    <EtichettaSurface etichetta="Ora:">{r.Ora}</EtichettaSurface>
                    <EtichettaSurface etichetta="Totale:">{r.Totale}</EtichettaSurface>
                    {typeof(r.Mancia_Hugo)!=="undefined" && r.Mancia_Hugo!==null && r.Mancia_Hugo!=0?<EtichettaSurface etichetta="Mancia:">{r.Mancia_Hugo}</EtichettaSurface>:null}
                    <EtichettaSurface etichetta="Partenza:">{r.Indirizzo_Hugo}</EtichettaSurface>
                    {typeof(r.Note2)!=="undefined" && r.Note2!==null?<EtichettaSurface etichetta="Luogo:">{r.Note2_Hugo.trim()}</EtichettaSurface>:null}
                    {typeof(r.Dove)!=="undefined" && r.Dove!==null?<EtichettaSurface etichetta="Indirizzo destinazione:">{r.Dove.trim()}</EtichettaSurface>:null}
                    {typeof(r.Note2)!=="undefined" && r.Note2!==null?<EtichettaSurface etichetta="Lista:">{r.Cosa_Hugo.trim()}</EtichettaSurface>:null}
                    {typeof(r.Dove_2)!=="undefined" && r.Dove_2!==null?<EtichettaSurface etichetta="Seconda destinazione:">{r.Dove_2.trim()}</EtichettaSurface>:null}
                    {typeof(r.Cosa_Hugo_2)!=="undefined" && r.Cosa_Hugo_2!==null?<EtichettaSurface etichetta="Seconda Lista:">{r.Cosa_Hugo_2.trim()}</EtichettaSurface>:null}
                    {typeof(r.Sosta)!=="undefined" && r.Sosta!==null?<EtichettaSurface etichetta="Durata sosta:">{r.Sosta}</EtichettaSurface>:null}
                    {typeof(r.Passeggeri)!=="undefined" && r.Passeggeri!==null && r.Passeggeri!==0?<EtichettaSurface etichetta="Numero  Passeggeri:">{r.Passeggeri}</EtichettaSurface>:null}
                    {typeof(r.Note)!=="undefined" && r.Note!==null?<EtichettaSurface etichetta="Note:">{r.Note.trim()}</EtichettaSurface>:null}
                    <EtichettaSurface etichetta="Tipo pagamento:">{nomimetodi[r.Pagamento_Hugo]}</EtichettaSurface>
                    <EtichettaSurface etichetta="Auto:">{r.XL==1?"Si":"No"}</EtichettaSurface>
                    <EtichettaSurface etichetta="Chiamami:">{r.Chiamami_Hugo==1?"Si":"No"}</EtichettaSurface>
                    <EtichettaSurface etichetta="Sostituzione:">{r.Sostituisci_Hugo==1?"Si":"No"}</EtichettaSurface>
                    {typeof(r.Spesamax_Hugo)!=="undefined" && r.Spesamax_Hugo!==null && r.Spesamax_Hugo!=0?<EtichettaSurface etichetta="Spesa Max:">{r.Spesamax_Hugo}</EtichettaSurface>:null}
                    <EtichettaSurface etichetta="Servizio scelto:">{listaservizi.length>0?listaservizi[r.Servizio_Hugo].etichetta:""}</EtichettaSurface>
                  </Surface>
                ))
              :
                <Surface style={[ss.bordogrigio,ss.p10,ss.w100,ss.mt5]}>
                  <Grassetto>Al momento il tuo storico é vuoto.</Grassetto>
                </Surface>
            }
          </View>
        </ScrollView>
        <Footer  no="storico"/>
      </SafeAreaView>
    );
}