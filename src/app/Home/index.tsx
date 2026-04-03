import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, Button} from 'react-native';
import {styles} from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require("@/logo/logo.png")}>
      </Image>
        <Button title={"Testar"}>

        </Button>
    </View>
  );
}
