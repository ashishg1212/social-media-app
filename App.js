import {
  StatusBar,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Title from './components/Title/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import globalStyle from './assets/styles.js/globalStyle';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={globalStyle.header}>
        <Title title={'Let’s Explore'} />
        <TouchableOpacity style={globalStyle.messageIcon}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color={'#898DAE'} />
          <View style={globalStyle.messageNumberContainer}>
            <Text style={globalStyle.messageNumber}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
export default App;
