import LineChartProps from "@/app/components/atoms/LineChart/index.types";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Plugin, CategoryScale, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(CategoryScale, ChartDataLabels);

const EPSILON = 0.05; // Tolerance for floating point comparison

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LineChart = React.forwardRef<any, LineChartProps>(
  (
    {
      chartXDataLabels,
      chartYData,
      chartTitle,
      displayLegend,
      displayChartPoints,
      isSmoothVisual,
      displayAxis,
      colorChartTitle,
      chartLineColor,
      chartLineBorderWidth,
      chartBackgroundColor,
      chartTitleFontSize,
      isResponsive,
      dataLabels,
      animationsEnabled,
      ...props
    },
    ref,
  ) => {
    const defaultLabelTextColor = "#000000";

    const chartData = {
      labels: chartXDataLabels,
      datasets: [
        {
          label: "Elevation",
          data: chartYData,
          radius: displayChartPoints ? 3 : 0,
          tension: isSmoothVisual ? 0.4 : 0,
          borderColor: chartLineColor ? chartLineColor : "#000000",
          backgroundColor: "#ffffff",
          borderWidth: chartLineBorderWidth ? chartLineBorderWidth : 2,
        },
      ],
    };

    const canvasBackgroundColorPlugin: Plugin<"line"> = {
      id: "canvasBackgroundColor",
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ctx.fillStyle = (options as any).color || "#ffffff";
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findLabelForContext = (context: any) => {
      if (!dataLabels) return undefined;
      const xVal = Number(context.chart.data.labels?.[context.dataIndex]);
      return dataLabels.find((label) => Math.abs(xVal - label.x) < EPSILON);
    };

    const chartOptions: ChartOptions<"line"> = {
      responsive: isResponsive !== undefined ? isResponsive : false,
      maintainAspectRatio: false,
      normalized: true,
      animation: animationsEnabled === false ? false : undefined,
      scales: {
        x: {
          display: displayAxis !== undefined ? displayAxis : true,
          ticks: { maxTicksLimit: 10 },
        },
        y: {
          display: displayAxis !== undefined ? displayAxis : true,
          ticks: { maxTicksLimit: 12 },
        },
      },
      layout: { padding: 4 },
      plugins: {
        legend: {
          display: displayLegend !== undefined ? displayLegend : true,
        },
        title: {
          display: !!chartTitle,
          text: chartTitle || "",
          color: colorChartTitle || "#000000",
          font: {
            weight: "bold",
            family: "Roboto, sans-serif",
            size: chartTitleFontSize || 20,
          },
        },
        // @ts-expect-error custom plugin property
        canvasBackgroundColor: {
          color: chartBackgroundColor || "#ffffff",
        },
        datalabels: {
          align: "top",
          anchor: "end",
          font: (context) => {
            const font = {
              weight: "bold" as const,
              family: "Roboto, sans-serif",
              size: 10,
            };
            const label = findLabelForContext(context);
            if (label) font.size = label.fontSize;
            return font;
          },
          color: (context) => {
            const label = findLabelForContext(context);
            return label ? label.fontColor : defaultLabelTextColor;
          },
          display: (context) => {
            return !!findLabelForContext(context);
          },
          formatter: (value, context) => {
            const label = findLabelForContext(context);
            return label ? label.label : "";
          },
        },
      },
    };

    const chartPlugins = [canvasBackgroundColorPlugin];

    return (
      <div {...props}>
        <Line
          ref={ref}
          data={chartData}
          options={chartOptions}
          plugins={chartPlugins}
          className="w-[1000px] h-[700px]"
        />
      </div>
    );
  },
);

LineChart.displayName = "LineChart";
export default LineChart;
