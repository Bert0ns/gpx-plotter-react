import LineChartProps from "@/app/components/atoms/LineChart/index.types";
import React from "react";
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {TypedChartComponent} from "@/node_modules/react-chartjs-2/dist/types";
Chart.register(CategoryScale)

const LineChart = React.forwardRef<TypedChartComponent<"line">, LineChartProps>(({chartXDataLabels, chartYData, chartTitle,
                                                                                      displayLegend, displayChartPoints, isSmoothVisual,
                                                                                     displayAxis, colorChartTitle, chartLineColor, chartLineBorderWidth
                                                                                     , chartBackgroundColor, chartTitleFontSize,
                                                                                     ...props}
                                                                                    , ref) => {

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
        responsive: true,
        maintainAspectRatio: true,
        normalized: true, //parsing: false,
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
                textAlign: 'center',
                align: 'end',
                anchor: 'end',
                padding: 0, //clamp: true,
                /*
                //clip: true,
                font: function (context) {
                    return displayDataLabelFont(context, dataLabels);
                }, display: function (context) {
                    return displayDataLabelVisualEnabler(context, dataLabels);
                }, formatter: function (value, context) {
                    return displayDataLabelVisualText(value, context, dataLabels);
                }, color: function (context) {
                    return displayDataLabelVisualColor(context, dataLabels);
                }
                */
            },
        },
    }
    const chartPlugins = [canvasBackgroundColorPlugin];

    return (
        <div {...props}>
            {/* @ts-expect-error font is not recognized as a valid type -> but it is*/}
            <Line ref={ref} data={chartData} options={chartOptions} plugins={chartPlugins} className="w-[1000px] h-[700px]"/>
        </div>
    )
})
LineChart.displayName = "LineChart";
export default LineChart;