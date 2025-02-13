import FileCardProps from "@/app/components/atoms/FileCard/index.types";
import {GpxSummaryData} from "@/lib/types/gpx";

export default interface FileCardListProps {
    onOrderChange?: (newOrder: FileCardProps["value"][]) => void;
    onCardRemove?: (removedCardKey: number) => void;
}

export interface FileCardListRef {
    addFileCardData: (data: GpxSummaryData) => void
}