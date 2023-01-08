// import {  View, Text} from 'react-native';
import {  View, Image, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Text,List,Divider,IconButton} from 'react-native-paper';
import Footer from '../struttura/Footer.js';
import { getData } from '../struttura/Utils.js';

//Componenti custom
import {ss} from '../struttura/style.js';

export default function SpecchiettoCosti({ navigation }) {
  return (
    <SafeAreaView style={ss.safeareaview2}>
      <ScrollView>
        <View style={[{width:"100%"},ss.w100,ss.centro]}>
          <View style={{minHeight:60,width:"80%"}}>
            <Image source={require('../assets/logoorizzontale.jpg')}  style={[ss.img]}/>
            <Text style={[{textAlign: 'center'},ss.h1,ss.mt5]}>Tariffario servizi</Text>
          </View>
        </View>
        <View style={ss.container3}>
          <View style={[{ minWidth:300, width:"95%"}, ss.divinterno3]}>
            <View style={[{width:"100%"},ss.w100]}>
              <View>
                  <View style={ss.row}>
                    <View style={ss.w75}>
                    </View>
                    <View style={[{textAlign:"end"},ss.w25]}>
                      <IconButton
                        icon="close-box"
                        color='#00a1ae'
                        size={35}
                        onPress={async () => {
                          let idutente= await getData("@Id_User");
                          if(idutente!==null){
                            let nom= await getData("@Nominativo");
                            navigation.navigate('Hugo',{Id_Utente: idutente,Nominativo:nom});
                          } else {
                            navigation.navigate('Accesso');
                          }
                        }}
                      />
                    </View>
                  </View>
                  <Text style={[ss.h3]}>Ritiri e acquisti</Text>
                  <View style={[ss.mt5]}>
                    <Text style={[ss.h4]}>Costo del servizio normale:</Text><Text style={[ss.h3]}> 6,79 €</Text>
                    <Text style={[ss.h4]}>Costo del servizio Grandi Volumi:</Text><Text style={[ss.h3]}> 35,00 €</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="Da 0 a 3km: 0 €" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Item title="Fascia B" description="Da 3 a 5km: +1 €" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Item title="Fascia C" description="Da 5 a 10km: +2 €" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Item title="Fascia D" description="Da 10 a 15km: +6 €" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Item title="Fascia E" description="Oltre i 15km: +6 € +1 € per km" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <Divider />
                  <Text style={[ss.mt25,ss.h3]}>Servizio Taxi</Text>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Costo del servizio:</Text><Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="Da 0 a 10km: 0 €" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Item title="Fascia B" description="Oltre i 10km: +1 € per km percorso" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Subheader>Supplemento costo sosta:</List.Subheader>
                    <List.Item title="7 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <View style={[ss.my5,ss.row]}>
                    <Text>*Nota bene: costi di eventuali pedaggi non inclusi.</Text>
                  </View>
                  <Divider />
                  <Text style={[ss.mt25,ss.h3]}>Servizio Noleggio Con Conducente (NCC)</Text>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Costo del servizio:</Text><Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="+1 € per km percorso" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Subheader>Supplemento costo sosta:</List.Subheader>
                    <List.Item title="7 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <View style={[ss.my5,ss.row]}>
                    <Text>*Nota bene: costi di eventuali pedaggi non inclusi.</Text>
                  </View>
                  <Divider />
                  <Text style={[ss.mt25,ss.h3]}>Servizio Accompampagnamento Anziani e Invalidi</Text>
                  <View style={[ss.mt5]}>
                    <Text style={[ss.h4]}>Spese e commissioni, prima ora inclusa:</Text>
                    <Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Compagnia nottura e diurna:</Text><Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Accompagnamento:</Text><Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="+1 € per km percorso" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Subheader>Supplemento costo sosta:</List.Subheader>
                    <List.Item title="7 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <List.Section>
                    <List.Subheader>Altri supplementi:</List.Subheader>
                    <List.Subheader>Durata compagnia:</List.Subheader>
                    <List.Item title="7 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <Divider />
                  <Text style={[ss.mt25,ss.h3]}>Servizio pet sitter</Text>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Pet sitter notturno e diurno:</Text><Text style={[ss.h3]}> 24,00 €</Text>
                  </View>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Passeggiata 40 minuti:</Text><Text style={[ss.h3]}> 15,00 €</Text>
                  </View>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Visita veterinaio:</Text><Text style={[ss.h3]}> 15,00 €</Text>
                  </View>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Tolettatura:</Text><Text style={[ss.h3]}> 15,00 €</Text>
                  </View>
                  <View style={[ss.my5,ss.row]}>
                    <Text>*Nota bene, il costo della visita veterinaria e della tolettatura non è incluso. Il servizio si riferisce solo all'accompagnamento.</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="+1 € per km percorso" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}
