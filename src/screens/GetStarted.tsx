
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles';

export default function GetStarted({ navigation }) {
    return (
      <View style={styles.onboardingFlexView}>
        <Image source={require('../../assets/hermes_shoe.png')} style={{ width: '50%', height: '25%' }} />
        <Text style={styles.pageHead}>Venture</Text>
        <Text>Dare to explore {"🚀"}</Text>
        <View style={{height: 40}} />
        <TouchableOpacity
          style={styles.callToActionButton}
          onPress={() => navigation.navigate('Sign Up')}
        >
          <Text style={styles.callToActionText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }