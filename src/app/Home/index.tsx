import { StatusBar } from 'expo-status-bar';
import {Text, View, Image} from 'react-native';

import {styles} from "./styles";
import { Button } from "../components/Button"

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
          style={styles.logo}
          source={require("@/logo/logo.png")}>
      </Image>
        <Button>

        </Button>
    </View>
  );
}
