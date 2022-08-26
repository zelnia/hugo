import {TouchableOpacity,Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiroot="https://ristostore.it/Hugo/";

async function getData(key){
  let value = await AsyncStorage.getItem(key);
  return value;
}

async function getLocal(navigation) {
  let Id_User = await getData('@Id_User');
  connesso=false;
};

async function richiesta(oggetto, api){
  let formdata = new FormData();
  for (const [key, value] of Object.entries(oggetto)) {
    formdata.append(key, value);
  }
  try {
    let res = await fetch(apiroot+api, {
      method: 'POST',
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      } ,
      body: formdata
    });
    res = await res.json();
    return res;
  } catch (e) {
    return e;
  }
}

function elaboraore(elencoore){
  var arrayore=[];
  for (let index = 0; index < elencoore.length; index++) {
    var chiave=elencoore[index]["OraH"];
    if(typeof(arrayore[elencoore[index]["OraH"]])=="undefined"){
      let bersaglio=elencoore[index]["Ora"];
      arrayore[chiave]=[];
      arrayore[chiave].push(bersaglio);
    } else {
      let bersaglio=elencoore[index]["Ora"];
      if(!arrayore[chiave].includes(bersaglio)){
        arrayore[chiave].push(bersaglio);
      }
    }
  }
  let chiaviore=Object.keys(arrayore);
  for (let index2 = 0; index2 < chiaviore.length; index2++) {
    let bers=chiaviore[index2];
    if(typeof(arrayore[bers])!="undefined"){
      if(!arrayore[bers].includes(bers+":00")){
        arrayore[bers].splice(0, 0, 'No');
      }
      if(!arrayore[bers].includes(bers+":15")){
        arrayore[bers].splice(1, 0, 'No');
      }
      if(!arrayore[bers].includes(bers+":30")){
        arrayore[bers].splice(2, 0, 'No');
      }
      if(!arrayore[bers].includes(bers+":45")){
        arrayore[bers].splice(3, 0, 'No');
      }
    }
  }
  return Object.entries(arrayore);
}

function CollegamentoWeb({desc,url, stili=[], stilitesto=[]}) {
  return(
    <TouchableOpacity onPress={()=>{Linking.openURL(url)}} style={[stili]}>
      <Text style={[{ fontSize: 16,color:'#1a0dab' }, stilitesto]}>{desc}</Text>
    </TouchableOpacity>
  );
}

export {CollegamentoWeb,elaboraore,richiesta,getLocal,getData}