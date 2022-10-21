import React, { useState, useEffect } from 'react';
import { View, StyleSheet, NativeEventEmitter } from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import {ss} from '../struttura/style.js';
import {richiesta,getData} from '../struttura/Utils.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Preautorizzazione({ navigation, route }) {
    const [nominativo, setnominativo] = useState('');
    const [ncarta, setncarta] = useState('');
    const [cvc, setcvc] = useState('');
    const [mscadenza, setmscadenza] = useState('');
    const [ascadenza, setascadenza] = useState('');


    async function registracarta (nominativo, ncarta, cvc, mscadenza, ascadenza){
        try {
            let Id_User = await getData('@Id_User');
            let Nominativo2 = await getData('@Nominativo');
            let Email = await getData('@Email');
            let richiestapreauth= {
                "Operazione":"richiestapreauth",
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
            if(nominativo==""){checkgo=false,errore+="Per favore inserisci un nominativo. \r\n"}
            if(ncarta==""){checkgo=false,errore+="Per favore inserisci il numero di carta. \r\n"}
            if(cvc==""){checkgo=false,errore+="Per favore inserisci il cvc. \r\n"}
            if(mscadenza==""){checkgo=false,errore+="Per inserisci il mese di scadenza. \r\n"}
            if(ascadenza==""){checkgo=false,errore+="Per inserisci l'anno di scadenza. \r\n"}
            if(checkgo){
                console.log("TUTTO OK");
                let Preautorizzazione=await richiesta(richiestapreauth);
                console.log(Preautorizzazione);
                if(Preautorizzazione.Risposta=="Dati_Registrati"){
                    alert("Preautorizzazione effettuata");
                    try {
                        AsyncStorage.setItem('@Preautorizzazione', "si");
                        AsyncStorage.setItem('@stripecustomer', Preautorizzazione.idcustomer);
                        AsyncStorage.setItem('@idpagamento', Preautorizzazione.idpagamento);
                      } catch (e) {
                        console.log(e);
                      }
                      navigation.navigate('Hugo', {
                        Id_Utente: Id_User,Nominativo:Nominativo2
                      });
                }
                if(typeof(Preautorizzazione.Errore)!=="undefined"){
                    alert(Preautorizzazione.Errore);
                }
            } else {
                alert(errore);
            }
            console.log('richiestapreauth', richiestapreauth);
        } catch (error) {
          console.log('errore: ', error);
        }
    }

    return (
        <View style={ss.container}>
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
            <Button onPress={() => registracarta(nominativo,ncarta,cvc,mscadenza,ascadenza)} mode="contained"  style={[ss.w100,ss.mt15]}>Invia</Button>
        </View>
    );
}