import CheckBoxProps from "@/app/components/atoms/CheckBox/index.types";
import {FC, useState} from "react";

const CheckBox : FC<CheckBoxProps> = ({label, onChange, className, checked , title}) => {
    const [isChecked, setIsChecked] = useState(!!checked)

    const handleToggle = () => {
        const newCheckedState = !isChecked
        setIsChecked(newCheckedState)
        if (onChange) {
            onChange(newCheckedState)
        }
    }

    return (
        <label title={title ? title : "Checkbox"} className={`flex p-2 m-2 rounded-lg shadow uppercase hover:scale-105 transition-transform duration-200 ease-in-out ${className}`}>
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={isChecked} onChange={handleToggle} />
                <div
                    className={`w-6 h-6 border-2 rounded-md transition-all duration-200 ease-in-out 
                    ${ isChecked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}>
                    <svg
                        className={`w-4 h-4 text-white fill-current absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ease-in-out 
                        ${isChecked ? "opacity-100" : "opacity-0" }`}
                        viewBox="0 0 20 20">
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                </div>
            </div>
            <span className="ml-2">{label}</span>
        </label>
    )
}

export default CheckBox;