import { useState } from "react";
import { View } from "react-native";
import { keyboardStyles } from "./keyboard.style";
import { generateKeyboardButtons, generateSpecialKeyboardButtons } from "./utils";
import { KeyboardItem } from "./keyboard-item/keyboard-item";

const Keyboard = ({ onPress }: { onPress: (value: string) => void }) => {
    const [selected, setSelected] = useState({ triple: false, double: false });
    return (
        <View style={keyboardStyles.container}>
            <View style={keyboardStyles.grid}>
                {generateKeyboardButtons(selected.triple)}
                {generateSpecialKeyboardButtons(selected, setSelected)}
                <KeyboardItem
                    key="undo-button"
                    label="UNDO"
                    isSpecial={true}
                    color="#ffa098"
                    selected={true}
                />
            </View>
        </View>
    );
};

export { Keyboard };
