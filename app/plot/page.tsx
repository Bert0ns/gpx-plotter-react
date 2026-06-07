"use client";

import FileSelector from "@/app/components/atoms/FileSelector";
import { RefObject, useRef } from "react";
import { Button } from "@/app/components/ui/button";
import LineChart from "@/app/components/atoms/LineChart";
import VisibleDiv from "@/app/components/atoms/VisibleDiv";
import FileCardList from "@/app/components/FileCardList";
import { FileCardListRef } from "@/app/components/FileCardList/index.types";
import { HowItWorks } from "@/app/components/atoms/HowItWorks";
import ChartControls from "@/app/components/ChartControls";
import { useGpxFiles } from "@/app/hooks/useGpxFiles";
import { useChartConfig } from "@/app/hooks/useChartConfig";

export default function PlotPage() {
  const fileCardListRef = useRef<FileCardListRef>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  const {
    elevationPoints,
    distancePoints,
    isChartVisible,
    isButtonPlotElevationVisible,
    handleSelectedFiles,
    removeFileGpxParsed,
    handleOrderChange,
    handleButtonPlotElevationClick,
  } = useGpxFiles(fileCardListRef);

  const { config, actions } = useChartConfig();

  function downloadChartImage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    chartRef: RefObject<any>,
  ): void {
    if (chartRef.current) {
      const link = document.createElement("a");
      link.download = "chart.png";
      link.href = chartRef.current.toBase64Image();
      link.click();
      link.remove();
    }
  }

  return (
    <main>
      <div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl text-center">
          Plot here your tracks
        </h1>
      </div>
      <HowItWorks />
      <FileSelector
        onFileSelect={handleSelectedFiles}
        value="Upload .gpx Files"
        title="Click to upload one or more .gpx files"
      />
      <FileCardList
        ref={fileCardListRef}
        onOrderChange={handleOrderChange}
        onCardRemove={removeFileGpxParsed}
      />

      <VisibleDiv
        className="flex justify-center m-4"
        isVisible={isButtonPlotElevationVisible}
      >
        <Button
          onClick={handleButtonPlotElevationClick}
          variant="default"
          size="lg"
          title="Click to plot the tracks elevation on a chart"
        >
          Plot elevation
        </Button>
      </VisibleDiv>

      <VisibleDiv
        className="flex flex-col justify-center m-4"
        isVisible={isChartVisible}
      >
        <LineChart
          title={"Line chart that shows your track elevation over time"}
          className="p-1 w-full h-[80vh] shadow-2xl rounded-lg border-2 border-gray-300"
          chartXDataLabels={distancePoints}
          chartYData={elevationPoints}
          chartTitle={config.chartTitleText}
          displayLegend={config.displayLegend}
          chartLineColor={config.chartLineColor}
          chartLineBorderWidth={config.chartLineBorderWidth}
          colorChartTitle={config.colorChartTitle}
          chartTitleFontSize={config.chartTitleFontSize}
          chartBackgroundColor={config.chartBackgroundColor}
          displayAxis={config.chartAxisVisual}
          displayChartPoints={config.chartPointsVisual}
          isSmoothVisual={config.chartSmoothVisual}
          ref={chartRef}
          isResponsive={true}
          dataLabels={config.dataLabels}
          animationsEnabled={distancePoints.length < 3000}
        />

        <ChartControls config={config} actions={actions} />

        <div className="flex justify-center">
          <Button
            variant="default"
            size="lg"
            onClick={() => downloadChartImage(chartRef)}
            title="Click to download the chart a .png image"
            className="mt-4"
          >
            Download chart Image
          </Button>
        </div>
      </VisibleDiv>
    </main>
  );
}
