import {ss} from '../struttura/style.js';
import Footer from '../struttura/Footer.js';
import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, ScrollView, View, Keyboard,TouchableWithoutFeedback} from 'react-native';
import { TextInput,Surface, RadioButton,Button,Portal, Dialog,Provider, Text, IconButton} from 'react-native-paper';
import {richiesta,getData} from '../struttura/Utils.js';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';


const accent1="#6f10b7";
const Info = ({settestoinfo,tinfo,stili,setvisibleinfo}) => {
  return (
    <IconButton
      icon="information"
      color={accent1}
      size={20}
      style={stili}
      onPress={async () => {
        settestoinfo(tinfo);
        setvisibleinfo(true);
      }}
    />
  )
}


export default function Richiesta_AEI({ navigation, route }) {
  
  function RadioServizio({val,etichetta,stili,info}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100,stili]}>
        <View style={{ width:"10%"}}>
          <Info setvisibleinfo={setvisibleinfo} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={{ width:"90%"}}>
          <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta} value={val} />
        </View>
      </View>
    )
  }
  function RadioMetodo({id,etichetta,info}){
    return (
      <View style={[{ flexDirection: 'row'},ss.w100]}>
        <View style={{ width:"10%"}}>
          <Info setvisibleinfo={setvisibleinfo} settestoinfo={settestoinfo} tinfo={info} stili={[ss.mt15,ss.w100,ss.mx0]} />
        </View>
        <View style={{ width:"90%"}}>
          <RadioButton.Item style={[ss.bordoaccent1, ss.mb5, ss.w100]} label={etichetta} value={id} />
        </View>
      </View>
    )
  }

  const [visible5, setVisible5] = React.useState(false);
  const showDialog5 = () => setVisible5(true);
  const hideDialog5 = () => setVisible5(false);
  const [visibleinfo, setvisibleinfo] = React.useState(false);
  const [testoinfo, settestoinfo] = useState("");
  const [soggetto, setsoggetto] = useState("Anziani");
  const [opzioniaei, setopzioniaei] = useState("Accompagnamento");
  
  const listametodi = ["Carta","Saldo","AcquistoDiretto"];
  const [metodo_pagamento, setMetodo_Pagamento] = useState(false);
  const [checksottocasa, setchecksottocasa] = useState(true);
  const [saldo, setSaldo] = useState(0);
  const [viapartenza, setviapartenza] = useState('');
  const [viadestinazione, setviadestinazione] = useState('');
  const [cittapartenza, setcittapartenza] = useState('');
  const [cittadestinazione, setcittadestinazione] = useState('');
  // const [indirizzodestinazione, setindirizzodestinazione] = useState('');

  const monthNamesIta = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  const [ora, setora] = useState('');
  const [minuti, setminuti] = useState('');
  const [giorno, setgiorno] = useState('');
  const [mese, setmese] = useState('');
  const [anno, setanno] = useState('');
  const [tipospostamento, settipospostamento] = useState('');
  const [durataattesa, setdurataattesa] = useState('');
  const [costototale, setcostototale] = useState(0);
  const [duratatotale, setduratatotale] = useState("no");
  const [duratasosta, setduratasosta] = useState(0);
  const [passeggeri, setpasseggeri] = useState('');
  const [note, setnote] = useState('');

  const mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre","Novembre","Dicembre"];
  const [meseselected, setmeseSelected] = useState(undefined);


  async function getCosto() {
    Keyboard.dismiss;
    let riciestaCostoNCC={
      "Operazione":'getCostoNCC',
      "Partenza":viapartenza+", "+cittapartenza,
      "Destinazione":viadestinazione+", "+cittadestinazione,
      "Sosta":duratasosta,
    }
    if(opzioniaei=="Compagnia" || (opzioniaei==="Spesa e commissioni" && checksottocasa)){
      riciestaCostoNCC.Destinazione=riciestaCostoNCC.Partenza;
    }
    let jcosto = await richiesta(riciestaCostoNCC);
    // console.log('jcosto.risposta', jcosto.risposta);
    if(jcosto.risposta!="Indirizzo_non_trovato" && jcosto.risposta!="Operazione_non_riuscita"){
      let duratabase=Math.ceil(parseFloat(jcosto.risposta.Durata)/60+duratasosta+30);
      if(duratabase<=59){
        setduratatotale(duratabase+" minuti");
      }else if(59<duratabase && duratabase<120){
        let restominuti=duratabase%60;
        setduratatotale("Un ora"+(restominuti>0?" e "+restominuti+" minuti":""));
      } else if(120<=duratabase){
        let numeroore=Math.trunc(duratabase/60);
        let restominuti=duratabase%60;
        setduratatotale(numeroore+" ore"+(restominuti>0?" e "+restominuti+" minuti":""));
      }
      setcostototale(parseFloat(jcosto.risposta.Totale));
    } else {
      setduratatotale("");
      setcostototale(0);
    }
  }
  async function invioRichiesta() {
    let idutente= await getData("@Id_User");
    let checkgo=true;

    let messaggioerrore="Per favore compila i seguenti campi:";
    if(viapartenza==""){messaggioerrore+=" 'Via di partenza'";checkgo=false;}
    if(cittapartenza==""){messaggioerrore+=" 'Città di partenza'";checkgo=false;}
    if(!(opzioniaei=="Compagnia" || (opzioniaei==="Spesa e commissioni" && checksottocasa))){
      if(viadestinazione==""){messaggioerrore+=" 'Via di destinazione'";checkgo=false;}
      if(cittadestinazione==""){messaggioerrore+=" 'Città di destinazione'";checkgo=false;}
    }

    if(passeggeri!=""){
      let passeggeri_fixed=parseInt(passeggeri.replace(/[^0-9]/g, ''));
      if(isNaN(passeggeri_fixed) || (passeggeri_fixed<0 || passeggeri_fixed>9)){
        return alert ("Per favore compila i passeggeri indicando un numero da 0 a 9");
      }
    }
    if(ora!=""){
      let ora_fixed=parseInt(ora.replace(/[^0-9]/g, ''));
      if(isNaN(ora_fixed) || ora_fixed=="" || (ora_fixed<0 || ora_fixed>23)){
        return alert ("Per favore compila l'orario di partenza indicando l'ora a 2 cifre. Ad esempio 09 per le nove del mattino.");
      }
    }
    if(minuti!=""){
      let minuti_fixed=parseInt(minuti.replace(/[^0-9]/g, ''));
      if(isNaN(minuti_fixed) || minuti_fixed=="" || (minuti_fixed<0 || minuti_fixed>59)){
        return alert ("Per favore compila l'orario di partenza indicando i minuti a 2 cifre. Ad esempio 05.");
      }
    }
    if(mese!==""){
      // console.log('mese', mese);
      let mese_fixed=(isNaN(mese)?parseInt(mese.toString().replace(/[^0-9]/g, '')):mese);
      if(isNaN(mese_fixed) || mese_fixed=="" || (mese_fixed<1 || mese_fixed>12)){
        return alert ("Per favore compila il mese di partenza indicandolo nel formato a 2 cifre. Ad esempio 02 per indicare Febbraio.");
      }
    }
    if(giorno!=""){
      let giorno_fixed=parseInt(giorno.replace(/[^0-9]/g, ''));
      let checkgiornimese=31;
      if(mese=="02"){
        checkgiornimese=29;
      } else if(mese=="04" || mese=="06" || mese=="9" || mese=="11"){
        checkgiornimese=30;
      }
      if(isNaN(giorno_fixed) || giorno_fixed=="" || (giorno_fixed<1 || giorno_fixed>checkgiornimese)){
        return alert ("Per favore compila il giorno di partenza indicandolo nel formato a 2 cifre. Ad esempio 01 per il primo del mese.");
      }
    }
    if(anno!=""){
      let anno_fixed=(isNaN(anno)?parseInt(anno.replace(/[^0-9]/g, '')):anno);
      if(isNaN(anno_fixed) || anno_fixed=="" || (anno_fixed<22 || anno_fixed>25)){
        return alert ("Per favore compila l'anno di partenza indicandolo nel formato a 2 cifre. Ad esempio 23 per indicare il 2023.");
      }
    }

    if(ora==""){messaggioerrore+=" 'Ora'";checkgo=false;}
    if(minuti==""){messaggioerrore+=" 'Minuti'";checkgo=false;}
    if(giorno==""){messaggioerrore+=" 'Giorno'";checkgo=false;}
    if(mese==""){messaggioerrore+=" 'Mese'";checkgo=false;}
    if(anno==""){messaggioerrore+=" 'Anno'";checkgo=false;}
    if(!metodo_pagamento){messaggioerrore="Per favore scegli un metodo di pagamento.";checkgo=false;}
    if(checkgo){
      let richiestaRichiesta={
        "Operazione":'richiestaRichiesta',
        "Indirizzo_Partenza":viapartenza,
        "Citta_Partenza":cittapartenza,
        "Indirizzo_Destinazione":viadestinazione,
        "Citta_Destinazione":cittadestinazione,
        "Durata_Sosta":duratasosta,
        "giorno":giorno,
        "mese":mese,
        "anno":anno,
        "Passeggeri":passeggeri,
        "Note":note,
        "Metodo_Pagamento":metodo_pagamento,
        "Cliente":idutente,
        "Tipo":"AEI",
        "Soggetto":soggetto,
        "Opzioni_Servizio":opzioniaei,
        "checksottocasa":checksottocasa?"si":"no",
      }
      // console.log('idutente', idutente);
      // console.log('richiestaRichiesta', richiestaRichiesta);

      if(metodo_pagamento==0 || metodo_pagamento=="0"){
        let acquisto=await richiesta(richiestaRichiesta,false,"https://ristostore.it/Pagamenti/AcquistoNCCHugo");
        if(typeof(acquisto.PaginaAcquisto)!=="undefined" && acquisto.PaginaAcquisto!==null && acquisto.PaginaAcquisto!==""){
          Linking.openURL(acquisto.PaginaAcquisto);
        } else {
          console.log('acquisto', acquisto);
        }
      } else {
        let jrichiestaRichiesta = await richiesta(richiestaRichiesta);
        if(jrichiestaRichiesta){
          alert("Richiesta inviata correttamente!");
          try {
            let nom= await getData("@Nominativo");
            navigation.navigate('Hugo',{
              Id_Utente: idutente,Nominativo:nom
            });
          } catch (error) {
            console.log('error', error);
          }
        } else {
          alert("Richiesta non riuscita");
        }
      }
    } else {
      alert(messaggioerrore);
    }
  }
  useEffect(() => {
    async function fetchData() {
      let cittaindirizzo = await getData('@cittaindirizzo');
      if(cittaindirizzo!==null){
        setcittadestinazione(cittaindirizzo);
        setcittapartenza(cittaindirizzo);
        const d = new Date();
        let month = d.getMonth()+1;     
        let fullyear = d.getFullYear().toString();
        setmese(month);
        setanno(fullyear.substring(2));
      }
    }
    fetchData();
  }, []);
  async function apriwa(){
    Linking.openURL("https://wa.me/+393383083224");
  }
  async function chiama(){
    Linking.openURL("tel:+393383083224");
  }

    return (
      <Provider>
        <SafeAreaView style={ss.safeareaview}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={ss.container}>
              <Text style={[ss.h1, ss.mt15]}>Richiesta accompagnamento anziani o invalidi</Text>
              <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <Button icon={require('../assets/wa.png')} onPress={apriwa}  color="#4acd6e" mode="outlined"  style={[ss.w100]}>Messaggia con me per info</Button>
                <Button icon="phone" onPress={chiama}  color="#4acd6e" mode="outlined"  style={[ss.w100]}>Chiamami per ordinare</Button>
              </Surface>
              <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <RadioButton.Group 
                    onValueChange={
                      opzioniaei => {
                        setsoggetto("Anziani");
                        setviapartenza("");
                        setcittapartenza("");
                        setviadestinazione("");
                        setcittadestinazione("");
                        setduratatotale("no");
                        setora("");
                        setminuti("");
                        setgiorno("");
                        setmese("");
                        setnote("");
                        setpasseggeri("");
                        setanno(23);
                        setduratasosta(0);
                        setopzioniaei(opzioniaei);
                        // if(opzioniaei=="Pet sitting notturno" || opzioniaei=="Pet sitting diurnon"){
                        //   setcostototale(24);
                        // } else {
                        //   setcostototale(15);
                        // }
                      }
                    } value={opzioniaei}>
                    <RadioServizio val="Accompagnamento" etichetta="Accompagnamento 14,99€" info="Hugò ti offre un servizio di trasporto e accompagnamento per anziani e  disabili. Persone con problemi di autonomia o mobilità ridotta, possono richiedere di essere accompagnate e trasportate in ospedale per una visita medica in giro per la città o dove loro vogliono andare, Hugò sapà fornire tutto l'aiuto necessario. e necessario indicare la destinazione, sarà calcolato un euro per km percorso (solo andata) dalla tua abitazione n.b Hugò ti chiameà prima per ulteriori dettagli costo 14,99€ più km percorsi."/>
                    <RadioServizio val="Spesa e commissioni" etichetta="Spesa e commissioni 14,99€" info="Hugò può  recarsi con tè nei tuoi negozi di quartiere preferiti per fare la spesa, sbrigare pratiche burocratiche, commissioni,  andare in farmacia ect… Nota Bene: Hugò ti chiamerà prima per ulteriori dettagli costo 14,99€ inclusi i primi 30 minuti."/>
                    {/* <RadioServizio val="Spesa e commissioni" etichetta="Spesa e commissioni 14,99€" info="Hugò può  recarsi nei tuoi negozi di quartiere preferiti per fare la spesa, sbrigare pratiche burocratiche, commissioni,  andare in farmacia ect… n.b Hugò ti chiamerà prima per ulteriori dettagli costo 14,99€ inclusa prima ora "/> */}
                    <RadioServizio val="Compagnia" etichetta="Compagnia 14.99€" info="Hugò ti  offre un servizio di compagnia di qualità a casa, in ospedale o dove tu voglia . Hugò ti porterà tanta  discrezione e simpatia. n.b Hugò ti chiamerà prima per ulteriori dettagli costo 14,99€ inclusi i primi 30 minuti."/>
                  </RadioButton.Group>
                  <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
                    <Button onPress={() => {setsoggetto("Anziani");}} style={[("Anziani" === soggetto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"Anziani" === soggetto ? ss.labelselected : ss.unselected} mode="outlined">Anziani</Button>
                    <Button onPress={() => {setsoggetto("Invalidi");}} style={[("Invalidi" === soggetto ? ss.selected : ss.unselected),ss.w50]} labelStyle={"Invalidi" === soggetto ? ss.labelselected : ss.unselected}   mode="outlined">Invalidi</Button>
                  </View>
                  <View style={ss.mt10}>
                    {
                      opzioniaei=="Compagnia" ?
                        <Text>Indica a Hugò dove recarsi</Text>
                      :
                        <Text>Partenza</Text>
                    }
                    <TextInput
                      mode='outlined'
                      style={[ss.w100]}
                      label="Via di partenza e numero civico"
                      onChangeText={(viapartenza) => {
                        setviapartenza(viapartenza);
                        setduratatotale("");
                        setcostototale(0);
                      }}
                      value={viapartenza ?? ""}
                    />
                  </View>
                  <View>
                    <TextInput
                      mode='outlined'
                      style={[ss.w100]}
                      label="Citta di partenza"
                      onChangeText={(cittapartenza) => {
                        setcittapartenza(cittapartenza);  
                        setduratatotale("");
                        setcostototale(0);
                      }}
                      value={cittapartenza ?? ""}
                    />
                  </View>
                  <View>
                    <Button 
                      icon="map-marker"
                      onPress={
                        async () => {
                          let { status } = await Location.requestForegroundPermissionsAsync();
                          if (status !== 'granted') {
                            setErrorMsg('Permission to access location was denied');
                            return;
                          }
                          let location = await Location.getCurrentPositionAsync({});
                          let place = await Location.reverseGeocodeAsync({
                            latitude : location.coords.latitude,
                            longitude : location.coords.longitude
                          });
                          setviapartenza(place[0].street+" "+place[0].streetNumber);
                          setcittapartenza(place[0].city);
                        }
                      } 
                    >Geolocalizzati</Button>
                  </View>
                </Surface>
                
                {
                  opzioniaei==="Compagnia" ? null
                  : opzioniaei==="Spesa e commissioni" ?
                    <>
                      <View>
                        <Text>Il servizio sarà effettuato nel tuo stesso quartiere:</Text>
                        <View style={[{ flexDirection: 'row'},ss.centro,ss.w100]}>
                          <Button onPress={() => {setchecksottocasa(true);}} style={[(checksottocasa ? ss.selected : ss.unselected),ss.w50]} labelStyle={checksottocasa ? ss.labelselected : ss.unselected} mode="outlined">Si</Button>
                          <Button onPress={() => {setchecksottocasa(false);}} style={[(!checksottocasa ? ss.selected : ss.unselected),ss.w50]} labelStyle={!checksottocasa ? ss.labelselected : ss.unselected}   mode="outlined">No</Button>
                        </View>
                      </View>
                      {
                        checksottocasa ? null
                        : 
                          <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                            <Text>Destinazione</Text>
                            <View>
                              <TextInput
                                mode='outlined'
                                style={[ss.w100,ss.mt15]}
                                label="Via di destinazione e numero civico"
                                onChangeText={(viadestinazione) => {
                                  setviadestinazione(viadestinazione);
                                  setduratatotale("");
                                  setcostototale(0);
                                }}
                                value={viadestinazione ?? ""}
                              />
                            </View>
                            <View>
                              <TextInput
                                mode='outlined'
                                style={[ss.w100,ss.mt15]}
                                label="Citta di destinazione"
                                onChangeText={(cittadestinazione) => {
                                  setcittadestinazione(cittadestinazione);
                                  setduratatotale("");
                                  setcostototale(0);
                                }}
                                value={cittadestinazione ?? ""}
                              />
                            </View>
                          </Surface>                     
                      }
                    </>
                  : 
                    <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                      <Text>Destinazione</Text>
                      <View>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100,ss.mt15]}
                          label="Via di destinazione e numero civico"
                          onChangeText={(viadestinazione) => {
                            setviadestinazione(viadestinazione);
                            setduratatotale("");
                            setcostototale(0);
                          }}
                          value={viadestinazione ?? ""}
                        />
                      </View>
                      <View>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100,ss.mt15]}
                          label="Citta di destinazione"
                          onChangeText={(cittadestinazione) => {
                            setcittadestinazione(cittadestinazione);
                            setduratatotale("");
                            setcostototale(0);
                          }}
                          value={cittadestinazione ?? ""}
                        />
                      </View>
                    </Surface> 
                }
                 
                                
                <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                  <Text>Quando:</Text>
                  <View style={[{ flexDirection: 'row'},ss.mt15]}>
                      <View style={ss.w50}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100]}
                          label="Ora (hh)"
                          onChangeText={(ora) => {
                            setora(ora)
                          }}
                          value={ora ?? ""}
                        />
                      </View>
                      <View style={ss.w50}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100]}
                          label="Minuti (mm)"
                          onChangeText={(minuti) => {
                            setminuti(minuti)
                          }}
                          value={minuti ?? ""}
                        />
                      </View>
                  </View>
                  <View style={[{ flexDirection: 'row'},ss.mt15]}>
                      <View style={ss.w33}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100]}
                          label="Giorno (dd)"
                          onChangeText={(giorno) => {
                            setgiorno(giorno)
                          }}
                          value={giorno ?? ""}
                        />
                      </View>
                      <View style={ss.w33}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100]}
                          label="Mese (MM)"
                          onChangeText={(mese) => {
                            setmese(mese)
                          }}
                          value={mese ?? ""}
                        />
                      </View>
                      <View style={ss.w33}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100]}
                          label="Anno (YY)"
                          onChangeText={(anno) => {
                            setanno(anno)
                          }}
                          value={anno ?? ""}
                        />
                      </View>
                  </View>
                </Surface>
                <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>       
                  <Text style={[ss.mt10]}>Indica quanti minuti Hugò dovrà stare con tè.</Text> 
                  {/* <Text style={[ss.mt10]}>Se Hugò ti dovrà aspettare, indica per quanti minuti.</Text>  */}
                  <View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (30 === duratasosta ?setduratasosta(0):setduratasosta(30));}} style={[(30 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={30 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">30</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (60 === duratasosta ?setduratasosta(0):setduratasosta(60));}} style={[(60 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={60 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">60</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (90 === duratasosta ?setduratasosta(0):setduratasosta(90));}} style={[(90 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={90 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">90</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (120 === duratasosta ?setduratasosta(0):setduratasosta(120));}} style={[(120 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={120 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">120</Button>
                    </View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (150 === duratasosta ?setduratasosta(0):setduratasosta(150));}} style={[(150 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={150 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">150</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (180 === duratasosta ?setduratasosta(0):setduratasosta(180));}} style={[(180 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={180 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">180</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (210 === duratasosta ?setduratasosta(0):setduratasosta(210));}} style={[(210 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={210 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">210</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (240 === duratasosta ?setduratasosta(0):setduratasosta(240));}} style={[(240 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={240 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">240</Button>
                    </View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (360 === duratasosta ?setduratasosta(0):setduratasosta(360));}} style={[(360 === duratasosta ? ss.selected : ss.unselected),ss.w50]} labelStyle={360 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">6 Ore</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (480 === duratasosta ?setduratasosta(0):setduratasosta(480));}} style={[(480 === duratasosta ? ss.selected : ss.unselected),ss.w50]} labelStyle={480 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">8 ore</Button>
                    </View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (600 === duratasosta ?setduratasosta(0):setduratasosta(600));}} style={[(600 === duratasosta ? ss.selected : ss.unselected),ss.w50]} labelStyle={600 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">10 ore</Button>
                        <Button onPress={() => {setduratatotale("no");setcostototale(0); (720 === duratasosta ?setduratasosta(0):setduratasosta(720));}} style={[(720 === duratasosta ? ss.selected : ss.unselected),ss.w50]} labelStyle={720 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">12 ore</Button>
                    </View>
                  </View>
                  {
                    opzioniaei==="Accompagnamento" ? 
                      <View style={{ flexDirection: 'row'}}>
                        <TextInput
                          mode='outlined'
                          style={[ss.w100,ss.mt15]}
                          label="Passeggeri"
                          onChangeText={(passeggeri) => {
                            setpasseggeri(passeggeri)
                          }}
                          value={passeggeri ?? ""}
                        />
                      </View>
                    :null
                  }
                  <TextInput
                    multiline = {true}
                    numberOfLines = {4}
                    mode='outlined'
                    style={[ss.w100,ss.mt15]}
                    label="Note"
                    onChangeText={(note) => {
                      setnote(note)
                    }}
                    value={note ?? ""}
                  />
                </Surface>
                <Button mode="outlined" onPress={getCosto} style={[ss.w100,ss.mt15]}>Calcola il costo</Button>
                {
                  costototale>0 && duratatotale!="" ?
                    <>
                      <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={ss.h2}>Totale: </Text>
                        <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>{costototale.toFixed(2)}</Text>
                        <Text style={ss.h2}> €</Text>
                      </Surface>
                      <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={ss.h2}>Durata: {duratatotale}</Text>
                      </Surface>
                      <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={ss.gra}>*Assicurati di aver inserito l'indirizzo corretto specificando il comune di destinazione. </Text>
                      </Surface>
                      <Button  color={accent1}
                        //color="#00a1ae" 
                        onPress={async ()=>{
                          let idutente= await getData("@Id_User");
                          let richiestasaldo={
                            "Operazione":'richiestaSaldo',
                            "iduser":idutente,
                          }
                          let json_res = await richiesta(richiestasaldo);
                          setSaldo(json_res.altro.Saldo);
                          showDialog5();
                        }}  
                        mode="contained"  style={[ss.w100,ss.mt15]}>Metodo di pagamento *</Button>
                      <Button mode="contained"  onPress={invioRichiesta}  style={[ss.w100,ss.mt15]}>Acquista</Button>    
                    </>
                  :
                    <>
                      {
                        duratatotale!="no" ?
                          <Surface style={[ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                            <Text style={ss.h2}>Non siamo riusciti a calcolare la distanza. Verifica che via e città inseriti siano corretti e riprova.</Text>
                            <Button mode="contained" onPress={()=>{Linking.openURL("https://wa.me/+393333256236");}} style={[ss.w100,ss.mt15]}>Altrimenti contattaci</Button>    
                          </Surface>
                        : null
                      }
                    </>
                }
                <Button icon='arrow-left' 
                  onPress={async () => {
                    let idutente= await getData("@Id_User");
                    let nom= await getData("@Nominativo");
                    navigation.navigate('Hugo',{Id_Utente: idutente,Nominativo:nom});
                  }}
                  style={[ss.w100,ss.mt15]}>Oppure torna indietro</Button>
              </Surface>
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
                        <RadioMetodo id="1" etichetta="Contanti o POS alla consegna con preautorizzazione" info="La preautorizzazione è una somma momentaneamente sospesa sulla tua carta (non è l'addebito finale). Dopo aver pagato l'ordine alla consegna la preautorizzazione sarà cancellata e rimborsata in automatico." />
                      : null
                    }
                    {
                      listametodi.includes("Saldo") && saldo>costototale ?
                        <RadioMetodo id="2" etichetta="Saldo" info="L'importo verra detratto dal tuo saldo cliente. Vai nel profilo per ricaricarlo." />
                      : null 
                    }
                    {
                      listametodi.includes("AcquistoDiretto") ?
                        <RadioMetodo id="3" etichetta="Pagamento alla consegna in contanti o POS" info="Il pagamento sarà effettuato al completamento del servizio." />
                      : null 
                    }
                  </RadioButton.Group>
                  {
                    saldo>=costototale ?
                      <Surface style={[{ flexDirection: 'row',alignItems:'center'},ss.surface2,ss.mt15,ss.w100,ss.textcentro]} elevation={4}>
                        <Text style={ss.h2}>Il tuo saldo è: </Text>
                        <Text style={[{ fontWeight: 'bold' }, ss.hextra]}>
                          {saldo}
                          {/* {saldo.toFixed(2)} */}
                        </Text>
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
            <Dialog visible={visibleinfo} onDismiss={()=>{setvisibleinfo(false)}}>
              <Dialog.Title>Info</Dialog.Title>
              <Dialog.Content>
                <Text>
                  {testoinfo}
                </Text>
                <Button color="#00a1ae" onPress={async () => {navigation.navigate('SpecchiettoCosti');}}  mode="contained"  style={[ss.w100,ss.my10]}>Tutte le tariffe</Button>
                <Button onPress={()=>{setvisibleinfo(false)}}>Chiudi</Button>
              </Dialog.Content>
            </Dialog>
          </Portal>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    );
}