import {ss} from './style.js';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {IconButton} from 'react-native-paper'; 
import { getData } from './Utils.js';

// export default function Footer({no="no"}) {
export default function Footer() {
    const no="nah";
    const navigation = useNavigation();
    return(
    <View  style={[{ flexDirection: 'row' },ss.w100,ss.textcentro]}>
      {
        no!="home" ?
          <View style={[{ width: '25%'}, ss.centro]}>
            <IconButton
              icon="home"
              color='#00a1ae'
              size={35}
              onPress={async () => {
                let idutente= await getData("@Id_User");
                let nom= await getData("@Nominativo");
                navigation.navigate('Hugo',{Id_Utente: idutente,Nominativo:nom});
              }}
            />
          </View>
        : null
      }
      {
        no!="profilo" ?
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
        : null
      }
      {
        no!="storico" ?
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
        : null
      }

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