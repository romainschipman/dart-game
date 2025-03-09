/**
 * Generates the style object for text based on its state and parameters.
 *
 * @param {boolean} [isSpecial] - Indicates if the text is associated with a special button.
 * @param {boolean} [selected] - Indicates if the associated button is selected.
 * @param {boolean} [disabled] - Indicates if the associated button is disabled.
 *
 * @returns The style object for the text.
 */
const generateTextStyle = (isSpecial?: boolean, selected?: boolean, disabled?: boolean) : Record<string, string | number> => {
    if(disabled) {
        return { color: "#939393" };
    }
    if(isSpecial) {
        const color = selected ? "white" : "#aaaaaa";
        return { color, fontWeight: 800 };
    }
    return {};
};

export { generateTextStyle };