import {Alert, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
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
    const [itens, setItens] = useState<any>([]);

    function handlerAddList(): void {
        // 1. Validação (impede adicionar texto vazio)
        if (!texto.trim()) {
            return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
        }

        // 2. Criação do Objeto (Note as chaves {})
        const newItem = {
            id: Math.random().toString(36).substring(2),
            description: texto, // Supondo que 'texto' é o seu estado do Input
            status: FilterStatus.PENDING
        };

        // 3. Atualização da Lista (Mantém os anteriores + o novo)
        setItens((prevState: any[]) => [...prevState, newItem]);

        // 4. Dica: Limpar o campo de texto após adicionar
        setTexto("");
    }

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
                onPress={() => handlerAddList()}
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
                data={itens}
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
