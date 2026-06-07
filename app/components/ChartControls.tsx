import { Button } from "@/app/components/ui/button";
import CheckBox from "@/app/components/atoms/CheckBox";
import DataLabel from "@/app/components/atoms/DataLabel";
import { IDataLabel } from "@/app/components/atoms/DataLabel/index.types";

interface ChartConfig {
  displayLegend: boolean;
  chartLineColor: string;
  chartLineBorderWidth: number;
  chartTitleFontSize: number;
  colorChartTitle: string;
  chartTitleText: string;
  chartBackgroundColor: string;
  chartAxisVisual: boolean;
  chartPointsVisual: boolean;
  chartSmoothVisual: boolean;
  dataLabels: IDataLabel[];
}

interface ChartActions {
  setDisplayLegend: (val: boolean) => void;
  setChartLineColor: (val: string) => void;
  setChartLineBorderWidth: (val: number) => void;
  setChartTitleFontSize: (val: number) => void;
  setColorChartTitle: (val: string) => void;
  setChartTitleText: (val: string) => void;
  setChartBackgroundColor: (val: string) => void;
  setChartAxisVisual: (val: boolean) => void;
  setChartPointsVisual: (val: boolean) => void;
  setChartSmoothVisual: (val: boolean) => void;
  addDataLabel: () => void;
  removeDataLabel: (id: number) => void;
  updateDataLabel: (label: IDataLabel) => void;
}

interface ChartControlsProps {
  config: ChartConfig;
  actions: ChartActions;
}

export default function ChartControls({ config, actions }: ChartControlsProps) {
  return (
    <>
      <div className="space-y-4 mt-4 p-2 shadow-2xl rounded-lg border-2 border-gray-300">
        <Button onClick={actions.addDataLabel}>Add Data Label</Button>
        {config.dataLabels.map((dataLabel) => (
          <DataLabel
            key={dataLabel.id}
            label={dataLabel}
            onRemove={actions.removeDataLabel}
            onUpdate={actions.updateDataLabel}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col items-center shadow-2xl rounded-lg border-2 border-gray-300">
        <div className="flex flex-wrap flex-row space-x-2 space-y-2">
          <CheckBox
            onChange={actions.setDisplayLegend}
            checked={config.displayLegend}
            label={"Display Legend"}
            title="Show or hide the chart legend"
            className="ml-2 mt-2"
          />
          <CheckBox
            onChange={actions.setChartAxisVisual}
            checked={config.chartAxisVisual}
            label={"Show Axis"}
            title="Show or hide the chart axis"
          />
          <CheckBox
            onChange={actions.setChartPointsVisual}
            checked={config.chartPointsVisual}
            label={"Show Points"}
            title="Show or hide the points on the chart"
          />
          <CheckBox
            onChange={actions.setChartSmoothVisual}
            checked={config.chartSmoothVisual}
            label={"Smooth Chart"}
            title="Make the line chart smoother"
          />
        </div>

        <div className="mt-2 mr-2 ml-2 flex flex-row flex-wrap items-center space-x-4 rounded-lg p-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
          <label className="text-sm font-medium flex items-center space-x-2">
            <span>Line color</span>
            <input
              type="color"
              onChange={(e) => actions.setChartLineColor(e.target.value)}
              value={config.chartLineColor}
              title="Change the color of the line on the chart"
              className="w-12 h-8 overflow-hidden cursor-pointer"
            />
          </label>

          <label className="text-sm font-medium flex items-center space-x-2">
            <span>Width</span>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                onChange={(e) =>
                  actions.setChartLineBorderWidth(parseInt(e.target.value, 10))
                }
                value={config.chartLineBorderWidth}
                id="widthLineChart"
                min="1"
                max="35"
                title="Change the width of the line on the chart"
                className="w-16 px-2 py-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              />
              <span className="text-sm">px</span>
            </div>
          </label>
        </div>

        <label className="m-2 mb-0 rounded-lg p-2 flex items-center justify-between space-x-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
          <span>Background color</span>
          <input
            type="color"
            onChange={(e) => actions.setChartBackgroundColor(e.target.value)}
            value={config.chartBackgroundColor}
            title="Change the chart background color"
          />
        </label>

        <label className="m-2 rounded-lg p-2 flex flex-wrap items-center justify-between space-x-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
          <div className="space-x-2">
            <span>Show title</span>
            <input
              type="text"
              onChange={(e) => actions.setChartTitleText(e.target.value)}
              value={config.chartTitleText}
              title="Change the chart title"
              className="p-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            />
          </div>
          <input
            type="color"
            onChange={(e) => actions.setColorChartTitle(e.target.value)}
            value={config.colorChartTitle}
            title="Change chart title color"
            className="cursor-pointer"
          />
          <div className="space-x-2">
            <input
              type="number"
              onChange={(e) =>
                actions.setChartTitleFontSize(parseInt(e.target.value, 10))
              }
              value={config.chartTitleFontSize}
              min="2"
              max="70"
              className="p-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
              title="Change chart title font size"
            />
            <span className="text-sm">px</span>
          </div>
        </label>
      </div>
    </>
  );
}
