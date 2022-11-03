import {  Platform, View, TouchableOpacity, SafeAreaView, ScrollView,Image ,Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox,IconButton} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

//Componenti custom
import {ss} from '../struttura/style.js';
import {elaboraore,richiesta,getData,calcolaAltezza} from '../struttura/Utils.js';
import Footer from '../struttura/Footer.js';
import {CosafaInterno} from '../struttura/Altre_Componenti.js';
// import {Cosafa,Info2} from '../struttura/Altre_Componenti.js';
// import { Link } from '@react-navigation/native';
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const numeroversione=10012; //parametro aggiornamento

// function Info({tinfo,stili}){
const Info = ({settestoinfo,tinfo,stili,setVisible7}) => {
  return (
    <IconButton
      icon="information"
      color='#00a1ae'
      size={20}
      style={stili}
      onPress={async () => {
        settestoinfo(tinfo);
        setVisible7(true);
      }}
    />
  )
}

const MostraOpzioniServizio = ({servizio,cosa, setVisible7, settestoinfo, Info,sostiuisci,spesamax,coupon,setSostiuisci,setSpesamax,setcoupon,setCosa,duratasosta,setduratasosta,note2,setNote2,indirizzoalternativo,setindirizzoalternativo,validaCoupon}) => { 
  if(servizio=="no"){
    return (
      <></>
    );
  }
  if(servizio==4){
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <View style={{alignItems: 'center' }}>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o dove devo passarti a prendere" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Se vuoi indicami dove prenderti</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Luogo"
              mode='outlined'
              value={indirizzoalternativo}
              onChangeText={indirizzoalternativo => setindirizzoalternativo(indirizzoalternativo)}
            />
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo dove vuoi essere accompagnato" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Se vuoi indicami dove essere accompagnato</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Luogo"
              mode='outlined'
              value={note2}
              onChangeText={note2 => setNote2(note2)}
            />
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
            <Text style={[{ fontWeight: 'bold' }, ss.h2]}>{(duratasosta/30*5).toFixed(2)}</Text>
            <Text style={ss.h2}> €</Text>
          </Surface>
        </View>
      </Surface>
    );
  }
  if(servizio==2){
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <View style={{alignItems: 'center' }}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il punto di ritiro" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Indicami il luogo dove prenderti se diverso da quello suggerito</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Luogo"
              mode='outlined'
              value={indirizzoalternativo}
              onChangeText={indirizzoalternativo => setindirizzoalternativo(indirizzoalternativo)}
            />
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <Divider />
          </View>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo dove vuoi essere accompagnato" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Se vuoi indicami dove essere accompagnato</Text> 
          </View>
          <View  style={[ss.p3,ss.w100]}>
            <TextInput
              multiline = {true}
              numberOfLines = {4}
              label="Luogo"
              mode='outlined'
              value={note2}
              onChangeText={note2 => setNote2(note2)}
            />
          </View>
        </View>
      </Surface>
    );
  }
  if((servizio==0 || servizio==1 || servizio==5)){
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica cosa acquistare (Ad esempio 1 kg di mele, 1 casa di acqua Panna, 2 Confezioni di pasta Barilla, etc):" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Se vuoi indicami cosa acquistare *</Text> 
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
        <View  style={[ss.p3,ss.w100]}>
          <Divider />
        </View>
        
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che acquisti o ritiri quanto indicato" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Se vuoi indicami dove acquistare *</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            mode='outlined'
            label="Indica il luogo"
            value={note2}
            onChangeText={note2 => setNote2(note2)}
          />
        </Surface>
        <View style={[{ flexDirection: 'row',alignItems: 'center'},ss.mauto,ss.mt10]}>
          <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Se il prodotto di una marca specificata non è disponibile Hugò provvederà a sostituirlo con il prodotto più simile di un'altra marca" />
          <Text style={{ fontWeight: 'bold' }}>Sostituisci prodotti</Text>
          <Checkbox
            status={sostiuisci ? 'checked' : 'unchecked'}
            onPress={() => {
              setSostiuisci(!sostiuisci);
            }}
          />
        </View>
        <View  style={[ss.p3,ss.w100]}>
          <Divider />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width:"60%", flexDirection: 'row'}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica ad Hugò la spesa massima consentita per il servizio scelto. Nota bene: l'importo inserito in caso di pagamento alla consegna sarà preautorizzato sulla tua carta.
            La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Spesa massima * :</Text> 
          </View>
          <View style={{ width:"40%"}}>
            <TextInput
              textAlign={'center'}
              onChangeText={(spesamax) => {
                setSpesamax(spesamax)
              }}
              value={spesamax ?? ""}
              style={{ height:32}}
            />
          </View>
        </View>
        <View  style={[ss.p3,ss.w100]}>
          <Divider />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row',width:"60%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica un codice coupon per risparmiare ulteriormente" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
          </View>
          <View style={{ width:"40%"}}>
            <TextInput
              textAlign={'center'}
              onChangeText={(coupon) => {
                setcoupon(coupon);
                validaCoupon(coupon);
              }}
              value={coupon ?? ""}
              style={{ height:32}}
            />
          </View>
        </View>
      </Surface>
    );
  }
  if((servizio==6)){
    return (
      <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
        <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
        <Surface style={[ss.surface1, ss.w100]} elevation={4}>
          <TextInput
            multiline = {true}
            numberOfLines = {6}
            label="Indica cosa ritirare:"
            mode='outlined'
            value={cosa}
            onChangeText={cosa => setCosa(cosa)}
          />
        </Surface>
         
        <Surface style={[ss.surface1, ss.w100, ss.mt10]} elevation={4}>
          <View style={{ flexDirection: 'row',width:"100%"}}>
            <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Indica il luogo o il negozio dove vuoi che ritiri quanto indicato" />
            <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Indicami dove ritirare *</Text> 
          </View>
          <TextInput
            multiline = {true}
            numberOfLines = {4}
            mode='outlined'
            label="Indica il luogo"
            value={note2}
            onChangeText={note2 => setNote2(note2)}
          />
        </Surface>
      </Surface>
    );
  }
}

