import {ss} from '../struttura/style.js';
import {useNavigation} from '@react-navigation/native';
import Footer from '../struttura/Footer.js';
import { Text, SafeAreaView, ScrollView, View} from 'react-native';

export default function Profilo({ navigation, route }) {
    return (
      <SafeAreaView style={ss.safeareaview}>
        <ScrollView>
          <View style={ss.container}>
            <Text  style={ss.h1}>Profilo</Text>
          </View>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    );
}