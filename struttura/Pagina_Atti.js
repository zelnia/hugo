
// import React, { useState, useEffect, useRef } from 'react';
// export default function Pagina_Atti({ navigation, route }) {
//     var Ragione_Sociale=route.params.Ragione_Sociale;
//     var Id_Atti=route.params.Id_Atti;
  
//     const [dispo, setDispo] = useState('');
//     const [nritiri, setnritiri] = useState(ritiriglobale.Ritiri);
//     const [saldogestore, setsaldogestore] = useState("");
//     const [costocliente, setcostocliente] = useState("");
//     const [attivasaldo, setattivasaldo] = useState(1);
//     const [costoritiro, setcostoritiro] = useState("");
//     const [isXL, setIsXL] = useState(false);
//     const onToggleSwitch = () => setIsXL(!isXL);
//     const [tel, setTel] = useState("");
//     const [Numero_Ritiri, setNumero_Ritiri] = useState(ritiriglobale?.Altro?.Numero_Ritiri);
//     const [Costo_Totale, setCosto_Totale] = useState('');
//     const [Altezza_Loading, setAltezza_Loading] = useState(0);
  
//     const MINUTE_MS = 10000;
  
//     function aggiornaPagina(json){
//       if(typeof(json?.dati?.ritiri)!="undefined") {
//         setnritiri(JSON.parse(json.dati.ritiri));
//       }
//       if(typeof(json?.dati?.ore)!="undefined") {
//         setDispo(elaboraore(json.dati.ore));
//       }
//       setsaldogestore(json?.dati?.Saldo_Ritiri);
//       setNumero_Ritiri(json?.dati?.Numero_Ritiri);
//     }
  
//     useEffect(() => {
//       async function fetchData() {
//         let Id_User = await getData('@Id_User');
//         let json_res = await richiesta({
//           "Operazione":'AggiornaAttivita2',
//           "idgestore":Id_User,
//           "idatti":Id_Atti,
//         },'apiGestori');
//         aggiornaPagina(json_res);
//         let costori=await getData("@Costo_Ritiri");
//         setcostoritiro(costori);
//         let as=await getData("@Attiva_Saldo");
//         setattivasaldo(as);
//         setcostocliente(await getData("@Costo_Ritiro_Cliente"));
//         setCosto_Totale(parseFloat(Numero_Ritiri*costori).toFixed(2));
//       }
//       fetchData();
//     }, []);
//     useEffect(() => {
//       const intervalloritiri = setInterval(async () => {
//         let Id_User = await getData('@Id_User');
//         let json_res = await richiesta({
//           "Operazione":'AggiornaAttivita2',
//           "idgestore":Id_User,
//           "idatti":Id_Atti,
//         },'apiGestori');
//         aggiornaPagina(json_res);
//       }, MINUTE_MS);
//       return () => clearInterval(intervalloritiri); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
//     }, []);
  
//     var oggi = new Date();
//     var deltaminuti=25;
//     var adessocondelta = new Date(oggi.getTime() + deltaminuti*60000);
//     oggi.setHours( oggi.getHours() + 2 );
  
//     async function onPressORARIO(orario){
//       setAltezza_Loading('100%');
//       let jritiri=await creaRitiro(Id_Atti,orario,isXL,tel);
//       try {
//         if(jritiri.errore!="Nessun_Driver_Disponibile"){
//           setTel("");
//           setIsXL(false);
//           setnritiri(jritiri);
//           let nuovosaldo= parseFloat(saldogestore-costoritiro).toFixed(2);
//           setsaldogestore(nuovosaldo);
//           let CT=parseFloat(parseFloat(Costo_Totale)+parseFloat(costoritiro)).toFixed(2);
//           setCosto_Totale(CT);
//           AsyncStorage.setItem('@Saldo_Ritiri',nuovosaldo.toString());
//           let n=parseInt(Numero_Ritiri)+1;
//           setNumero_Ritiri(n);
//           alert("Ritiro creato");
//         } else {
//           alert("Non ci sono drivers disponibili per l'orario scelto.");
//         }
//         let DatiAtti=aggiornaAtti(Id_Atti,Ragione_Sociale)
//         .then((response) => {
//           setDispo(response.Ore);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//       } catch (e) {
//         console.log(e);
//       }
  
