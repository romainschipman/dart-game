import { KeyboardItem } from "../../keyboard-item/keyboard-item";
import { config } from "../../../../config";

const generateKeyboardButtons = (isTriple: boolean) => (
    config.score.buttons.map((score) => (
        <KeyboardItem key={score} label={score} disabled={score === 25 && isTriple} />
    ))
);

export { generateKeyboardButtons };