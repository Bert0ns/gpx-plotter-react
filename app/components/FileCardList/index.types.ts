import FileCardProps from "@/app/components/atoms/FileCard/index.types";
import React from "react";

export default interface FileCardListProps {
    cards: FileCardProps["value"][];
    setCards: React.Dispatch<React.SetStateAction<FileCardProps["value"][]>>;
}