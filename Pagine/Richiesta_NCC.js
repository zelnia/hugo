import {ss} from '../struttura/style.js';
import {useNavigation} from '@react-navigation/native';
import Footer from '../struttura/Footer.js';
import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import { TextInput,Surface, RadioButton,Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'
import {richiesta,getData} from '../struttura/Utils.js';
import * as Linking from 'expo-linking';
export default function Richiesta_NCC({ navigation, route }) {

  const [viapartenza, setviapartenza] = useState('');
  const [viadestinazione, setviadestinazione] = useState('');
  const [cittapartenza, setcittapartenza] = useState('');
  const [cittadestinazione, setcittadestinazione] = useState('');
  // const [indirizzodestinazione, setindirizzodestinazione] = useState('');

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
    let riciestaCostoNCC={
      "Operazione":'getCostoNCC',
      "Partenza":viapartenza+", "+cittapartenza,
      "Destinazione":viadestinazione+", "+cittadestinazione,
      "Sosta":duratasosta,
    }
    let jcosto = await richiesta(riciestaCostoNCC);
    console.log('jcosto.risposta', jcosto.risposta);
    if(jcosto.risposta!="Indirizzo_non_trovato" && jcosto.risposta!="Operazione_non_riuscita"){
      let duratabase=Math.ceil(parseFloat(jcosto.risposta.Durata)/60+duratasosta);
      if(duratabase<=59){
        setduratatotale(duratabase+" minuti");
      }else if(59<duratabase && duratabase<120){
        let restominuti=duratabase%60;
        setduratatotale("Un ora e "+restominuti+" minuti");
      } else if(120<=duratabase){
        let numeroore=Math.trunc(duratabase/60);
        let restominuti=duratabase%60;
        setduratatotale(numeroore+" ore e "+restominuti+" minuti");
      }
      setcostototale(parseFloat(jcosto.risposta.Totale));
    } else {
      setduratatotale("");
      setcostototale(0);
    }
  }
  async function invioRichiesta() {
    let checkgo=true;
    let riciestaRichiesta={
      "Operazione":'riciestaRichiesta',
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
    }
    let messaggioerrore="Per favore compila i seguenti campi:";
    if(viapartenza==""){messaggioerrore+=" 'Via di partenza'";checkgo=false;}
    if(cittapartenza==""){messaggioerrore+=" 'Città di partenza'";checkgo=false;}
    if(viadestinazione==""){messaggioerrore+=" 'Via di destinazione'";checkgo=false;}
    if(cittadestinazione==""){messaggioerrore+=" 'Città di destinazione'";checkgo=false;}

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
    if(mese!=""){
      let mese_fixed=parseInt(mese.replace(/[^0-9]/g, ''));
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
      let anno_fixed=parseInt(anno.replace(/[^0-9]/g, ''));
      if(isNaN(anno_fixed) || anno_fixed=="" || (anno_fixed<22 || anno_fixed>25)){
        return alert ("Per favore compila l'anno di partenza indicandolo nel formato a 2 cifre. Ad esempio 23 per indicare il 2023.");
      }
    }

    if(ora==""){messaggioerrore+=" 'Ora'";checkgo=false;}
    if(minuti==""){messaggioerrore+=" 'Minuti'";checkgo=false;}
    if(giorno==""){messaggioerrore+=" 'Giorno'";checkgo=false;}
    if(mese==""){messaggioerrore+=" 'Mese'";checkgo=false;}
    if(anno==""){messaggioerrore+=" 'Anno'";checkgo=false;}
    if(checkgo){
      let jriciestaRichiesta = await richiesta(riciestaRichiesta);
      if(jriciestaRichiesta){
        alert("Richiesta inviata correttamente!");
        try {
          let idutente= await getData("@Id_User");
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
    } else {
      alert(messaggioerrore);
    }
  }

    return (
      <Provider>
        <SafeAreaView style={ss.safeareaview}>
          <ScrollView>
            <View style={ss.container}>
              <Text  style={ss.h1}>Richiesta noleggio con conducente</Text>
              <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                  <View>
                    <Text>Partenza</Text>
                    <TextInput
                      mode='outlined'
                      style={[ss.w100]}
                      label="Via di partenza"
                      onChangeText={(viapartenza) => {
                        setviapartenza(viapartenza)
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
                        setcittapartenza(cittapartenza)
                      }}
                      value={cittapartenza ?? ""}
                    />
                  </View>
                </Surface>
                
                <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                  <Text>Destinazione</Text>
                  <View>
                    <TextInput
                      mode='outlined'
                      style={[ss.w100,ss.mt15]}
                      label="Via di destinazione"
                      onChangeText={(viadestinazione) => {
                        setviadestinazione(viadestinazione)
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
                        setcittadestinazione(cittadestinazione)
                      }}
                      value={cittadestinazione ?? ""}
                    />
                  </View>
                </Surface>  
                                
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
                      {/* <View style={[{ paddingTop: 5},ss.w50]}>
                        <View style={[ss.w90]}>
                          <SelectDropdown
                            data={mesi}
                            onSelect={(selectedItem, index) => {
                              setmeseSelected(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                              return item
                            }}
                          />
                        </View>
                      </View> */}
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
                  {/* <Text>Altre opzioni</Text> */}
                  {/* <TextInput
                    mode='outlined'
                    style={[ss.w100,ss.mt15]}
                    label="Tipo di spostamento"
                    onChangeText={(tipospostamento) => {
                      settipospostamento(tipospostamento)
                    }}
                    value={tipospostamento ?? ""}
                  /> */}
                  
                  <Text style={[ss.mt10]}>Se Hugò ti dovrà aspettare, indica per quanti minuti.</Text> 
                  <View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {(30 === duratasosta ?setduratasosta(0):setduratasosta(30));}} style={[(30 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={30 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">30</Button>
                        <Button onPress={() => {(60 === duratasosta ?setduratasosta(0):setduratasosta(60));}} style={[(60 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={60 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">60</Button>
                        <Button onPress={() => {(90 === duratasosta ?setduratasosta(0):setduratasosta(90));}} style={[(90 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={90 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">90</Button>
                        <Button onPress={() => {(120 === duratasosta ?setduratasosta(0):setduratasosta(120));}} style={[(120 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={120 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">120</Button>
                    </View>
                    <View style={[{ flexDirection: 'row' },ss.centro,ss.w100]}>
                        <Button onPress={() => {(150 === duratasosta ?setduratasosta(0):setduratasosta(150));}} style={[(150 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={150 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">150</Button>
                        <Button onPress={() => {(180 === duratasosta ?setduratasosta(0):setduratasosta(180));}} style={[(180 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={180 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">180</Button>
                        <Button onPress={() => {(210 === duratasosta ?setduratasosta(0):setduratasosta(210));}} style={[(210 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={210 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">210</Button>
                        <Button onPress={() => {(240 === duratasosta ?setduratasosta(0):setduratasosta(240));}} style={[(240 === duratasosta ? ss.selected : ss.unselected),ss.w25]} labelStyle={240 === duratasosta ? ss.labelselected : ss.unselected} mode="outlined">240</Button>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row'}}>
                    {/* <TextInput
                      mode='outlined'
                      style={[ss.w50,ss.mt15]}
                      label="Durata attesa"
                      onChangeText={(durataattesa) => {
                        setdurataattesa(durataattesa)
                      }}
                      value={durataattesa ?? ""}
                    /> */}
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
          </ScrollView>
        </SafeAreaView>
      </Provider>
    );
}