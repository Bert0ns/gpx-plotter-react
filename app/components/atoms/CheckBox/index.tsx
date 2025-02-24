import CheckBoxProps from "@/app/components/atoms/CheckBox/index.types";
import {FC, useState} from "react";
import {Button} from "@/app/components/ui/button";

const CheckBox: FC<CheckBoxProps> = ({label, onChange, className, checked, title}) => {
    const [isChecked, setIsChecked] = useState(!!checked)

    const handleToggle = () => {
        const newCheckedState = !isChecked
        setIsChecked(newCheckedState)
        if (onChange) {
            onChange(newCheckedState)
        }
    }

    return (
        <Button title={title ? title : "Checkbox"} variant="checkbox" onClick={handleToggle} className={className}>
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={isChecked} onChange={handleToggle}/>
                <div className={`w-5 h-5 border-2 rounded-md transition-all duration-200 ease-in-out ${isChecked ? "bg-primary border-primary" : "bg-white border-gray-300"}`}>
                    <svg
                        className={`w-4 h-4 text-white fill-current absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-in-out 
                        ${isChecked ? "opacity-100" : "opacity-0"}`}
                        viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                    </svg>
                </div>
            </div>
            <span className="ml-2">{label}</span>
        </Button>
    )
}

export default CheckBox;