import { useState } from "react";
import { generateUniqueKey } from "@/lib/chartUtils";
import { IDataLabel } from "@/app/components/atoms/DataLabel/index.types";

export function useChartConfig() {
  const [displayLegend, setDisplayLegend] = useState<boolean>(true);
  const [chartLineColor, setChartLineColor] = useState<string>("#000000");
  const [chartLineBorderWidth, setChartLineBorderWidth] = useState<number>(4);
  const [chartTitleFontSize, setChartTitleFontSize] = useState<number>(20);
  const [colorChartTitle, setColorChartTitle] = useState<string>("#000000");
  const [chartTitleText, setChartTitleText] = useState<string>("My chart");
  const [chartBackgroundColor, setChartBackgroundColor] =
    useState<string>("#ffffff");
  const [chartAxisVisual, setChartAxisVisual] = useState<boolean>(true);
  const [chartPointsVisual, setChartPointsVisual] = useState<boolean>(false);
  const [chartSmoothVisual, setChartSmoothVisual] = useState<boolean>(true);
  const [dataLabels, setDataLabels] = useState<IDataLabel[]>([]);

  const addDataLabel = () => {
    setDataLabels((prev) => [
      ...prev,
      {
        id: generateUniqueKey(),
        x: 0,
        label: "",
        fontSize: 10,
        fontColor: "#000000",
      },
    ]);
  };

  const removeDataLabel = (id: number) => {
    setDataLabels((prev) => prev.filter((label) => label.id !== id));
  };

  const updateDataLabel = (updatedLabel: IDataLabel) => {
    setDataLabels((prev) =>
      prev.map((dataLabel) =>
        dataLabel.id === updatedLabel.id ? updatedLabel : dataLabel,
      ),
    );
  };

  return {
    config: {
      displayLegend,
      chartLineColor,
      chartLineBorderWidth,
      chartTitleFontSize,
      colorChartTitle,
      chartTitleText,
      chartBackgroundColor,
      chartAxisVisual,
      chartPointsVisual,
      chartSmoothVisual,
      dataLabels,
    },
    actions: {
      setDisplayLegend,
      setChartLineColor,
      setChartLineBorderWidth,
      setChartTitleFontSize,
      setColorChartTitle,
      setChartTitleText,
      setChartBackgroundColor,
      setChartAxisVisual,
      setChartPointsVisual,
      setChartSmoothVisual,
      addDataLabel,
      removeDataLabel,
      updateDataLabel,
    },
  };
}
