// import {  View, Text} from 'react-native';
import {  View, Image, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { Text,List,Divider} from 'react-native-paper';
import Footer from '../struttura/Footer.js';

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
                  <Text style={[ss.h3]}>Ritiri e acquisti</Text>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Costo del servizio:</Text><Text style={[ss.h3]}> 6,79 €</Text>
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
                    <List.Item title="5 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
                  </List.Section>
                  <Divider />
                  <Text style={[ss.mt25,ss.h3]}>Servizio Noleggio Con Conducente (NCC)</Text>
                  <View style={[ss.mt5,ss.row]}>
                    <Text style={[ss.h4]}>Costo del servizio:</Text><Text style={[ss.h3]}> 14,99 €</Text>
                  </View>
                  <List.Section>
                    <List.Subheader>Supplemento costo distanza:</List.Subheader>
                    <List.Item title="Fascia A" description="+1 € per km percorso" left={() => <List.Icon icon="arrow-expand" />} />
                    <List.Subheader>Supplemento costo sosta:</List.Subheader>
                    <List.Item title="5 € ogni 30 minuti" left={() => <List.Icon icon="arrow-expand" />} />
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
