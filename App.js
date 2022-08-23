import { Text,  View, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView,Platform, ActivityIndicator, BackHandler } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styles from './struttura/style.js';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { WebView } from 'react-native-webview';
import { TextInput,Switch,Surface, RadioButton, IconButton , MD3Colors } from 'react-native-paper';

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
                  <CollegamentoWeb url={"https://ristostore.it/Recupero_Password_RistoGo"} desc={"Oppure recupera dati di accesso"} stili={[styles.mt15]} stilitesto={[styles.textcentro]} />
                </View>
              }
              
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
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: '#00a1ae' }}>Hugo</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
