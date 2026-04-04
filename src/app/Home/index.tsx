import {Alert, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useState, useEffect} from "react";

import {styles} from "./styles";
import {Button} from "../components/Button"
import {Input} from "../components/Input";
import {Filter} from "../components/Filter";
import {FilterStatus} from "../../types/FilterStatus";
import {Item} from "../components/Item";
import {itemsStorage, ItemStorage} from "../../storages/itensStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING]

export default function Home() {
    const [filter, setFilter] = useState(FilterStatus.PENDING);
    const [texto, setTexto] = useState("");
    const [itens, setItens] = useState<ItemStorage[]>([]);

    async function handlerAddList(): Promise<void> {
        // 1. Validação (impede adicionar texto vazio)
        if (!texto.trim()) {
            return Alert.alert("Adicionar", "Informe a descrição para adicionar.");
        }

        // 2. Criação do Objeto (Note as chaves {})
        const newItem = {
            id: Math.random().toString(36).substring(2),
            description: texto,
            status: FilterStatus.PENDING
        };

        Alert.alert("Item Adicionado", `${texto} adicionado com sucesso`);
        await itemsStorage.add(newItem);
        await loadData()

        // 4. Dica: Limpar o campo de texto após adicionar
        setTexto("");
    }

    async function loadData() {
        try {
            const response = await itemsStorage.getByStatus(filter);
            setItens(response);
        } catch (err) {
            console.log(err);
            Alert.alert("Erro", "Não foi possível carregar os dados.");
        }
    }

    useEffect(() => {
        loadData();
    }, [filter]);

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
                value={texto}
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
