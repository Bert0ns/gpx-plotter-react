import type React from "react"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import {DataLabelProps, IDataLabel} from "@/app/components/atoms/DataLabel/index.types";

const DataLabel: React.FC<DataLabelProps> = ({ label, onRemove, onUpdate }) => {
    return (
        <div className="flex items-center space-x-2 mb-2">
            <Input
                type="number"
                min="0"
                placeholder="X coordinate"
                className="w-28"
                value={label.x}
                onChange={(e: { target: { value: string | undefined; } }) => {
                    const newLabel : IDataLabel = { ...label }
                    newLabel.x = Number.parseFloat(e.target.value ? e.target.value : "0");
                    onUpdate(newLabel);
                    }}
            />
            <Input
                type="text"
                placeholder="Label text"
                className="flex-grow"
                value={label.label}
                onChange={(e: { target: { value: string; }; }) => {
                    const newLabel : IDataLabel = { ...label }
                    newLabel.label = e.target.value
                    onUpdate(newLabel);
                }}
            />
            <Input
            type="number"
            min="1"
            placeholder="Font size"
            className="w-20"
            value={label.fontSize}
            onChange={(e: { target: { value: string; } }) => {
                const newLabel : IDataLabel = { ...label }
                newLabel.fontSize = Number.parseFloat(e.target.value ? e.target.value : "0")
                onUpdate(newLabel);
            }}
            />
            <Input
                type="color"
                placeholder="Font color"
                className="w-20"
                value={label.fontColor}
                onChange={(e: { target: { value: string; } }) => {
                    const newLabel : IDataLabel = { ...label }
                    newLabel.fontColor = e.target.value
                    onUpdate(newLabel);
                }}
            />
            <Button variant="destructive" onClick={() => onRemove(label.id)}>
                Remove
            </Button>
        </div>
    )
}

export default DataLabel;

