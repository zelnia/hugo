import {  View, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import {TextInput, Text,Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Componenti custom
import {ss} from '../struttura/style.js';
import {richiesta} from '../struttura/Utils.js';

export default function Recuperapassword({ navigation }) {
  const [email, setemail] = useState('');
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
                    <Text style={[{textAlign: 'center'},ss.h3,ss.mt15]}>Inserisci la tua email per ricevere una password provvisoria.</Text>
                    <TextInput
                      style={[ss.w100,ss.mt15]}
                      label="Email"
                      onChangeText={(email) => {
                        setemail(email)
                      }}
                      value={email ?? ""}
                    />
                    <TouchableOpacity
                      onPress={async ()=>{
                        try {
                            richiesta({
                                "Operazione":'recuperopassword',
                                "inputEmail":email,
                            },'apiHugo')
                            .then(async (json) => {
                                await AsyncStorage.clear().then(()=>{
                                    alert("Controlla la tua email per ricevere la password provvisoria. Se non la trovi, prova a verificare che non sia finita in qualche cartella o nella sezione spam.");
                                    navigation.navigate('LogIn');
                                });
                            });
                        } catch(e) {
                          // remove error
                        }
                      }}
                      style={[{ backgroundColor: '#00a1ae'  }, ss.p10, ss.w100, ss.centro]}>
                      <Text style={{ fontSize: 20, color: '#fff' }}>Recupera la password</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      onPress={async ()=>{
                        try {
                          navigation.navigate('Accesso');
                        } catch (error) {
                          console.log('error', error);
                        }
                      }}
                      style={[{ backgroundColor: 'lightgrey' }, ss.mt15, ss.py10, ss.w100, ss.centro]}>
                      <Text style={{ fontSize: 16,color:'#116699' }}>Torna indietro</Text>
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
