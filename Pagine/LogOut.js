import {  View, TouchableOpacity, Image, SafeAreaView, ScrollView,Platform } from 'react-native';
import React from 'react';
import { Text,Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componenti custom
import {ss} from '../struttura/style.js';
import {richiesta,getData} from '../struttura/Utils.js';

export default function LogOut({ navigation }) {
  return (
    <Provider>
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <View style={[{maxHeight:720, minWidth:300, width:"90%"}, ss.divinterno1]}>
              <View style={[{width:"100%"},ss.w100]}>
                <View style={{minHeight:70}}>
                  <Image source={require('../assets/logoorizzontale.jpg')}  style={[ss.img]}/>
                </View>
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
                                    alert("Logout effettuato");
                                    navigation.navigate('LogIn');
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
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}
