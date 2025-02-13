import React, {useImperativeHandle, useState} from "react";
import {DragDropContext, Droppable, DropResult} from "@hello-pangea/dnd";
import FileCard from "@/app/components/atoms/FileCard";
import FileCardListProps, {FileCardListRef} from "@/app/components/FileCardList/index.types";
import {GpxSummaryData} from "@/lib/types/gpx";

const FileCardList = React.forwardRef<FileCardListRef, FileCardListProps>(({onOrderChange, onCardRemove}, ref) => {
    const [fileCardsData, setFileCardsData] = useState<GpxSummaryData[]>([]);
    const addFileCardData = (data: GpxSummaryData): void => {
        setFileCardsData((prev) => [...prev, data]);
    }
    const removeFileCardData = (cardKeyToRemove: number): void => {
        setFileCardsData((prev) => prev.filter((card) => card.key !== cardKeyToRemove));
    }

    useImperativeHandle(ref, () => ({
        addFileCardData,
    }));

    const handleRemoveCardClick = (toRemove: GpxSummaryData) => {
        removeFileCardData(toRemove.key);
        if (onCardRemove) {
            onCardRemove(toRemove.key);
        }
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newCards = Array.from(fileCardsData);
        const [reorderedItem] = newCards.splice(result.source.index, 1);
        newCards.splice(result.destination.index, 0, reorderedItem);

        setFileCardsData(newCards);
        if (onOrderChange) {
            onOrderChange(newCards);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="file-cards">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap justify-center">
                        {fileCardsData.map((card, index) => (
                            <FileCard key={card.key} value={card} index={index} onClickRemove={handleRemoveCardClick}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

FileCardList.displayName = "FileCardList";
export default FileCardList;