import {  View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componenti custom
import {ss} from '../struttura/style.js';
import {CollegamentoWeb,elaboraore,richiesta,getLocal,getData} from '../struttura/Utils.js';
import Footer from '../struttura/Footer.js';
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Hugo({ navigation }) {
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

  // const [checked, setChecked] = React.useState(0);
  const [indirizzo, setIndirizzo] = useState(0);
  const [servizio, setServizio] = useState(0);
  const [metodo_pagamento, setMetodo_Pagamento] = useState(0);
  const [note, setNote] = useState("");
  const [note2, setNote2] = useState("");
  const [cosa, setCosa] = useState("");
  const [mancia, setMancia] = useState("no");
  const [chiamami, setChiamami] = useState(false);
  const [sostiuisci, setSostiuisci] = useState(false);
  const [spesamax, setSpesamax] = useState(0);

  const [dispo, setDispo] = useState('');

  function aggiornaPagina(json){
    if(typeof(json?.dati?.ore)!="undefined") {
      setDispo(elaboraore(json.dati.ore));
    }
  }
  useEffect(() => {
    async function fetchData() {
      let Id_User = await getData('@Id_User');
      let json_res = await richiesta({
        "Operazione":'AggiornaHugo',
        "iduser":Id_User,
      },'apiHugo');
      aggiornaPagina(json_res);
    }
    fetchData();
  }, []);

  const MINUTE_MS = 10000;
  useEffect(() => {
    const intervalloritiri = setInterval(async () => {
      let Id_User = await getData('@Id_User');
      let json_res = await richiesta({
        "Operazione":'AggiornaHugo',
        "iduser":Id_User,
      },'apiHugo');
      aggiornaPagina(json_res);
    }, MINUTE_MS);
    return () => clearInterval(intervalloritiri); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  
  var oggi = new Date();
  var deltaminuti=25;
  var adessocondelta = new Date(oggi.getTime() + deltaminuti*60000);
  oggi.setHours( oggi.getHours() + 2 );


  return (
    <Provider>
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Surface style={[ss.surface1,ss.mb15,ss.centro,ss.w100]} elevation={4}>
              <Text style={ss.h1}>Ue' Mario Ciao!</Text>
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
                  <RadioButton.Group onValueChange={indirizzo => setIndirizzo(indirizzo)} value={indirizzo}>
                    <RadioButton.Item label="Via Roma 31" value="0" />
                    <RadioButton.Item label="Via Atenea 2" value="1" />
                  </RadioButton.Group>
                  <Button  mode="outlined"  style={[ss.w100]}>Nuovo indirizzo</Button>
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog2}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>    
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              <Text style={[ss.h1,ss.mt15]}>Scegli un servizio:</Text>
              <View style={ss.mt15}>
                <RadioButton.Group onValueChange={servizio => setServizio(servizio)} value={servizio}>
                  <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Ritiri e acquisti supermercati esclusi 4,99€" value="0" />
                  <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Acquisti supermercati da 4,99 a 7,99€ (7,99 consegna veloce  4,99 dopo 4 ore)" value="1" />
                  <RadioButton.Item style={[ss.bordomare, ss.mb5]} label="Hugo ti accompagna 11,99€" value="2" />
                  <RadioButton.Item style={ss.bordomare} label="Servizio Taxi con conducente NCC su richiesta" value="3" />
                </RadioButton.Group>
              </View>
            </Surface>
            <Surface style={[ss.surface1,ss.mt15, ss.w100]} elevation={4}>
              {/* <Text style={[styles.h1,styles.mt15]}>Indica cosa acquistare:</Text> */}
                <TextInput
                  multiline = {true}
                  numberOfLines = {6}
                  label="Indica cosa acquistare:"
                  mode='outlined'
                  value={cosa}
                  onChangeText={cosa => setCosa(cosa)}
                />
            </Surface>
            
            <Button onPress={showDialog4}  mode="contained"  style={[ss.w100,ss.mt15]}>Dove acquistare</Button>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width:"40%", flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{ fontWeight: 'bold' }}>Chiamami</Text>
                  <Checkbox
                    status={chiamami ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChiamami(!chiamami);
                    }}
                  />
                </View>
                <View style={{ width:"60%", flexDirection: 'row', alignItems: 'center', justifyContent: "flex-end"}}>
                  <Text>Sostituisci prodotti</Text>
                  <Checkbox
                    status={sostiuisci ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setSostiuisci(!sostiuisci);
                    }}
                  />
                </View>
              </View>
              <View  style={[ss.p3,ss.w100]}>
                <Divider />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width:"60%"}}>
                  <Text style={{ fontWeight: 'bold' }}>Spesa massima</Text> 
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
              <View style={[{ flexDirection: 'row' },ss.centro]}>
                <Text style={ss.w20}>Mancia</Text> 
                <Button onPress={() => {1 === mancia ? setMancia("no"): setMancia(1);}} style={[(1 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={1 === mancia ? ss.labelselected : ss.unselected} mode="outlined">1€</Button>
                <Button  onPress={() => {2 === mancia ? setMancia("no"): setMancia(2);}} style={[(2 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={2 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">2€</Button>
                <Button onPress={() => {5 === mancia ? setMancia("no"): setMancia(5);}} style={[(5 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={5 === mancia ? ss.labelselected : ss.unselected}   mode="outlined">5€</Button>
                <Button onPress={() => {10 === mancia ? setMancia("no"): setMancia(10);}}  style={[(10 === mancia ? ss.selected : ss.unselected),ss.w20]} labelStyle={10 === mancia ? ss.labelselected : ss.unselected}  mode="outlined">10€</Button>
              </View>
            </Surface>

                
            <Surface style={[ss.surface1,ss.mt15,ss.w100]} elevation={4}>
              {
                (typeof(dispo)!="undefined" && dispo.length) ?
                  <View>
                    <Text style={{ fontSize: 20 }}>Scegli un orario:</Text>
                    <View style={ss.mt15}>
                      {
                        dispo.map((Ora, index) => (
                          <View style={[{ flexDirection: 'row', justifyContent:'flex-end' }]} key={index}>
                            {
                              Ora[1].map((Ora2, index2) => (
                                ((adessocondelta.getTime() < Date.parse(oggi.getDate()+' '+monthNames[oggi.getMonth()]+' '+oggi.getFullYear()+' '+Ora2+':00')) && Ora2!="No") ?
                                  <TouchableOpacity
                                    key={index+"-"+index2}
                                    onPress={
                                      async () => {
                                        // onPressORARIO(Ora2);
                                      }
                                    }
                                    style={[{ backgroundColor: 'lightgrey', width:'25%' }, ss.p10, ss.centro,ss.bordogrigio]}
                                  >
                                    <Text style={{ fontSize: 18 }}>{Ora2}</Text>
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
                  (dispo=="") ?
                    <View><Text style={{ fontSize: 20 }}>In caricamento...</Text></View>
                  :
                    <View><Text style={{ fontSize: 20 }}>Nessuna disponibilita</Text></View>
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
            <TouchableOpacity
              onPress={
                () => {
                }
              }
              style={[{ backgroundColor: '#00a1ae' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
              <Text style={{ fontSize: 20, color: '#fff' }}>INVIA</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </Provider>
  );
}