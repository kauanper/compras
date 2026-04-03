import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useState} from "react";

import {styles} from "./styles";
import {Button} from "../components/Button"
import {Input} from "../components/Input";
import {Filter} from "../components/Filter";
import {FilterStatus} from "../../types/FilterStatus";
import {Item} from "../components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]
const ITEMS = [
    {id: "1", status: FilterStatus.DONE, description: "comprar 1 pacoete café"},
    {id: "2", status: FilterStatus.PENDING, description: "comprar leite em pó"},
    {id: "3", status: FilterStatus.DONE, description: "comprar pão"}
]
export default function Home() {
    const [filter, setFilter] = useState(FilterStatus.PENDING);
    const [texto, setTexto] = useState("");

  return (
    <View style={styles.container}>
        <Image
        style={styles.logo}
        source={require("@/logo/logo.png")}
        />

        <View style={styles.form}>
            <Input
                placeholder="O que você está precisando?"
                onChangeText={(value) => {
                    setTexto(value)
                }}
            />

            <Button
                title="Adicionar Item"
                opacityValue={0.7}
                onPress={() => console.log("Clicou!")}
            />
        </View>

        <View style={styles.content}>

            <View style={styles.header}>
                {FILTER_STATUS.map(status => (
                    <Filter
                        key={status}
                        status={status}
                        isActive={status === filter}
                        onPress={() => setFilter(status)}
                    />
                ))}
                <TouchableOpacity
                    onPress={() => console.log("Clicou!")}
                    activeOpacity={0.4}
                    style={styles.clearButton}
                >
                    <Text
                        style={styles.clearText}
                    >
                        Limpar
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={ITEMS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Item
                        data={item}
                        onStatus={() => {}}
                        onRemove={() => {}}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => <Text>Nenhum item na lista :(</Text>}
            />
        </View>
    </View>
  );
}
