import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import FileCard from "@/app/components/atoms/FileCard";
import FileCardListProps from "@/app/components/FileCardList/index.types";

const FileCardList: React.FC<FileCardListProps> = ({ cards, setCards, onOrderChange }) => {
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const newCards = Array.from(cards);
        const [reorderedItem] = newCards.splice(result.source.index, 1);
        newCards.splice(result.destination.index, 0, reorderedItem);

        setCards(newCards);
        if (onOrderChange) {
            onOrderChange(newCards);
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="file-cards">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-wrap justify-center">
                        {cards.map((card, index) => (
                            <FileCard key={card.key} value={card} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default FileCardList;