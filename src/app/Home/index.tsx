import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import {styles} from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require("../../../assets/logo/logo.png")}>
      </Image>
    </View>
  );
}
