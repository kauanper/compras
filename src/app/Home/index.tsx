import { StatusBar } from 'expo-status-bar';
import {Text, View, Image, TextInput} from 'react-native';

import {styles} from "./styles";
import { Button } from "../components/Button"
import {Input} from "../components/Input";

export default function Home() {
  return (
    <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require("@/logo/logo.png")}
        />

        <View style={styles.form}>
            <Input
                placeholder="O que você está precisando?"
            />

            <Button
                title="Adicionar Item"
                opacityValue={0.7}
                onPress={() => console.log("Clicou!")}
            />
        </View>

        <View style={styles.content}>

        </View>
    </View>
  );
}
