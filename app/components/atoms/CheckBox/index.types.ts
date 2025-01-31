export default interface CheckBoxProps {
    label: string;
    onChange?: (checked: boolean) => void;
    className?: string;
    checked?: boolean;
    title?: string;
}