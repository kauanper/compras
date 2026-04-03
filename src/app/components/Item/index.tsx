import {View, TouchableOpacity, Text} from "react-native";
import { Trash2 } from "lucide-react-native"

import {styles} from "./styles";
import {StatusIcon} from "../StatusIcon";
import {FilterStatus} from "../../../types/FilterStatus";

type ItemData = {
    status: FilterStatus;
    description: string;
}

type Props = {
    data: ItemData;
    onStatus: () => void,
    onRemove: () => void,
}

export function Item({data, onStatus, onRemove}: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.4}
                onPress={onStatus}
            >
                <StatusIcon
                    status={data.status}
                />
            </TouchableOpacity>

            <Text style={styles.description}>
                {data.description}
            </Text>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onRemove}
            >
                <Trash2
                    color="#828282"
                    size={18}
                />
            </TouchableOpacity>
        </View>
    )
}