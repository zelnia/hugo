import {ss} from './style.js';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper'; 

export default function Footer() {
    const navigation = useNavigation();
    return(
    <View  style={[{ flexDirection: 'row' }]}>
      <View style={[{ width: '25%'}, ss.centro]}>
        <IconButton
          icon="home"
          color='#00a1ae'
          size={35}
          onPress={async () => {
            navigation.navigate('Hugo');
          }}
        />
      </View>
      <View style={[{ width: '25%'}, ss.centro]}>
        <IconButton
          icon="account"
          color='#00a1ae'
          size={35}
          onPress={async () => {
            navigation.navigate('Profilo');
          }}
        />
      </View>
      <View style={[{ width: '25%'}, ss.centro]}>
        <IconButton
          icon="history"
          color='#00a1ae'
          size={35}
          onPress={async () => {
            navigation.navigate('History');
          }}
        />
      </View>
      <View style={[{ width: '25%'}, ss.centro]}>
        <IconButton
          icon="logout"
          color='#00a1ae'
          size={35}
          onPress={() => {
            navigation.navigate('Accesso');
          }}
        />
      </View>
    </View>
    );
  }