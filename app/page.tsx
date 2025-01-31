"use client"

import MainTitle from "@/app/components/atoms/MainTitle";
import FileSelector from "@/app/components/atoms/FileSelector";
import GpxParser from "gpxparser";
import FileCard from "@/app/components/atoms/FileCard";
import {RefObject, useRef, useState} from "react";
import {readFile} from "@/lib/fileUtils";
import {parseGPX, extractFileParsedData, getDataPointsAxis} from "@/lib/gpxUtils";
import {GpxSummaryData} from "@/lib/types/gpx";
import {Button} from "@/app/components/ui/button";
import {generateUniqueKey} from "@/lib/utils";
import LineChart from "@/app/components/atoms/LineChart";
import VisibleDiv from "@/app/components/atoms/VisibleDiv";
import CheckBox from "@/app/components/atoms/CheckBox";
import {TypedChartComponent} from "@/node_modules/react-chartjs-2/dist/types";

export default function Home() {
    const [filesGpxParsed, setFilesGpxParsed]= useState<GpxParser[]>([]);
    const addFileGpxParsed = (file: GpxParser): void => {
        setFilesGpxParsed((prev) => [...prev, file]);
    }

    const [fileCardsData, setFileCardsData] = useState<GpxSummaryData[]>([]);
    const addFileCardData = (data: GpxSummaryData): void => {
        setFileCardsData((prev) => [...prev, data]);
    }

    const [elevationPoints, setElevationPoints] = useState<number[]>([100, 150, 400, 50, 50]);
    const [distancePoints, setDistancePoints] = useState<number[]>([55, 1000, 3000, 3333, 4444]);
    const [displayLegend, setDisplayLegend] = useState<boolean>(true);
    const [chartLineColor, setChartLineColor] = useState<string>("#000000")
    const [chartLineBorderWidth, setChartLineBorderWidth] = useState<number>(4);
    const [chartTitleFontSize, setChartTitleFontSize] = useState<number>(20);
    const [colorChartTitle, setColorChartTitle] = useState<string>("#000000");
    const [chartBackgroundColor, setChartBackgroundColor] = useState<string>("#ffffff")
    const [chartAxisVisual, setChartAxisVisual] = useState<boolean>(true);
    const [chartPointsVisual, setChartPointsVisual] = useState<boolean>(false);
    const [chartSmoothVisual, setChartSmoothVisual] = useState<boolean>(true);

    const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
    const [isButtonPlotElevationVisible, setIsButtonPlotElevationVisible] = useState<boolean>(false);

    const chartRef = useRef<TypedChartComponent<"line">>(null)

    function downloadChartImage(chartRef : RefObject<TypedChartComponent<"line"> | null>) : void
    {
        if(chartRef.current)
        {
            console.log({...chartRef.current})
            const link = document.createElement("a")
            link.download = "chart.png"
            // @ts-expect-error exists
            link.href = chartRef.current.toBase64Image();
            link.click();
            link.remove();
        }
    }

    async function handleSelectedFiles(files : FileList | null) : Promise<void> {
        if (!files || files.length === 0) {
            return;
        }

        for (let i = 0; i < files.length; i++) {
            try{
                const fileString = await readFile(files[i]);
                if (!fileString) {
                    return;
                }
                const fileParsed = parseGPX(fileString);
                if (!fileParsed) {
                    console.error("Could not parse file");
                    return;
                }
                addFileGpxParsed(fileParsed)
                const fileData = extractFileParsedData(fileParsed, generateUniqueKey());
                addFileCardData(fileData);
            }
            catch(err) {
                console.error("Error processing file:", err);
            }
        }
        setIsButtonPlotElevationVisible(true);
    }

    function handleButtonPlotElevationClick(){
        if(!filesGpxParsed || filesGpxParsed.length === 0) { return; }
        const {elevPoints, distPoints} = getDataPointsAxis(filesGpxParsed);
        setElevationPoints(elevPoints);
        setDistancePoints(distPoints);
        console.log({elevPoints, distPoints});
        setIsChartVisible(true);
    }

    return (
        <main>
            <MainTitle/>
            <FileSelector onFileSelect={handleSelectedFiles} value="Upload .gpx Files" title="Click to upload one or more .gpx files"/>
            <ol className="flex flex-row  justify-center w-auto flex-wrap">
                {fileCardsData.map(card  => (
                    <FileCard key={card.key.toString()} value={card}/>
                ))}
            </ol>
            <VisibleDiv className="flex justify-center m-4" isVisible={isButtonPlotElevationVisible}>
                <Button onClick={handleButtonPlotElevationClick} variant="secondary" size="lg" title="Click to plot the tracks elevation on a chart">Plot elevation</Button>
            </VisibleDiv>

            <VisibleDiv className="flex flex-col justify-center m-4" isVisible={isChartVisible}>
                <LineChart title={"Line chart that shows your track elevation over time"}
                           className="p-1 w-full h-[80vh] shadow-2xl rounded-lg border-2 border-gray-300"
                           chartXDataLabels={distancePoints}
                           chartYData={elevationPoints}
                           chartTitle={"Test font"}
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

                />
                <div className="mt-4 flex flex-col items-center shadow-2xl rounded-lg border-2 border-gray-300">
                    <h3 className="text-3xl font-bold text-gray-800">Chart customization options:</h3>
                    <div className="flex flex-row flex-wrap">
                        <CheckBox onChange={setDisplayLegend} checked={displayLegend} label={"Display Legend"} title="Show or hide the chart legend" className={"bg-gradient-to-br gradient from-orange-600 to-orange-300"}/>
                        <CheckBox onChange={setChartAxisVisual} checked={chartAxisVisual} label={"Show Axis"} title="Show or hide the chart axis" className={"bg-gradient-to-br gradient from-orange-600 to-orange-300"}/>
                        <CheckBox onChange={setChartPointsVisual} checked={chartPointsVisual} label={"Show Points"} title="Show or hide the points on the chart" className={"bg-gradient-to-br gradient from-orange-600 to-orange-300"}/>
                        <CheckBox onChange={setChartSmoothVisual} checked={chartSmoothVisual} label={"Smooth Chart"} title="Make the line chart smoother" className={"bg-gradient-to-br gradient from-orange-600 to-orange-300"}/>

                    </div>

                    <div className="customization_options" id="customization_options_menu">
                        <label className="btn_option">Line color
                            <input type="color" id="colorPickerLineChart" value="#000000"
                                   title="Change the color of the line on the chart"/>
                            <label>Width
                                <input type="number" id="widthLineChart" value="2" min="0" max="35"
                                       title="Change the width of the line on the chart"/>
                            </label>
                        </label>

                        <label className="btn_option">Background color
                            <input type="color" id="colorPickerBackgroundChart" value="#ffffff"
                                   title="Change the chart background color"/>
                        </label>

                        <label className="btn_option">Show title
                            <input type="text" id="textBoxTitleChart" value="My track elevation profile"
                                   title="Change the chart title"/>
                            <input type="color" id="colorPickerTitleChart" value="#000000"
                                   title="Change chart title color"/>
                            <input type="number" id="fontSizeTitleChart" value="20" min="4" max="70"
                                   title="Change chart title font size"/>
                        </label>
                    </div>
                </div>
                <Button onClick={() => downloadChartImage(chartRef)} title="Click to download the chart a .png image" className="mt-4">Download chart Image</Button>
            </VisibleDiv>

            <section className="section-4 hidden_on_start" id="section-4">

                <div className="dataLabelsContainer" id="dataLabelsContainer">
                    <input className="btn_option" type="button" id="btnAddDataLabel" value="Add Data Label"
                           title="Create a new label to position on the chart"/>
                </div>
            </section>

            <section className="section-7 hidden_on_start" id="section-7">
                <div className="img-container">
                    <img className="shirt-img" src="images/reference-shirt.jpg" alt="shirt image" title="example"/>
                    <div className="img-overlay">
                        <img className="chart-on-shirt-img" src={undefined} title="chart on the shirt example"
                             alt="chart on the shirt" id="chartOnShirt"/>
                    </div>
                </div>
            </section>
        </main>
    )
}