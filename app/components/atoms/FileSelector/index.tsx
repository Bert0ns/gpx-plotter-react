"use client"
import FileSelectorProps from "@/app/components/atoms/FileSelector/index.types";
import {ChangeEvent, FC, useRef} from "react";

const FileSelector: FC<FileSelectorProps> = ({onFileSelect, value, title }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        if(fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles : FileList | null = event.target.files;
        onFileSelect(selectedFiles);
    };

    return (
        <div className="flex justify-center mb-4 lg:scale-110 md:scale-105 scale-95">
            <div className="relative group">
                <button onClick={handleUploadClick} title={title} className="relative inline-block p-[2px] font-semibold leading-6 text-white bg-gradient-to-r from-violet-700 to-violet-400 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
                    <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
                    <span className="relative z-10 block px-6 py-3 rounded-xl bg-gradient-to-r from-violet-800 to-violet-500">
                        <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1">{value}</span>

                            <svg className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                 data-slot="icon" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd"
                                      d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                      fillRule="evenodd"/>
                            </svg>
                        </div>
                    </span>
                </button>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".gpx" multiple />
            </div>
        </div>
    );
};

export default FileSelector;