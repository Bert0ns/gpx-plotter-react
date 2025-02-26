"use client"

import FileSelector from "@/app/components/atoms/FileSelector";
import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {readFile} from "@/lib/fileUtils";
import {extractFileParsedData, getDataPointsAxis, parseGPX} from "@/lib/gpxUtils";
import {FileGpx, GpxSummaryData} from "@/lib/types/gpx";
import {Button} from "@/app/components/ui/button";
import {generateUniqueKey} from "@/lib/chartUtils";
import LineChart from "@/app/components/atoms/LineChart";
import VisibleDiv from "@/app/components/atoms/VisibleDiv";
import CheckBox from "@/app/components/atoms/CheckBox";
import {TypedChartComponent} from "@/node_modules/react-chartjs-2/dist/types";
import FileCardList from "@/app/components/FileCardList";
import DataLabel from "@/app/components/atoms/DataLabel";
import {IDataLabel} from "@/app/components/atoms/DataLabel/index.types";
import {FileCardListRef} from "@/app/components/FileCardList/index.types";
import {HowItWorks} from "@/app/components/atoms/HowItWorks";

export default function PlotPage() {
    const fileCardListRef = useRef<FileCardListRef>(null);
    const chartRef = useRef<TypedChartComponent<"line">>(null)
    const [elevationPoints, setElevationPoints] = useState<number[]>([100, 150, 400, 50, 50]);
    const [distancePoints, setDistancePoints] = useState<number[]>([55, 1000, 3000, 3333, 4444]);
    const [displayLegend, setDisplayLegend] = useState<boolean>(true);
    const [chartLineColor, setChartLineColor] = useState<string>("#000000")
    const [chartLineBorderWidth, setChartLineBorderWidth] = useState<number>(4);
    const [chartTitleFontSize, setChartTitleFontSize] = useState<number>(20);
    const [colorChartTitle, setColorChartTitle] = useState<string>("#000000");
    const [chartTitleText, setChartTitleText] = useState<string>("My chart");
    const [chartBackgroundColor, setChartBackgroundColor] = useState<string>("#ffffff")
    const [chartAxisVisual, setChartAxisVisual] = useState<boolean>(true);
    const [chartPointsVisual, setChartPointsVisual] = useState<boolean>(false);
    const [chartSmoothVisual, setChartSmoothVisual] = useState<boolean>(true);

    const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
    const [isButtonPlotElevationVisible, setIsButtonPlotElevationVisible] = useState<boolean>(false);

    const [filesGpxParsed, setFilesGpxParsed] = useState<FileGpx[]>([]);
    const addFileGpxParsed = (file: FileGpx): void => {
        setFilesGpxParsed((prev) => [...prev, file]);
    }
    const removeFileGpxParsed = (fileKeyToRemove: number): void => {
        setFilesGpxParsed((prev) => prev.filter((file) => file.key !== fileKeyToRemove));
    }

    function downloadChartImage(chartRef: RefObject<TypedChartComponent<"line"> | null>): void {
        if (chartRef.current) {
            //console.log({...chartRef.current})
            const link = document.createElement("a")
            link.download = "chart.png"
            // @ts-expect-error exists
            link.href = chartRef.current.toBase64Image();
            link.click();
            link.remove();
        }
    }

    async function handleSelectedFiles(files: FileList | null): Promise<void> {
        if (!files || files.length === 0) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            try {
                const fileString = await readFile(files[i]);
                if (!fileString) {
                    return;
                }
                const fileParsed = parseGPX(fileString);
                if (!fileParsed) {
                    console.error("Could not parse file");
                    return;
                }
                const fileGpx: FileGpx = {
                    fileParsed: fileParsed,
                    key: generateUniqueKey(),
                };
                addFileGpxParsed(fileGpx);
                const fileData = extractFileParsedData(fileGpx.fileParsed, fileGpx.key);

                if (fileCardListRef.current) {
                    fileCardListRef.current.addFileCardData(fileData);
                }

            } catch (err) {
                console.error("Error processing file:", err);
            }
        }
        setIsButtonPlotElevationVisible(true);
    }

    const updateDataInChart = useCallback(() => {
        const {elevPoints, distPoints} = getDataPointsAxis(filesGpxParsed.map(file => file.fileParsed));
        setElevationPoints(elevPoints);
        setDistancePoints(distPoints);
    }, [filesGpxParsed]);

    useEffect(() => {
        if (filesGpxParsed.length === 0) {
            setIsButtonPlotElevationVisible(false);
            setIsChartVisible(false);
        }
        if (isChartVisible) {
            updateDataInChart();
        }
    }, [filesGpxParsed, isChartVisible, updateDataInChart])

    function handleButtonPlotElevationClick() {
        if (!filesGpxParsed || filesGpxParsed.length === 0) {
            return;
        }
        updateDataInChart();
        setIsChartVisible(true);
    }

    function handleOrderChange(newOrder: GpxSummaryData[]) {
        if (newOrder.length !== filesGpxParsed.length) {
            console.error("Arrays must have the same length.", {newOrder, filesGpxParsed});
            return;
        }

        const orderMap = new Map();
        const key = "key";
        for (let i = 0; i < newOrder.length; i++) {
            orderMap.set(newOrder[i][key], i);
        }

        const reorderedFilesGpxParsed = new Array(filesGpxParsed.length);
        for (let i = 0; i < filesGpxParsed.length; i++) {
            const index = orderMap.get(filesGpxParsed[i][key]);
            if (index === undefined) {
                throw new Error(`Key '${filesGpxParsed[i][key]}' not found in the first array.`);
            }
            reorderedFilesGpxParsed[index] = filesGpxParsed[i];
        }
        console.log({old_order: filesGpxParsed, new_order: reorderedFilesGpxParsed});
        setFilesGpxParsed(reorderedFilesGpxParsed);
        if (isChartVisible) {
            updateDataInChart()
        }
    }

    const [dataLabels, setDataLabels] = useState<IDataLabel[]>([])
    const addDataLabel = () => {
        setDataLabels([...dataLabels, {id: generateUniqueKey(), x: 0, label: "", fontSize: 10, fontColor: "#000000"}])
    }
    const removeDataLabel = (id: number) => {
        setDataLabels(dataLabels.filter((label) => label.id !== id))
    }
    const updateDataLabel = ({id, x, label, fontSize, fontColor}: IDataLabel) => {
        setDataLabels(dataLabels.map((dataLabel) => (dataLabel.id === id ? {
            ...dataLabel,
            x,
            label,
            fontSize,
            fontColor
        } : dataLabel)))
    }

    return (
        <main>
            <div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl text-center">Plot here your tracks</h1>
            </div>
            <HowItWorks/>
            <FileSelector onFileSelect={handleSelectedFiles} value="Upload .gpx Files"
                          title="Click to upload one or more .gpx files"/>
            <FileCardList ref={fileCardListRef} onOrderChange={handleOrderChange} onCardRemove={removeFileGpxParsed}/>

            <VisibleDiv className="flex justify-center m-4" isVisible={isButtonPlotElevationVisible}>
                <Button onClick={handleButtonPlotElevationClick} variant="default" size="lg"
                        title="Click to plot the tracks elevation on a chart">Plot elevation</Button>
            </VisibleDiv>

            <VisibleDiv className="flex flex-col justify-center m-4" isVisible={isChartVisible}>
                <LineChart title={"Line chart that shows your track elevation over time"}
                           className="p-1 w-full h-[80vh] shadow-2xl rounded-lg border-2 border-gray-300"
                           chartXDataLabels={distancePoints}
                           chartYData={elevationPoints}
                           chartTitle={chartTitleText}
                           displayLegend={displayLegend}
                           chartLineColor={chartLineColor}
                           chartLineBorderWidth={chartLineBorderWidth}
                           colorChartTitle={colorChartTitle}
                           chartTitleFontSize={chartTitleFontSize}
                           chartBackgroundColor={chartBackgroundColor}
                           displayAxis={chartAxisVisual}
                           displayChartPoints={chartPointsVisual}
                           isSmoothVisual={chartSmoothVisual}
                           ref={chartRef}
                           isResponsive={true}
                           dataLabels={dataLabels}
                           animationsEnabled={distancePoints.length < 3000}
                />

                <div className="space-y-4 mt-4 p-2 shadow-2xl rounded-lg border-2 border-gray-300">
                    <Button onClick={addDataLabel}>Add Data Label</Button>
                    {dataLabels.map((dataLabel) => (
                        <DataLabel
                            key={dataLabel.id}
                            label={dataLabel}
                            onRemove={removeDataLabel}
                            onUpdate={updateDataLabel}
                        />
                    ))}
                </div>

                <div className="mt-4 flex flex-col items-center shadow-2xl rounded-lg border-2 border-gray-300">
                    <div className="flex flex-wrap flex-row space-x-2 space-y-2">
                        <CheckBox onChange={setDisplayLegend} checked={displayLegend} label={"Display Legend"}
                                  title="Show or hide the chart legend" className="ml-2 mt-2"/>
                        <CheckBox onChange={setChartAxisVisual} checked={chartAxisVisual} label={"Show Axis"}
                                  title="Show or hide the chart axis"/>
                        <CheckBox onChange={setChartPointsVisual} checked={chartPointsVisual} label={"Show Points"}
                                  title="Show or hide the points on the chart"/>
                        <CheckBox onChange={setChartSmoothVisual} checked={chartSmoothVisual} label={"Smooth Chart"}
                                  title="Make the line chart smoother"/>
                    </div>

                    <div className="mt-2 mr-2 ml-2 flex flex-row flex-wrap items-center space-x-4 rounded-lg p-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
                        <label className="text-sm font-medium flex items-center space-x-2">
                            <span>Line color</span>
                            <input type="color" onChange={(color) => setChartLineColor(color.target.value)} defaultValue={chartLineColor} title="Change the color of the line on the chart"
                                   className="w-12 h-8 overflow-hidden cursor-pointer"/>
                        </label>

                        <label className="text-sm font-medium flex items-center space-x-2">
                            <span>Width</span>
                            <div className="flex items-center space-x-2">
                                <input type="number" onChange={(width) => setChartLineBorderWidth(parseInt(width.target.value))} defaultValue={chartLineBorderWidth} id="widthLineChart" min="1" max="35" title="Change the width of the line on the chart"
                                       className="w-16 px-2 py-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"/>
                                <span className="text-sm">px</span>
                            </div>
                        </label>
                    </div>

                    <label
                        className="m-2 mb-0 rounded-lg p-2 flex items-center justify-between space-x-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
                        <span>Background color</span>
                        <input type="color" onChange={(color) => setChartBackgroundColor(color.target.value)}
                               defaultValue={chartBackgroundColor} title="Change the chart background color"/>
                    </label>

                    <label
                        className="m-2 rounded-lg p-2 flex flex-wrap items-center justify-between space-x-2 bg-violet-700 text-primary-foreground shadow hover:bg-violet-700/90 hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="space-x-2">
                            <span>Show title</span>
                            <input type="text" onChange={(event) => setChartTitleText(event.target.value)}
                                   defaultValue={chartTitleText} title="Change the chart title" className="p-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"/>
                        </div>
                        <input type="color" onChange={(e) => setColorChartTitle(e.target.value)}
                               defaultValue={colorChartTitle} title="Change chart title color" className="cursor-pointer"/>
                        <div className="space-x-2">
                            <input type="number" onChange={(e) => setChartTitleFontSize(parseInt(e.target.value))}
                                   defaultValue={chartTitleFontSize} min="2" max="70" className="p-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                   title="Change chart title font size"/>
                            <span className="text-sm">px</span>
                        </div>
                    </label>
                </div>

                <div className="flex justify-center">
                    <Button variant="default" size="lg" onClick={() => downloadChartImage(chartRef)}
                            title="Click to download the chart a .png image" className="mt-4">Download chart Image
                    </Button>
                </div>
            </VisibleDiv>

            {/*
            <section className="section-7 hidden_on_start" id="section-7">
                <div className="img-container">
                    <img className="shirt-img" src="images/reference-shirt.jpg" alt="shirt image" title="example"/>
                    <div className="img-overlay">
                        <img className="chart-on-shirt-img" src={undefined} title="chart on the shirt example"
                             alt="chart on the shirt" id="chartOnShirt"/>
                    </div>
                </div>
            </section>
            */}
        </main>
    )
}
