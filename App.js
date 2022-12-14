import {  View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { WebView } from 'react-native-webview';
import { TextInput, Button, Text,Paragraph,Portal, Dialog,Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';

//Componenti custom
import {ss} from './struttura/style.js';
import {CosafaInterno} from './struttura/Altre_Componenti.js';
import {richiesta,getLocal,getData} from './struttura/Utils.js';
import Profilo from './Pagine/Profilo.js';
import History from './Pagine/History.js';
import Archivio from './Pagine/Archivio.js';
import Preautorizzazione from './Pagine/Preautorizzazione.js';
import Registrazione from './Pagine/Registrazione.js';
import Richiesta_NCC from './Pagine/Richiesta_NCC.js';
import Richiesta_AEI from './Pagine/Richiesta_AEI.js';
import Richiesta_Dog from './Pagine/Richiesta_Dog.js';
import Hugo from './Pagine/Hugo.js';
import LogOut from './Pagine/LogOut.js';
import LogIn from './Pagine/LogIn.js';
import RicaricaSaldo from './Pagine/RicaricaSaldo.js';
import SpecchiettoCosti from './Pagine/SpecchiettoCosti.js';
import Recuperapassword from './Pagine/Recuperapassword.js';



const Tab = createBottomTabNavigator();
var connesso=false;

function Accesso({ navigation }) {
  const [user, setuser] = useState('');
  const [pwd, setpwd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  var Value = user;
  var secret_Value = pwd;

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    async function iniz(){
      var dati = await getLocal();
      setconnesso(dati.connesso);
      if(dati.connesso==true){
        navigation.navigate('Hugo', {
          Id_Utente:dati.Id_User,
          Nominativo:dati.Nominativo    
        });
      } else {
        var Prima_Connessione = await getData("@Prima_Connessione");
        if(Prima_Connessione==null){
          showDialog();
          AsyncStorage.setItem('@Prima_Connessione', "fatta");
        }
      }
    }
    iniz();
  }, [visible]);

  const [checkconnesso, setconnesso] = useState(connesso);



  return (
    <Provider>
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <View style={[{maxHeight:720, minWidth:300, width:"90%"}, ss.divinterno1]}>
              <View style={[{width:"100%"},ss.w100]}>
                <View style={{minHeight:70}}>
                  <Image source={require('./assets/logoorizzontale.jpg')}  style={[ss.img]}/>
                </View>
                {

                checkconnesso ?
                  <View>
                    <Text style={[{textAlign: 'center'},ss.h3,ss.mt15]}>Scollegati per effettuare un altro accesso</Text>
                    <TouchableOpacity
                      onPress={async ()=>{
                        try {
                          let Id_User = await getData('@Id_User');
                          richiesta({
                            "Operazione":'LogOut',
                            "Id_User":Id_User,
                          },'apiHugo')
                          .then(async (json) => {
                            await AsyncStorage.clear().then(()=>{
                              connesso=false;
                              setconnesso(connesso);
                              setuser("");
                              setpwd("");
                              alert("Logout effettuato");
                            });
                          });
                        } catch(e) {
                          // remove error
                        }
                      }}
                      style={[{ backgroundColor: 'lightgrey' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
                      <Text style={{ fontSize: 16,color:'#116699' }}>Logout</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={async ()=>{
                        try {
                          let idutente= await getData("@Id_User");
                          let nom= await getData("@Nominativo");
                          navigation.navigate('Hugo',{
                            Id_Utente: idutente,Nominativo:nom
                          });
                        } catch (error) {
                          console.log('error', error);
                        }
                      }}
                      style={[{ backgroundColor: '#00a1ae'  }, ss.p10, ss.w100, ss.centro]}>
                      <Text style={{ fontSize: 20, color: '#fff' }}>Torna indietro</Text>
                    </TouchableOpacity>
                  </View>
                :
                  <View>
                    <Text style={[{textAlign: 'center'},ss.h3,ss.mt15]}>Effettua l'accesso:</Text>
                    <Text style={ss.mt15}>Utente:</Text>
                    <TextInput
                      style={[ss.input1,ss.w100]}
                      textAlign={'center'}
                      onChangeText={(Value) => {
                        setuser(Value)
                      }}
                      value={Value ?? ""}
                    />
                    <Text style={ss.mt15}>Password:</Text>
                    <TextInput
                      style={[ss.input1,ss.w100]}
                      textAlign={'center'}
                      onChangeText={(secret_Value) => {
                        setpwd(secret_Value)
                      }}
                      value={secret_Value ?? ""}

                      secureTextEntry={passwordVisible}
                      right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                    />
                    <TouchableOpacity
                      onPress={
                        () => {
                          if(Value!="" && secret_Value!=""){
                            let datiaccesso={
                              "Operazione":"Accesso",
                              "User":Value,
                              "Pass":secret_Value,
                            }
                            richiesta(datiaccesso,'apiHugo').then((json) => {
                              if(json.ok) {
                                var Id_User=json.dati.Id;
                                var Nominativo=json.dati.Nominativo;
                                connesso=true;
                                setconnesso(connesso);
                                try {
                                  AsyncStorage.setItem('@Id_User', Id_User);
                                  AsyncStorage.setItem('@Nominativo', Nominativo);
                                  AsyncStorage.setItem('@Email', Id_User);
                                } catch (e) {
                                  console.log(e);
                                }
                                navigation.navigate('Hugo', {
                                  Id_Utente: Id_User,Nominativo:Nominativo
                                });
                              } else {
                                alert("Dati errati");
                              }
                            });
                          } else {
                            alert("Login non riuscito. Assicurati che i campi Utente, Password e Tipologia siano corretti.");
                          }
                        }
                      }
                      style={[{ backgroundColor: '#00a1ae' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
                      <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
                    </TouchableOpacity>
                    <Button onPress={async () => {navigation.navigate('Recuperapassword');}}  mode="outlined"  style={[ss.w100, ss.mt15]}>Recupera la password</Button>
                    <Button onPress={async () => {navigation.navigate('Registrazione');}}  mode="contained"  style={[ss.w100]}>Oppure Registrati</Button>
                    <Button icon="phone" color="#00a1ae" onPress={()=>{Linking.openURL("https://wa.me/+393665216365");}}  mode="outlined"  style={[ss.w100]}>Vorresti parlare con Hug??? Clicca per messaggiare con lui!</Button>

                    <View style={[ss.centro,ss.w100,ss.mt15]}>
                      <Button color="#00a1ae" onPress={()=>{Linking.openURL('https://hugopersonalshopper.it/candidatura.html');}}  mode="outlined"  style={[ss.w100]}>Diventa un Hug??</Button>
                    </View>
                  </View>
                }
              </View>
            </View>
            {/* <Cosafa visibilita={visible} /> */}
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Cosa fa Hug???</Dialog.Title>
                <Dialog.Content>
                  <CosafaInterno />
                  {/* <Paragraph style={ss.giustificato}>Hug?? ?? il tuo personal shopper pu?? ritirare acquistare e consegnare qualsiasi cosa (Farmaci, spesa, pasticcini, etc.).</Paragraph> */}
                  {/* <Paragraph style={ss.giustificato}>Pu?? accompagnarti dove tu vorrai (in citt??) e se devi spostarti fuori citt?? Hug?? ?? anche un servizio taxi con conducente (NCC, attivo solo in alcune citt??).</Paragraph> */}
                  <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog}>OK</Button>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
        <Tab.Screen name="Accesso" component={Accesso} />
        <Tab.Screen name="Registrazione" component={Registrazione} />
        <Tab.Screen name="Richiesta NCC" component={Richiesta_NCC} />
        <Tab.Screen name="Hugo" component={Hugo}/>
        <Tab.Screen name="Profilo" component={Profilo}/>
        <Tab.Screen name="History" component={History}/>
        <Tab.Screen name="Archivio" component={Archivio}/>
        <Tab.Screen name="Preautorizzazione" component={Preautorizzazione}/>
        <Tab.Screen name="LogOut" component={LogOut}/>
        <Tab.Screen name="LogIn" component={LogIn}/>
        <Tab.Screen name="RicaricaSaldo" component={RicaricaSaldo}/>
        <Tab.Screen name="Recuperapassword" component={Recuperapassword}/>
        <Tab.Screen name="SpecchiettoCosti" component={SpecchiettoCosti}/>
        <Tab.Screen name="Richiesta dog sitter" component={Richiesta_AEI}/>
        <Tab.Screen name="Richiesta assistenza anziani e invalidi" component={Richiesta_Dog}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
