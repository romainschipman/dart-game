import { FunctionComponent } from "react";
import { TouchableOpacity, Text, Dimensions } from "react-native";
import { keyboardItemStyles } from "./keyboard-item.style";
import { generateButtonStyle, generateTextStyle } from "./helpers";

interface KeyboardItemProps {
    label: number | string;
    isSpecial?: boolean;
    color?: string;
    disabled?: boolean;
    selected?: boolean;
    onPress?: (label: string | number) => void;
}

const KeyboardItem: FunctionComponent<KeyboardItemProps> = (
    { label, isSpecial, color, onPress= () => {}, selected, disabled }
) => {
    const { width } = Dimensions.get("window");
    const buttonSize = Math.floor(width / 7) - 10;

    const onClick = () => {
      if(!disabled) onPress(label);
    };

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                keyboardItemStyles.container,
                {...generateButtonStyle({ isSpecial, buttonSize, color, selected, disabled })},
            ]}
        >
            <Text style={[
                keyboardItemStyles.text,
                {...generateTextStyle(isSpecial, selected, disabled)}
            ]}>{label}</Text>
        </TouchableOpacity>
    )
}

export { KeyboardItem };