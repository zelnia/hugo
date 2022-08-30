import {  View, TouchableOpacity, Image, SafeAreaView, ScrollView,Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import { TextInput, Button, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componenti custom
import {ss} from './struttura/style.js';
import {CollegamentoWeb,richiesta,getLocal,getData} from './struttura/Utils.js';
import Profilo from './Pagine/Profilo.js';
import History from './Pagine/History.js';
import Registrazione from './Pagine/Registrazione.js';
import Hugo from './Pagine/Hugo.js';



const Tab = createBottomTabNavigator();
const numeroversione=10001; //parametro aggiornamento
var connesso=false;

function Accesso({ navigation }) {
  const [user, setuser] = useState('');
  const [pwd, setpwd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  var Value = user;
  var secret_Value = pwd;


  useEffect(() => {
    async function iniz(){
      var dati = await getLocal();
      setconnesso(dati.connesso);
      if(dati.connesso==true){
        navigation.navigate('Hugo', {
          Id_Utente:dati.Id_User
        });
      }
    }
    iniz();
  }, []);

  const [checkconnesso, setconnesso] = useState(connesso);

  return (
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
                        .then((json) => {console.log('json', json)});
                        await AsyncStorage.clear().then(()=>{
                          connesso=false;
                          setconnesso(connesso);
                          setuser("");
                          setpwd("");
                          alert("Logout effettuato");
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
                      navigation.navigate('Hugo');
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
                              connesso=true;
                              setconnesso(connesso);
                              try {
                                AsyncStorage.setItem('@Id_User', Id_User);
                              } catch (e) {
                                console.log(e);
                              }
                              navigation.navigate('Hugo', {
                                Id_Utente: Id_User
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
                  <Button onPress={async () => {navigation.navigate('Registrazione');}}  mode="contained"  style={[ss.w100, ss.mt15]}>Oppure Registrati</Button>
                </View>
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
        <Tab.Screen name="Accesso" component={Accesso} />
        <Tab.Screen name="Registrazione" component={Registrazione} />
        <Tab.Screen name="Hugo" component={Hugo}/>
        <Tab.Screen name="Profilo" component={Profilo}/>
        <Tab.Screen name="History" component={History}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
