import {  View, TouchableOpacity, SafeAreaView, ScrollView,Image  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox,IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

//Componenti custom
import {ss} from '../struttura/style.js';
import {elaboraore,richiesta,getData,calcolaAltezza} from '../struttura/Utils.js';
import Footer from '../struttura/Footer.js';
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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




  function Info({tinfo,stili}){
    return (
      <IconButton
        icon="information"
        color='#00a1ae'
        size={20}
        style={stili}
        onPress={async () => {
          settestoinfo(tinfo);
          console.log("u "+testoinfo);
          setVisible7(true);
        }}
      />
    )
  }

  // const [checked, setChecked] = React.useState(0);
  const arrayservizi=[4.90,6.50,14.99,0,14.99,4.90,4.90];
  const [costogestioneincassi, setcostogestioneincassi] = useState(1);
  const [totale, settotale] = useState(0);
  const [attivitabase, setattivitabase] = useState("no");
  const [indirizzo, setIndirizzo] = useState("no");
  const [descrizioneindirizzo, setdescrizioneindirizzo] = useState("no");
  const [servizio, setServizio] = useState('no');
  const [metodo_pagamento, setMetodo_Pagamento] = useState('no');
  const [note, setNote] = useState("");
  const [note2, setNote2] = useState("");
  const [cosa, setCosa] = useState("");
  const [mancia, setMancia] = useState(0);
  const [auto, setAuto] = useState("no");
  const [opzioniauto, setopzioniauto] = useState("GOrider");
  const [chiamami, setChiamami] = useState(false);
  const [sostiuisci, setSostiuisci] = useState(false);
  const [spesamax, setSpesamax] = useState(0);
  const [oraprenotazione, setora] = useState("no");
  const [coupon, setcoupon] = useState("");
  const [duratasosta, setduratasosta] = useState(30);

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
    }
  }

  async function inviaPrenotazione (indirizzo, servizio, metodo_pagamento, note, note2, cosa, mancia, auto, chiamami, sostiuisci, spesamax, coupon, oraprenotazione){
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
        "oraprenotazione":oraprenotazione
      }
      let checkgo=true;
      let errore="";
      if(indirizzo=="no"){checkgo=false,errore+="Per favore scegli un indirizzo. \r\n"}
      if(servizio=="no"){checkgo=false,errore+="Per favore scegli un servizio. \r\n"}
      if(metodo_pagamento=="no"){checkgo=false,errore+="Per favore scegli un metodo di pagamento. \r\n"}
      if(oraprenotazione=="no"){checkgo=false,errore+="Per favore scegli un orario. \r\n"}
      console.log("metodo_pagamento");
      console.log(metodo_pagamento);
      if(checkgo){
        console.log("TUTTO OK");
        switch (metodo_pagamento) {
          case 0:
            let acquisto=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
            console.log(acquisto);
            Linking.openURL(acquisto.PaginaAcquisto);
            break;
          case "0":
              let acquisto2=await richiesta(richiestaprenotazione,false,"https://ristostore.it/Pagamenti/AcquistoHugo");
              console.log(acquisto2);
              Linking.openURL(acquisto2.PaginaAcquisto);
              break;
          case "1":
            let Preautorizzazione = await getData('@Preautorizzazione');
            let idpagamento = await getData('@idpagamento');
            console.log('Preautorizzazione', Preautorizzazione);
            if(Preautorizzazione=="si"){
              richiestaprenotazione["Operazione"]="AcquistoConPre";
              richiestaprenotazione["idpagamento"]=idpagamento;
              let AcquistoConPre=await richiesta(richiestaprenotazione);
              console.log(AcquistoConPre);
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
            console.log(AcquistoConSaldo);
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
      console.log('richiestaprenotazione', richiestaprenotazione);
    } catch (error) {
      console.log('errore: ', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let richiestaindi={
        "Operazione":'getIndirizzi',
        "Id_User":Id_User,
      }
      let listaindirizzi = await richiesta(richiestaindi,'apiHugo');
      setIndirizzi(listaindirizzi);
      let json_res = await richiesta(richestaaggiornamento);
      aggiornaPagina(json_res);
    }
    fetchData();
  }, [Id_Utente]);
  
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
    settotale((servizio!="no"?arrayservizi[servizio]:0)+costogestioneincassi+parseFloat(spesamax));
  }, [indirizzo,servizio,spesamax]);

  const MINUTE_MS = 10000;
  useEffect(() => {
    const intervalloritiri = setInterval(async () => {
      // let Id_User = await getData('@Id_User');
      
      let json_res = await richiesta(richestaaggiornamento);
      // let json_res = await richiesta({
      //   "Operazione":'AggiornaHugo',
      //   "id_attivita_base":attivitabase,
      //   "iduser":Id_User,
      // },'apiHugo');
      aggiornaPagina(json_res);
    }, MINUTE_MS);
    return () => clearInterval(intervalloritiri); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [attivitabase]);
  
  var oggi = new Date();
  var deltaminuti=25;
  var adessocondelta = new Date(oggi.getTime() + deltaminuti*60000);
  oggi.setHours( oggi.getHours() + 2 );

  
  const [checkdomani, setcheckdomani] = useState(false);
  const [testooggidomani, settestooggidomani] = useState("per oggi");

  function checkservizio(servizio){
    setcheckdomani(false);
    settestooggidomani("per oggi");
    switch (servizio) {
      case '1':
        setcheckdomani(true);
        settestooggidomani("per domani");
        break;
      case '3':
        navigation.navigate('Richiesta NCC');
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

  function MostraOpzioniServizio(props) {
    if(servizio=="no"){
      return (
        <></>
      );
    }
    if(servizio==4){
      return (
        <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
          <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Opzioni servizio:</Text> 
          <View style={{alignItems: 'center' }}>
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
          </View>
        </Surface>
      );
    }
    if((servizio==0 || servizio==1 || servizio==5)){
      return (
        <Surface style={[ss.surface1,ss.mt15,ss.centro,ss.w100]} elevation={4}>
          <Text style={[{ fontWeight: 'bold' }, ss.mt10, ss.h1]}>Opzioni servizio:</Text> 
          <Surface style={[ss.surface1, ss.w100]} elevation={4}>
            <TextInput
              multiline = {true}
              numberOfLines = {6}
              label="Indica cosa acquistare:"
              mode='outlined'
              value={cosa}
              onChangeText={cosa => setCosa(cosa)}
            />
          </Surface>
          <View style={[{ flexDirection: 'row',alignItems: 'center'},ss.mauto,ss.mt10]}>
            <Info tinfo="Se il prodotto di una marca specificata non è disponibile Hugò provvederà a sostituirlo con il prodotto più simile di un'altra marca" />
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
              <Info tinfo="Indica ad Hugò la spesa massima consentita per il servizio scelto. Nota bene: l'importo inserito in caso di pagamento alla consegna sarà preautorizzato sulla tua carta.
              La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Spesa massima</Text> 
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
              <Info tinfo="Imndica un codice coupon per risparmiare ulteriormente" />
              <Text style={[{ fontWeight: 'bold' }, ss.mt10]}>Coupon</Text> 
            </View>
            <View style={{ width:"40%"}}>
              <TextInput
                textAlign={'center'}
                onChangeText={(coupon) => {
                  setcoupon(coupon)
                }}
                value={coupon ?? ""}
                style={{ height:32}}
              />
            </View>
          </View>
        </Surface>
      );
    }
  }


  return (
    <Provider>
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Surface style={[ss.surface1,ss.mb15,ss.centro,ss.w100]} elevation={4}>
              <Text style={ss.h1}>Ue' {Nominativo} Ciao!</Text>
              <Text style={ss.h2}>Cosa posso portarti oggi?</Text>
              <Text style={ss.h2}>Dove posso accompagnarti?</Text>
              <Text style={[ss.h2,ss.centro]}>Per piacere inserisci più dettagli possibili:</Text>
              <Text style={ss.h2}>mi faciliteresti il compito.</Text>
            </Surface>
            <Button onPress={showDialog}  mode="contained"  style={[ss.w100]}>Cosa fa Hugò?</Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Cosa fa Hugò?</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Hugò è il tuo personal shopper può ritirare acquistare e consegnare qualsiasi cosa. Può accompagnarti dove tu vorrai (in città) e se devi spostarti fuori città Hugò è anche un servizio taxi con conducente (NCC).Inserisci nelle note dove vuoi andare, numero di passeggeri, data e ora di partenza. Cliccka l'ora in cui vuoi essere chiamato, ti richiameremo per un preventivo immediato. </Paragraph>
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>
            <Button  onPress={showDialog2}  mode="contained"  style={[ss.w100,ss.mt15]}>Scegli indirizzo</Button>
            <Portal>
              <Dialog visible={visible2} onDismiss={hideDialog2}>
                <Dialog.Title>Scegli indirizzo</Dialog.Title>
                <Dialog.Content>
                  {
                    (typeof(indirizzi)!="undefined" && indirizzi.length) ?
                      <RadioButton.Group onValueChange={indirizzo => setIndirizzo(indirizzo)} value={indirizzo}>
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
                <Text style={[ss.h1,ss.mt15]}>Scegli un servizio:</Text>
              </View>
              <View style={ss.mt15}>
                {/* // servizio => setServizio(servizio) setServizio(servizio); */}
                <RadioButton.Group onValueChange={servizio => {checkservizio(servizio);}} value={servizio}>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò ti ritira per te qualsiasi cosa tu voglia (frutta, sigarette, pannolini, gelati, etc). Scrivi nelle note cosa ritirare e dove farlo." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={"Ritiro "+arrayservizi[6].toFixed(2)+"€"} value="6" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò ti ritira o acquista per te qualsiasi cosa tu voglia (frutta, sigarette, pannolini, gelati, etc). Scrivi nelle note cosa deve ritirare o acquistare. Se vuoi indicagli anche dove acquistare." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5, ss.w100]} label={"Acquisti "+arrayservizi[0].toFixed(2)+"€"} value="0" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò acquista qualsiasi prodotto all'interno di tutti i supermercati o ipermercati con un massimo di 5 prodotti e un limite per le bevande di 1 cassa." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Acquisti supermercati con consegna veloce max 5 prodotti "+arrayservizi[5].toFixed(2)+"€"} value="5" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò acquista qualsiasi prodotto all'interno di tutti i supermercati o ipermercati. Nota bene: le quantità sono illimitate tranne che per le bevande con un massimo di 2 casse. " stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Acquisti supermercati con consegna domani "+arrayservizi[1].toFixed(2)+"€"} value="1" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò ti accompagna da un punto ad un altro della città con la sua auto o con la tua. Ti accompagna a fare la spesa, per una visita medica o ovunque tu voglia (il servizio non prevede la sosta)." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Hugo ti accompagna senza sosta "+arrayservizi[2].toFixed(2)+"€"} value="2" />
                    </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.w100]}>
                    <View style={{ width:"5%"}}>
                      <Info tinfo="Hugò ti accompagna da un punto ad un altro della città con la sua auto o con la tua. Ti accompagna a fare la spesa, per una visita medica o ovunque tu voglia (il servizio prevede la sosta con un supplemento, scegli quante ore deve aspettarti)." stili={[ss.mt15,ss.w100,ss.mx0]} />
                    </View>
                    <View style={{ width:"95%"}}>
                      <RadioButton.Item style={[ss.bordomare, ss.mb5]} label={"Hugo ti accompagna con sosta "+arrayservizi[4].toFixed(2)+"€"} value="4" />
                    </View>
                  </View>

                  {/* <RadioButton.Item style={ss.bordomare} label="Servizio Taxi con conducente NCC su richiesta" value="3" /> */}
                </RadioButton.Group>
              </View>
            </Surface>
            
            <MostraOpzioniServizio />
            <Button onPress={showDialog4}  mode="contained"  style={[ss.w100,ss.mt15]}>Dove andare</Button>
            <Portal>
              <Dialog visible={visible4} onDismiss={hideDialog4}>
                <Dialog.Title>Dove acquistare</Dialog.Title>
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
            </Portal> 
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <View style={[{flexDirection: 'row', alignItems: 'center'},ss.w100,ss.textcentro]}>
                <Info tinfo="Hugà ti chiamerà in caso di dubbi, prodotto mancante o per chiederti ulteriori dettagli." />
                <Text style={{ fontWeight: 'bold' }}>Chiamami</Text>
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

                
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              {
                (typeof(dispo)!="undefined" && dispo.length) ?
                  <View>
                    <View style={{ flexDirection: 'row'}}>
                      <Info tinfo="L'orario scelto è l'ora in cui il rider effettuerà il servizio" />
                      <Text style={[{ fontSize: 20 },ss.mt5]}>Scegli un orario {testooggidomani}:</Text>
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
                                      <Text style={{ fontSize: 18 }}>     </Text>
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
                      <View><Text style={{ fontSize: 20 }}>Al momento non ci sono Riders disponibili. Riprova più tardi.</Text></View>
                    :
                      <View><Text style={{ fontSize: 20 }}>Nessuna disponibilita</Text></View>
                  :
                  <View><Text style={{ fontSize: 20 }}>Seleziona un indirizzo per vedere le nostre disponibilità</Text></View>
              }
            </Surface>
            <Button onPress={showDialog5}  mode="contained"  style={[ss.w100,ss.mt15]}>Metodo di pagamento</Button>
            <Portal>
              <Dialog visible={visible5} onDismiss={hideDialog5}>
                <Dialog.Title>Scegli il metodo di pagamento</Dialog.Title>
                <Dialog.Content>
                  <RadioButton.Group onValueChange={metodo_pagamento => setMetodo_Pagamento(metodo_pagamento)} value={metodo_pagamento}>
                    <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Carta di credito" value="0" />
                    <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Contanti alla consegna" value="1" />
                    <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Saldo" value="2" /> 
                  </RadioButton.Group>
                  <Button  style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog5}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal> 
            <Button onPress={showDialog3}  mode="contained"  style={[ss.w100,ss.mt15]}>Note</Button>
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
            <TouchableOpacity
              onPress={
                () => {
                  // console.log("test");
                  inviaPrenotazione(indirizzo, servizio, metodo_pagamento, note, note2, cosa, mancia, auto, chiamami, sostiuisci, spesamax, oraprenotazione);
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