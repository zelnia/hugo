import {  Platform, View, TouchableOpacity, SafeAreaView, ScrollView,Image ,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox,IconButton,Modal} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

//Componenti custom
import {ss} from '../struttura/style.js';
import {elaboraore,richiesta,getData,calcolaAltezza} from '../struttura/Utils.js';
import Footer from '../struttura/Footer.js';
import {CosafaInterno} from '../struttura/Altre_Componenti.js';
// import {Cosafa,Info2} from '../struttura/Altre_Componenti.js';
// import { Link } from '@react-navigation/native';
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const percorsi_immagini_servizi=[require("../assets/immaginiservizi/0.png"),require("../assets/immaginiservizi/1.png"),require("../assets/immaginiservizi/2.png"),require("../assets/immaginiservizi/3.png"),require("../assets/immaginiservizi/4.png"),require("../assets/immaginiservizi/5.png"),require("../assets/immaginiservizi/6.png"),require("../assets/immaginiservizi/7.png"),require("../assets/immaginiservizi/8.png"),require("../assets/immaginiservizi/9.png")];
const numeroversione=10022; //parametro aggiornamento
const costobasesosta=7; // costo base della sosta
const casuale=Math.floor(Math.random() * 10);
const accent1="#6f10b7";
// "const" accent1="#b3336e";
// ' ({tinfo,stili}){
const Info = ({settestoinfo,tinfo,stili,setVisible7}) => {
  return (
    <IconButton
      icon="information"
      color={accent1}
      size={20}
      style={stili}
      onPress={async () => {
        settestoinfo(tinfo);
        setVisible7(true);
      }}
    />
  )
}
// async function costodistanzaByIndirizzo(dove,comunedestinazione){
//   let UltimoIndirizzo = await getData('@UltimoIndirizzo');
//   let calcolacostodistanza={
//     "UltimoIndirizzo":UltimoIndirizzo,
//     "indirizzoluogo":dove+" "+comunedestinazione,
//     "Operazione":"calcolacostodistanza"
//   }
//   let json_res = await richiesta(calcolacostodistanza);
//   if(json_res.risposta==="Indirizzo_non_trovato"){
//     alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
//     return 0; 
//   } else {
//     return parseFloat(json_res.risposta.Totale); 
//     // setcostodistanza(parseFloat(json_res.risposta.Totale)); 
//   }
// }

