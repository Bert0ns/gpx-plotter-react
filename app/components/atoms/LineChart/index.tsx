import LineChartProps from "@/app/components/atoms/LineChart/index.types";
import React from "react";
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"
import {TypedChartComponent} from "@/node_modules/react-chartjs-2/dist/types";
Chart.register(CategoryScale, ChartDataLabels)


const LineChart = React.forwardRef<TypedChartComponent<"line">, LineChartProps>((
{
chartXDataLabels, chartYData, chartTitle,
displayLegend, displayChartPoints, isSmoothVisual,
displayAxis, colorChartTitle, chartLineColor, chartLineBorderWidth
, chartBackgroundColor, chartTitleFontSize, isResponsive, dataLabels, animationsEnabled,
...props
}
, ref) => {
    const defaultLabelTextColor = "#000000";

    const chartData = {
        labels: chartXDataLabels,
        datasets: [{
            label: 'Elevation',
            data: chartYData,
            radius: displayChartPoints ? 3 : 0,
            tension: isSmoothVisual ? 0.4 : 0,
            borderColor: chartLineColor ? chartLineColor : "#000000",
            backgroundColor: '#ffffff',
            borderWidth: chartLineBorderWidth ? chartLineBorderWidth : 2,
        }]
    }
    const canvasBackgroundColorPlugin = {
        id: 'canvasBackgroundColor', beforeDraw : (chart: never, args : never, options : never) => {
            const {ctx} = chart;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctx.save();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctx.globalCompositeOperation = 'destination-over';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctx.fillStyle = options.color || '#ffffff';
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctx.fillRect(0, 0, chart.width, chart.height);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ctx.restore();
        }
    }
    const chartOptions = {
        responsive: isResponsive !== undefined ? isResponsive : false,
        maintainAspectRatio: false,
        normalized: true, //parsing: false,
        animation: animationsEnabled !== undefined ? animationsEnabled : true,
        scales: {
            x: {
                display: displayAxis !== undefined ? displayAxis : true, ticks: {
                    maxTicksLimit: 10,
                },
            }, y: {
                display: displayAxis !== undefined ? displayAxis : true, ticks: {
                    maxTicksLimit: 12,
                },
            },
        }, layout: {
            padding: 4,
        },
        plugins: {
            legend: {
                display: displayLegend !== undefined ? displayLegend : true,
            },
            title: {
                display: !!chartTitle,
                text: chartTitle ? chartTitle : "",
                color: colorChartTitle ? colorChartTitle : "#000000",
                font: {
                    weight: 'bold',
                    family: 'Roboto, sans-serif',
                    size: chartTitleFontSize ? chartTitleFontSize : 20,
                },
            }, canvasBackgroundColor: {
                color: chartBackgroundColor ? chartBackgroundColor : "#ffffff",
            }, datalabels: {
                //textAlign: 'center',
                align: 'top' as const,
                anchor: 'end' as const,
                //padding: 0,

                //clamp: true,
                //clip: true,
                // @ts-expect-error context
                font: function (context) {
                    const font = {
                        weight: 'bold',
                        family: 'Roboto, sans-serif',
                        size: 10,
                    }
                    if (dataLabels === undefined) {return font}
                    const label = dataLabels.find(label => context.chart.data.labels[context.dataIndex] === label.x);
                    if (label === undefined) {return font}
                    font.size = label.fontSize
                    return font
                },
                // @ts-expect-error context
                color: function (context) {
                    if (dataLabels === undefined) {return defaultLabelTextColor}
                    const label = dataLabels.find((label) => label.x === context.chart.data.labels[context.dataIndex])
                    return label ? label.fontColor : defaultLabelTextColor
                },
                // @ts-expect-error context
                display: (context) => {
                    if (dataLabels === undefined) { return false; }
                    return dataLabels.some((label) => label.x === context.chart.data.labels[context.dataIndex])
                },
                // @ts-expect-error context
                formatter: (value: never, context) => {
                    if (dataLabels === undefined) { return ""; }
                    const label = dataLabels.find((label) => label.x === context.chart.data.labels[context.dataIndex])
                    return label ? label.label : ""
                },
            },
        },
    }
    const chartPlugins = [canvasBackgroundColorPlugin];

    return (
        <div {...props}>
            {/* @ts-expect-error font is not recognized as a valid type -> but it is*/}
            <Line ref={ref} data={chartData} options={chartOptions} plugins={chartPlugins} className="w-[1000px] h-[700px]"/>
            {/* To block the auto resizing of the chart
            <div className="relative w-full overflow-x-auto">
            <div className="min-w-[1000px]">
            <Line
                ref={ref}
                data={chartData}
                options={chartOptions}
                plugins={chartPlugins}
                className="w-[1000px] h-[700px]"
            />
            </div>
            </div>

            */}
        </div>
    )
})
LineChart.displayName = "LineChart";
export default LineChart;