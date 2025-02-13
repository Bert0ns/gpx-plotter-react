import React from "react";
import {IDataLabel} from "@/app/components/atoms/DataLabel/index.types";

export default interface LineChartProps extends React.HTMLProps<HTMLDivElement> {
    chartXDataLabels: number[];
    chartYData: number[];
    chartTitle?: string
    displayLegend?: boolean
    displayAxis?: boolean
    colorChartTitle?: string
    chartLineColor?: string
    chartLineBorderWidth?: number
    chartBackgroundColor?: string
    chartTitleFontSize?: number
    displayChartPoints?: boolean
    isSmoothVisual?: boolean
    isResponsive?: boolean
    dataLabels?: IDataLabel[]
    animationsEnabled?: boolean
}