export default function Hugo({ navigation, route }) {
  var Id_Utente=route.params.Id_Utente;
  var Nominativo=route.params.Nominativo;
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

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

  const [visible6, setVisible6] = React.useState(false);
  const showDialog6 = () => setVisible6(true);
  const hideDialog6 = () => setVisible6(false);

  const [visible7, setVisible7] = React.useState(false);
  const showDialog7 = () => setVisible7(true);
  const hideDialog7 = () => setVisible7(false);
  const [testoinfo, settestoinfo] = useState("");




  
  function RadioServizio({id,etichetta,info,costo}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100]}>
        <View style={{ width:"10%"}}>
          <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={{ width:"90%"}}>
          <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={etichetta+" "+costo.toFixed(2)+"€"} value={id} />
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
          <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={etichetta} value={id} />
        </View>
      </View>
    )
  }

  // const [checked, setChecked] = React.useState(0);
  const arrayservizi=[4.90,6.50,14.99,0,14.99,4.90,4.90];
  const [costogestioneincassi, setcostogestioneincassi] = useState(1);
  const [totale, settotale] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [attivitabase, setattivitabase] = useState("no");
  const [indirizzo, setIndirizzo] = useState("no");
  const [descrizioneindirizzo, setdescrizioneindirizzo] = useState("no");
  const [servizio, setServizio] = useState('no');
  const [metodo_pagamento, setMetodo_Pagamento] = useState('no');
  const [note, setNote] = useState("");
  const [note2, setNote2] = useState("");
  const [indirizzoalternativo, setindirizzoalternativo] = useState("");
  const [cosa, setCosa] = useState("");
  const [mancia, setMancia] = useState(0);
  const [auto, setAuto] = useState("no");
  const [opzioniauto, setopzioniauto] = useState("GOrider");
  const [chiamami, setChiamami] = useState(false);
  const [sostiuisci, setSostiuisci] = useState(false);
  const [spesamax, setSpesamax] = useState(0);
  const [oraprenotazione, setora] = useState("no");
  const [coupon, setcoupon] = useState("");
  const [scontocoupon, setscontocoupon] = useState(0);
  const [duratasosta, setduratasosta] = useState(0);

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
    }
  }
  async function apriwa(){
    Linking.openURL("https://wa.me/+393333256236");
  }



  async function inviaPrenotazione (indirizzo, servizio, metodo_pagamento, note, note2, cosa, mancia, auto, chiamami, sostiuisci, spesamax, coupon,indirizzoalternativo, oraprenotazione){
    try {
      let richiestaprenotazione= {
        "cliente":Id_Utente,
        "idatti":attivitabase,
        "indirizzo":descrizioneindirizzo,
        "servizio":servizio,
        "metodo_pagamento":metodo_pagamento,
        "note":note,
        "note2":note2,
        "cosa":cosa,
        "mancia":mancia,
        "auto":auto,
        "chiamami":chiamami,
        "sostiuisci":sostiuisci,
        "spesamax":spesamax,
        "coupon":coupon,
        "scontocoupon":scontocoupon,
        "indirizzoalternativo":indirizzoalternativo,
        "oraprenotazione":oraprenotazione
      }
      let checkgo=true;
      let errore="";
      if(indirizzo=="no"){checkgo=false,errore+="Per favore scegli un indirizzo. \r\n"}
      if(servizio=="no"){checkgo=false,errore+="Per favore scegli un servizio. \r\n"}
      if(servizio==0 || servizio==1 || servizio==5){
        if(spesamax<1){
          checkgo=false,errore+="Per favore imposta la spesa massima. \r\n"
        }
      }
      if(metodo_pagamento=="no"){
        checkgo=false,
        errore+="Per favore scegli un metodo di pagamento. \r\n"
      }
      if(oraprenotazione=="no"){checkgo=false,errore+="Per favore scegli un orario. \r\n"}
      if(checkgo){
        switch (metodo_pagamento) {
          case 0:
            let acquisto=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
            Linking.openURL(acquisto.PaginaAcquisto);
            break;
          case "0":
              let acquisto2=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
              Linking.openURL(acquisto2.PaginaAcquisto);
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
                navigation.navigate('History');
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
              alert("Inserimento Riuscito");
            }
            if(AcquistoConSaldo.Errore!=="undefined"){
              alert(AcquistoConSaldo.Errore);
            }
            break;
        
          default:
            break;
        }
      } else {
        alert(errore);
      }
    } catch (error) {
      console.log('errore: ', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let richiestacheckaggiornamento={"Operazione":'checkVersione'}
      let checkAggiornamento = await richiesta(richiestacheckaggiornamento);
      // console.log('checkAggiornamento', checkAggiornamento);
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
      setIndirizzi(listaindirizzi);
      let richiestaservizi={"Operazione":'getServizi2',"Id_User":Id_User}
      let elencoservizi = await richiesta(richiestaservizi);
      setlistaservizi(elencoservizi);
      let json_res = await richiesta(richestaaggiornamento);
      aggiornaPagina(json_res);
    }
    fetchData();
  }, [Id_Utente]);
  // }, [Id_Utente]);
  
  useEffect(() => {
    if(indirizzo!="no"){
      async function fetchData() {
        let richiestaattivitabase={
          "Operazione":'getAttivitaBase',
          "Id_Indirizzo":indirizzo,
        }
        let jattivitabase = await richiesta(richiestaattivitabase);
        setattivitabase(jattivitabase.id_attivita_base);
        setdescrizioneindirizzo(jattivitabase.descrizione_indirizzo);
        richestaaggiornamento.id_attivita_base=jattivitabase.id_attivita_base;
        let json_res = await richiesta(richestaaggiornamento);
        aggiornaPagina(json_res);
      }
      fetchData();
    }
    let costoserv=0;
    listaservizi.forEach(element => {
      if(element["id"]==servizio){
        return costoserv=element["costo"];
      }
    });
    settotale((servizio!="no"?costoserv:0)+costogestioneincassi+parseFloat(spesamax)+(duratasosta/30*5)-scontocoupon+mancia);
    // settotale((servizio!="no"?arrayservizi[servizio]:0)+costogestioneincassi+parseFloat(spesamax)+(duratasosta/30*5)-scontocoupon);
  }, [indirizzo,servizio,spesamax,duratasosta,scontocoupon,mancia]);

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
  //     console.log("testA");
  //   }, MINUTE_MS);
    
  //   console.log("test3");
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
    settestooggidomani("per oggi");
    setduratasosta(0);
    switch (servizio) {
      case 1:
        setcheckdomani(true);
        settestooggidomani("per domani");
        break;
      case 3:
        navigation.navigate('Richiesta NCC');
        break; 
      case 4:
        setduratasosta(30);
        break; 
      default:
        break;
    }
    setServizio(servizio);
    richestaaggiornamento.servizio=servizio;
    async ()=> {
      let json_res = await richiesta(richestaaggiornamento);
      aggiornaPagina(json_res);
    }
  }

  function OpzioniAuto(props) {
    if(auto==1){
      return (
        <View style={[ss.w100,ss.mt15]}>
          <Divider />
          <View style={[ss.w100, ss.mt15]}>
            <Text style={[ss.centro]}>Vuoi usare la tua auto o quella del GOrider?</Text> 
          </View>
          <View style={[{ flexDirection: 'row'},ss.mt15,ss.w100]}>
            <Button onPress={() => {setopzioniauto("GOrider")}} style={[("GOrider" === opzioniauto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"GOrider" === opzioniauto ? ss.labelselected : ss.unselected} mode="outlined">GOrider</Button>
            <Button onPress={() => {setopzioniauto("Personale");}} style={[("Personale" === opzioniauto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"Personale" === opzioniauto ? ss.labelselected : ss.unselected}   mode="outlined">Personale</Button>
          </View>
        </View>
      );
    }
  }

  // function MostraOpzioniServizio() {
  async function validaCoupon(cod_coupon){
    console.log('cod_coupon', cod_coupon);
    if(cod_coupon.length>4){
      let richiestavalidazione={
        "Operazione":'validaCoupon',
        "cod_coupon":cod_coupon,
      }
      let coupon = await richiesta(richiestavalidazione);
      
      if(typeof(coupon)!==null, coupon["tipo"]=="Corretto"){
        setscontocoupon(parseFloat(coupon["Importo"]));
        alert("Coupon validato");
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
                <Text style={ss.h2}>Dove posso accompagnarti?</Text>
                <Text style={[ss.h2,ss.textcentro]}>Per piacere inserisci più dettagli possibili:</Text>
                <Text style={ss.h2}>mi faciliteresti il compito.</Text>
              </Surface>
            </View>
            <Button  color="#00a1ae" onPress={ssettogglevisibilita}  mode="contained"  style={[ss.w100]}>Cosa fa Hugò?</Button>
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
            <Button icon="phone" color="#00a1ae" onPress={apriwa}  mode="outlined"  style={[ss.w100]}>Se vuoi chiamami per info</Button>
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <Text style={[{ fontWeight: 'bold' }, ss.textcentro]}> Le opzioni contrassegnate con un asterisco * sono obbligatorie.</Text> 
            </Surface>
            
            {/* <Button  color="#00a1ae" onPress={showDialog2}  mode="contained"  style={[ss.w100,ss.mt15]}>Scegli un indirizzo di consegna *</Button> */}
            <Portal>
              <Dialog visible={visible2} onDismiss={hideDialog2}>
                <Dialog.Title>Scegli indirizzo</Dialog.Title>
                <Dialog.Content>
                  {
                    (typeof(indirizzi)!="undefined" && indirizzi.length) ?
                      <RadioButton.Group onValueChange={
                        indirizzo => {
                          setIndirizzo(indirizzo);
                          if(indirizzoalternativo==""){
                            indirizzi.forEach(element => {
                              if(element["Id"]==indirizzo){
                                setindirizzoalternativo(element["Via"]+" "+element["Civico"]+" "+element["Citta"]);
                                return;
                              }
                            });
                          }
                          // console.log('indirizzo', indirizzo);
                          // console.log('indirizzi', indirizzi);
                        }
                      } value={indirizzo}>
                        {
                          indirizzi.map((indirizzo, index) => (
                            <RadioButton.Item label={indirizzo["Via"]+" "+indirizzo["Civico"]+" "+indirizzo["Citta"]} value={indirizzo["Id"]} key={"rindi"+index} />
                            // <RadioButton.Item label={indirizzo["Via"]+" "+indirizzo["Civico"]+" "+indirizzo["Citta"]} value={indirizzo["Id"]} key={"rindi"+index} />
                          ))
                        }
                      </RadioButton.Group>
                    : null
                  }
                  <Button onPress={showDialog6}  mode="outlined"  style={[ss.w100]}>Nuovo indirizzo</Button>
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
                          style={[ss.w100, ss.mt15]} 
                          mode="contained" 
                          onPress={
                            async ()=>{
                              let datinuovoindirizzo={
                                "Operazione":"gestioneIndirizzo",
                                "Nuovo":"Si",
                                "Id_User":await getData('@Id_User'),
                                "Via":nuovoindirizzo,
                                "Civico":nuovocivico,
                                "Citta":nuovacitta,
                                "Provincia":nuovaprovincia,
                                "Cap":nuovocap,
                                "Note_Indirizzo":nuovenoteindirizzo,
                                "Telefono":nuovotel,
                              }
                              richiesta(datinuovoindirizzo,'apiHugo').then((json) => {
                                if(json.ok) {
                                  setIndirizzi(json.dati);
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
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog2}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>    
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              
              <View style={{ flexDirection: 'row'}}>
                <Text style={[ss.h1,ss.mt15]}>Scegli un servizio *:</Text>
              </View>
              <View style={ss.mt15}>
                {/* // servizio => setServizio(servizio) setServizio(servizio); */}
                <RadioButton.Group onValueChange={servizio => {checkservizio(servizio);}} value={servizio}>
                  {
                    listaservizi.map((s, index) => (
                      s["attivo"] ?
                        <RadioServizio info={s["info"]} id={s["id"]} etichetta={s["etichetta"]} costo={s["costo"]} key={"ser"+s["id"]}/>
                      :
                        null
                    ))
                  }
                </RadioButton.Group>
                {/* <RadioButton.Group onValueChange={servizio => {checkservizio(servizio);}} value={servizio}>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò ti ritira per te qualsiasi cosa tu voglia (frutta, sigarette, pannolini, gelati, etc). Scrivi nelle note cosa ritirare e dove farlo." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={"Ritiro "+arrayservizi[6].toFixed(2)+"€"} value="6" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò acquista per te qualsiasi cosa tu voglia (frutta, sigarette, pannolini, gelati, etc). Scrivi nelle note cosa deve ritirare o acquistare. Se vuoi indicagli anche dove acquistare." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={"Acquisti "+arrayservizi[0].toFixed(2)+"€"} value="0" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò acquista qualsiasi prodotto all'interno di tutti i supermercati o ipermercati con un massimo di 5 prodotti e un limite per le bevande di 1 cassa." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Acquisti supermercati con consegna veloce max 5 prodotti "+arrayservizi[5].toFixed(2)+"€"} value="5" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò acquista qualsiasi prodotto all'interno di tutti i supermercati o ipermercati. Nota bene: le quantità sono illimitate tranne che per le bevande con un massimo di 2 casse. " stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Acquisti supermercati con consegna domani "+arrayservizi[1].toFixed(2)+"€"} value="1" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò ti accompagna da un punto ad un altro della città con la sua auto o con la tua. Ti accompagna a fare la spesa, per una visita medica o ovunque tu voglia (il servizio non prevede la sosta)." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Hugo ti accompagna senza sosta "+arrayservizi[2].toFixed(2)+"€"} value="2" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info setVisible7={setVisible7} tinfo="Hugò ti accompagna da un punto ad un altro della città con la sua auto o con la tua. Ti accompagna a fare la spesa, per una visita medica o ovunque tu voglia (il servizio prevede la sosta con un supplemento, scegli quante ore deve aspettarti)." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Hugo ti accompagna con sosta "+arrayservizi[4].toFixed(2)+"€"} value="4" />
                    </View>
                  </View>

                  <RadioButton.Item style={ss.bordomare} label="Servizio Taxi con conducente NCC su richiesta" value="3" /> 
                </RadioButton.Group> */}
              </View>
            </Surface>
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              {
                (typeof(dispo)!="undefined" && dispo.length) ?
                  <View>
                    <Button  color="#00a1ae" onPress={showDialog2}  mode="contained"  style={[ss.w100, ss.mt10]}>Cambia indirizzo *</Button>
                    <View style={[{ flexDirection: 'row'}, ss.mt10]}>
                      <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="L'orario scelto è l'ora in cui il rider effettuerà il servizio" />
                      <Text style={[{ fontSize: 20 },ss.mt5]}>Scegli un orario {testooggidomani} *:</Text>
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
                                      <Text style={[{ fontSize: 18 }, (Ora2==oraprenotazione) ? ss.labelselected : null]}>{Ora2}</Text>
                                    </TouchableOpacity>
                                  :
                                    <View style={[{ backgroundColor: 'white', width:'25%' }, ss.p10, ss.centro]} 
                                    key={index+"no"+index2}>
                                      <Text style={{ fontSize: 18 }}>     </Text>
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
                                      <Text style={[{ fontSize: 18 }, (Ora2==oraprenotazione) ? ss.labelselected : null]}>{Ora2}</Text>
                                    </TouchableOpacity>
                                  :
                                    <View style={[{ backgroundColor: 'white', width:'25%' }, ss.p10, ss.centro]} 
                                    key={index+"no"+index2}>
                                      <Text style={{ fontSize: 18 }}>   </Text>
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
                    (dispo=="") ?
                      <View>
                        <Text style={{ fontSize: 20 }}>Al momento non ci sono Riders disponibili. Riprova più tardi.</Text>
                        <Button  color="#00a1ae" onPress={showDialog2}  mode="contained"  style={[ss.w100, ss.mt10]}>Cambia indirizzo *</Button>
                      </View>
                    :
                      <View><Text style={{ fontSize: 20 }}>Nessuna disponibilita</Text></View>
                  :
                  <View>
                    <Text style={[{ fontSize: 20 }, ss.textcentro]}>Seleziona un indirizzo per vedere le nostre disponibilità</Text>
                    <Button  color="#00a1ae" onPress={showDialog2}  mode="contained"  style={[ss.w100, ss.mt10]}>Scegli un indirizzo di consegna *</Button>
                  </View>
              }
            </Surface>
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
              validaCoupon={validaCoupon} 
            />
            {/* <Button onPress={showDialog4}  mode="contained"  style={[ss.w100,ss.mt15]}>Se vuoi indicami dove andare</Button>
            <Portal>
              <Dialog visible={visible4} onDismiss={hideDialog4}>
                <Dialog.Title>Se vuoi indicami dove andare</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    label="Note"
                    value={note2}
                    onChangeText={note2 => setNote2(note2)}
                  />
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog4}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>  */}
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <View style={[{flexDirection: 'row', alignItems: 'center'},ss.w100,ss.textcentro]}>
                <Info setVisible7={setVisible7} settestoinfo={settestoinfo} tinfo="Hugò ti chiamerà prima di effettuare il servizio richiesto per chiederti ulteriori dettagli" />
                <Text style={{ fontWeight: 'bold' }}>Hugò ti chiama</Text>
                <Checkbox
                  status={chiamami ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChiamami(!chiamami);
                  }}
                />
              </View>
              <View  style={[ss.p3,ss.w100]}>
                <Divider />
              </View>
              <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                <Text style={ss.w20}>Mancia</Text> 
                <Button onPress={() => {1 === mancia ? setMancia("no"): setMancia(1);}} style={[(1 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={1 === mancia ? ss.labelselected : ss.unselected} mode="outlined">1€</Button>
                <Button  onPress={() => {2 === mancia ? setMancia("no"): setMancia(2);}} style={[(2 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={2 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">2€</Button>
                <Button onPress={() => {5 === mancia ? setMancia("no"): setMancia(5);}} style={[(5 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={5 === mancia ? ss.labelselected : ss.unselected}   mode="outlined">5€</Button>
                <Button onPress={() => {10 === mancia ? setMancia("no"): setMancia(10);}}  style={[(10 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={10 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">10€</Button>
              </View>
              <View  style={[ss.p3,ss.w100]}>
                <Divider />
              </View>
              <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
                <Text style={[ss.w50,ss.pe5]}>E' necessaria un auto per questo servizio?</Text> 
                <Button onPress={() => {1 === auto ? setAuto("no"): setAuto(1);}} style={[(1 === auto ? ss.selected : ss.unselected),ss.w25]} labelStyle={1 === auto ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
                <Button onPress={() => {0 === auto ? setAuto("no"): setAuto(0);}} style={[(0 === auto ? ss.selected : ss.unselected),ss.w25]} labelStyle={0 === auto ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
              </View>
              <OpzioniAuto /> 
            </Surface>

                
            
            <Button color="#00a1ae" onPress={showDialog3}  mode="contained"  style={[ss.w100,ss.mt15]}>Note per Hugò</Button>
            <Portal>
              <Dialog visible={visible3} onDismiss={hideDialog3}>
                <Dialog.Title>Inserisci note</Dialog.Title>
                <Dialog.Content>
                  <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    label="Note"
                    value={note}
                    onChangeText={note => setNote(note)}
                  />
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog3}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal> 
            <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
              <Text style={ss.h2}>Totale: </Text>
              <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>{totale.toFixed(2)}</Text>
              <Text style={ss.h2}> €</Text>
            </Surface>
            
            <Button color="#00a1ae" onPress={showDialog5}  mode="contained"  style={[ss.w100,ss.mt15]}>Metodo di pagamento *</Button>
            <Portal>
              <Dialog visible={visible5} onDismiss={hideDialog5}>
                <Dialog.Title>Scegli il metodo di pagamento *</Dialog.Title>
                <Dialog.Content>
                  <RadioButton.Group onValueChange={metodo_pagamento => setMetodo_Pagamento(metodo_pagamento)} value={metodo_pagamento}>
                    {/* <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Carta di credito" value="0" />
                    <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Contanti alla consegna con preautorizzazione" value="1" />
                    <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Saldo" value="2" />
                    <RadioMetodo id="0" etichetta="Carta di credito" info="Sarai reindirizzato al portale per l'inserimento dei tuoi dati di pagamento" />  */}
                    <RadioMetodo id="1" etichetta="Contanti alla consegna con preautorizzazione" info="La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
                    {
                      saldo!="" && saldo>0 ?
                        <RadioMetodo id="2" etichetta="Saldo" info="L'importo verra detratto dal tuo saldo cliente. Vai nel profilo per ricaricarlo." />
                      : null 
                    }
                  </RadioButton.Group>
                  {
                    saldo!="" && saldo>0 ?
                      <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={ss.h2}>Il tuo saldo è: </Text>
                        <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>{saldo.toFixed(2)}</Text>
                        <Text style={ss.h2}> €</Text>
                      </Surface>
                    : 
                      <Surface style={[{alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={[ss.h2,,ss.textcentro]}>In questo momento il tuo saldo non è sufficiente per utilizzarlo come metodo di pagamento.</Text>
                        <Button color="#00a1ae" onPress={async () => {navigation.navigate('RicaricaSaldo');}}  mode="contained"  style={[ss.w100,ss.mt5]}>Ricarica il saldo</Button>
                      </Surface>
                  }
                  <Button  style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog5}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal> 
            <TouchableOpacity
              onPress={
                () => {
                  inviaPrenotazione(indirizzo, servizio, metodo_pagamento, note, note2, cosa, mancia, auto, chiamami, sostiuisci, spesamax, indirizzoalternativo,coupon, oraprenotazione);
                }
              }
              style={[{ backgroundColor: '#00a1ae' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
              <Text style={{ fontSize: 20, color: '#fff' }}>INVIA</Text>
            </TouchableOpacity>
            <Image
              style={[{height: calcolaAltezza(630,430,60)}, ss.w100, ss.mt15]} 
              source={{
                uri: 'https://ristostore.it/lib/bootstrap/css/Immagini/bannerhugo.jpg',
              }}
            />
          </View>
          <Portal>
            <Dialog visible={visible7} onDismiss={hideDialog7}>
              <Dialog.Title>Info</Dialog.Title>
              <Dialog.Content>
                <Text>
                  {testoinfo}
                </Text>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </ScrollView>
        <Footer no="home" />
      </SafeAreaView>
    </Provider>
  );
}