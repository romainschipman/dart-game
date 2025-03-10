import { KeyboardItem } from "../../keyboard-item/keyboard-item";
import { config, DOUBLE_LABEL, TRIPLE_LABEL } from "../../../../config";

interface SelectedButtons {
    double: boolean;
    triple: boolean;
}

const labels : Record<typeof DOUBLE_LABEL | typeof TRIPLE_LABEL, keyof SelectedButtons>= {
    [DOUBLE_LABEL]: "double",
    [TRIPLE_LABEL]: "triple",
};

const generateSpecialKeyboardButtons = (
    selectedButtons: SelectedButtons,
    onSelectedButtonChange: (selectedButtons: SelectedButtons) => void
) => {
    const handleChange = (label: keyof SelectedButtons) => {
        onSelectedButtonChange({ double: false, triple: false, [label]: !selectedButtons[label] });
    };
    
    return config.score.specialButtons.map(({ label, color }) => {
        const isSelected = selectedButtons[labels[label]];
        return (
            <KeyboardItem
                key={label}
                label={label}
                isSpecial={true}
                selected={isSelected}
                color={color}
                onPress={() => handleChange(labels[label])}
            />
        )
    });
};

export { generateSpecialKeyboardButtons };