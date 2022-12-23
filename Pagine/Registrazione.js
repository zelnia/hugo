import {ss} from '../struttura/style.js';
import {useNavigation} from '@react-navigation/native';
import Footer from '../struttura/Footer.js';
import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox} from 'react-native-paper';
import {richiesta,getLocal,getData} from '../struttura/Utils.js';

function makeid() {
  var testoId = "";
  var possible = "0123456789";
  for (var i = 0; i < 3; i++)
    testoId += possible.charAt(Math.floor(Math.random() * possible.length));
  return testoId;
}
const codicesms = makeid();
console.log('codicesms1', codicesms);

export default function Registrazione({ navigation, route }) {


  async function verificasms(pretel) {
    var telefono="";
		var prefisso="+39";
		if(pretel.length>10){
			var strFirstThree = pretel.substring(0,3);
			var strFirstTwo = pretel.substring(0,2);
			if(strFirstThree=="+39"){
				telefono=pretel.substring(3);
			} else if(strFirstTwo=="39"){
				telefono=pretel.substring(2);
			} else {
				prefisso=strFirstThree;		
			}
		} else {
			telefono=pretel;
		}
    let verifica={"Operazione":"verificasms", "codiceconferma": codicesms, "telefono": ""+prefisso+telefono};
    let json_res = await richiesta(verifica);
    alert("Sms inviato.");
  }

  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const [email, setemail] = useState('');
  const [pwd, setpwd] = useState('');
  const [pwd2, setpwd2] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  var secret_Value = pwd;
  var secret_Value2 = pwd2;

  const [codiceamico, setcodiceamico] = useState('');
  const [indirizzo, setindirizzo] = useState('');
  const [civico, setcivico] = useState('');
  const [citta, setcitta] = useState('');
  const [provincia, setprovincia] = useState('');
  const [cap, setcap] = useState('');
  const [note, setnote] = useState('');
  const [nome, setnome] = useState('');
  const [telefono, settelefono] = useState('');
  const [codiceverifica, setcodiceverifica] = useState('');
  const [conferma, setconferma] = useState('');
  const [trattamentodati, settrattamentodati] = useState('no');

  //Dati fatturazione
  const [ragionesociale, setragionesociale] = useState('');
  const [iva, setiva] = useState('');
  const [cupa, setcupa] = useState('');
  const [cf, setcf] = useState('');
  const [indirizzo2, setindirizzo2] = useState('');
  const [civico2, setcivico2] = useState('');
  const [citta2, setcitta2] = useState('');
  const [provincia2, setprovincia2] = useState('');
  const [cap2, setcap2] = useState('');


  async function inviaRegistrazione (nome,email,pwd,indirizzo,civico,citta,provincia,cap,note,Note_Indirizzo,telefono,codiceamico,codiceverifica, codicesms,iva,cupa ){
    try {
      let richiestaregistrazione= {
        "Operazione":'Registrazione',
        "nome":nome,
        "email":email,
        "pwd":pwd,
        "indirizzo":indirizzo,
        "civico":civico,
        "citta":citta,
        "provincia":provincia,
        "cap":cap,
        "note":note,
        "Note_Indirizzo":Note_Indirizzo,
        "telefono":telefono,
        "codiceamico":codiceamico,
        "piva":iva,
        "cupa":cupa,
      }
      let checkgo=true;
      let errore="";
      if(codiceverifica!==codicesms){checkgo=false,errore+="Per favore verifica il tuo telefono. \r\n"}
      if(indirizzo==""){checkgo=false,errore+="Per favore scegli un indirizzo. \r\n"}
      if(citta==""){checkgo=false,errore+="Per favore scegli un citta. \r\n"}
      if(email==""){checkgo=false,errore+="Per favore scegli un email. \r\n"}
      if(checkgo){
        let Reguistrazione=await richiesta(richiestaregistrazione);
        if(Reguistrazione.risposta=="registrazione_avvenuta"){
          alert("Registrazione riuscita");
          navigation.navigate('Accesso')
        }
      } else {
        alert(errore);
      }
    } catch (error) {
      console.log('errore: ', error);
    }
  }

    return (
      <Provider>
        <SafeAreaView style={ss.safeareaview}>
          <ScrollView>
            <View style={ss.container}>
              <Text  style={ss.h1}>Registrazione</Text>
              <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <View>
                  <TextInput
                    style={[ss.w100]}
                    label="Email"
                    onChangeText={(email) => {
                      setemail(email)
                    }}
                    value={email ?? ""}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Password"
                    onChangeText={(secret_Value) => {
                      setpwd(secret_Value)
                    }}
                    value={secret_Value ?? ""}
                    secureTextEntry={passwordVisible}
                    right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"} onPress={() => setPasswordVisible(!passwordVisible)} />}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Conferma Password"
                    onChangeText={(secret_Value2) => {
                      setpwd2(secret_Value2)
                    }}
                    value={secret_Value2 ?? ""}
                    secureTextEntry={passwordVisible2}
                    right={<TextInput.Icon name={passwordVisible2 ? "eye" : "eye-off"} onPress={() => setPasswordVisible2(!passwordVisible2)} />}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Indirizzo"
                    onChangeText={(indirizzo) => {
                      setindirizzo(indirizzo)
                    }}
                    value={indirizzo ?? ""}
                  />
                  <View style={{ flexDirection: 'row'}}>
                    <TextInput
                      style={[ss.w49,ss.mt15]}
                      label="Civico"
                      onChangeText={(civico) => {
                        setcivico(civico)
                      }}
                      value={civico ?? ""}
                    />
                    <View style={ss.w2}></View>
                    <TextInput
                      style={[ss.w49,ss.mt15]}
                      label="Citta"
                      onChangeText={(citta) => {
                        setcitta(citta)
                      }}
                      value={citta ?? ""}
                    />
                  </View>
                  <View style={{ flexDirection: 'row'}}>
                    <TextInput
                      style={[ss.w49,ss.mt15]}
                      label="Provincia"
                      onChangeText={(provincia) => {
                        setprovincia(provincia)
                      }}
                      value={provincia ?? ""}
                    />
                    <View style={ss.w2}></View>
                    <TextInput
                      style={[ss.w49,ss.mt15]}
                      label="Cap"
                      onChangeText={(cap) => {
                        setcap(cap)
                      }}
                      value={cap ?? ""}
                    />
                  </View>
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Nome e cognome"
                    onChangeText={(nome) => {
                      setnome(nome)
                    }}
                    value={nome ?? ""}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Note"
                    onChangeText={(note) => {
                      setnote(note)
                    }}
                    value={note ?? ""}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Telefono"
                    onChangeText={(telefono) => {
                      settelefono(telefono)
                    }}
                    value={telefono ?? ""}
                  />
                  <Button mode="outlined"  style={[ss.w100,ss.mt15]}
                   onPress={() => {verificasms(telefono);}}
                  >Verifica il cellulare</Button>
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Codice di verifica"
                    onChangeText={(codiceverifica) => {
                      setcodiceverifica(codiceverifica)
                    }}
                    onBlur={() => {
                      console.log('codiceverifica', codiceverifica);
                      console.log('codicesms', codicesms);
                      if(codiceverifica!==codicesms){
                        alert("Il codice inserito non é corretto.");
                        setcodiceverifica("");
                      }
                    }}
                    value={codiceverifica ?? ""}
                  />
                  <Text style={[ss.textcentro, ss.mt10,ss.h2]}>Hai un codice amico?</Text>
                  <Text style={[ss.textcentro]}>Indicalo per guadagnare subito 2 euro nel tuo saldo!</Text>
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Codice Amico"
                    onChangeText={(codiceamico) => {
                      setcodiceamico(codiceamico)
                    }}
                    value={codiceamico ?? ""}
                  />
                  {/* <Button mode="outlined"  style={[ss.w100,ss.mt15]}>Invia sms di conferma</Button>
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Codice conferma"
                    onChangeText={(conferma) => {
                      setconferma(conferma)
                    }}
                    value={conferma ?? ""}
                  /> */}
                  {/* <Button onPress={showDialog}  mode="outlined"  style={[ss.w100,ss.mt15]}>Dati fatturazione</Button>
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Dati fatturazione</Dialog.Title>
                      <Dialog.Content>
                        <TextInput
                          style={[ss.w100]}
                          label="Ragione Sociale"
                          onChangeText={(ragionesociale) => {
                            setragionesociale(ragionesociale)
                          }}
                          value={ragionesociale ?? ""}
                        />
                        <TextInput
                          style={[ss.w100,ss.mt15]}
                          label="Codice fiscale"
                          onChangeText={(cf) => {
                            setcf(cf)
                          }}
                          value={cf ?? ""}
                        />
                        <TextInput
                          style={[ss.w100,ss.mt15]}
                          label="Partita iva"
                          onChangeText={(iva) => {
                            setiva(iva)
                          }}
                          value={iva ?? ""}
                        />
                        <TextInput
                          style={[ss.w100,ss.mt15]}
                          label="Indirizzo"
                          onChangeText={(indirizzo2) => {
                            setindirizzo2(indirizzo2)
                          }}
                          value={indirizzo2 ?? ""}
                        />
                        <View style={{ flexDirection: 'row'}}>
                          <TextInput
                            style={[ss.w50,ss.mt15]}
                            label="Civico"
                            onChangeText={(civico2) => {
                              setcivico2(civico2)
                            }}
                            value={civico2 ?? ""}
                          />
                          <TextInput
                            style={[ss.w50,ss.mt15]}
                            label="Citta"
                            onChangeText={(citta2) => {
                              setcitta2(citta2)
                            }}
                            value={citta2 ?? ""}
                          />
                        </View>
                        <View style={{ flexDirection: 'row'}}>
                          <TextInput
                            style={[ss.w50,ss.mt15]}
                            label="Provincia"
                            onChangeText={(provincia2) => {
                              setprovincia2(provincia2)
                            }}
                            value={provincia2 ?? ""}
                          />
                          <TextInput
                            style={[ss.w50,ss.mt15]}
                            label="Cap"
                            onChangeText={(cap2) => {
                              setcap2(cap2)
                            }}
                            value={cap2 ?? ""}
                          />
                        </View>
                        <Button style={[ss.w100, ss.mt15]} mode="contained" onPress={hideDialog}>OK</Button>
                      </Dialog.Content>
                    </Dialog>
                  </Portal>  */}
                  <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                    <Text  style={ss.h3}>Area aziende</Text>
                    <TextInput
                      style={[ss.w100,ss.mt15]}
                      label="Partita iva"
                      onChangeText={(iva) => {
                        setiva(iva)
                      }}
                      value={iva ?? ""}
                    />
                    <TextInput
                      style={[ss.w100,ss.mt15]}
                      label="Codice univoco"
                      onChangeText={(cupa) => {
                        setcupa(cupa)
                      }}
                      value={cupa ?? ""}
                    />
                  </Surface>
                  <Button mode="contained"  style={[ss.w100,ss.mt15]}
                   onPress={() => {inviaRegistrazione (nome,email,pwd,indirizzo,civico,citta,provincia,cap,note,note,telefono,codiceamico,codiceverifica,codicesms,iva,cupa);}}
                  >Registrati</Button>
                  <Button icon='arrow-left' onPress={() => {navigation.navigate('Accesso');}} style={[ss.w100,ss.mt15]}>Oppure torna indietro</Button>
                </View>
              </Surface>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    );
}