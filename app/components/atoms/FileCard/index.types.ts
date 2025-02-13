import {GpxSummaryData} from "@/lib/types/gpx";

export default interface FileCardProps {
    value : GpxSummaryData
    index : number
    onClickRemove : (value: GpxSummaryData) => void
}