//       setAltezza_Loading(0);
//     }
//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
//     return(
//       <SafeAreaView style={styles.safeareaview}>
//         <ScrollView  style={[{ backgroundColor: '#eee'}]}>
//           <View style={[{}]}>
//             <View style={[styles.divinterno3, styles.mx10, styles.mt15p]}>
//               <Text style={{ fontSize: 20 }}>{Ragione_Sociale}</Text>
//               {
//                 (typeof(dispo)!="undefined" && dispo.length) ?
//                   <View>
//                     <Surface  style={[styles.p10,styles.surface1,styles.mt15]} elevation={4}>
//                       <View style={[{ flex:1, flexDirection: 'row', justifyContent:'space-around', alignItems:"center" }]} key="extrainput1">
//                         <Text style={{ fontSize: 14 }}>Richiedi auto:</Text>
//                         <Switch value={isXL} onValueChange={onToggleSwitch} />
//                       </View>
//                       <TextInput
//                         style={[{ width: "100%", backgroundColor:"#fff" }, styles.mt15]}
//                         mode="outlined"
//                         label="Inserisci il numero di telefono"
//                         placeholder="Numero"
//                         onChangeText={tel => setTel(tel)} value={tel}
//                         left={<TextInput.Affix text="+39" />}
//                       />
//                     </Surface>
//                     <View style={styles.mt15}>
//                       {
//                         dispo.map((Ora, index) => (
//                           <View style={[{ flexDirection: 'row', justifyContent:'flex-end' }]} key={index}>
//                             {
//                               Ora[1].map((Ora2, index2) => (
//                                 ((adessocondelta.getTime() < Date.parse(oggi.getDate()+' '+monthNames[oggi.getMonth()]+' '+oggi.getFullYear()+' '+Ora2+':00')) || Ora2!="No") ?
//                                   <TouchableOpacity
//                                     key={index+"-"+index2}
//                                     onPress={
//                                       async () => {
//                                         onPressORARIO(Ora2);
//                                       }
//                                     }
//                                     style={[{ backgroundColor: 'lightgrey', width:'25%' }, styles.p10, styles.centro,styles.bordogrigio]}
//                                   >
//                                     <Text style={{ fontSize: 18 }}>{Ora2}</Text>
//                                   </TouchableOpacity>
//                                 :
                                  
//                                   <View style={[{ backgroundColor: 'white', width:'25%' }, styles.p10, styles.centro]} 
//                                   key={index+"no"+index2}>
//                                     <Text style={{ fontSize: 18 }}>     </Text>
//                                   </View>
//                               ))
//                             }
//                           </View>
//                         ))
//                       }
//                     </View>
//                   </View>
//                 :
//                   (dispo=="") ?
//                     <View><Text style={{ fontSize: 20 }}>In caricamento...</Text></View>
//                   :
//                     <View><Text style={{ fontSize: 20 }}>Nessuna disponibilita</Text></View>
//               }
//               <Text style={[{ fontSize: 20 },styles.mt15]}>Ritiri</Text>
//               {
//                 (typeof(nritiri)!="undefined" && nritiri!="" && nritiri!="undefined" && nritiri?.length) ? nritiri.map(
//                   (item, index) => {
//                     let newDateObj = new Date(item.DT_Consegna.replace(' ', 'T'));
//                     let coloreriga=(index % 2 == 0?"#fff":"#eee");
//                     return (
//                       <View style={[{ flexDirection: 'row', backgroundColor:coloreriga }, styles.p5]} key={index}>
//                         <View style={[{ width: '40%'}]}>
//                           <Text Text style={[{ fontSize: 14 }, styles.p5, styles.centro]}>{item.Ora}</Text>
//                         </View>
//                         <View style={[{ width: '60%' }]}>
//                           {
//                             oggi.getTime()<newDateObj ?
//                               <TouchableOpacity
//                                 onPress={
//                                   async () => {
//                                     let adesso = new Date();
//                                     if(adesso.getTime()<newDateObj.getTime()){
//                                     // if(adesso.getTime()<dat30minutiprima){
  
