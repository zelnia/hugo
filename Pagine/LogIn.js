import {  View, TouchableOpacity, Image, SafeAreaView, ScrollView,Platform } from 'react-native';
import React, { useState} from 'react';
import { TextInput, Button, Text,Provider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
//Componenti custom
import {ss} from '../struttura/style.js';
import {richiesta} from '../struttura/Utils.js';

export default function LogIn({ navigation }) {
    const [user, setuser] = useState('');
    const [pwd, setpwd] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);

    var Value = user;
    var secret_Value = pwd;

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
                            <Button onPress={async () => {navigation.navigate('Registrazione');}}  mode="contained"  style={[ss.w100, ss.mt15]}>Oppure Registrati</Button>
                            <Button icon="phone" color="#00a1ae" onPress={()=>{Linking.openURL("https://wa.me/+393333256236");}}  mode="outlined"  style={[ss.w100]}>Vorresti parlare con Hugò? Clicca per messaggiare con lui!</Button>
                        </View>
                    </View>
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}
