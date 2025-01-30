export default interface FileSelectorProps {
    onFileSelect: (files: FileList | null) => void;
    value: string;
}