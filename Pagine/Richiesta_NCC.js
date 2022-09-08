import {ss} from '../struttura/style.js';
import {useNavigation} from '@react-navigation/native';
import Footer from '../struttura/Footer.js';
import React, { useState, useEffect, useRef } from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
// import DatePicker from 'react-datepicker';
// import DateTimePicker from 'react-datetime-picker';
import { TextInput,Surface, RadioButton, Button, Paragraph,Portal, Dialog,Provider,Divider, Text, Checkbox} from 'react-native-paper';

export default function Richiesta_NCC({ navigation, route }) {

  const [indirizzopartenza, setindirizzopartenza] = useState('');
  const [indirizzodestinazione, setindirizzodestinazione] = useState('');

  const [dataeora, setdataeora] = useState('');
  const [tipospostamento, settipospostamento] = useState('');
  const [durataattesa, setdurataattesa] = useState('');
  const [passeggeri, setpasseggeri] = useState('');
  const [note, setnote] = useState('');

    return (
      <Provider>
        <SafeAreaView style={ss.safeareaview}>
          <ScrollView>
            <View style={ss.container}>
              <Text  style={ss.h1}>Richiesta NCC</Text>
              <Surface style={[ss.surface1,ss.mb15,ss.mt15,ss.w100]} elevation={4}>
                <View>
                  <TextInput
                    style={[ss.w100]}
                    label="Indirizzo di partenza"
                    onChangeText={(indirizzopartenza) => {
                      setindirizzopartenza(indirizzopartenza)
                    }}
                    value={indirizzopartenza ?? ""}
                  />
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Indirizzo di destinazione"
                    onChangeText={(indirizzodestinazione) => {
                      setindirizzodestinazione(indirizzodestinazione)
                    }}
                    value={indirizzodestinazione ?? ""}
                  />
                  {/* <DateTimePicker style={[ss.w100,ss.mt15]}
                    label="Data e ora"
                    onChangeText={(dataeora) => {
                      setdataeora(dataeora)
                    }}
                    value={dataeora ?? ""} /> */}
                    {/* <DatePicker
                      selected={dataeora}
                      onChange={(dataeora) => {
                        setdataeora(dataeora)
                      }}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      showTimeInput
                    /> */}
                  {/* <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Data e ora"
                    onChangeText={(dataeora) => {
                      setdataeora(dataeora)
                    }}
                    value={dataeora ?? ""}
                  /> */}
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Tipo di spostamento"
                    onChangeText={(tipospostamento) => {
                      settipospostamento(tipospostamento)
                    }}
                    value={tipospostamento ?? ""}
                  />
                    
                  <View style={{ flexDirection: 'row'}}>
                    <TextInput
                      style={[ss.w50,ss.mt15]}
                      label="Durata attesa"
                      onChangeText={(durataattesa) => {
                        setdurataattesa(durataattesa)
                      }}
                      value={durataattesa ?? ""}
                    />
                    <TextInput
                      style={[ss.w50,ss.mt15]}
                      label="Passeggeri"
                      onChangeText={(passeggeri) => {
                        setpasseggeri(passeggeri)
                      }}
                      value={passeggeri ?? ""}
                    />
                  </View>
                  
                  <TextInput
                    style={[ss.w100,ss.mt15]}
                    label="Note"
                    onChangeText={(note) => {
                      setnote(note)
                    }}
                    value={note ?? ""}
                  />
                  <Button mode="contained"  style={[ss.w100,ss.mt15]}>Invia</Button>
                  <Button icon='arrow-left' onPress={() => {navigation.navigate('Accesso');}} style={[ss.w100,ss.mt15]}>Oppure torna indietro</Button>
                </View>
              </Surface>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Provider>
    );
}