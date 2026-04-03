import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
    title: string;
    opacityValue: number; // mesmo que seje opcional de TouchableOpacityProps, aqui ela fica obrigatória
}

export function Button({ title, opacityValue, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={opacityValue} //fica aqui dentro pois controla comportamene e não conteúdo
            {...rest}
        >
            <Text style={styles.title}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}