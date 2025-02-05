export interface DataLabelProps {
    label: IDataLabel
    onRemove: (id: number) => void
    onUpdate: (updatedDataLabel : IDataLabel) => void
}

export interface IDataLabel {
    id: number
    x: number
    label: string
    fontSize: number
    fontColor: string
}