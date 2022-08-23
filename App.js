import {  View, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView,Platform, ActivityIndicator, BackHandler } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './struttura/style.js';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import { TextInput,Switch,Surface, RadioButton, IconButton , MD3Colors, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox} from 'react-native-paper';





const Tab = createBottomTabNavigator();
var connesso=false;

async function getData(key){
  let value = await AsyncStorage.getItem(key);
  return value;
}

async function getLocal(navigation) {
  let Id_User = await getData('@Id_User');
  connesso=false;
};
function CollegamentoWeb({desc,url, stili=[], stilitesto=[]}) {
  return(
    <TouchableOpacity onPress={()=>{Linking.openURL(url)}} style={[stili]}>
      <Text style={[{ fontSize: 16,color:'#1a0dab' }, stilitesto]}>{desc}</Text>
    </TouchableOpacity>
  );
}

function Accesso({ navigation }) {
  const [user, setuser] = useState('');
  const [pwd, setpwd] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  var Value = user;
  var secret_Value = pwd;

  const [checkconnesso, setconnesso] = useState(connesso);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[{maxHeight:720, minWidth:300, width:"90%"}, styles.divinterno1]}>
            <View style={[{width:"100%"},styles.w100]}>
              <View style={{minHeight:70}}>
                <Image source={require('./assets/logoorizzontale.jpg')}  style={[styles.img]}/>
              </View>
              {

              checkconnesso ?
                <View>
                  <Text style={[{textAlign: 'center'},styles.h3,styles.mt15]}>Scollegati per effettuare un altro accesso</Text>
                  <TouchableOpacity
                    onPress={async ()=>{
                      try {
                        let Id_User = await getData('@Id_User');
                        richiesta({
                          "Tipo":'LogOut',
                          "Id_User":Id_User,
                        },'Accesso')
                        .then((json) => {console.log('json', json)});
                        await AsyncStorage.clear().then(()=>{
                          connesso=false;
                          setconnesso(connesso);
                          setuser("");
                          setpwd("");
                        });
                        alert("Logout effettuato");
                      } catch(e) {
                        // remove error
                      }
                    }}
                    style={[{ backgroundColor: 'lightgrey' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
                    <Text style={{ fontSize: 16,color:'#116699' }}>Logout</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={async ()=>{
                      navigation.navigate('Hugo');
                    }}
                    style={[{ backgroundColor: '#00a1ae'  }, styles.p10, styles.w100, styles.centro]}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Torna indietro</Text>
                  </TouchableOpacity>
                </View>
              :
                <View>
                  <Text style={[{textAlign: 'center'},styles.h3,styles.mt15]}>Effettua l'accesso:</Text>
                  <Text style={styles.mt15}>Utente:</Text>
                  <TextInput
                    style={[styles.input1,styles.w100]}
                    textAlign={'center'}
                    onChangeText={(Value) => {
                      setuser(Value)
                    }}
                    value={Value ?? ""}
                  />
                  <Text style={styles.mt15}>Password:</Text>
                  <TextInput
                    style={[styles.input1,styles.w100]}
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
                          navigation.navigate('Hugo');
                        } else {
                          alert("Login non riuscito. Assicurati che i campi Utente, Password e Tipologia siano corretti.");
                        }
                      }
                    }
                    style={[{ backgroundColor: '#00a1ae' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
                    <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
                  </TouchableOpacity>
                  <Divider />
                  <CollegamentoWeb url={"https://ristostore.it/Recupero_Password_RistoGo"} desc={"Oppure recupera dati di accesso"} stili={[styles.mt15]} stilitesto={[styles.textcentro]} />
                </View>
              }
              <Divider />
              <Text style={[{ fontSize: 16, textAlign: 'center' }, styles.mt15]}>Clicca per ottenere i dati d'accesso e utilizzare il servizio di consegna RistoGo:</Text>
              <TouchableOpacity
                onPress={()=>{Linking.openURL("https://ristostore.it/Come_Accedere_RistoGo")}}
                style={[{ borderColor: '#00a1ae', borderWidth: 2,borderRadius: 4, marginTop:5}, styles.p5, styles.w100, styles.centro]}>
                    <Text style={{ fontSize: 20, color: '#00a1ae' }}>Cliccka</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Hugo({ navigation }) {
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

  // const [checked, setChecked] = React.useState(0);
  const [indirizzo, setIndirizzo] = useState(0);
  const [servizio, setServizio] = useState(0);
  const [note, setNote] = useState("");
  const [note2, setNote2] = useState("");
  const [chiamami, setChiamami] = useState(false);
  const [sostiuisci, setSostiuisci] = useState(false);
  const [spesamax, setSpesamax] = useState(0);

  return (
    <Provider>
      <SafeAreaView style={styles.safeareaview}>
        <ScrollView>
          <View style={styles.container}>
            <Surface style={[styles.surface1,styles.mb15,styles.centro]} elevation={4}>
              <Text style={styles.h1}>Ue' Mario Ciao!</Text>
              <Text style={styles.h2}>Cosa posso portarti oggi?</Text>
              <Text style={styles.h2}>Dove posso accompagnarti?</Text>
              <Text style={[styles.h2,styles.centro]}>Per piacere inserisci più dettagli possibili:</Text>
              <Text style={styles.h2}>mi faciliteresti il compito.</Text>
            </Surface>
            <Button onPress={showDialog}  mode="contained"  style={[styles.w100]}>Cosa fa Hugò?</Button>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Cosa fa Hugò?</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Hugò è il tuo personal shopper può ritirare acquistare e consegnare qualsiasi cosa. Può accompagnarti dove tu vorrai (in città) e se devi spostarti fuori città Hugò è anche un servizio taxi con conducente (NCC).Inserisci nelle note dove vuoi andare, numero di passeggeri, data e ora di partenza. Cliccka l'ora in cui vuoi essere chiamato, ti richiameremo per un preventivo immediato. </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>    
            <Button onPress={showDialog2}  mode="contained"  style={[styles.w100,styles.mt15]}>Scegli indirizzo</Button>
            <Portal>
              <Dialog visible={visible2} onDismiss={hideDialog2}>
                <Dialog.Title>Scegli indirizzo</Dialog.Title>
                <Dialog.Content>
                  <RadioButton.Group onValueChange={indirizzo => setIndirizzo(indirizzo)} value={indirizzo}>
                    <RadioButton.Item label="Via Roma 31" value="0" />
                    <RadioButton.Item label="Via Atenea 2" value="1" />
                  </RadioButton.Group>
                  <Button  mode="outlined"  style={[styles.w100]}>Nuovo indirizzo</Button>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog2}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>    
            <Surface style={[styles.surface1,styles.mt15]} elevation={4}>
              <Text style={[styles.h1,styles.mt15]}>Scegli un servizio:</Text>
              <View style={styles.mt15}>
                <RadioButton.Group onValueChange={servizio => setServizio(servizio)} value={servizio}>
                  <RadioButton.Item style={[styles.bordomare, styles.mb5]} label="Ritiri e acquisti supermercati esclusi 4,99€" value="0" />
                  <RadioButton.Item style={[styles.bordomare, styles.mb5]} label="Acquisti supermercati da 4,99 a 7,99€ (7,99 consegna veloce  4,99dopo 4 ore)" value="1" />
                  <RadioButton.Item style={[styles.bordomare, styles.mb5]} label="Hugo ti accompagna 11,99€" value="2" />
                  <RadioButton.Item style={styles.bordomare} label="Servizio Taxi con conducente NCC su richiesta" value="3" />
                </RadioButton.Group>
              </View>
            </Surface>
            <Button onPress={showDialog3}  mode="contained"  style={[styles.w100,styles.mt15]}>Note</Button>
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
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog3}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal> 
            <Button onPress={showDialog4}  mode="contained"  style={[styles.w100,styles.mt15]}>Dove acquistare</Button>
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
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog4}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal> 
            <Surface style={[styles.surface1,styles.mt15,styles.w100]} elevation={4}>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>Chiamami</Text>
                <Checkbox
                  status={chiamami ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChiamami(!chiamami);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Sostituisci prodotti</Text>
                <Checkbox
                  status={sostiuisci ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setSostiuisci(!sostiuisci);
                  }}
                />
              </View>
              <View  style={[styles.p3,styles.w100]}>
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
                  />
                </View>
              </View>
              <View  style={[styles.p3,styles.w100]}>
                <Divider />
              </View>
              <View  style={[styles.mt15,styles.w100,styles.centro]}>
                <Text>Mancia</Text> 
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Button  mode="outlined">1€</Button>
                  <Button  mode="outlined">2€</Button>
                  <Button  mode="outlined">5€</Button>
                  <Button  mode="outlined">10€</Button>
                </View>
              </View>

            </Surface>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

function Registrati({ navigation, route }) {
  let indirizzo='https://ristostore.it/Hugo/registrati';

  useEffect(() => {
    const backAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeareaview}>
      <WebView style={styles.container} source={{ uri: indirizzo }} incognito={true} cacheEnabled={false} />
        <TouchableOpacity
          onPress={() => {navigation.navigate('Accesso');}}
          style={[{ backgroundColor: 'lightgrey' }, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 16,color:'#116699' }}>Logout</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false, tabBarStyle: {display: 'none'}}}>
        <Tab.Screen name="Accesso" component={Accesso} />
        <Tab.Screen name="Registrati" component={Registrati} />
        <Tab.Screen name="Hugo" component={Hugo}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
