import { TextInput, TextInputProps } from "react-native"
import { Styles } from "./style";

type Props = TextInputProps & {
    placeholder: string;
}

export function Input({...rest}: Props) {
    return (
        <TextInput
            style={Styles.input}
            {...rest}
        />
    )
}