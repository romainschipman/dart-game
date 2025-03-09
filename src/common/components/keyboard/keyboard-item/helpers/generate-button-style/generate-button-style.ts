interface GenerateButtonStyleParams {
    isSpecial?: boolean;
    buttonSize: number;
    color?: string;
    selected?: boolean;
    disabled?: boolean;
}
/**
 * Generates the style object for a button based on its state and parameters.
 *
 * @param {GenerateButtonStyleParams} params - Parameters to configure the button style.
 * @param {boolean} [params.isSpecial] - Indicates if the button is a special type (e.g., double or triple score).
 * @param {number} params.buttonSize - The base size of the button.
 * @param {string} [params.color] - The color to use when the button is selected.
 * @param {boolean} [params.selected] - Indicates if the button is currently selected.
 * @param {boolean} [params.disabled] - Indicates if the button is disabled.
 *
 * @returns The style object for the button.
 */
const generateButtonStyle = (
    { isSpecial, buttonSize, color, selected, disabled } : GenerateButtonStyleParams
) => {
    if(disabled) {
        return { width: buttonSize, height: buttonSize, backgroundColor: "#eaeaea" };
    }
    if(isSpecial) {
        const backgroundColor = selected ? color : "#f8f8f8";
        return { width: buttonSize * 2 + 10, height: buttonSize, backgroundColor };
    }
    return { width: buttonSize, height: buttonSize };
};

export { generateButtonStyle };