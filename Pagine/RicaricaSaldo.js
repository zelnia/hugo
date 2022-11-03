import React, { useState } from 'react';
import { View,Text,SafeAreaView,ScrollView } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import {ss} from '../struttura/style.js';
import {richiesta,getData} from '../struttura/Utils.js';
import Footer from '../struttura/Footer.js';

export default function RicaricaSaldo({ navigation }) {
    const [importo, setimporto] = useState('');
    const [nominativo, setnominativo] = useState('');
    const [ncarta, setncarta] = useState('');
    const [cvc, setcvc] = useState('');
    const [mscadenza, setmscadenza] = useState('');
    const [ascadenza, setascadenza] = useState('');


    async function effettuaricarica (importo, nominativo, ncarta, cvc, mscadenza, ascadenza){
        try {
            let Id_User = await getData('@Id_User');
            let Nominativo2 = await getData('@Nominativo');
            let Email = await getData('@Email');
            let richiestaricaricasaldo= {
                "Operazione":"richiestaricaricasaldo",
                "importo":importo,
                "Id_User":Id_User,
                "Email":Email,
                "nominativo":nominativo,
                "ncarta":ncarta,
                "cvc":cvc,
                "mscadenza":mscadenza,
                "ascadenza":ascadenza
            }
            let checkgo=true;
            let errore="";
            // console.log('richiestaricaricasaldo', richiestaricaricasaldo);
            if(importo==""){checkgo=false,errore+="Per favore inserisci un importo. \r\n"}
            if(nominativo==""){checkgo=false,errore+="Per favore inserisci un nominativo. \r\n"}
            if(ncarta==""){checkgo=false,errore+="Per favore inserisci il numero di carta. \r\n"}
            if(cvc==""){checkgo=false,errore+="Per favore inserisci il cvc. \r\n"}
            if(mscadenza==""){checkgo=false,errore+="Per inserisci il mese di scadenza. \r\n"}
            if(ascadenza==""){checkgo=false,errore+="Per inserisci l'anno di scadenza. \r\n"}
            if(checkgo){
                let Ricaricasaldo=await richiesta(richiestaricaricasaldo);
                // console.log(Ricaricasaldo);
                if(Ricaricasaldo.Risposta=="Ricarica_effettuata"){
                    alert("Ricarica effettuata");
                    navigation.navigate('Hugo', {
                        Id_Utente: Id_User,Nominativo:Nominativo2
                    });
                }
                if(typeof(Ricaricasaldo.Errore)!=="undefined"){
                    alert(Ricaricasaldo.Errore);
                }
            } else {
                alert(errore);
            }
        } catch (error) {
          console.log('errore: ', error);
        }
    }

    return (
        <SafeAreaView style={ss.safeareaview}>
            <ScrollView>
                <View style={ss.container}>
                    <Text  style={[ss.h1,ss.textcentro,ss.mt15]}>Ricarica il tuo saldo:</Text>
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="Importo"
                        onChangeText={(importo) => {
                            setimporto(importo)
                        }}
                        value={importo ?? ""}
                    />
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="Nominativo"
                        onChangeText={(nominativo) => {
                            setnominativo(nominativo)
                        }}
                        value={nominativo ?? ""}
                    />
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="Numero Carta"
                        onChangeText={(ncarta) => {
                            setncarta(ncarta)
                        }}
                        value={ncarta ?? ""}
                    />
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="CVC"
                        onChangeText={(cvc) => {
                            setcvc(cvc)
                        }}
                        value={cvc ?? ""}
                    />
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="Mese scadenza"
                        onChangeText={(mscadenza) => {
                            setmscadenza(mscadenza)
                        }}
                        value={mscadenza ?? ""}
                    />
                    <TextInput
                        style={[ss.w100,ss.mt15]}
                        label="Anno scadenza"
                        onChangeText={(ascadenza) => {
                            setascadenza(ascadenza)
                        }}
                        value={ascadenza ?? ""}
                    />
                    <Button onPress={() => effettuaricarica(importo,nominativo,ncarta,cvc,mscadenza,ascadenza)} mode="contained"  style={[ss.w100,ss.mt15]}>Invia</Button>
                </View>
            </ScrollView>
            <Footer no="profilo"/>
        </SafeAreaView>
    );
}