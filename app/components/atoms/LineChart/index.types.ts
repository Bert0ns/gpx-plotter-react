import React from "react";

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
}