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
                className="max-w-28 min-w-16"
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
                className="flex-grow min-w-8"
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
            className="max-w-20 min-w-14"
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
                className="max-w-16 min-w-4 p-0"
                value={label.fontColor}
                onChange={(e: { target: { value: string; } }) => {
                    const newLabel : IDataLabel = { ...label }
                    newLabel.fontColor = e.target.value
                    onUpdate(newLabel);
                }}
            />
            <Button variant="destructive" size="sm" onClick={() => onRemove(label.id)}>
                Remove
            </Button>
        </div>
    )
}

export default DataLabel;