//                                       setAltezza_Loading('100%');
//                                       let jritiri=await CancellaRitiro(Id_Atti,item.Ora,item.Id);
//                                       if(typeof(jritiri)!="undefined" && jritiri!=null && jritiri?.errore!="Tempo_Cancellazione_Esaurito"){
//                                         setnritiri(jritiri);
//                                         alert("Ritiro cancellato");
//                                         let n2=parseInt(Numero_Ritiri)-1;
//                                         setNumero_Ritiri(n2);
//                                         let nuovosaldo= parseFloat(saldogestore+costoritiro).toFixed(2);
//                                         setsaldogestore(nuovosaldo);
//                                         AsyncStorage.setItem('@Saldo_Ritiri',nuovosaldo.toString());
//                                         let CT=parseFloat(parseFloat(Costo_Totale)-parseFloat(costoritiro)).toFixed(2);
//                                         setCosto_Totale(CT);
//                                       } else {
//                                         alert("Il tempo utile di 30 minuti per cancellare il ritiro è terminato");
//                                       }
//                                       setAltezza_Loading(0);
//                                     } else {
//                                       alert("Il tempo utile di 30 minuti per cancellare il ritiro è terminato");
//                                     }
//                                   }
//                                 }
//                                 style={[{ backgroundColor: '#fafafa'}, styles.p5, styles.centro,styles.bordogrigio]}
//                               >
//                                 <Text style={{ fontSize: 14 }}>Cancella</Text>
//                               </TouchableOpacity>
//                             : <TouchableOpacity
//                                 onPress={() => {
//                                   alert("Il tempo utile di 30 minuti per cancellare il ritiro è terminato");
//                                 }}
//                                 style={[{ backgroundColor: '#fafafa'}, styles.p5, styles.centro, styles.bordogrigiochiaro]}
//                               >
//                                 <Text style={{ fontSize: 14 }}>Cancella</Text>
//                               </TouchableOpacity>
//                           }
//                         </View>
//                       </View>
//                     )
//                   }
//                 ) : <View><Text style={{ fontSize: 14 }}>Nessuna prenotazione effettuata</Text></View>
//               }
//               <Divisore1 />
//               <View style={[{ flexDirection: 'row' }]}>
//                 <View style={[{ width: '100%'}]}>
//                   <TouchableOpacity
//                     onPress={async ()=>{
//                       let AuthGestore = await getData('@AuthGestore');
//                       if(AuthGestore!="" && typeof(AuthGestore)!="undefined" && AuthGestore!=null){
//                         navigation.navigate('Storico Ritiri', {
//                           "Id_Atti": Id_Atti,
//                           "Ragione_Sociale": Ragione_Sociale,
//                           "Authcode": AuthGestore
//                         });
//                       }
//                     }}
//                     style={[{ backgroundColor: '#00a1ae' }, styles.p5, styles.centro]}>
//                     <Text style={{ fontSize: 14,color:'#fff' }}>Storico Ritiri</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//             {
//               (attivasaldo==1) ?
//               <Surface  style={[styles.p10,styles.surface1, styles.mx10, styles.my10]} elevation={4}>
//                 <Text style={{ fontSize: 20, textAlign:"center" }}>Saldo e costi</Text>
//                 <Divisore1 />
//                 <View style={[{ width: '100%'}]}>
//                   <Text style={{ fontSize: 14, textAlign:"center"}}>Saldo: <Text style={{ fontWeight:'bold'}}> {saldogestore}</Text></Text>
//                 </View>
//                 <View style={[{ flexDirection: 'row' }]}>
//                   <View style={[{ width: '50%'}]}>
//                     <Text style={{ fontSize: 14}}>Costo cliente: <Text style={{ fontWeight:'bold'}}> {costocliente}</Text></Text>
//                   </View>
//                   <View style={[{ width: '50%'}]}>
//                     <Text style={{ fontSize: 14, textAlign:"right"}}>Costo ritiro: <Text style={{ fontWeight:'bold'}}> {costoritiro}</Text></Text>
//                   </View>
//                 </View>
//               </Surface>
//               :null
//             }
//             {
//               ( Numero_Ritiri!="" && typeof(Numero_Ritiri)!="undefined" && Numero_Ritiri!=null && Numero_Ritiri!='') ?
//                 <Surface  style={[styles.p10,styles.surface1, styles.mx10,styles.my10]} elevation={4}>
//                   <Text style={[{ fontSize: 20, textAlign:"center" }, styles.mt15]}>Statistiche mese</Text>
//                   <Divisore1 />
//                   <View style={[{ flexDirection: 'row' }]}>
//                     <View style={[{ width: '50%'}]}>
//                       <Text style={{ fontSize: 14}}>Ritiri: <Text style={{ fontWeight:'bold'}}> {Numero_Ritiri}</Text></Text>
//                     </View>
//                     <View style={[{ width: '50%'}]}>
//                       <Text style={{ fontSize: 14, textAlign:"right"}}>Costo totale: <Text style={{ fontWeight:'bold'}}> {Costo_Totale}</Text></Text>
//                     </View>
//                   </View>
//                 </Surface>
//               :null
//             }
//           </View>
//         </ScrollView>
//         <View>
//           <TouchableOpacity
//             onPress={async () => {
//               let Id_User = await getData('@Id_User');
//               richiesta({
//                 "Operazione":'GetAttivita',
//                 "Id_User":Id_User,
//               },'apiGestori')
//               .then((json) => {
//                 navigation.navigate('Lista Attività', {
//                   Dati: json
//                 });
//               });
//             }}
//             style={[{ backgroundColor: 'lightgrey' }, styles.py10, styles.w100, styles.centro]}>
//             <Text style={{ fontSize: 16,color:'#116699' }}>Lista Attività - Ricarica il tuo saldo</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={[{ backgroundColor: 'rgba(0, 0, 0, 0.6)',height:Altezza_Loading },  styles.loading]}>
//           <ActivityIndicator size="large" />
//         </View>
//       </SafeAreaView>
//     );
// }