// OPZIONI SERVIZIO
const MostraOpzioniServizio = ({servizio,cosa, setVisible7, settestoinfo, Info,sostiuisci,spesamax,coupon,setSostiuisci,setSpesamax,setcoupon,setCosa,duratasosta,setduratasosta,note2,setNote2,setdove,dove,indirizzoalternativo,setindirizzoalternativo,validaCoupon, telefono, settelefono, passeggeri, setpasseggeri,setAuto,auto,OpzioniAuto,setlat,setlon,Id_Utente,setrubrica,showDialog8,showDialog10,setcostodistanza, hugosceglie,sethugosceglie, dove2, setdove2, cosahugo2, setcosahugo2, nomeluogo2, setnomeluogo2, triplettadove, settriplettadove,comunedestinazione,setcomunedestinazione,comunedestinazione2,setcomunedestinazione2, ritiroconsegna, setritiroconsegna, testoritirooconsegna, settestoritirooconsegna,telreferente, settelreferente,richiestafattura,setrichiestafattura,showDialog12,showDialog13,showDialog14,setcheckcalcoladistanza,ccittaindirizzo,alertCittaDiversa,listaservizi,dispo}) => { 
  if(servizio=="no"){
    return (
      <></>
    );
  }
  if(!Array.isArray(dispo) || (Array.isArray(dispo) && dispo.length<1)){
    return (
      <></>
    );
  }
  // console.log('indirizzoalternativo', indirizzoalternativo);
  if(servizio==4){
    return ( //Hugò TAXI con sosta
      <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <View style={{alignItems: 'center' }}>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indicami se vuoi il luogo di destinazione. Se la destinazione supera i 10 km dal punto di partenza, per ogni km in più verrà calcolato un euro aggiuntivo. Nota bene: se non hai indicato il luogo di destinazione l'eventuale differenza sará richiesta  alla fine del servizio. Il servizio si effettua solo in città per le trasferte usare Hugò noleggio con conducente (NCC)." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Se vuoi indicami il luogo di prelivevo se diverso da quello predefinito</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Luogo"
              mode='outlined'
              value={indirizzoalternativo}
              onChangeText={indirizzoalternativo => setindirizzoalternativo(indirizzoalternativo)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale));
                        setcheckcalcoladistanza(0); 
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
            />
            <Button 
              icon="map-marker"
              onPress={
                async () => {
                  let { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Non è possibile proseguire senza il permesso per identificare la posizione.');
                    return;
                  }
                  let location = await Location.getCurrentPositionAsync({});
                  let place = await Location.reverseGeocodeAsync({
                    latitude : location.coords.latitude,
                    longitude : location.coords.longitude
                  });
                  if(place[0].city==ccittaindirizzo){
                    let indirizzogeolocalizzato="";
                    indirizzogeolocalizzato+=place[0].street+" ";
                    indirizzogeolocalizzato+=place[0].streetNumber+" ";
                    indirizzogeolocalizzato+=place[0].city+" ";
                    indirizzogeolocalizzato+="(Lat: "+location.coords.latitude+" Lon:"+location.coords.longitude+")";
                    setlat(location.coords.latitude);
                    setlon(location.coords.longitude);
                    setindirizzoalternativo(indirizzogeolocalizzato);
                  } else {
                    alertCittaDiversa(place);
                  }
                }
              } 
            >Geolocalizzati</Button>

          </View>
          
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog14(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo dove vuoi essere accompagnato. Se la destinazione supera i 10 km dal punto di partenza, per ogni km in più verrà calcolato un euro. Il servizio si effettua solo in città, per le trasferte usare Hugò noleggio con conducente (NCC)" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il luogo di destinazione.</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              label="Nome del luogo"
              mode='outlined'
              value={note2}
              onChangeText={
                note2 => setNote2(note2)
              }
            />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo della destinazione specificando il comune, se diverso da quello predefinito, per conoscere il costo totale del servizio. Se non conosci il luogo di destinazione eventuali differenze saranno calcolate alla fine del servizio.</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {1}
              mode='outlined'
              label="Specifica via, numero civico"
              value={dove}
              onChangeText={dove => setdove(dove)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                        setcheckcalcoladistanza(0);
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
              // onBlur={
              //   async () => {
              //     let UltimoIndirizzo = await getData('@UltimoIndirizzo');
              //     let calcolacostodistanza={
              //       "UltimoIndirizzo":UltimoIndirizzo,
              //       "indirizzoluogo":dove,
              //       "Operazione":"calcolacostodistanza"
              //     }
              //     let json_res = await richiesta(calcolacostodistanza);
              //     if(json_res.risposta==="Indirizzo_non_trovato"){
              //       setcostodistanza(0); 
              //       alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
              //     } else {
              //       setcostodistanza(parseFloat(json_res.risposta.Totale)); 
              //     }
              //   }
              // }
              


            />
            <TextInput
              multiline = {true}
              numberOfLines = {1}
              mode='outlined'
              label="Specifica il comune"
              value={comunedestinazione}
              onChangeText={comunedestinazione => setcomunedestinazione(comunedestinazione)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                        setcheckcalcoladistanza(0);
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
            />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={async ()=>{
              if(dove!=="" && note2!=="" && comunedestinazione!==""){
                let salvainrubrica={
                  "iduser":Id_Utente,
                  "nomeluogo":note2,
                  "indirizzoluogo":dove,
                  "comunedestinazione":comunedestinazione,
                  "Operazione":"salvainrubrica"
                }
                let json_res = await richiesta(salvainrubrica);
                if(typeof(json_res.errore)!=="undefined"){
                  alert(json_res.errore);
                } else {
                  setrubrica(json_res.altro.Rubrica);
                  alert("Indirizzo aggiunto correttamente.");
                }
              } else {
                alert("Per favore compila il nome e l'indirizzo del luogo")
              }
            }}  
            mode="contained"  style={[ss.w100,ss.mt15]}>Salva questo luogo in rubrica</Button>
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={()=>{
              showDialog8(true);
            }}  
            mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog12(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View>
          <TextInput
            style={[ss.mt10, ss.w100]}
            label="Cellulare"
            mode='outlined'
            value={telefono}
            onChangeText={telefono => settelefono(telefono)}
          />
          <Text style={[ss.textcentro, ss.mt10]}>Passeggeri</Text> 
          <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
            <Button onPress={() => {1 === passeggeri ? setpasseggeri(0): setpasseggeri(1);}} style={[(1 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={1 === passeggeri ? ss.labelselected : ss.unselected} mode="outlined">1</Button>
            <Button  onPress={() => {2 === passeggeri ? setpasseggeri(0): setpasseggeri(2);}} style={[(2 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={2 === passeggeri ? ss.labelselected : ss.unselected}  mode="outlined">2</Button>
            <Button onPress={() => {3 === passeggeri ? setpasseggeri(0): setpasseggeri(3);}} style={[(3 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={3 === passeggeri ? ss.labelselected : ss.unselected}   mode="outlined">3</Button>
            <Button onPress={() => {4 === passeggeri ? setpasseggeri(0): setpasseggeri(4);}}  style={[(4 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={4 === passeggeri ? ss.labelselected : ss.unselected}  mode="outlined">4</Button>
          </View>
          
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <Text style={[ss.mt10]}>E' necessaria un auto per questo servizio?</Text> 
          <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
            <Button onPress={() => {1 === auto ? setAuto("no"): setAuto(1);}} style={[(1 === auto ? ss.selected : ss.unselected),ss.w50]} labelStyle={1 === auto ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
            <Button onPress={() => {0 === auto ? setAuto("no"): setAuto(0);}} style={[(0 === auto ? ss.selected : ss.unselected),ss.w50]} labelStyle={0 === auto ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
          </View>
          <OpzioniAuto /> 
          <View  style={[ss.p3,ss.w100, ss.mt10]}>
              <Divider />
            </View>
          <Text style={[ss.mt10]}>Durata sosta in minuti:</Text> 
          <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
              <Button onPress={() => {setduratasosta(30);}} style={[(30 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={30 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">30</Button>
              <Button onPress={() => {setduratasosta(60);}} style={[(60 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={60 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">60</Button>
              <Button onPress={() => {setduratasosta(90);}} style={[(90 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={90 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">90</Button>
              <Button onPress={() => {setduratasosta(120);}} style={[(120 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={120 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">120</Button>
          </View>
          <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
              <Button onPress={() => {setduratasosta(150);}} style={[(150 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={150 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">150</Button>
              <Button onPress={() => {setduratasosta(180);}} style={[(180 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={180 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">180</Button>
              <Button onPress={() => {setduratasosta(210);}} style={[(210 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={210 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">210</Button>
              <Button onPress={() => {setduratasosta(240);}} style={[(240 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={240 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">240</Button>
          </View>
          <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
            <Text style={ss.h2}>Costo sosta: </Text>
            <Text style={[{ fontWeight: 'bold' }, ss.h2]}>{(duratasosta/30*costobasesosta).toFixed(2)}</Text>
            <Text style={ss.h2}> €</Text>
          </Surface>
          <Text style={[ss.mt10]}>Vuoi la fattura o la ricevuta per questo servizio?</Text>
          <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
              <Button onPress={() => {setrichiestafattura(1);}} style={[(1 === richiestafattura ? ss.selected : ss.unselected),ss.w50]} labelStyle={1 === richiestafattura ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
              <Button onPress={() => {setrichiestafattura(0);}} style={[(0 === richiestafattura ? ss.selected : ss.unselected),ss.w50]} labelStyle={0 === richiestafattura ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
            </View>
        </View>
        <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
            <View style={[ss.row, ss.w50]}>
              <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
            </View>
            <View style={ss.w50}>
              <TextInput
                textAlign={'center'}
                onChangeText={(coupon) => {
                  setcoupon(coupon);
                  validaCoupon(coupon);
                }}
                value={coupon ?? ""}
                style={[{ height:32},ss.w100]}
              />
            </View>
          </View>
      </Surface>
    );
  }
  if(servizio==2){ //Hugò ti accompagna TAXI SENZA SOSTA
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <View style={{alignItems: 'center' }}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il punto di ritiro. Se la destinazione supera i 10 km dal punto di partenza, per ogni km in più verrà calcolato un euro. Il servizio si effettua solo in città, per le trasferte usare Hugò noleggio con conducente (NCC)" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il luogo di prelievo se diverso da quello predefinito</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Indirizzo di partenza"
              mode='outlined'
              value={indirizzoalternativo}
              onChangeText={indirizzoalternativo => setindirizzoalternativo(indirizzoalternativo)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                        setcheckcalcoladistanza(0);
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
            />
            <Button 
              icon="map-marker"
              onPress={
                async () => {
                  let { status } = await Location.requestForegroundPermissionsAsync();
                  if (status !== 'granted') {
                    setErrorMsg('Non è possibile proseguire senza il permesso per identificare la posizione.');
                    return;
                  }
                  let location = await Location.getCurrentPositionAsync({});
                  let place = await Location.reverseGeocodeAsync({
                    latitude : location.coords.latitude,
                    longitude : location.coords.longitude
                  });
                  if(place[0].city==ccittaindirizzo){
                    let indirizzogeolocalizzato="";
                    indirizzogeolocalizzato+=place[0].street+" ";
                    indirizzogeolocalizzato+=place[0].streetNumber+" ";
                    indirizzogeolocalizzato+=place[0].city+" ";
                    indirizzogeolocalizzato+="(Lat: "+location.coords.latitude+" Lon:"+location.coords.longitude+")";
                    setlat(location.coords.latitude);
                    setlon(location.coords.longitude);
                    setindirizzoalternativo(indirizzogeolocalizzato);
                  } else {
                    alertCittaDiversa(place);
                  }
                }
              } 
            >Geolocalizzati</Button>
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog14(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indicami se vuoi il luogo di destinazione. Se la destinazione supera i 10 km dal punto di partenza, per ogni km in più verrà calcolato un euro aggiuntivo. Se non hai indicato il luogo di destinazione questa differenza sará richiesta  alla fine del servizio." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il luogo di destinazione specificando il comune, se diverso da quello predefinito, per conoscere il costo totale del servizio. Se non conosci il luogo di destinazione eventuali differenze saranno calcolate alla fine del servizio.</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              label="Nome del luogo"
              mode='outlined'
              value={note2}
              onChangeText={
                note2 => setNote2(note2)
              }
            />
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {2}
              label="Indirizzo di destinazione"
              mode='outlined'
              value={dove}
              onChangeText={dove => setdove(dove)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                        setcheckcalcoladistanza(0);
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
            />
            <TextInput
              mode='outlined'
              label="Specifica il comune"
              value={comunedestinazione}
              onChangeText={comunedestinazione => setcomunedestinazione(comunedestinazione)}
              onBlur={
                async ()=>{
                  if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                    if(Array.isArray(listaservizi[servizio].citta) && listaservizi[servizio].citta.includes(comunedestinazione)){
                      let calcolacostodistanza={
                        "Partenza":indirizzoalternativo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanzataxi1"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale));
                        setcheckcalcoladistanza(0); 
                      }
                    } else {
                      alert("L'indirizzo di destinazione inserito non é supportato dal servizio. Per favore, prova con un servizio diverso.");
                    }
                  } else if(indirizzoalternativo==="") {
                    alert("Per favore compila l'indirizzo di partenza.");
                  }
                }
              }
            />
            <View style={{ flexDirection: 'row',width:"100%"}}>
              <Button  color={accent1}
              onPress={async ()=>{
                if(dove!=="" && note2!=="" && comunedestinazione!==""){
                  let salvainrubrica={
                    "iduser":Id_Utente,
                    "nomeluogo":note2,
                    "indirizzoluogo":dove,
                    "comunedestinazione":comunedestinazione,
                    "Operazione":"salvainrubrica"
                  }
                  let json_res = await richiesta(salvainrubrica);
                  if(typeof(json_res.errore)!=="undefined"){
                    alert(json_res.errore);
                  } else {
                    setrubrica(json_res.altro.Rubrica);
                    alert("Indirizzo aggiunto correttamente.");
                  }
                } else {
                  alert("Per favore compila il nome e l'indirizzo del luogo")
                }
              }}  
              mode="contained"  style={[ss.w100,ss.mt15]}>Salva questo luogo in rubrica</Button>
            </View>
            <View style={{ flexDirection: 'row',width:"100%"}}>
              <Button  color={accent1}
              onPress={()=>{
                showDialog8(true);
              }}  
              mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
            </View>
            
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog12(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View>
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il numero di passeggeri, il cellulare se diverso da quello predefinito e se è necessaria un auto.</Text> 
            <TextInput
              style={ss.mt10}
              label="Cellulare"
              mode='outlined'
              value={telefono}
              onChangeText={telefono => settelefono(telefono)}
            />
            <View  style={[ss.p3,ss.w100]}>
              <Divider />
            </View>
            <Text style={[ss.mt10]}>E' necessaria un auto per questo servizio?</Text> 
            <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
              <Button onPress={() => {1 === auto ? setAuto("no"): setAuto(1);}} style={[(1 === auto ? ss.selected : ss.unselected),ss.w50]} labelStyle={1 === auto ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
              <Button onPress={() => {0 === auto ? setAuto("no"): setAuto(0);}} style={[(0 === auto ? ss.selected : ss.unselected),ss.w50]} labelStyle={0 === auto ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
            </View>
            <OpzioniAuto /> 
            <Text style={[ss.textcentro, ss.mt10]}>Passeggeri</Text> 
            <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
              <Button onPress={() => {1 === passeggeri ? setpasseggeri(0): setpasseggeri(1);}} style={[(1 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={1 === passeggeri ? ss.labelselected : ss.unselected} mode="outlined">1</Button>
              <Button  onPress={() => {2 === passeggeri ? setpasseggeri(0): setpasseggeri(2);}} style={[(2 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={2 === passeggeri ? ss.labelselected : ss.unselected}  mode="outlined">2</Button>
              <Button onPress={() => {3 === passeggeri ? setpasseggeri(0): setpasseggeri(3);}} style={[(3 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={3 === passeggeri ? ss.labelselected : ss.unselected}   mode="outlined">3</Button>
              <Button onPress={() => {4 === passeggeri ? setpasseggeri(0): setpasseggeri(4);}}  style={[(4 === passeggeri ? ss.selected : ss.unselected),ss.w25]} labelStyle={4 === passeggeri ? ss.labelselected : ss.unselected}  mode="outlined">4</Button>
            </View>
            <Text style={[ss.mt10]}>Vuoi la fattura per questo servizio?</Text>
            <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
              <Button onPress={() => {setrichiestafattura(1);}} style={[(1 === richiestafattura ? ss.selected : ss.unselected),ss.w50]} labelStyle={1 === richiestafattura ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
              <Button onPress={() => {setrichiestafattura(0);}} style={[(0 === richiestafattura ? ss.selected : ss.unselected),ss.w50]} labelStyle={0 === richiestafattura ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
            </View>
          </View>
        </View>
        <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
            <View style={[ss.row, ss.w50]}>
              <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
            </View>
            <View style={ss.w50}>
              <TextInput
                textAlign={'center'}
                onChangeText={(coupon) => {
                  setcoupon(coupon);
                  validaCoupon(coupon);
                }}
                value={coupon ?? ""}
                style={[{ height:32},ss.w100]}
              />
            </View>
          </View>
      </Surface>
    );
  }
  if((servizio==0 || servizio==1 || servizio==5)){ // ACUISTO PER TE
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <View>
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Definisci dove Hugò farà i tuoi acquisti</Text> 
            <RadioButton.Group 
              onValueChange={
                (hugosceglie)=>{
                  if(!hugosceglie){
                    setNote2("");
                    setdove("");
                    setcosahugo2("");
                    setnomeluogo2("");
                    setdove2("");
                    setcosahugo2("");
                  }
                  sethugosceglie(hugosceglie);
                }
              } 
              value={hugosceglie}
            >
              <View style={[{ flexDirection: 'row'},ss.w100]}>
                <View style={{ width:"10%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Se vuoi che il servizio sia piú veloce, lascia scegliere ad Hugò dove acquistare. Nota bene: pagherai sempre l importo dello scontrino che il rider ti darà al momento della consegna più le spese per il servizio richiesto. " stili={[ss.mt15,ss.w100,ss.mx0]} />
                </View>
                <View style={{ width:"90%"}}>
                  <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label="Voglio che Hugò scelga dove acquistare." value={1} />
                </View>
              </View>
              <View style={[{ flexDirection: 'row'},ss.w100]}>
                <View style={{ width:"10%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Scegli questa opzione se vuoi il tuo negozio preferito per gli acquisti. Nota bene: pagherai sempre l importo dello scontrino che il rider ti darà al momento della consegna più le spese per il servizio richiesto. " stili={[ss.mt15,ss.w100,ss.mx0]} />
                </View>
                <View style={{ width:"90%"}}>
                  <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label="Voglio indicare ad Hugo dove acquistare." value={0} />
                </View>
              </View>
            </RadioButton.Group>
          </View>
          {
            hugosceglie==1 ?
              <Surface style={[ss.surface1, ss.w100]} elevation={4}>
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami cosa acquistare *</Text> 
                </View>
                <View  style={[ss.p3,ss.w100]}>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {6}
                    label="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):"
                    mode='outlined'
                    value={cosa}
                    onChangeText={cosa => setCosa(cosa)}
                  />
                </View>
              </Surface>
            :
              <Surface style={[ss.surface1, ss.w100]} elevation={4}>
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che acquisti o ritiri quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica il nome del negozio dove acquistare</Text> 
                </View>
                <TextInput
                  multiline = {true}
                  numberOfLines = {1}
                  mode='outlined'
                  label="Indica il negozio"
                  value={note2}
                  onChangeText={note2 => setNote2(note2)}
                />
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del negozio specificando il comune, se diverso da quello predefinito</Text> 
                </View>
                <TextInput
                  mode='outlined'
                  label="Specifica via, numero civico"
                  value={dove}
                  onChangeText={dove => setdove(dove)}
                  // onEndEditing={
                  onBlur={
                    async () => {
                      if(dove!=="" && comunedestinazione!==""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        var calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                        }
                        if(dove2!=="" && comunedestinazione2!==""){
                          calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                          calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                          setcheckcalcoladistanza(0);
                        }
                      }
                    }
                  }
                />
                <TextInput
                  mode='outlined'
                  label="Specifica il comune"
                  value={comunedestinazione}
                  onChangeText={comunedestinazione => setcomunedestinazione(comunedestinazione)}
                  onBlur={
                    async ()=>{
                      if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        let calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                        }
                        if(dove2!=="" && comunedestinazione2!==""){
                          calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                          calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                          setcheckcalcoladistanza(0);
                        }
                      } else if(indirizzoalternativo==="") {
                        alert("Per favore compila l'indirizzo di partenza.");
                      }
                    }
                  }
                />
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1}
                  onPress={async ()=>{
                    if(dove!=="" && note2!=="" && comunedestinazione!==""){
                      let salvainrubrica={
                        "iduser":Id_Utente,
                        "nomeluogo":note2,
                        "indirizzoluogo":dove,
                        "comunedestinazione":comunedestinazione,
                        "Operazione":"salvainrubrica"
                      }
                      let json_res = await richiesta(salvainrubrica);
                      if(typeof(json_res.errore)!=="undefined"){
                        alert(json_res.errore);
                      } else {
                        setrubrica(json_res.altro.Rubrica);
                        alert("Indirizzo aggiunto correttamente.");
                      }
                    } else {
                      alert("Per favore compila il nome e l'indirizzo del luogo")
                    }
                  }}  
                  mode="contained"  style={[ss.w100,ss.mt15]}>Salva questo luogo in rubrica</Button>
                </View>
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1}
                  onPress={()=>{
                    showDialog8(true);
                  }}  
                  mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
                </View>
                {/* <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1} onPress={()=>{showDialog12(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
                </View> */}
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami cosa acquistare *</Text> 
                </View>
                <View  style={[ss.p3,ss.w100]}>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {6}
                    label="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):"
                    mode='outlined'
                    value={cosa}
                    onChangeText={cosa => setCosa(cosa)}
                  />
                </View>
                <View  style={[ss.p3,ss.w100 ]}>
                  <View style={[ss.w100, ss.textcentro]}>
                    <Text style={[{ fontWeight: 'bold'},ss.w100,ss.textcentro]}>Vuoi inserire un altro luogo dove completare gli acquisti? Il secondo acquisto sará scontato del 50%.</Text>
                  </View>
                  <View style={[{flexDirection: "row-reverse",justifyContent:"space-around"},ss.w100]}>
                    <RadioButton.Group 
                      onValueChange={
                        async (triplettadove)=>{
                          settriplettadove(triplettadove);
                          if(!triplettadove){
                            setdove2("");
                            setnomeluogo2("");
                            setcosahugo2("");
                            let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                            let calcolacostodistanza={
                              "UltimoIndirizzo":UltimoIndirizzo,
                              "indirizzoluogo":dove+" "+comunedestinazione,
                              "Operazione":"calcolacostodistanza",
                              "comunedestinazione":comunedestinazione,
                            }
                            let json_res = await richiesta(calcolacostodistanza);
                            if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                              setcostodistanza(0); 
                              setcheckcalcoladistanza(1);
                              alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                            } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                              setcostodistanza(0); 
                              setcheckcalcoladistanza(1);
                              alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                            } else {
                              setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                              setcheckcalcoladistanza(0);
                            }
                          }
                        }
                      } value={triplettadove}
                    >
                      <View style={[ss.row]}>
                        <RadioButton.Item label="Si" value={true} style={{padding:0}} />            
                        <RadioButton.Item label="No" value={false} style={{padding:0}} />            
                      </View>
                    </RadioButton.Group>
                  </View>
                </View>
                {
                  triplettadove ?
                    <>
                      <View style={{ flexDirection: 'row',width:"100%"}}>
                        <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che acquisti o ritiri quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
                        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica il nome del negozio dove acquistare</Text> 
                      </View>
                      <TextInput
                        multiline = {true}
                        numberOfLines = {1}
                        mode='outlined'
                        label="Indica il negozio"
                        value={nomeluogo2}
                        onChangeText={nomeluogo2 => setnomeluogo2(nomeluogo2)}
                      />
                      <View style={{ flexDirection: 'row',width:"100%"}}>
                        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del negozio specificando il comune</Text> 
                      </View>
                      <TextInput
                        mode='outlined'
                        label="Specifica via, numero civico"
                        value={dove2}
                        onChangeText={dove2 => setdove2(dove2)}
                        // onEndEditing={
                        onBlur={
                          async () => {
                            if(dove!=="" && dove2!=="" && comunedestinazione!=="" && comunedestinazione2!==""){
                              let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                              let calcolacostodistanza={
                                "UltimoIndirizzo":UltimoIndirizzo,
                                "indirizzoluogo":dove+" "+comunedestinazione,
                                "indirizzoluogo2":dove2+" "+comunedestinazione2,
                                "Operazione":"calcolacostodistanza",
                                "comunedestinazione":comunedestinazione,
                                "comunedestinazione2":comunedestinazione2
                              }
                              if((servizio==6 || servizio == 7) && ritiroconsegna){
                                calcolacostodistanza.ritiroconsegna="si";
                              }
                              let json_res = await richiesta(calcolacostodistanza);
                              if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                setcostodistanza(0); 
                                setcheckcalcoladistanza(1);
                                alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                              } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                setcostodistanza(0); 
                                setcheckcalcoladistanza(1);
                                alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                              } else {
                                setcostodistanza(parseFloat(json_res.risposta.Totale));
                                setcheckcalcoladistanza(0); 
                              }
                            }
                          }
                        }
                      />
                      <TextInput
                        mode='outlined'
                        label="Specifica il comune:"
                        value={comunedestinazione2}
                        onChangeText={comunedestinazione2 => setcomunedestinazione2(comunedestinazione2)}
                        onBlur={
                          async ()=>{
                            if(dove!=="" && dove!=="no" && dove2!=="" && comunedestinazione!="" && comunedestinazione2!==""){
                              let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                              let calcolacostodistanza={
                                "UltimoIndirizzo":UltimoIndirizzo,
                                "indirizzoluogo":dove+" "+comunedestinazione,
                                "indirizzoluogo2":dove2+" "+comunedestinazione2,
                                "Operazione":"calcolacostodistanza",
                                "comunedestinazione":comunedestinazione,
                                "comunedestinazione2":comunedestinazione2
                              }
                              if((servizio==6 || servizio == 7) && ritiroconsegna){
                                calcolacostodistanza.ritiroconsegna="si";
                              }
                              let json_res = await richiesta(calcolacostodistanza);
                              if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                setcostodistanza(0); 
                                setcheckcalcoladistanza(1);
                                alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                              } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                setcostodistanza(0); 
                                setcheckcalcoladistanza(1);
                                alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                              } else {
                                setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                setcheckcalcoladistanza(0);
                              }
                            }
                          }
                        }
                      />

                      <View style={{ flexDirection: 'row',width:"100%"}}>
                        <Button  color={accent1} onPress={()=>{showDialog10(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
                      </View>
                      {/* <View style={{ flexDirection: 'row',width:"100%"}}>
                        <Button  color={accent1} onPress={()=>{showDialog13(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
                      </View> */}
                      <View style={{ flexDirection: 'row',width:"100%"}}>
                        <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
                        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami cosa acquistare *</Text> 
                      </View>
                      <View  style={[ss.p3,ss.w100]}>
                        <TextInput
                          multiline = {true}
                          numberOfLines = {6}
                          label="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):"
                          mode='outlined'
                          value={cosahugo2}
                          onChangeText={cosahugo2 => setcosahugo2(cosahugo2)}
                        />
                      </View>
                    </>
                  : null
                }
              </Surface>
          }
        </Surface>
        <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
          <View style={[{width:'40%'}]}>
            <View style={ss.row}>
              <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Se il prodotto di una marca specificata non è disponibile Hugò provvederà a sostituirlo con il prodotto più simile di un'altra marca" />
              <Text style={{ fontWeight: 'bold', alignSelf:"center"}}>Vuoi che Hugò sostituisca i prodotti mancanti? </Text>
            </View>
          </View>
          <View style={{width:'60%',flexDirection: "row-reverse", padding:5, margin:5}}>
            <RadioButton.Group 
              onValueChange={
                sostiuisci => {
                  setSostiuisci(sostiuisci);
                }
              } value={sostiuisci}
            >
              <View style={[ss.row]}>
                <RadioButton.Item label="Si" value={true} style={{padding:0}} />            
                <RadioButton.Item label="No" value={false} style={{padding:0}} />            
              </View>
            </RadioButton.Group>
          </View>

          {/* <Checkbox
            status={sostiuisci ? 'checked' : 'unchecked'}
            onPress={() => {
              setSostiuisci(!sostiuisci);
            }}
          /> */}
        </View>
        <View  style={[ss.p3,ss.w100]}>
          <Divider />
        </View>
        <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
          <View style={[{ width:"70%"},ss.row]}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica ad Hugò la spesa massima consentita per il servizio scelto. Nota bene: pagherai sempre l importo dello scontrino che il rider ti darà al momento della consegna più le spese per il servizio richiesto. L'importo inserito in caso di pagamento alla consegna sarà preautorizzato sulla tua carta.
            La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Indica la spesa massima * :</Text> 
          </View>
          <View style={{ width:"30%"}}>
            <TextInput
              textAlign={'center'}
              onChangeText={(spesamax) => {
                setSpesamax(spesamax.replace(/[^0-9,]/g, ''))
                // setSpesamax(spesamax.replace(/[^0-9]/g, ''))
              }}
              value={spesamax ?? ""}
              style={[{ height:32},ss.w100]}
            />
          </View>
        </View>
        <View  style={[ss.p3,ss.w100]}>
          <Divider />
        </View>
        <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
          <View style={[ss.row, ss.w50]}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
          </View>
          <View style={ss.w50}>
            <TextInput
              textAlign={'center'}
              onChangeText={(coupon) => {
                setcoupon(coupon);
                validaCoupon(coupon);
              }}
              value={coupon ?? ""}
              style={[{ height:32},ss.w100]}
            />
          </View>
        </View>
      </Surface>
    );
  }
  if((servizio==6)){ // RITIRO
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <RadioButton.Group 
            value={ritiroconsegna}
            onValueChange={
              async (ritiroconsegna)=>{
                setritiroconsegna(ritiroconsegna)
                settestoritirooconsegna(ritiroconsegna?"consegnare":"ritirare");
                if(dove!=="" && dove!=="no" && comunedestinazione!=""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "Operazione":"calcolacostodistanza",
                    "comunedestinazione":comunedestinazione,
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          >
            <View style={[{ flexDirection: 'row'},ss.w100]}>
              <View style={{ width:"50%"}}>
                <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={"Ritiro"} value={false} />
              </View>
              <View style={ss.w50}>
                <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={"Consegna"} value={true} />
              </View>
            </View>
          </RadioButton.Group>
        {/* </Surface>
        <Surface style={[ss.surface1, ss.w100]} elevation={4}> */}
          <TextInput
            multiline = {true}
            numberOfLines = {6}
            label={"Indica cosa "+testoritirooconsegna+": *"}
            mode='outlined'
            value={cosa}
            onChangeText={cosa => setCosa(cosa)}
          />
        </Surface>
         
        <Surface style={[ss.surface1, ss.w100, ss.mt10]} elevation={4}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo, la persona o il negozio dove vuoi che ritiri o consegni quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il nome del luogo o della persona dove {testoritirooconsegna}  *</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Indica il nome del luogo o della persona"
            value={note2}
            onChangeText={note2 => setNote2(note2)}
          />
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Indica il telefono"
            value={telreferente}
            onChangeText={telreferente => settelreferente(telreferente)}
          />
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del luogo dove {testoritirooconsegna} specificando il comune, se diverso da quello predefinito</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Specifica via, numero civico"
            value={dove}
            onChangeText={dove => setdove(dove)}
            onBlur={
              async () => {
                if(dove!=="" && comunedestinazione!==""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "Operazione":"calcolacostodistanza",
                    "comunedestinazione":comunedestinazione,
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          />
          <TextInput
            mode='outlined'
            label="Specifica il comune"
            value={comunedestinazione}
            onChangeText={comunedestinazione => setcomunedestinazione(comunedestinazione)}
            onBlur={
              async ()=>{
                if(dove!=="" && dove!=="no" && comunedestinazione!=""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "Operazione":"calcolacostodistanza",
                    "comunedestinazione":comunedestinazione,
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          />
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={async ()=>{
              if(dove!=="" && note2!=="" && comunedestinazione!==""){
                let salvainrubrica={
                  "iduser":Id_Utente,
                  "nomeluogo":note2,
                  "indirizzoluogo":dove,
                  "comunedestinazione":comunedestinazione,
                  "telreferente":telreferente,
                  "Operazione":"salvainrubrica"
                }
                let json_res = await richiesta(salvainrubrica);
                if(typeof(json_res.errore)!=="undefined"){
                  alert(json_res.errore);
                } else {
                  setrubrica(json_res.altro.Rubrica);
                  alert("Indirizzo aggiunto correttamente.");
                }
              } else {
                alert("Per favore compila il nome e l'indirizzo del luogo")
              }
            }}  
            mode="contained"  style={[ss.w100,ss.mt15]}>Salva questo luogo in rubrica</Button>
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={()=>{
              showDialog8(true);
            }}  
            mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
          </View>
          {/* <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog12(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View> */}
          <View  style={[ss.p3,ss.w100 ]}>
            <View style={[ss.w100, ss.textcentro]}>
              <Text style={[{ fontWeight: 'bold'},ss.w100,ss.textcentro]}>Vuoi inserire un altro luogo dove {testoritirooconsegna}? Il secondo sará scontato del 50%.</Text>
            </View>
            <View style={[{flexDirection: "row-reverse",justifyContent:"space-around"},ss.w100]}>
              <RadioButton.Group 
                onValueChange={
                  async (triplettadove)=>{
                    settriplettadove(triplettadove);
                    if(!triplettadove){
                      setdove2("");
                      setnomeluogo2("");
                      setcosahugo2("");
                      let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                      let calcolacostodistanza={
                        "UltimoIndirizzo":UltimoIndirizzo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "Operazione":"calcolacostodistanza",
                        "comunedestinazione":comunedestinazione,
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                        setcheckcalcoladistanza(0);
                      }
                    }
                  }
                } value={triplettadove}
              >
                <View style={[ss.row]}>
                  <RadioButton.Item label="Si" value={true} style={{padding:0}} />            
                  <RadioButton.Item label="No" value={false} style={{padding:0}} />            
                </View>
              </RadioButton.Group>
            </View>
          </View>
          {
            triplettadove ?
              <>
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che acquisti o ritiri quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica il nome del luogo dove {testoritirooconsegna}</Text> 
                </View>
                <TextInput
                  multiline = {true}
                  numberOfLines = {1}
                  mode='outlined'
                  label="Indica il luogo"
                  value={nomeluogo2}
                  onChangeText={nomeluogo2 => setnomeluogo2(nomeluogo2)}
                />
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del luogo specificando il comune</Text> 
                </View>
                <TextInput
                  mode='outlined'
                  label="Specifica via, numero civico"
                  value={dove2}
                  onChangeText={dove2 => setdove2(dove2)}
                  // onEndEditing={
                  onBlur={
                    async () => {
                      if(dove!=="" && dove2!=="" && comunedestinazione!=="" && comunedestinazione2!==""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        let calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "indirizzoluogo2":dove2+" "+comunedestinazione2,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                          "comunedestinazione2":comunedestinazione2
                        }
                        if((servizio==6 || servizio == 7) && ritiroconsegna){
                          calcolacostodistanza.ritiroconsegna="si";
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0);
                          setcheckcalcoladistanza(1); 
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                          setcheckcalcoladistanza(0);
                        }
                      }
                    }
                  }
                />
                <TextInput
                  mode='outlined'
                  label="Specifica il comune:"
                  value={comunedestinazione2}
                  onChangeText={comunedestinazione2 => setcomunedestinazione2(comunedestinazione2)}
                  onBlur={
                    async ()=>{
                      if(dove!=="" && dove!=="no" && dove2!=="" && comunedestinazione!="" && comunedestinazione2!==""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        let calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "indirizzoluogo2":dove2+" "+comunedestinazione2,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                          "comunedestinazione2":comunedestinazione2
                        }
                        if((servizio==6 || servizio == 7) && ritiroconsegna){
                          calcolacostodistanza.ritiroconsegna="si";
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale));
                          setcheckcalcoladistanza(0); 
                        }
                      }
                    }
                  }
                />


                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1} onPress={()=>{showDialog10(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
                </View>
                {/* <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1} onPress={()=>{showDialog13(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
                </View> */}
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa ritirare o consegnare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami cosa {testoritirooconsegna} *</Text> 
                </View>
                <View  style={[ss.p3,ss.w100]}>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {6}
                    label={"Indica cosa "+ testoritirooconsegna+" (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):"}
                    mode='outlined'
                    value={cosahugo2}
                    onChangeText={cosahugo2 => setcosahugo2(cosahugo2)}
                  />
                </View>
              </>
            : null
          }
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
            <View style={[ss.row, ss.w50]}>
              <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
            </View>
            <View style={ss.w50}>
              <TextInput
                textAlign={'center'}
                onChangeText={(coupon) => {
                  setcoupon(coupon);
                  validaCoupon(coupon);
                }}
                value={coupon ?? ""}
                style={[{ height:32},ss.w100]}
              />
            </View>
          </View>
        </Surface>
      </Surface>
    );
  }
  if((servizio==7)){ // RITIRO grandi volumi
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <RadioButton.Group 
            value={ritiroconsegna}
            onValueChange={
              async (ritiroconsegna)=>{
                setritiroconsegna(ritiroconsegna)
                settestoritirooconsegna(ritiroconsegna?"consegnare":"ritirare");
                if(dove!=="" && dove!=="no" && comunedestinazione!=""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "Operazione":"calcolacostodistanza",
                    "comunedestinazione":comunedestinazione,
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          >
            <View style={[{ flexDirection: 'row'},ss.w100]}>
              <View style={{ width:"50%"}}>
                <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={"Ritiro"} value={false} />
              </View>
              <View style={ss.w50}>
                <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={"Consegna"} value={true} />
              </View>
            </View>
          </RadioButton.Group>
        {/* </Surface>
        <Surface style={[ss.surface1, ss.w100]} elevation={4}> */}
          <TextInput
            multiline = {true}
            numberOfLines = {6}
            label={"Indica cosa "+testoritirooconsegna+": *"}
            mode='outlined'
            value={cosa}
            onChangeText={cosa => setCosa(cosa)}
          />
        </Surface>
         
        <Surface style={[ss.surface1, ss.w100, ss.mt10]} elevation={4}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo, la persona o il negozio dove vuoi che ritiri o consegni quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami il nome del luogo o della persona dove {testoritirooconsegna}  *</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Indica il nome del luogo o della persona"
            value={note2}
            onChangeText={note2 => setNote2(note2)}
          />
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Indica il telefono"
            value={telreferente}
            onChangeText={telreferente => settelreferente(telreferente)}
          />
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del luogo dove {testoritirooconsegna} specificando il comune, se diverso da quello predefinito</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {1}
            mode='outlined'
            label="Specifica via, numero civico"
            value={dove}
            onChangeText={dove => setdove(dove)}
            onBlur={
              async () => {
                if(dove!=="" && comunedestinazione!==""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "comunedestinazione":comunedestinazione,
                    "Operazione":"calcolacostodistanza"
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo, alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          />
          <TextInput
            mode='outlined'
            label="Specifica il comune"
            value={comunedestinazione}
            onChangeText={comunedestinazione => setcomunedestinazione(comunedestinazione)}
            onBlur={
              async ()=>{
                if(dove!=="" && dove!=="no" && comunedestinazione!=""){
                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                  let calcolacostodistanza={
                    "UltimoIndirizzo":UltimoIndirizzo,
                    "indirizzoluogo":dove+" "+comunedestinazione,
                    "comunedestinazione":comunedestinazione,
                    "Operazione":"calcolacostodistanza"
                  }
                  if(dove2!=="" && comunedestinazione2!==""){
                    calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                    calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                  }
                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                    calcolacostodistanza.ritiroconsegna="si";
                  }
                  let json_res = await richiesta(calcolacostodistanza);
                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                    setcostodistanza(0); 
                    setcheckcalcoladistanza(1);
                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                  } else {
                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                    setcheckcalcoladistanza(0);
                  }
                }
              }
            }
          />
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={async ()=>{
              if(dove!=="" && note2!=="" && comunedestinazione!==""){
                let salvainrubrica={
                  "iduser":Id_Utente,
                  "nomeluogo":note2,
                  "indirizzoluogo":dove,
                  "comunedestinazione":comunedestinazione,
                  "telreferente":telreferente,
                  "Operazione":"salvainrubrica"
                }
                let json_res = await richiesta(salvainrubrica);
                if(typeof(json_res.errore)!=="undefined"){
                  alert(json_res.errore);
                } else {
                  setrubrica(json_res.altro.Rubrica);
                  alert("Indirizzo aggiunto correttamente.");
                }
              } else {
                alert("Per favore compila il nome e l'indirizzo del luogo")
              }
            }}  
            mode="contained"  style={[ss.w100,ss.mt15]}>Salva questo luogo in rubrica</Button>
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1}
            onPress={()=>{
              showDialog8(true);
            }}  
            mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
          </View>
          {/* <View style={{ flexDirection: 'row',width:"100%"}}>
            <Button  color={accent1} onPress={()=>{showDialog12(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
          </View> */}
          <View  style={[ss.p3,ss.w100 ]}>
            <View style={[ss.w100, ss.textcentro]}>
              <Text style={[{ fontWeight: 'bold'},ss.w100,ss.textcentro]}>Vuoi inserire un altro luogo dove {testoritirooconsegna}? Il secondo sará scontato del 50%.</Text>
            </View>
            <View style={[{flexDirection: "row-reverse",justifyContent:"space-around"},ss.w100]}>
              <RadioButton.Group 
                onValueChange={
                  async (triplettadove)=>{
                    settriplettadove(triplettadove);
                    if(!triplettadove){
                      setdove2("");
                      setnomeluogo2("");
                      setcosahugo2("");
                      let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                      let calcolacostodistanza={
                        "UltimoIndirizzo":UltimoIndirizzo,
                        "indirizzoluogo":dove+" "+comunedestinazione,
                        "comunedestinazione":comunedestinazione,
                        "Operazione":"calcolacostodistanza"
                      }
                      let json_res = await richiesta(calcolacostodistanza);
                      if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                      } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                        setcostodistanza(0); 
                        setcheckcalcoladistanza(1);
                        alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                      } else {
                        setcostodistanza(parseFloat(json_res.risposta.Totale));
                        setcheckcalcoladistanza(0); 
                      }
                    }
                  }
                } value={triplettadove}
              >
                <View style={[ss.row]}>
                  <RadioButton.Item label="Si" value={true} style={{padding:0}} />            
                  <RadioButton.Item label="No" value={false} style={{padding:0}} />            
                </View>
              </RadioButton.Group>
            </View>
          </View>
          {
            triplettadove ?
              <>
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che acquisti o ritiri quanto indicato. Se il luogo di acquisto suggerito da te con il luogo di consegna superano i 5 km, per ogni km in più verrà calcolato un euro." />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica il nome del luogo dove {testoritirooconsegna}</Text> 
                </View>
                <TextInput
                  multiline = {true}
                  numberOfLines = {1}
                  mode='outlined'
                  label="Indica il luogo"
                  value={nomeluogo2}
                  onChangeText={nomeluogo2 => setnomeluogo2(nomeluogo2)}
                />
                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indica l'indirizzo del luogo specificando il comune</Text> 
                </View>
                <TextInput
                  mode='outlined'
                  label="Specifica via, numero civico"
                  value={dove2}
                  onChangeText={dove2 => setdove2(dove2)}
                  // onEndEditing={
                  onBlur={
                    async () => {
                      if(dove!=="" && dove2!=="" && comunedestinazione!=="" && comunedestinazione2!==""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        let calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "indirizzoluogo2":dove2+" "+comunedestinazione2,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                          "comunedestinazione2":comunedestinazione2
                        }
                        if((servizio==6 || servizio == 7) && ritiroconsegna){
                          calcolacostodistanza.ritiroconsegna="si";
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                          setcheckcalcoladistanza(0);
                        }
                      }
                    }
                  }
                />
                <TextInput
                  mode='outlined'
                  label="Specifica il comune:"
                  value={comunedestinazione2}
                  onChangeText={comunedestinazione2 => setcomunedestinazione2(comunedestinazione2)}
                  onBlur={
                    async ()=>{
                      if(dove!=="" && dove!=="no" && dove2!=="" && comunedestinazione!="" && comunedestinazione2!==""){
                        let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                        let calcolacostodistanza={
                          "UltimoIndirizzo":UltimoIndirizzo,
                          "indirizzoluogo":dove+" "+comunedestinazione,
                          "indirizzoluogo2":dove2+" "+comunedestinazione2,
                          "Operazione":"calcolacostodistanza",
                          "comunedestinazione":comunedestinazione,
                          "comunedestinazione2":comunedestinazione2
                        }
                        if((servizio==6 || servizio == 7) && ritiroconsegna){
                          calcolacostodistanza.ritiroconsegna="si";
                        }
                        let json_res = await richiesta(calcolacostodistanza);
                        if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                          setcostodistanza(0);
                          setcheckcalcoladistanza(1); 
                          alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                        } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                          setcostodistanza(0); 
                          setcheckcalcoladistanza(1);
                          alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                        } else {
                          setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                          setcheckcalcoladistanza(0);
                        }
                      }
                    }
                  }
                />


                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1} onPress={()=>{showDialog10(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Apri la rubrica</Button>
                </View>
                {/* <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Button  color={accent1} onPress={()=>{showDialog13(true);}}  mode="outlined"  style={[ss.w100,ss.mt15]}>Luoghi suggeriti</Button>
                </View> */}

                <View style={{ flexDirection: 'row',width:"100%"}}>
                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa ritirare o consegnare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
                  <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.w90]}>Indicami cosa {testoritirooconsegna} *</Text> 
                </View>
                <View  style={[ss.p3,ss.w100]}>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {6}
                    label={"Indica cosa "+ testoritirooconsegna+" (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):"}
                    mode='outlined'
                    value={cosahugo2}
                    onChangeText={cosahugo2 => setcosahugo2(cosahugo2)}
                  />
                </View>
              </>
            : null
          }
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={[ss.centro, ss.row, ss.w100,ss.mt10]}>
            <View style={[ss.row, ss.w50]}>
              <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
            </View>
            <View style={ss.w50}>
              <TextInput
                textAlign={'center'}
                onChangeText={(coupon) => {
                  setcoupon(coupon);
                  validaCoupon(coupon);
                }}
                value={coupon ?? ""}
                style={[{ height:32},ss.w100]}
              />
            </View>
          </View>
        </Surface>
      </Surface>
    );
  }
}

// INIZIO
export default function Hugo({ navigation, route }) {
  var Id_Utente=route.params.Id_Utente;
  var Nominativo=route.params.Nominativo;
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  // Dialog Lista indirizzi predefiniti
  const [visible2, setVisible2] = React.useState(false);
  const showDialog2 = () => setVisible2(true);
  const hideDialog2 = () => setVisible2(false);

  const [visible3, setVisible3] = React.useState(false);
  const showDialog3 = () => setVisible3(true);
  const hideDialog3 = () => setVisible3(false);

  const [visible4, setVisible4] = React.useState(false);
  const showDialog4 = () => setVisible4(true);
  const hideDialog4 = () => setVisible4(false);

  const [visible5, setVisible5] = React.useState(false);
  const showDialog5 = () => setVisible5(true);
  const hideDialog5 = () => setVisible5(false);

  // Dialog nuovo indirizzo
  const [visible6, setVisible6] = React.useState(false);
  const showDialog6 = () => setVisible6(true);
  const hideDialog6 = () => setVisible6(false);

  const [visible7, setVisible7] = React.useState(false);
  const showDialog7 = () => setVisible7(true);
  const hideDialog7 = () => setVisible7(false);
  const [visible8, setVisible8] = React.useState(false);
  const showDialog8 = () => setVisible8(true);
  const hideDialog8 = () => setVisible8(false);
  const [visible9, setVisible9] = React.useState(false);
  const showDialog9 = () => setVisible9(true);
  const hideDialog9 = () => setVisible9(false);
  const [testoinfo, settestoinfo] = useState("");
  const [testodettaglioindirizzo, settestodettaglioindirizzo] = useState("");
  const [visible10, setVisible10] = React.useState(false);
  const showDialog10 = () => setVisible10(true);
  const hideDialog10 = () => setVisible10(false);
  const [visible11, setVisible11] = React.useState(false);
  const showDialog11 = () => setVisible11(true);
  const hideDialog11 = () => setVisible11(false);
  const [visible12, setVisible12] = React.useState(false);
  const showDialog12 = () => setVisible12(true);
  const hideDialog12 = () => setVisible12(false);
  const [visible13, setVisible13] = React.useState(false);
  const showDialog13 = () => setVisible13(true);
  const hideDialog13 = () => setVisible13(false);
  const [visible14, setVisible14] = React.useState(false);
  const showDialog14 = () => setVisible14(true);
  const hideDialog14 = () => setVisible14(false);
  

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  function alertCancellaIndirizzo (Id_Indirizzo) {
    Alert.alert(
      "Cancellazione Indirizzo",
      "Quest operazone cancellerà il tuo Indirizzo dai nostri server e non sarà possibile annullarla. Sei sicuro?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            if(Id_Indirizzo==indirizzo){
              setIndirizzo("no");
              setdescrizioneindirizzo("no");
              setindirizzoalternativo("");
            }
            let Id_User = await getData('@Id_User');
            let richiestacancellaindirizzo={
              "Operazione":'cancellaindirizzo',
              "Id_Indirizzo":Id_Indirizzo,
              "Id_User":Id_User,
            }
            try {
              richiesta(richiestacancellaindirizzo,'apiHugo')
              .then(async (json) => {
                setIndirizzi(json);
                if(Array.isArray(json) && json.length==1){
                  setIndirizzo(json[0].Id);
                  setccittaindirizzo(json[0].Citta);
                  setindirizzoalternativo(json[0].Via+" "+json[0].Civico+" "+json[0].Citta);
                }
              });
            } catch(e) {
              // remove error
            }
          } 
        }
      ]
    );
  } 
  function alertCittaDiversa (place) {
    Alert.alert(
      "Citta inserita esterna all'area del servizio",
      "La cittá inserita sembra essere diversa da quella selezionata per il servizio. Puoi verificare la disponibilitá e i servizi associati a questa cittá inserendo un nuovo indirizzo predefinito cliccando ok. Altrimenti annulla e riprova inserendo un indirizzo diverso.",
      [
        {
          text: "Annulla",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            setNuovoindirizzo(place[0].street);
            setNuovacitta(place[0].city);
            setCivico(place[0].streetNumber);
            setNuovcap(place[0].postalCode);
            setNuovaprovincia(place[0].region);
            let Id_User = await getData('@Id_User');
            let richiestaindi={"Operazione":'getIndirizzi',"Id_User":Id_User}
            let listaindirizzi = await richiesta(richiestaindi);
            setIndirizzi(listaindirizzi);
            setVisible2(true);
            setVisible6(true);
          } 
        }
      ]
    );
  } 
  
  function RadioServizio({id,etichetta,info,costo,stili}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100,stili]}>
        <View style={{ width:"10%"}}>
          <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={{ width:"90%"}}>
          <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta} value={id} />
          {/* <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta+(costo>0?" "+costo.toFixed(2)+"€":"")} value={id} /> */}
        </View>
      </View>
    )
  }
  function NuovoRadioServizio({id,etichetta,info,costo,stili,selezionato=false,percorso}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100,ss.my5,stili]}>
        <View style={{ width:"10%"}}>
          <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={[{ width:"90%"}]}>
          {/* <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta} value={id} /> */}
          <TouchableOpacity
            onPress={() => {
              checkservizio(id)
            }}
            style={[ss.nrs, selezionato?ss.bwith3:ss.bwith1]}
          >
            <View style={[{alignItems:'center', paddingEnd:60},ss.row,ss.w100]}>
                <Image source={percorso} style={[{height: 60, width:60}]}  />
                <Text style={[ss.h2]}>{etichetta}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  function RadioMetodo({id,etichetta,info}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100]}>
        <View style={{ width:"10%"}}>
          <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={{ width:"90%"}}>
          <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta} value={id} />
        </View>
      </View>
    )
  }

  // VARIABILI
  // const [checked, setChecked] = React.useState(0);
  // const arrayservizi=[4.90,6.50,14.99,0,14.99,4.90,4.90];
  const [costogestioneincassi, setcostogestioneincassi] = useState(0);
  const [costoservizio, setcostoservizio] = useState(0);
  const [totale, settotale] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [fiducia, setfiducia] = useState(0);
  const [rubrica, setrubrica] = useState([]);
  const [luoghisuggeriti, setluoghisuggeriti] = useState([]);
  const [telefono, settelefono] = useState("");
  const [attivitabase, setattivitabase] = useState("no");
  const [indirizzo, setIndirizzo] = useState("no");
  const [ccittaindirizzo, setccittaindirizzo] = useState("");
  const [descrizioneindirizzo, setdescrizioneindirizzo] = useState("no");
  const [servizio, setServizio] = useState('no');
  const [metodo_pagamento, setMetodo_Pagamento] = useState('no');
  const [note, setNote] = useState("");
  const [dove, setdove] = useState("");
  const [comunedestinazione, setcomunedestinazione] = useState("");
  const [dove2, setdove2] = useState("");
  const [comunedestinazione2, setcomunedestinazione2] = useState("");
  const [cosahugo2, setcosahugo2] = useState("");
  const [nomeluogo2, setnomeluogo2] = useState("");
  const [note2, setNote2] = useState("");
  const [indirizzoalternativo, setindirizzoalternativo] = useState("");
  const [cosa, setCosa] = useState("");
  const [mancia, setMancia] = useState(0);
  const [auto, setAuto] = useState("no");
  const [opzioniauto, setopzioniauto] = useState("Hugò");
  const [chiamami, setChiamami] = useState(false);
  const [sostiuisci, setSostiuisci] = useState(false);
  const [spesamax, setSpesamax] = useState(0);
  const [oraprenotazione, setora] = useState("no");
  const [coupon, setcoupon] = useState("");
  const [scontocoupon, setscontocoupon] = useState(0);
  const [duratasosta, setduratasosta] = useState(0);
  const [passeggeri, setpasseggeri] = useState(0);
  const [lat, setlat] = useState(false);
  const [lon, setlon] = useState(false);
  const [ritiroconsegna, setritiroconsegna] = useState(false);
  const [testoritirooconsegna, settestoritirooconsegna] = useState("ritirare");
  const [telreferente, settelreferente] = useState("");
  const [richiestafattura, setrichiestafattura] = useState(0);
  
  //NUOVO INDIRIZZO
  const [nuovoindirizzo, setNuovoindirizzo] = useState("");
  const [nuovocivico, setCivico] = useState("");
  const [nuovacitta, setNuovacitta] = useState("");
  const [nuovaprovincia, setNuovaprovincia] = useState("");
  const [nuovocap, setNuovcap] = useState("");
  const [nuovotel, setNuovotel] = useState("");
  const [nuovenoteindirizzo, setNuovenoteindirizzo] = useState("");

  const [dispo, setDispo] = useState('');
  const [indirizzi, setIndirizzi] = useState([]);
  const [listaservizi, setlistaservizi] = useState([]);
  const [listametodi, setlistametodi] = useState([]);
  const [costodistanza, setcostodistanza] = useState(0);
  const [checkcalcoladistanza, setcheckcalcoladistanza] = useState(0);
  const [hugosceglie, sethugosceglie] = useState(1);
  const [triplettadove, settriplettadove] = useState(false);
  let elencoindirizzi=indirizzi;
  


  const [richestaaggiornamento, setrichestaaggiornamento] = useState({
    "Operazione":'AggiornaHugo',
    "id_attivita_base":attivitabase,
    "servizio":servizio,
    "iduser":Id_Utente,
  });
  // var richestaaggiornamento={
  //   "Operazione":'AggiornaHugo',
  //   "id_attivita_base":attivitabase,
  //   "servizio":servizio,
  //   "iduser":Id_Utente,
  // };

  function aggiornaPagina(json){
    if(typeof(json?.dati?.ore)!="undefined") {
      setDispo(elaboraore(json.dati.ore));
      setSaldo(parseFloat(json.altro.Saldo));
      setfiducia(parseFloat(json.altro.Fiducia));
      setrubrica(json.altro.Rubrica);
      settelefono(json.altro.Telefono);
    }
  }
  async function apriwa(){
    Linking.openURL("https://wa.me/+393383083224");
  }
  async function chiama(){
    Linking.openURL("tel:+393383083224");
  }



  async function inviaPrenotazione (indirizzo, servizio, metodo_pagamento, note, note2, dove, cosa, mancia, auto, chiamami, sostiuisci, spesamax, coupon,indirizzoalternativo, oraprenotazione, dove2, cosahugo2, nomeluogo2, comunedestinazione, comunedestinazione2,telreferente,duratasosta,passeggeri,richiestafattura){
    if(isNaN(spesamax)){
      if(prefixspesamax==""){
        var prefixspesamax=0;
      } else {
        var prefixspesamax=spesamax.replace(",", ".");
      }
      var fixspesamax=parseFloat(prefixspesamax);
    } else {
      var fixspesamax=spesamax;
    }
    try {
      let richiestaprenotazione= {
        "cliente":Id_Utente,
        "idatti":attivitabase,
        "indirizzo":descrizioneindirizzo,
        "servizio":servizio,
        "metodo_pagamento":metodo_pagamento,
        "note":note,
        // "dove":dove+" "+comunedestinazione,
        "cosa":cosa,
        // "note2":note2,
        "mancia":mancia,
        "auto":auto,
        "spesamax":fixspesamax,
        "coupon":coupon,
        "scontocoupon":scontocoupon,
        "indirizzoalternativo":indirizzoalternativo,
        "telefono":telefono,
        "passeggeri":passeggeri,
        "oraprenotazione":oraprenotazione,
        // "telreferente":telreferente,
        "richiestafattura":richiestafattura,
        "checkdcalcoladistanza":checkcalcoladistanza,
      }
      // console.log('((servizio == 4 || servizio == 2))', ((servizio == 4 || servizio == 2)));
      // console.log('((hugosceglie))', (hugosceglie));
      // console.log('((hugosceglie===0 || (servizio == 4 || servizio == 2)))', ((hugosceglie===0 || (servizio == 4 || servizio == 2))));
      // console.log('(dove!=="" && dove!==" " && (hugosceglie===0 || (servizio == 4 || servizio == 2)))', (dove!=="" && dove!==" " && (hugosceglie===0 || (servizio == 4 || servizio == 2))));
      if(dove!=="" && dove!==" " && (hugosceglie===0 || (servizio == 4 || servizio == 2 || servizio == 6 || servizio == 7))){
        richiestaprenotazione["dove"]=dove+" "+comunedestinazione;
        richiestaprenotazione["note2"]=note2;
      }
      if(dove2!=="" && dove2!==" " && (hugosceglie===0 || (servizio == 4 || servizio == 2 || servizio == 6 || servizio == 7))){
        richiestaprenotazione["dove2"]=dove2+" "+comunedestinazione2;
        richiestaprenotazione["cosahugo2"]=cosahugo2;
        richiestaprenotazione["nomeluogo2"]=nomeluogo2;
      }
      if(lat){
        richiestaprenotazione["Lat"]=lat;
        richiestaprenotazione["Lon"]=lon;
      }
      if(sostiuisci){
        richiestaprenotazione["sostiuisci"]=1;
      }
      if(typeof(telreferente)!=="undefined" && telreferente!=="" && telreferente!==" " && telreferente!=="undefined"){
        richiestaprenotazione["telreferente"]=telreferente;
      }
      if(chiamami){
        richiestaprenotazione["chiamami"]=1;
      }
      let checkgo=true;
      let errore="";
      if(indirizzo=="no"){checkgo=false;errore+="Per favore scegli un indirizzo. \r\n"}
      if(servizio=="no"){checkgo=false;errore+="Per favore scegli un servizio. \r\n"}
      if(servizio==0 || servizio==1 || servizio==5){
        if(hugosceglie==0){
          if(dove==""){checkgo=false;errore+="Per favore indica l'indirizzo del luogo di acquisto o ritiro. \r\n"}
          if(comunedestinazione==""){checkgo=false;errore+="Per favore indica il comune del luogo di acquisto o ritiro. \r\n"}
          if(triplettadove){
            if(dove2==""){checkgo=false;errore+="Per favore indica l'indirizzo del secondo luogo o disabilita la relativa opzione. \r\n"}
            if(comunedestinazione2==""){checkgo=false;errore+="Per favore indica il comune del secondo luogo o disabilita la relativa opzione. \r\n"}
          }
        }
        if(fixspesamax<1){
          checkgo=false;errore+="Per favore imposta la spesa massima. \r\n"
        }
        if(cosa==""){
          checkgo=false;errore+="Per favore imposta cosa acquistare. \r\n"
        }
      }
      if(servizio==4){
        richiestaprenotazione["duratasosta"]=duratasosta;
      }
      if(servizio==6 || servizio==7){
        if(ritiroconsegna){
          richiestaprenotazione["indirizzo"]=dove+" "+comunedestinazione;
          richiestaprenotazione["dove"]=descrizioneindirizzo;
        }
        if(dove==""){checkgo=false;errore+="Per favore scegli un indirizzo di destinazione. \r\n"}
        if(comunedestinazione==""){checkgo=false;errore+="Per favore scegli un comune di destinazione. \r\n"}
        if(cosa==""){checkgo=false;errore+="Per favore specifica cosa vuoi ritirato o consegnato. \r\n"}
      }
      if(metodo_pagamento=="no"){
        checkgo=false;
        errore+="Per favore scegli un metodo di pagamento. \r\n"
      }
      if(oraprenotazione=="no"){checkgo=false;errore+="Per favore scegli un orario. \r\n"}
      if(checkgo){
        setVisible9(true);
        let checkriuscito=false;
        switch (metodo_pagamento) {
          case 0:
            let acquisto=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
            if(typeof(acquisto.PaginaAcquisto)!=="undefined" && acquisto.PaginaAcquisto!==null && acquisto.PaginaAcquisto!==""){
              Linking.openURL(acquisto.PaginaAcquisto);
            } else {
              console.log('acquisto', acquisto);
            }
            break;
          case "0":
              let acquisto2=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
              if(typeof(acquisto2.PaginaAcquisto)!=="undefined" && acquisto2.PaginaAcquisto!==null && acquisto2.PaginaAcquisto!==""){
                Linking.openURL(acquisto2.PaginaAcquisto);
              } else {
                console.log('acquisto2', acquisto2);
              }
              break;
          case "1":
            let Preautorizzazione = await getData('@Preautorizzazione');
            let idpagamento = await getData('@idpagamento');
            if(Preautorizzazione=="si"){
              richiestaprenotazione["Operazione"]="AcquistoConPre";
              richiestaprenotazione["idpagamento"]=idpagamento;
              let AcquistoConPre=await richiesta(richiestaprenotazione);
              if(AcquistoConPre.Risposta=="inserimento_ritiro_riuscito"){
                alert("Inserimento Riuscito");
                checkriuscito=true;

              }
              if(typeof(AcquistoConPre.Errore)!=="undefined"){
                alert(AcquistoConPre.Errore);
              }
            } else {
              alert("Per favore configura la tua carta");
              navigation.navigate('Preautorizzazione');
            }
            break;
          case 2:
            richiestaprenotazione["Operazione"]="AcquistoConSaldo";
            let AcquistoConSaldo=await richiesta(richiestaprenotazione);
            if(AcquistoConSaldo.Risposta=="inserimento_ritiro_riuscito"){
              setSaldo(parseFloat(AcquistoConSaldo.Saldo));
              alert("Acuisto con saldo Riuscito");
              checkriuscito=true;
            }
            if(AcquistoConSaldo2.Errore!=="undefined" && typeof(AcquistoConSaldo2.Errore)!=="undefined"){
              alert(AcquistoConSaldo.Errore);
            }
            break;
          case "2":
            richiestaprenotazione["Operazione"]="AcquistoConSaldo";
            let AcquistoConSaldo2=await richiesta(richiestaprenotazione);
            if(AcquistoConSaldo2.Risposta=="inserimento_ritiro_riuscito"){
              
              setSaldo(parseFloat(AcquistoConSaldo2.Saldo));
              alert("Acquisto Riuscito");
              checkriuscito=true;
              // listaritiriaggiornata=AcquistoConSaldo2.Ritiri;
            }
            if(AcquistoConSaldo2.Errore!=="undefined" && typeof(AcquistoConSaldo2.Errore)!=="undefined"){
              alert(AcquistoConSaldo2.Errore);
            }
            break;
          case "3":
            richiestaprenotazione["Operazione"]="AcquistoDiretto";
            let AcquistoDiretto=await richiesta(richiestaprenotazione);
            if(AcquistoDiretto.Risposta=="inserimento_ritiro_riuscito"){
              alert("Inserimento Riuscito");
              checkriuscito=true;
              // listaritiriaggiornata=AcquistoDiretto.Ritiri;
            }
            if(AcquistoDiretto.Errore!=="undefined" && typeof(AcquistoDiretto.Errore)!=="undefined"){
              alert(AcquistoDiretto.Errore);
            }
            break;
          default:
            break;
        }
        if(checkriuscito){
          navigation.navigate('History');
          setcheckdomani(false);
          setChiamami(false);
          setSostiuisci(false);
          settestooggidomani("per oggi");
          setduratasosta(0);
          setSpesamax(0);
          setscontocoupon(0);
          setpasseggeri(0);
          setMetodo_Pagamento("no");
          setServizio("no");
          setora("no");
          setAuto("no");
          setNote("");
          setNote2("");
          setdove("");
          setCosa("");
          setcoupon("");
        }
      } else {
        console.log('errore: ', errore);
        alert(errore);
      }
      setVisible9(false);
    } catch (error) {
      console.log('errore: ', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let richiestacheckaggiornamento={"Operazione":'checkVersione'}
      let checkAggiornamento = await richiesta(richiestacheckaggiornamento);
      if(checkAggiornamento.versione>numeroversione){
        Alert.alert(
          "Aggiornamento disponibile",
          "C'è un nuovo aggiornamento disponibile. Vuoi scaricarlo?",
          [
            {
              text: "No",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { 
              text: "OK", 
              onPress: () => {
                if(Platform.OS === 'ios'){
                  Linking.openURL("https://apps.apple.com/us/app/hug%C3%B2-personal-shopper/id6443560017");
                } else if(Platform.OS === 'android'){
                  Linking.openURL("https://play.google.com/store/apps/details?id=com.ristoapps.hugo");
                }
              } 
            }
          ]
        );
      }
      let richiestaindi={"Operazione":'getIndirizzi',"Id_User":Id_User}
      let listaindirizzi = await richiesta(richiestaindi);
      // setIndirizzi(listaindirizzi);
      let richiestaservizi={"Operazione":'getServizi2',"Id_User":Id_User}
      let elencoservizi = await richiesta(richiestaservizi);
      let cittaindirizzo = await getData('@cittaindirizzo');
      if(cittaindirizzo!==null){
        setccittaindirizzo(cittaindirizzo);
        elencoservizi=elencoservizi.filter(function(item) { 
          if(item.citta.includes(cittaindirizzo.trim())){
            return item;
          }
        });
      }
      // console.log('elencoservizi', elencoservizi);
      setlistaservizi(elencoservizi);

      let UltimoIndirizzo = await getData('@UltimoIndirizzo');
      // console.log('(typeof(UltimoIndirizzo)!=="undefined" && UltimoIndirizzo!==null && typeof(listaindirizzi)!=="undefined" &&  listaindirizzi!==null && Array.isArray(listaindirizzi) && listaindirizzi.length>1)', (typeof(UltimoIndirizzo)!=="undefined" && UltimoIndirizzo!==null && typeof(listaindirizzi)!=="undefined" &&  listaindirizzi!==null && Array.isArray(listaindirizzi) && listaindirizzi.length>1));
      if(typeof(UltimoIndirizzo)!=="undefined" && UltimoIndirizzo!==null && typeof(listaindirizzi)!=="undefined" &&  listaindirizzi!==null && Array.isArray(listaindirizzi) && listaindirizzi.length>1){
        let indirizzoscelto = listaindirizzi.filter(indirizzi => indirizzi.Id == UltimoIndirizzo);
        if(typeof(indirizzoscelto)!=="undefined" && indirizzoscelto!==null && indirizzoscelto.length==1 && typeof(indirizzoscelto[0])!=="undefined" && typeof(indirizzoscelto[0].Citta)!=="undefined" && typeof(indirizzoscelto[0].Via)!=="undefined"){
          setIndirizzo(UltimoIndirizzo);
          setccittaindirizzo(indirizzoscelto[0].Citta);
          setindirizzoalternativo(indirizzoscelto[0].Via+" "+indirizzoscelto[0].Civico+" "+indirizzoscelto[0].Citta);
        }
      } else {
        // console.log('(listaindirizzi.length==1)', (listaindirizzi.length==1));
        if(listaindirizzi.length==1){
          setIndirizzo(listaindirizzi[0].Id);
          AsyncStorage.setItem('@UltimoIndirizzo', listaindirizzi[0].Id);
          if(cittaindirizzo==null){
            setccittaindirizzo(listaindirizzi[0].Citta);
            // console.log('listaindirizzi[0].Via+" "+listaindirizzi[0].Civico+" "+listaindirizzi[0].Citta', listaindirizzi[0].Via+" "+listaindirizzi[0].Civico+" "+listaindirizzi[0].Citta);
          }
          setindirizzoalternativo(listaindirizzi[0].Via+" "+listaindirizzi[0].Civico+" "+listaindirizzi[0].Citta);
        }
      }
      
      if(typeof(richestaaggiornamento.id_attivita_base)!=="undefined" && richestaaggiornamento.id_attivita_base !="undefined" && richestaaggiornamento.id_attivita_base !="no"){
        let json_res = await richiesta(richestaaggiornamento);
        aggiornaPagina(json_res);
      }
    }
    fetchData();
  }, [Id_Utente,ccittaindirizzo]);
  // }, [Id_Utente]);

  useEffect(() => {
    setcoupon("");
    setscontocoupon(0);
    setSpesamax(0);
    setMancia(0);
  }, [servizio]);

  useEffect(() => {
    if(indirizzo!="no"){
      async function fetchData() {
        let richiestaattivitabase={
          "Operazione":'getAttivitaBase',
          "Id_Indirizzo":indirizzo,
        }
        let jattivitabase = await richiesta(richiestaattivitabase);
        // console.log('jattivitabase', jattivitabase);
        if(typeof(jattivitabase.id_attivita_base)!=="undefined" && jattivitabase.id_attivita_base !="undefined" && jattivitabase.id_attivita_base !="no"){
          setattivitabase(jattivitabase.id_attivita_base);
          setdescrizioneindirizzo(jattivitabase.descrizione_indirizzo);
          setluoghisuggeriti(jattivitabase.luoghisuggeriti);
          // console.log('luoghisuggeriti', jattivitabase.luoghisuggeriti);
          richestaaggiornamento.id_attivita_base=jattivitabase.id_attivita_base;
        }
        let json_res = await richiesta(richestaaggiornamento);
        aggiornaPagina(json_res);
      }
      fetchData();
    }
    let costoserv=0;
    listaservizi.forEach(element => {
      if(element["id"]==servizio){
        setlistametodi(element["metodi_di_pagamento"]);
        let totserv=0;
        if(dove2!="" && comunedestinazione2!=""){
          totserv+=element["costo"]+element["costo"]/2;
        } else {
          totserv+=totserv=element["costo"];
        }
        setcostoservizio(parseFloat(totserv));
        return costoserv=totserv;
      }
    });
    // (spesamax!=""?spesamax:0)
    // (spesamax!=""?parseFloat((spesamax==="string"?spesamax.replace(/,/, '.'):spesamax)).toFixed(2):0)
    // (spesamax==="string"?parseFloat(spesamax.replace(/,/, '.')).toFixed(2):)
    // parseFloat((spesamax!=""?spesamax:0))
    // parseFloat(spesamax!=""?(typeof spesamax==="string"?spesamax.replace(/,/, '.'):spesamax):0).toFixed(2)
    // (parseFloat((typeof spesamax==="string"?spesamax.replace(/,/, '.'):spesamax)))
    let costospesamax=0;
    if(spesamax!=""){
      if(typeof spesamax==="string"){
        costospesamax=parseFloat(spesamax.replace(/,/, '.'));
      } else {
        costospesamax=parseFloat(spesamax);
      }
    }
    // console.log('costodistanza', costodistanza);
    settotale((servizio!="no"?costoserv:0)+costogestioneincassi+costospesamax+(duratasosta/30*costobasesosta)-scontocoupon+mancia+costodistanza);
  }, [indirizzo,servizio,spesamax,duratasosta,scontocoupon,mancia,costodistanza,ccittaindirizzo,comunedestinazione2,dove2,costoservizio]);


  // const MINUTE_MS = 10000;
  // useEffect(() => {
  //   const intervalloritiri = setInterval(async () => {
  //     // let Id_User = await getData('@Id_User');
      
  //     let json_res = await richiesta(richestaaggiornamento);
  //     // let json_res = await richiesta({
  //     //   "Operazione":'AggiornaHugo',
  //     //   "id_attivita_base":attivitabase,
  //     //   "iduser":Id_User,
  //     // },'apiHugo');
  //     aggiornaPagina(json_res);
  //   }, MINUTE_MS);
    
  //   return () => clearInterval(intervalloritiri); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [attivitabase]);
  
  var oggi = new Date();
  var deltaminuti=25;
  var adessocondelta = new Date(oggi.getTime() + deltaminuti*60000);
  oggi.setHours( oggi.getHours() + 2 );

  
  const [checkdomani, setcheckdomani] = useState(false);
  const [testooggidomani, settestooggidomani] = useState("per oggi");

  function checkservizio(servizio){
    setcheckdomani(false);
    setChiamami(false);
    setSostiuisci(false);
    settestooggidomani("per oggi");
    setduratasosta(0);
    setSpesamax(0);
    setscontocoupon(0);
    setpasseggeri(0);
    setMetodo_Pagamento("no");
    setAuto(1);
    setora("no");
    setNote("");
    setNote2("");
    setdove("");
    setCosa("");
    setcoupon("");
    setdove2("");
    setcomunedestinazione(ccittaindirizzo);
    setcomunedestinazione2(ccittaindirizzo);
    setnomeluogo2("");
    setcosahugo2("");
    setcostodistanza(0);
    setrichiestafattura(0);
    sethugosceglie(1);
    settriplettadove(false);
    // console.log('listaservizi[servizio].citta', listaservizi[servizio].citta);
    switch (servizio) {
      case 1:
        setcheckdomani(true);
        settestooggidomani("per domani");
        break;
      case 3:
        navigation.navigate('Richiesta NCC');
        break; 
      case 8:
        navigation.navigate('Richiesta dog sitter');
        break; 
      case 9:
        navigation.navigate('Richiesta assistenza anziani e invalidi');
        break; 
      case 4:
        setduratasosta(30);
        break; 
      default:
        break;
    }
    setServizio(servizio);
    richestaaggiornamento.servizio=servizio;
    if(typeof(richestaaggiornamento.id_attivita_base)!=="undefined" && richestaaggiornamento.id_attivita_base !="undefined" && richestaaggiornamento.id_attivita_base !="no"){
      async ()=> {
        let json_res = await richiesta(richestaaggiornamento);
        aggiornaPagina(json_res);
      }
    }
  }

  function OpzioniAuto(props) {
    if(auto==1){
      return (
        <View style={[ss.w100,ss.mt15]}>
          <Divider />
          <View style={[ss.w100, ss.mt15]}>
            <Text style={[ss.centro]}>Vuoi usare la tua auto o quella del Rider?</Text> 
          </View>
          <View style={[{ flexDirection: 'row'},ss.mt15,ss.w100]}>
            <Button onPress={() => {setopzioniauto("Hugò")}} style={[("Hugò" === opzioniauto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"Hugò" === opzioniauto ? ss.labelselected : ss.unselected} mode="outlined">Hugò</Button>
            <Button onPress={() => {setopzioniauto("Personale");}} style={[("Personale" === opzioniauto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"Personale" === opzioniauto ? ss.labelselected : ss.unselected}   mode="outlined">Personale</Button>
          </View>
        </View>
      );
    } else if(auto==0){
      <View style={[ss.w100,ss.mt15]}>
        <Divider />
        <View style={[ss.w100, ss.mt15]}>
          <Text style={[ss.centro]}>Hugò potrà arrivare con auto, moto o scooter.</Text> 
        </View>
      </View>
    }
  }

  async function validaCoupon(cod_coupon){
    if(cod_coupon.length>4){
      let richiestavalidazione={
        "Operazione":'validaCoupon',
        "cod_coupon":cod_coupon,
      }
      let coupon = await richiesta(richiestavalidazione);
      
      if(typeof(coupon)!==null, coupon["tipo"]=="Corretto"){
        setscontocoupon(parseFloat(coupon["Importo"]));
        alert("Coupon validato: Hai ottenuto uno sconto di "+coupon["Importo"]+" euro.");
      } else {
        setscontocoupon(0);
      }
    }
  }
  const ssettogglevisibilita = () => {
    visible?setVisible(false):setVisible(true);
};
  return (
    <Provider>
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <View style={[{ flexDirection: 'row',alignItems:"center"},ss.w100]}>
              <Image source={require('../assets/omino.png')} style={[{height: calcolaAltezza(300,453,10,25)},ss.w25]}  />
              <Surface style={[ss.surface1,ss.mb15,ss.centro,ss.w75]} elevation={4}>
                <Text style={ss.h1}>Ciao {Nominativo}!</Text>
                <Text style={ss.h2}>Cosa posso portarti oggi?</Text>
                <Text style={ss.h2}>Cosa posso consegnare per te?</Text>
                <Text style={ss.h2}>Dove posso accompagnarti?</Text>
                {/* <Text style={[ss.h2,ss.textcentro]}>Per piacere inserisci più dettagli possibili:</Text>
                <Text style={ss.h2}>mi faciliteresti il compito.</Text> */}
              </Surface>
            </View>
            <Button onPress={ssettogglevisibilita} color={accent1} mode="contained"  style={[ss.w100]}>Cosa fa Hugò?</Button>
            {/*  color="#00a1ae"  */}
            {/* <Cosafa visibilita={visible} /> */}
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Cosa fa Hugò?</Dialog.Title>
                <Dialog.Content>
                  <CosafaInterno />
                  {/* <Paragraph style={ss.giustificato}>Hugò è il tuo personal shopper può ritirare acquistare e consegnare qualsiasi cosa (Farmaci, spesa, pasticcini, etc.).</Paragraph> */}
                  {/* <Paragraph style={ss.giustificato}>Può accompagnarti dove tu vorrai (in città) e se devi spostarti fuori città Hugò è anche un servizio taxi con conducente (NCC, attivo solo in alcune città).</Paragraph> */}
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>
            <Button icon={require('../assets/wa.png')} onPress={apriwa}  color="#4acd6e" mode="outlined"  style={[ss.w100]}>Messaggia con me per info</Button>
            <Button icon="phone" onPress={chiama}  color="#4acd6e" mode="outlined"  style={[ss.w100]}>Chiamami per ordinare</Button>
            {/*  color="#00a1ae"  */}
            {/* <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <Text style={[{ fontWeight: 'bold' }, ss.textcentro]}> Le opzioni contrassegnate con un asterisco * sono obbligatorie.</Text> 
            </Surface> */}
            
            {/* <Button  color="#00a1ae" onPress={showDialog2}  mode="contained"  style={[ss.w100,ss.mt15]}>Scegli un indirizzo di consegna *</Button> */}
            <Portal>
              <Dialog visible={visible2} onDismiss={hideDialog2}>
                <Dialog.Title>Scegli indirizzo</Dialog.Title>
                <Dialog.Content>
                  {
                    (typeof(indirizzi)!="undefined" && indirizzi.length) ?
                      <RadioButton.Group onValueChange={
                        indirizzo => {
                          let indirizzoscelto = indirizzi.filter(indirizzi => indirizzi.Id == indirizzo);
                          AsyncStorage.setItem('@UltimoIndirizzo', indirizzo);
                          setIndirizzo(indirizzo);
                          if(typeof(indirizzoscelto)!=="undefined" && typeof(indirizzoscelto[0])!=="undefined" && typeof(indirizzoscelto[0].Citta)!=="undefined"){
                            AsyncStorage.setItem('@cittaindirizzo', indirizzoscelto[0].Citta);
                            setccittaindirizzo(indirizzoscelto[0].Citta);
                            setindirizzoalternativo(indirizzoscelto[0].Via+" "+indirizzoscelto[0].Civico+" "+indirizzoscelto[0].Citta);
                          }
                          setVisible2(false);
                          // if(indirizzoalternativo==""){
                          //   indirizzi.forEach(element => {
                          //     if(element["Id"]==indirizzo){
                          //       setindirizzoalternativo(element["Via"]+" "+element["Civico"]+" "+element["Citta"]);
                          //       return;
                          //     }
                          //   });
                          // }
                        }
                      } value={indirizzo}>
                        {
                          indirizzi.map((indirizzo, index) => (
                            // <RadioButton.Item label={indirizzo["Via"]+" "+indirizzo["Civico"]+" "+indirizzo["Citta"]} value={indirizzo["Id"]} key={"rindi"+index} />
                            // <RadioButton.Item label={indirizzo["Via"]+" "+indirizzo["Civico"]+" "+indirizzo["Citta"]} value={indirizzo["Id"]} key={"rindi"+index} />
                            <View style={[{ flexDirection: 'row'},ss.w100]} key={"rindi"+index} >
                              <View style={{ width:"90%"}}>
                                <RadioButton.Item label={indirizzo["Via"]+" "+indirizzo["Civico"]+" "+indirizzo["Citta"]} value={indirizzo["Id"]}/>
                              </View>
                              {
                                indirizzi.length>1 ?
                                  <View style={{ width:"10%",justifyContent:"center"}}>
                                    <IconButton
                                      icon="delete-circle"
                                      color={accent1}
                                      size={20}
                                      onPress={() => {
                                        alertCancellaIndirizzo(indirizzo["Id"])
                                      }}
                                    />
                                  </View>
                                : null
                              }
                            </View>
                          ))
                        }
                      </RadioButton.Group>
                    : null
                  }
                  <Button onPress={showDialog6} color={accent1} mode="outlined"  style={[ss.w100]}>Nuovo indirizzo</Button>
                  <Portal>
                    <Dialog visible={visible6} onDismiss={hideDialog6}>
                      <Dialog.Title>Inserisci un nuovo indirizzo</Dialog.Title>
                      <Dialog.Content>
                        <View>
                          <TextInput 
                            style={[ss.w100]}
                            label="Indirizzo:"
                            mode='outlined'
                            value={nuovoindirizzo}
                            onChangeText={nuovoindirizzo => setNuovoindirizzo(nuovoindirizzo)}
                          />     
                          <View style={{ flexDirection: 'row'}}>
                            <TextInput 
                              style={[ss.w50, ss.mt15]}
                              label="Civico:"
                              mode='outlined'
                              value={nuovocivico}
                              onChangeText={nuovocivico => setCivico(nuovocivico)}
                            />     
                            <TextInput 
                              style={[ss.w50, ss.mt15]}
                              label="Città:"
                              mode='outlined'
                              value={nuovacitta}
                              onChangeText={nuovacitta => setNuovacitta(nuovacitta)}
                            />   
                          </View>  
                          <View style={{ flexDirection: 'row'}}>
                            <TextInput 
                              style={[ss.w50, ss.mt15]}
                              label="Provincia:"
                              mode='outlined'
                              value={nuovaprovincia}
                              onChangeText={nuovaprovincia => setNuovaprovincia(nuovaprovincia)}
                            />     
                            <TextInput 
                              style={[ss.w50, ss.mt15]}
                              label="Cap:"
                              mode='outlined'
                              value={nuovocap}
                              onChangeText={nuovocap => setNuovcap(nuovocap)}
                            />     
                          </View>
                          <TextInput 
                            style={[ss.w100, ss.mt15]}
                            label="Telefono:"
                            mode='outlined'
                            value={nuovotel}
                            onChangeText={nuovotel => setNuovotel(nuovotel)}
                          />     
                          <TextInput 
                            style={[ss.w100, ss.mt15]}
                            label="Note indirizzo:"
                            mode='outlined'
                            value={nuovenoteindirizzo}
                            onChangeText={nuovenoteindirizzo => setNuovenoteindirizzo(nuovenoteindirizzo)}
                          />   
                        </View> 
                        <Button 
                          // Geolocalizzati (crea indirizzo)
                          icon="map-marker"
                          onPress={
                            async () => {
                              let { status } = await Location.requestForegroundPermissionsAsync();
                              if (status !== 'granted') {
                                setErrorMsg('Non è possibile proseguire senza il permesso per identificare la posizione.');
                                return;
                              }
                              let location = await Location.getCurrentPositionAsync({});
                              let place = await Location.reverseGeocodeAsync({
                                latitude : location.coords.latitude,
                                longitude : location.coords.longitude
                              });
                              let indirizzogeolocalizzato="";
                              indirizzogeolocalizzato+=place[0].street+" ";
                              indirizzogeolocalizzato+=place[0].streetNumber+" ";
                              indirizzogeolocalizzato+=place[0].city;
                              setlat(location.coords.latitude);
                              setlon(location.coords.longitude);
                              setindirizzoalternativo(indirizzogeolocalizzato);
                              setNuovoindirizzo(place[0].street);
                              setNuovacitta(place[0].city);
                              setCivico(place[0].streetNumber);
                              setNuovcap(place[0].postalCode);
                              setNuovaprovincia(place[0].region);
                              
                            }
                          } 
                        >Geolocalizzati</Button> 
                        <Button 
                          style={[ss.w100, ss.mt15]} 
                          mode="contained" 
                          onPress={
                            async ()=>{
                              let datinuovoindirizzo={
                                "Operazione":"gestioneIndirizzo",
                                "Nuovo":"Si",
                                "Id_User":await getData('@Id_User'),
                                "Via":nuovoindirizzo.trim(),
                                "Civico":nuovocivico.trim(),
                                "Citta":nuovacitta.trim(),
                                "Provincia":nuovaprovincia.trim(),
                                "Cap":nuovocap.trim(),
                                "Note_Indirizzo":nuovenoteindirizzo.trim(),
                                "Telefono":nuovotel.trim(),
                              }
                              richiesta(datinuovoindirizzo,'apiHugo').then((json) => {
                                if(json.ok) {
                                  setIndirizzi(json.dati);
                                  setNuovoindirizzo("");
                                  setCivico("");
                                  setNuovacitta("");
                                  setNuovaprovincia("");
                                  setNuovcap("");
                                  setNuovotel("");
                                  setNuovenoteindirizzo("");
                                } else {
                                  alert("Dati errati");
                                }
                                setVisible6(false);
                              });
                            }
                          }
                        >Inserisci</Button>
                      </Dialog.Content>
                    </Dialog>
                  </Portal>
                  {/* <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog2}>OK</Button> */}
                </Dialog.Content>
              </Dialog>
            </Portal>    
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <Button   color={accent1}
                onPress={
                  async () => {
                    let Id_User = await getData('@Id_User');
                    let richiestaindi={"Operazione":'getIndirizzi',"Id_User":Id_User}
                    let listaindirizzi = await richiesta(richiestaindi);
                    setIndirizzi(listaindirizzi);
                    showDialog2();
                  }
                }  
                mode="contained"  style={[ss.w100, ss.mt10]}
              >Scegli indirizzo predefinito*</Button>
              {
                typeof(descrizioneindirizzo)!=="undefined" && descrizioneindirizzo!==null && descrizioneindirizzo!=="no" ?
                  <View style={[ss.my10,ss.w100]}>
                    <Text style={[ss.h4,ss.mt5,ss.textcentro]}>{descrizioneindirizzo}</Text>
                  </View>
                : null
              }
            </Surface>
            {
              (indirizzo!=="no" && indirizzo!=="" && indirizzo!==null) ?
                listaservizi.length>0 ?
                  <>
                    <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
                      <View style={{ flexDirection: 'row'}}>
                        <Text style={[ss.h1,ss.mt15]}>Scegli un servizio *:</Text>
                      </View>
                      <View style={ss.mt15}>
                        {
                          listaservizi.map((s, index) => (
                            s["attivo"] && s["citta"].includes(ccittaindirizzo.trim()) &&  [0,1,5,6,7].includes(s["id"])?
                              <NuovoRadioServizio info={s["info"]} id={s["id"]} etichetta={s["etichetta"]} costo={s["costo"]} key={"nser"+s["id"]} selezionato={s["id"]==servizio?true:false} percorso={percorsi_immagini_servizi[s["id"]]}/>
                            :
                              null
                          ))
                        }
                        <View style={ss.mt15}>
                          {
                            listaservizi.map((s, index) => (
                              s["attivo"] && s["citta"].includes(ccittaindirizzo.trim()) &&  [8].includes(s["id"])?
                                <NuovoRadioServizio info={s["info"]} id={s["id"]} etichetta={s["etichetta"]} costo={s["costo"]} key={"nser"+s["id"]} selezionato={s["id"]==servizio?true:false} percorso={percorsi_immagini_servizi[s["id"]]}/>
                              :
                                null
                            ))
                          }
                        </View>
                        <View style={ss.mt15}>
                          {
                            listaservizi.map((s, index) => (
                              s["attivo"] && s["citta"].includes(ccittaindirizzo.trim()) &&  [2,3,4].includes(s["id"])?
                                <NuovoRadioServizio info={s["info"]} id={s["id"]} etichetta={s["etichetta"]} costo={s["costo"]} key={"nser"+s["id"]} selezionato={s["id"]==servizio?true:false} percorso={percorsi_immagini_servizi[s["id"]]}/>
                              :
                                null
                            ))
                          }
                        </View>
                        <View style={ss.mt15}>
                          {
                            listaservizi.map((s, index) => (
                              s["attivo"] && s["citta"].includes(ccittaindirizzo.trim()) &&  [9].includes(s["id"])?
                                <NuovoRadioServizio info={s["info"]} id={s["id"]} etichetta={s["etichetta"]} costo={s["costo"]} key={"nser"+s["id"]} selezionato={s["id"]==servizio?true:false} percorso={percorsi_immagini_servizi[s["id"]]}/>
                              :
                                null
                            ))
                          }
                        </View>
                      </View>
                    </Surface>
                    {
                      servizio!="no" && servizio!=3 ?
                        <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
                          {
                            (typeof(dispo)!="undefined" && dispo.length) ?
                              <View>
                                <View style={[{ flexDirection: 'row'}, ss.mt10]}>
                                  <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="L'orario scelto è l'ora in cui il rider effettuerà il servizio" />
                                  <Text style={[ss.h4,ss.mt5]}>Scegli un orario {testooggidomani}*</Text>
                                </View>
                                <View>
                                  {
                                    dispo.map((Ora, index) => (
                                      <View style={[{ flexDirection: 'row', justifyContent:'flex-end' }]} key={index}>
                                        {
                                          Ora[1].map((Ora2, index2) => (
                                            ! checkdomani ?
                                              ((adessocondelta.getTime() < Date.parse(oggi.getDate()+' '+monthNames[oggi.getMonth()]+' '+oggi.getFullYear()+' '+Ora2+':00')) && Ora2!="No") ?
                                                <TouchableOpacity
                                                  key={index+"-"+index2}
                                                  onPress={() => {
                                                    setora(Ora2)
                                                  }}
                                                  style={[{ width:'25%' }, ss.p10, ss.centro,ss.bordogrigio, (Ora2==oraprenotazione) ? ss.bgverdemare : ss.bglightgrey]}
                                                >
                                                  <Text style={[ss.h4, (Ora2==oraprenotazione) ? ss.labelselected : null]}>{Ora2}</Text>
                                                </TouchableOpacity>
                                              :
                                                <View style={[{ backgroundColor: 'white', width:'25%' }]} 
                                                key={index+"no"+index2}>
                                                  {/* <Text style={ss.h4}>     </Text> */}
                                                </View>
                                            :
                                              (Ora2!="No") ?
                                                <TouchableOpacity
                                                  key={index+"-"+index2}
                                                  onPress={() => {
                                                    setora(Ora2)
                                                  }}
                                                  style={[{ width:'25%' }, ss.p10, ss.centro,ss.bordogrigio, (Ora2==oraprenotazione) ? ss.bgverdemare : ss.bglightgrey]}
                                                >
                                                  <Text style={[ss.h4, (Ora2==oraprenotazione) ? ss.labelselected : null]}>{Ora2}</Text>
                                                </TouchableOpacity>
                                              :
                                                <View style={[{ backgroundColor: 'white', width:'25%' }]} key={index+"no"+index2}>
                                                  // <Text style={ss.h4}>   </Text>
                                                </View>
        
                                          ))
                                        }
                                      </View>
                                    ))
                                  }
                                </View>
                              </View>
                            :
                              (attivitabase!="no") ?
                                (dispo=="" || (Array.isArray(dispo) && dispo.length<1)) ?
                                  <View>
                                    <Text style={ss.h4}>Al momento non ci sono Riders disponibili. Riprova più tardi o verifica che l'indirizzo inserito sia corretto.</Text>
                                    <Button  color={accent1} 
                                    // color="#00a1ae" 
                                    onPress={
                                      async () => {
                                        let Id_User = await getData('@Id_User');
                                        let richiestaindi={"Operazione":'getIndirizzi',"Id_User":Id_User}
                                        let listaindirizzi = await richiesta(richiestaindi);
                                        setIndirizzi(listaindirizzi);
                                        showDialog2();
                                      }
                                    }  
                                    mode="contained"  style={[ss.w100, ss.mt10]}>Scegli indirizzo *</Button>
                                  </View>
                                :
                                  <View><Text style={ss.h4}>Nessuna disponibilita. Riprova più tardi o verifica che l'indirizzo inserito sia corretto.</Text></View>
                              :
                                <View>
                                  <Text style={[ss.h4, ss.textcentro]}>Seleziona un servizio e un indirizzo per vedere le nostre disponibilità di consegna.</Text>
                                  <Button   color={accent1}
                                    //color="#00a1ae"
                                    onPress={
                                      async () => {
                                        let Id_User = await getData('@Id_User');
                                        let richiestaindi={"Operazione":'getIndirizzi',"Id_User":Id_User}
                                        let listaindirizzi = await richiesta(richiestaindi);
                                        setIndirizzi(listaindirizzi);
                                        showDialog2();
                                      }
                                    }  
                                    mode="contained"  style={[ss.w100, ss.mt10]}>Scegli un indirizzo di consegna *</Button>
                                </View>
                          }
                        </Surface>
                      : null
                    }
                    {
                      indirizzo!="no" && servizio!="no" && servizio!=3 ?
                        <>
                          <MostraOpzioniServizio 
                            servizio={servizio} 
                            setVisible7={setVisible7} 
                            cosa={cosa} 
                            setCosa={setCosa} 
                            Info={Info} 
                            settestoinfo={settestoinfo}
                            sostiuisci={sostiuisci} 
                            setSostiuisci={setSostiuisci} 
                            spesamax={spesamax} 
                            setSpesamax={setSpesamax} 
                            coupon={coupon} 
                            setcoupon={setcoupon} 
                            duratasosta={duratasosta} 
                            setduratasosta={setduratasosta} 
                            indirizzoalternativo={indirizzoalternativo} 
                            setindirizzoalternativo={setindirizzoalternativo} 
                            note2={note2} 
                            setNote2={setNote2} 
                            setdove={setdove} 
                            dove={dove} 
                            validaCoupon={validaCoupon} 
                            telefono={telefono} 
                            settelefono={settelefono}  
                            passeggeri={passeggeri} 
                            setpasseggeri={setpasseggeri} 
                            auto={auto} 
                            setAuto={setAuto} 
                            OpzioniAuto={OpzioniAuto}
                            setlat={setlat} 
                            setlon={setlon} 
                            Id_Utente={Id_Utente}
                            setrubrica={setrubrica}
                            showDialog8={showDialog8}
                            showDialog10={showDialog10}
                            setcostodistanza={setcostodistanza}
                            hugosceglie={hugosceglie}
                            sethugosceglie={sethugosceglie}
                            triplettadove={triplettadove}
                            settriplettadove={settriplettadove}
                            dove2={dove2}
                            setdove2={setdove2}
                            cosahugo2={cosahugo2}
                            setcosahugo2={setcosahugo2}
                            nomeluogo2={nomeluogo2}
                            setnomeluogo2={setnomeluogo2}
                            comunedestinazione={comunedestinazione}
                            setcomunedestinazione={setcomunedestinazione}
                            comunedestinazione2={comunedestinazione2}
                            setcomunedestinazione2={setcomunedestinazione2}
                            ritiroconsegna={ritiroconsegna} 
                            setritiroconsegna={setritiroconsegna} 
                            testoritirooconsegna={testoritirooconsegna} 
                            settestoritirooconsegna={settestoritirooconsegna}
                            telreferente={telreferente}
                            settelreferente={settelreferente}
                            richiestafattura={richiestafattura}
                            setrichiestafattura={setrichiestafattura}
                            showDialog12={showDialog12}
                            showDialog13={showDialog13}
                            showDialog14={showDialog14}
                            setcheckcalcoladistanza={setcheckcalcoladistanza}
                            ccittaindirizzo={ccittaindirizzo}
                            alertCittaDiversa={alertCittaDiversa}
                            listaservizi={listaservizi}
                            dispo={dispo}
                          />
                          { 
                            Array.isArray(dispo) && dispo.length>0 ?
                              <>
                                <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
                                  <View style={[{flexDirection: 'row'},ss.w100]}>
                                    <View style={{width:'40%',flexDirection: 'row'}}>
                                      <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Hugò ti chiamerà prima di effettuare il servizio richiesto per dargli ulteriori dettagli" />
                                      <Text style={[{alignSelf: "center"},ss.gra]}>Vuoi essere chiamato da Hugò?</Text>
                                      {/* <Checkbox
                                        status={chiamami ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                          setChiamami(!chiamami);
                                        }}
                                      /> */}
                                    </View>
                                    <View style={{width:'60%',flexDirection: "row-reverse"}}>
                                      <RadioButton.Group 
                                        onValueChange={
                                          chiamami => {
                                            setChiamami(chiamami);
                                          }
                                        } value={chiamami}
                                      >
                                        <View style={[ss.row]}>
                                          <RadioButton.Item label="Si" value={true} style={{padding:0}} />            
                                          <RadioButton.Item label="No" value={false} style={{padding:0}} />            
                                        </View>
                                      </RadioButton.Group>
                                    </View>
                                  </View>
                                  <View  style={[ss.p3,ss.w100]}>
                                    <Divider />
                                  </View>
                                  <Text style={[ss.w100,ss.gra, ss.textcentro, ss.mt10]}>Mancia</Text> 
                                  <View style={[ss.row,ss.centro,ss.w100]}>
                                    <Button color={accent1} onPress={() => {1 === mancia ? setMancia(0): setMancia(1);}} style={[(1 === mancia ? ss.selected : ss.unselected),ss.w25]} labelStyle={1 === mancia ? ss.labelselected : ss.unselected} mode="outlined">1€</Button>
                                    <Button color={accent1} onPress={() => {2 === mancia ? setMancia(0): setMancia(2);}} style={[(2 === mancia ? ss.selected : ss.unselected),ss.w25]} labelStyle={2 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">2€</Button>
                                    <Button color={accent1} onPress={() => {5 === mancia ? setMancia(0): setMancia(5);}} style={[(5 === mancia ? ss.selected : ss.unselected),ss.w25]} labelStyle={5 === mancia ? ss.labelselected : ss.unselected}   mode="outlined">5€</Button>
                                    <Button color={accent1} onPress={() => {10 === mancia ? setMancia(0): setMancia(10);}}  style={[(10 === mancia ? ss.selected : ss.unselected),ss.w25]} labelStyle={10 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">10€</Button>
                                  </View>
                                </Surface>
              
                                    
                                
                                <Button  color={accent1}
                                //color="#00a1ae" 
                                onPress={showDialog3}  mode="contained"  style={[ss.w100,ss.mt15]}>Note per Hugò</Button>
                                <Portal>
                                  {/* style={[{justifyContent:"start"}, ss.p10]} */}
                                  <Modal visible={visible3} onDismiss={hideDialog3}  style={[ss.p10]} contentContainerStyle={[{backgroundColor:"#fff"}, ss.p25]}>
                                    <Text style={ss.h2}>Inserisci note</Text>
                                    <TextInput
                                      multiline = {true}
                                      mode='outlined'
                                      numberOfLines = {4}
                                      label="Note"
                                      value={note}
                                      onChangeText={note => setNote(note)}
                                    />
                                    <Button style={[ss.w100, ss.mt15]} color={accent1} mode="contained" onPress={hideDialog3}>OK</Button>
                                  </Modal>
                                </Portal> 
                                <Surface style={[ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                                  {
                                    costoservizio>0?
                                      <View style={[{ flexDirection: 'row'},ss.w100,ss.bordoBottomGrigio,ss.py10]}>
                                        <View style={ss.w50}>
                                          <Text style={ss.h2}>Costo servizio: </Text> 
                                        </View>
                                        <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                          <Text style={ss.h2}> €</Text> 
                                          <Text style={[{ fontWeight: 'bold' },ss.h2]}>{costoservizio.toFixed(2)}</Text>
                                        </View>
                                      </View>
                                    : null
                                  }
                                  {
                                    costodistanza>0?
                                      <>
                                        <View style={[{ flexDirection: 'row'},ss.w100,ss.py10]}>
                                          <View style={ss.w50}>
                                            <Text style={ss.h2}>Costo distanza: </Text> 
                                          </View>
                                          <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                            <Text style={ss.h2}> € *</Text> 
                                            <Text style={[{ fontWeight: 'bold' },ss.h2]}>{costodistanza.toFixed(2)}</Text>
                                          </View>
                                        </View>
                                        <View  style={[ss.textcentro,ss.w100,ss.bordoBottomGrigio]}>
                                          <Text  style={[ss.textcentro,ss.w100,ss.centro]}>*Assicurati di aver inserito l'indirizzo corretto specificando il comune di destinazione. </Text>
                                          <Button  color={accent1} mode="text">Ricalcola</Button>
                                        </View>
                                      </>
                                    : null
                                  }
                                  {
                                    checkcalcoladistanza>0?
                                      <>
                                        <View style={[{ flexDirection: 'row'},ss.w100,ss.py10]}>
                                          <View style={ss.w100}>
                                            <Text style={[{color:"red"},ss.textcentro,ss.w100,ss.h2]}>ATTENZIONE:</Text> 
                                          </View>
                                        </View>
                                        <View  style={[ss.textcentro,ss.w100,ss.bordoBottomGrigio]}>
                                          <Text  style={[ss.textcentro,ss.w100,ss.centro]}>Non siamo riusciti a calcolare il costo della distanza: assicurati di aver inserito l'indirizzo corretto specificando il comune di destinazione. </Text>
                                          <Button  color={accent1} mode="text">Ricalcola</Button>
                                        </View>
                                      </>
                                    : null
                                  }
                                  {
                                    duratasosta>0?
                                      <View style={[{ flexDirection: 'row'},ss.w100,ss.bordoBottomGrigio,ss.py10]}>
                                        <View style={ss.w50}>
                                          <Text style={ss.h2}>Costo sosta: </Text> 
                                        </View>
                                        <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                          <Text style={ss.h2}> €</Text> 
                                          <Text style={[{ fontWeight: 'bold' },ss.h2]}>{(duratasosta/30*costobasesosta).toFixed(2)}</Text>
                                        </View>
                                      </View>
                                    : null
                                  }
                                  {/* {
                                    costoservizio>0?
                                      <View style={[{ flexDirection: 'row',alignItems:'center'},ss.w100,ss.textcentro]}>
                                        <Text style={ss.h2}>Costo servizio: </Text>
                                        <Text style={[{ fontWeight: 'bold' },ss.h2]}>{costoservizio.toFixed(2)}</Text>
                                        <Text style={ss.h2}> €</Text>
                                      </View>
                                    : null
                                  } */}
                                  {
                                    spesamax!=0?
                                      <View style={[{ flexDirection: 'row'},ss.w100,ss.bordoBottomGrigio,ss.py10]}>
                                        <View style={ss.w50}>
                                          <Text style={ss.h2}>Spesa massima: </Text> 
                                        </View>
                                        <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                          <Text style={ss.h2}> €</Text> 
                                          <Text style={[{ fontWeight: 'bold' },ss.h2]}>{parseFloat(spesamax.replace(/,/g, '.')).toFixed(2)}</Text>
                                        </View>
                                      </View>
                                    : null
                                  }
                                  {/* {
                                    spesamax!=0?
                                      <View style={[{ flexDirection: 'row',alignItems:'center'},ss.w100,ss.textcentro]}>
                                        <Text style={ss.h2}>Spesa massima: </Text>
                                        <Text style={[{ fontWeight: 'bold' },ss.h2]}>{parseFloat(spesamax.replace(/,/g, '.')).toFixed(2)}</Text>
                                        <Text style={ss.h2}> €</Text>
                                      </View>
                                    : null
                                  } */}
                                  {
                                    mancia>0?
                                      <View style={[{ flexDirection: 'row'},ss.w100,ss.bordoBottomGrigio,ss.py10]}>
                                        <View style={ss.w50}>
                                          <Text style={ss.h2}>Mancia: </Text> 
                                        </View>
                                        <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                          <Text style={ss.h2}> €</Text> 
                                          <Text style={[{ fontWeight: 'bold' },ss.h2]}>{mancia.toFixed(2)}</Text>
                                        </View>
                                      </View>
                                    : null
                                  }
                                  {
                                    scontocoupon>0?
                                      <View style={[{ flexDirection: 'row'},ss.w100,ss.bordoBottomGrigio,ss.py10]}>
                                        <View style={ss.w50}>
                                          <Text style={ss.h2}>Coupon: </Text> 
                                        </View>
                                        <View  style={[{ flexDirection: 'row-reverse',textAlign:"end"}, ss.w50]}>
                                          <Text style={ss.h2}> €</Text> 
                                          <Text style={[{ fontWeight: 'bold' },ss.h2]}>- {scontocoupon.toFixed(2)}</Text>
                                        </View>
                                      </View>
                                    : null
                                  }
                                  <View style={[{ flexDirection: 'row',alignItems:'center'},ss.w100,ss.textcentro,ss.py10]}>
                                    <Text style={ss.h2}>Totale: </Text>
                                    <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>{parseFloat(totale).toFixed(2)}</Text>
                                    <Text style={ss.h2}> €</Text>
                                  </View>
                                </Surface>
                                
                                <Button  color={accent1}
                                //color="#00a1ae" 
                                onPress={async ()=>{
                                  if(typeof(richestaaggiornamento.id_attivita_base)!=="undefined" && richestaaggiornamento.id_attivita_base !="undefined" && richestaaggiornamento.id_attivita_base !="no"){
                                    let json_res = await richiesta(richestaaggiornamento);
                                    aggiornaPagina(json_res);
                                  }
                                  showDialog5();
                                }}  
                                mode="contained"  style={[ss.w100,ss.mt15]}>Metodo di pagamento *</Button>
                                
                                <TouchableOpacity
                                  onPress={
                                    () => {
                                      inviaPrenotazione(indirizzo, servizio, metodo_pagamento, note, note2, dove, cosa, mancia, auto, chiamami, sostiuisci, spesamax,coupon, indirizzoalternativo, oraprenotazione, dove2, cosahugo2, nomeluogo2, comunedestinazione, comunedestinazione2,telreferente,duratasosta,passeggeri,richiestafattura);
                                    }
                                  }
                                  style={[{ backgroundColor: '#00a1ae' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
                                  <Text style={[{ color: '#fff' },ss.h4]}>ACQUISTA</Text>
                                </TouchableOpacity>
                                <Button  style={[ss.w100, ss.mt15]} mode="outlined" onPress={()=>{Linking.openURL("https://hugopersonalshopper.it/Termini.pdf");}}>Termini e condizioni d'uso</Button>
                              </>
                            : null
                          }
                        </>
                      : 
                        indirizzo!="no" && servizio!="no" && servizio==3 ?
                            <View>
                              <Text>Servizio NCC</Text>
                            </View>
                        : null
                    }
                  </>                          
                :
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={[ss.h3,ss.mt15]}>Al momento non ci sono servizi attivi per questa cittá. Prova inserendo un indirizzo diverso.</Text>
                  </View>
              : null
            }
            <TouchableOpacity
              onPress={() => {
                Linking.openURL("https://ristostore.it/redirect-ristostore-app.html");
              }}
              style={[{height: calcolaAltezza(630,630,20)}, ss.w100, ss.mt15]} 
            >
              <Image
                style={[{height: calcolaAltezza(630,630,20)}, ss.w100]} 
                source={{
                  uri: 'https://ristostore.it/lib/bootstrap/css/Immagini/bannerhugo.jpg?rand='+casuale,
                }}
              />
            </TouchableOpacity>
          </View>
          <Portal>
            <Dialog visible={visible5} onDismiss={hideDialog5}>
              <Dialog.Title>Scegli il metodo di pagamento *</Dialog.Title>
              <Dialog.Content>
                <RadioButton.Group 
                  onValueChange={
                    (metodo_pagamento)=>{
                      setVisible5(false);
                      setMetodo_Pagamento(metodo_pagamento);
                    }
                  } value={metodo_pagamento}>
                  {
                    listametodi.includes("Carta") ?
                      <RadioMetodo id="0" etichetta="Carta di credito" info="Sarai reindirizzato al portale per l'inserimento dei tuoi dati di pagamento" /> 
                    : null
                  }
                  {
                    listametodi.includes("Pre") ?
                      <RadioMetodo id="1" etichetta="Contanti alla consegna con preautorizzazione" info="La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
                    : null
                  }
                  {
                    listametodi.includes("Saldo") && saldo>totale ?
                      <RadioMetodo id="2" etichetta="Saldo" info="L'importo verra detratto dal tuo saldo cliente. Vai nel profilo per ricaricarlo." />
                    : null 
                  }
                  {
                    (listametodi.includes("AcquistoDiretto") || fiducia==1) ?
                      <RadioMetodo id="3" etichetta="Pagamento alla consegna in contanti" info="Il pagamento sarà effettuato al completamento del servizio." />
                    : null 
                  }
                </RadioButton.Group>
                {
                  saldo>=totale ?
                    <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                      <Text style={ss.h2}>Il tuo saldo è: </Text>
                      <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>{saldo.toFixed(2)}</Text>
                      <Text style={ss.h2}> €</Text>
                    </Surface>
                  : 
                    <Surface style={[{alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                      <Text style={[ss.h2,ss.textcentro]}>In questo momento il tuo saldo non è sufficiente per utilizzarlo come metodo di pagamento.</Text>
                      <Button  color={accent1}
                      // color="#00a1ae" 
                      onPress={async () => {navigation.navigate('RicaricaSaldo');}}  mode="contained"  style={[ss.w100,ss.mt5]}>Ricarica il saldo</Button>
                    </Surface>
                }
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible7} onDismiss={hideDialog7}>
              <Dialog.Title>Info</Dialog.Title>
              <Dialog.Content>
                <Text>
                  {testoinfo}
                </Text>
                <Button color="#00a1ae" onPress={async () => {navigation.navigate('SpecchiettoCosti');}}  mode="contained"  style={[ss.w100,ss.my10]}>Tutte le tariffe</Button>
                <Button onPress={hideDialog7}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible9}>
              <Dialog.Title>In caricamento...</Dialog.Title>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible8} onDismiss={hideDialog8}>
              <Dialog.Title>Rubrica Indirizzi</Dialog.Title>
              <Dialog.Content>
                <View>
                  {
                    typeof(rubrica)!=="undefined" && rubrica!=="undefined" && rubrica.length>0 ? 
                      rubrica.map((indi, index) => (
                        indi!==null ?
                          <View style={{ flexDirection: 'row',width:"100%"}} key={index+"rubrica"}>
                            <Button  style={[ss.w100, ss.w75]} mode="outlined" onPress={
                              async ()=>{
                                setNote2(indi.nomeluogo);
                                setdove(indi.indirizzoluogo);
                                settelreferente(indi.telreferente);
                                setcomunedestinazione(indi.comunedestinazione);
                                let calcolacostodistanza={
                                  "indirizzoluogo":indi.indirizzoluogo+" "+indi.comunedestinazione,
                                  "comunedestinazione":indi.comunedestinazione,
                                }
                                if(dove2!=="" && comunedestinazione2!==""){
                                  calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                                  calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                                }
                                if(servizio == 2 || servizio == 4){
                                  calcolacostodistanza.Partenza=indirizzoalternativo;
                                  calcolacostodistanza.Operazione="calcolacostodistanzataxi1";
                                } else {
                                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                                  calcolacostodistanza.UltimoIndirizzo=UltimoIndirizzo;
                                  calcolacostodistanza.Operazione="calcolacostodistanza";
                                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                                    calcolacostodistanza.ritiroconsegna="si";
                                  }
                                }

                                let json_res = await richiesta(calcolacostodistanza);
                                if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                                } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                                } else {
                                  setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                  setcheckcalcoladistanza(0);
                                }
                                setVisible8(false);
                              }
                            }>{indi.nomeluogo}</Button>
                            <IconButton
                              icon="eye"
                              color={accent1}
                              style={[ss.centro,ss.w15]}
                              size={20}
                              onPress={
                                async ()=>{
                                  if(typeof(indi.telreferente)!=="undefined"){
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione+". Telefono: "+indi.telreferente);
                                  } else {
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                  }
                                  setVisible11(true);
                                }
                              }
                            />
                            <IconButton
                              icon="delete-circle"
                              color={accent1}
                              style={[ss.centro,ss.w10]}
                              size={20}
                              onPress={
                                async ()=>{
                                  let newrubrica=rubrica;
                                  newrubrica.splice(index, 1);
                                  let salvarubrica={
                                    "iduser":Id_Utente,
                                    "rubrica":JSON.stringify(newrubrica),
                                    "Operazione":"salvarubrica"
                                  }
                                  let json_res = await richiesta(salvarubrica);
                                  setVisible8(false);
                                }
                              }
                            />
                            {/* <Button  style={[ss.w100, ss.mt15,ss.w25]} mode="outlined" onPress={
                              async ()=>{
                                let newrubrica=rubrica;
                                newrubrica.splice(index, 1);
                                let salvarubrica={
                                  "iduser":Id_Utente,
                                  "rubrica":JSON.stringify(newrubrica),
                                  "Operazione":"salvarubrica"
                                }
                                let json_res = await richiesta(salvarubrica);
                                setVisible8(false);
                              }
                            }>Elimina</Button> */}
                          </View>
                        : null
                      ))
                    : null
                  }
                </View>
                <Button onPress={hideDialog8}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible10} onDismiss={hideDialog10}>
              <Dialog.Title>Rubrica</Dialog.Title>
              <Dialog.Content>
                <View>
                  {
                    typeof(rubrica)!=="undefined" && rubrica!=="undefined" && rubrica.length>0 ? 
                      rubrica.map((indi, index) => (
                        indi!==null ?
                          <View style={{ flexDirection: 'row',width:"100%"}} key={index+"rubrica"}>
                            <Button  style={[ss.w100,ss.w75]} mode="outlined" onPress={
                              async ()=>{
                                setnomeluogo2(indi.nomeluogo);
                                setdove2(indi.indirizzoluogo);
                                setcomunedestinazione2(indi.comunedestinazione);
                                settelreferente(indi.telreferente);
                                let calcolacostodistanza={
                                  "indirizzoluogo":dove+" "+comunedestinazione,
                                  "indirizzoluogo2":indi.indirizzoluogo+" "+indi.comunedestinazione,
                                  "comunedestinazione":comunedestinazione,
                                  "comunedestinazione2":indi.comunedestinazione
                                }
                                if(servizio == 2 || servizio == 4){
                                  calcolacostodistanza.Partenza=indirizzoalternativo;
                                  calcolacostodistanza.Operazione="calcolacostodistanzataxi1";
                                } else {
                                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                                  calcolacostodistanza.UltimoIndirizzo=UltimoIndirizzo;
                                  calcolacostodistanza.Operazione="calcolacostodistanza";
                                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                                    calcolacostodistanza.ritiroconsegna="si";
                                  }
                                }

                                let json_res = await richiesta(calcolacostodistanza);
                                if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                                } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                                } else {
                                  setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                  setcheckcalcoladistanza(0);
                                }
                                setVisible10(false);
                              }
                            }>{indi.nomeluogo}</Button>
                            <IconButton
                              icon="eye"
                              color={accent1}
                              style={[ss.centro,ss.w15]}
                              size={20}
                              onPress={
                                async ()=>{
                                  if(typeof(indi.telreferente)!=="undefined"){
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione+". Telefono: "+indi.telreferente);
                                  } else {
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                  }
                                  setVisible11(true);
                                }
                              }
                            />
                            <IconButton
                              icon="delete-circle"
                              color={accent1}
                              size={20}
                              style={[ss.centro,ss.w10]}
                              onPress={
                                async ()=>{
                                  let newrubrica=rubrica;
                                  newrubrica.splice(index, 1);
                                  let salvarubrica={
                                    "iduser":Id_Utente,
                                    "rubrica":JSON.stringify(newrubrica),
                                    "Operazione":"salvarubrica"
                                  }
                                  let json_res = await richiesta(salvarubrica);
                                  setVisible10(false);
                                }
                              }
                            />
                            {/* <Button  style={[ss.w100, ss.mt15,ss.w25]} mode="outlined" onPress={
                              async ()=>{
                                let newrubrica=rubrica;
                                newrubrica.splice(index, 1);
                                let salvarubrica={
                                  "iduser":Id_Utente,
                                  "rubrica":JSON.stringify(newrubrica),
                                  "Operazione":"salvarubrica"
                                }
                                let json_res = await richiesta(salvarubrica);
                                setVisible10(false);
                              }
                            }>Elimina</Button> */}
                          </View>
                        : null
                      ))
                    : null
                  }
                </View>
                <Button onPress={hideDialog10}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible12} onDismiss={hideDialog12}>
              <Dialog.Title>Luoghi Suggeriti</Dialog.Title>
              <Dialog.Content>
                <View>
                  {
                    typeof(luoghisuggeriti)!=="undefined" && luoghisuggeriti!=="undefined" && luoghisuggeriti.length>0 ? 
                      luoghisuggeriti.map((indi, index) => (
                        indi!==null ?
                          <View style={{ flexDirection: 'row',width:"100%"}} key={index+"luoghisuggeriti"}>
                            <Button  style={[ss.w100,ss.w85]} mode="outlined" onPress={
                              async ()=>{
                                setNote2(indi.nomeluogo);
                                setdove(indi.indirizzoluogo);
                                settelreferente(indi.telreferente);
                                setcomunedestinazione(indi.comunedestinazione);
                                let calcolacostodistanza={
                                  "indirizzoluogo":indi.indirizzoluogo+" "+indi.comunedestinazione,
                                  "comunedestinazione":indi.comunedestinazione
                                }
                                if(dove2!=="" && comunedestinazione2!==""){
                                  calcolacostodistanza["indirizzoluogo2"]=dove2+" "+comunedestinazione2;
                                  calcolacostodistanza["comunedestinazione2"]=comunedestinazione2;
                                }
                                if(servizio == 2 || servizio == 4){
                                  calcolacostodistanza.Partenza=indirizzoalternativo;
                                  calcolacostodistanza.Operazione="calcolacostodistanzataxi1";
                                } else {
                                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                                  calcolacostodistanza.UltimoIndirizzo=UltimoIndirizzo;
                                  calcolacostodistanza.Operazione="calcolacostodistanza";
                                  if((servizio==6 || servizio == 7) && ritiroconsegna){
                                    calcolacostodistanza.ritiroconsegna="si";
                                  }
                                }

                                let json_res = await richiesta(calcolacostodistanza);
                                if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita"){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                                } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                                } else {
                                  setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                  setcheckcalcoladistanza(0);
                                }
                                setVisible12(false);
                              }
                            }>{indi.nomeluogo}</Button>
                            <IconButton
                              icon="eye"
                              color={accent1}
                              style={[ss.centro,ss.w15]}
                              size={20}
                              onPress={
                                async ()=>{
                                  if(typeof(indi.telreferente)!=="undefined"){
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione+". Telefono: "+indi.telreferente);
                                  } else {
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                  }
                                  setVisible11(true);
                                }
                              }
                            />
                          </View>
                        : null
                      ))
                    : null
                  }
                </View>
                <Button onPress={hideDialog12}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible13} onDismiss={hideDialog13}>
              <Dialog.Title>Luoghi Suggeriti</Dialog.Title>
              <Dialog.Content>
                <View>
                  {
                    typeof(luoghisuggeriti)!=="undefined" && luoghisuggeriti!=="undefined" && luoghisuggeriti.length>0 ? 
                      luoghisuggeriti.map((indi, index) => (
                        indi!==null ?
                          <View style={{ flexDirection: 'row',width:"100%"}} key={index+"luoghisuggeriti"}>
                            <Button  style={[ss.w100,ss.w85]} mode="outlined" onPress={
                              async ()=>{
                                setnomeluogo2(indi.nomeluogo);
                                setdove2(indi.indirizzoluogo);
                                setcomunedestinazione2(indi.comunedestinazione);
                                settelreferente(indi.telreferente);
                                let calcolacostodistanza={
                                  "indirizzoluogo":dove+" "+comunedestinazione,
                                  "indirizzoluogo2":indi.indirizzoluogo+" "+indi.comunedestinazione,
                                  "comunedestinazione":comunedestinazione,
                                  "comunedestinazione2":indi.comunedestinazione
                                }
                                if(servizio == 2 || servizio == 4){
                                  calcolacostodistanza.Partenza=indirizzoalternativo;
                                  calcolacostodistanza.Operazione="calcolacostodistanzataxi1";
                                } else {
                                  let UltimoIndirizzo = await getData('@UltimoIndirizzo');
                                  calcolacostodistanza.UltimoIndirizzo=UltimoIndirizzo;
                                  calcolacostodistanza.Operazione="calcolacostodistanza";
                                  if(servizio==6 || servizio == 7){
                                    if(ritiroconsegna){
                                      calcolacostodistanza.ritiroconsegna="si";
                                    }
                                  }
                                }

                                let json_res = await richiesta(calcolacostodistanza);
                                if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                                } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                  setcostodistanza(0); 
                                  setcheckcalcoladistanza(1);
                                  alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                                } else {
                                  setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                  setcheckcalcoladistanza(0);
                                }
                                setVisible13(false);
                              }
                            }>{indi.nomeluogo}</Button>
                            <IconButton
                              icon="eye"
                              color={accent1}
                              style={[ss.centro,ss.w15]}
                              size={20}
                              onPress={
                                async ()=>{
                                  if(typeof(indi.telreferente)!=="undefined"){
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione+". Telefono: "+indi.telreferente);
                                  } else {
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                  }
                                  setVisible11(true);
                                }
                              }
                            />
                          </View>
                        : null
                      ))
                    : null
                  }
                </View>
                <Button onPress={hideDialog13}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible14} onDismiss={hideDialog14}>
              <Dialog.Title>Luoghi Suggeriti</Dialog.Title>
              <Dialog.Content>
                <View>
                  {
                    typeof(luoghisuggeriti)!=="undefined" && luoghisuggeriti!=="undefined" && luoghisuggeriti.length>0 ? 
                      luoghisuggeriti.map((indi, index) => (
                        indi!==null ?
                          <View style={{ flexDirection: 'row',width:"100%"}} key={index+"luoghisuggeriti"}>
                            <Button  style={[ss.w100,ss.w85]} mode="outlined" onPress={
                              async ()=>{
                                setindirizzoalternativo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                if(dove!=="" && dove!=="no" && indirizzoalternativo!="" && comunedestinazione!=""){
                                  let calcolacostodistanza={
                                    "Partenza":indi.indirizzoluogo+" "+indi.comunedestinazione,
                                    "indirizzoluogo":dove+" "+comunedestinazione,
                                    "Operazione":"calcolacostodistanzataxi1"
                                  }
                                  let json_res = await richiesta(calcolacostodistanza);
                                  if(json_res.risposta==="Indirizzo_non_trovato" || json_res.risposta==="Operazione_non_riuscita" ){
                                    setcostodistanza(0); 
                                    setcheckcalcoladistanza(1);
                                    alert("Non siamo riusciti a trovare l'indirizzo indicato. Controlla che sia l'indirizzo di partenza che quelli di destinazione, o un eventuale indirizzo alternativo, siano corretti oppure potrebbero essere applicati altri costi alla fine del servizio.");
                                  } else if(json_res.risposta==="Indirizzo_Partenza_Non_Trovato"){
                                    setcostodistanza(0); 
                                    setcheckcalcoladistanza(1);
                                    alert("Non siamo riusciti a trovare l'indirizzo predefinito, probabilmente perché é stato cancellato dai nostri server da un altro sito del circuito ristostore o usando quest'app su un altro dispositivo. Per favore ricrea il tuo indirizzo predefinito e riprova.");
                                  } else {
                                    setcostodistanza(parseFloat(json_res.risposta.Totale)); 
                                    setcheckcalcoladistanza(0);
                                  }
                                } else if(indirizzoalternativo==="") {
                                  alert("Per favore compila l'indirizzo di partenza..");
                                }
                                
                                setVisible14(false);
                              }
                            }>{indi.nomeluogo}</Button>
                            <IconButton
                              icon="eye"
                              color={accent1}
                              style={[ss.centro,ss.w15]}
                              size={20}
                              onPress={
                                async ()=>{
                                  if(typeof(indi.telreferente)!=="undefined"){
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione+". Telefono: "+indi.telreferente);
                                  } else {
                                    settestodettaglioindirizzo(indi.indirizzoluogo+" "+indi.comunedestinazione);
                                  }
                                  setVisible11(true);
                                }
                              }
                            />
                          </View>
                        : null
                      ))
                    : null
                  }
                </View>
                <Button onPress={hideDialog14}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog visible={visible11} onDismiss={hideDialog11}>
              <Dialog.Title>Dettagli indirizzo</Dialog.Title>
              <Dialog.Content>
                <Text>
                  {testodettaglioindirizzo}
                </Text>
                <Button onPress={hideDialog11}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </ScrollView>
        <Footer no="home" />
      </SafeAreaView>
    </Provider>
  );
}