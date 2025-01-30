"use client"

import MainTitle from "@/app/components/atoms/MainTitle";
import FileSelector from "@/app/components/atoms/FileSelector";
import GpxParser from "gpxparser";
import FileCard from "@/app/components/atoms/FileCard";
import {useState} from "react";
import {readFile} from "@/lib/fileUtils";
import {parseGPX, extractFileParsedData} from "@/lib/gpxUtils";
import {GpxSummaryData} from "@/lib/types/gpx";

export default function Home() {
    const [filesGpxParsed, setFilesGpxParsed]= useState<GpxParser[]>([])
    const [fileCardsData, setFileCardsData] = useState<GpxSummaryData[]>([]);

    const addFileGpxParsed = (file: GpxParser): void => {
        setFilesGpxParsed((prev) => [...prev, file]);
    }
    const addFileCardData = (data: GpxSummaryData): void => {
        setFileCardsData((prev) => [...prev, data]);
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
    }

    function generateUniqueKey(): number {
        return Date.now() + Math.floor(Math.random() * 1000)
    }

    return (
        <main>
            <MainTitle/>
            <FileSelector onFileSelect={handleSelectedFiles} value="Upload .gpx Files"/>
            <div className="flex flex-row  justify-center w-auto flex-wrap">
                {fileCardsData.map(card  => (
                    <FileCard key={card.key.toString()} value={card}/>
                ))}
            </div>

            <section className="section-2">

                <section className="section-6">
                    <ol id="fileList" className="fileList"></ol>
                </section>

                <input className="btn hidden_on_start" type="button" id="btnPlotEle" value="Plot Elevation"
                       title="Click here to plot chart: (x,y) ->(distance, altitude)"/>
            </section>

            <section className="section-3">
                <p id="p1"></p>
            </section>

            <section className="section-4 hidden_on_start" id="section-4">
                <h3>Chart customization options:</h3>
                <div className="customization_options" id="customization_options_menu">
                    <label className="btn_option">Show Axis
                        <input type="checkbox" name="showAxis" id="showAxis" checked
                               title="Show or hide the axis on the chart"/>
                    </label>

                    <label className="btn_option">Show Legend
                        <input type="checkbox" name="showLegend" id="showLegend" checked
                               title="Show or hide the legend on the chart"/>
                    </label>

                    <label className="btn_option">Show Points
                        <input type="checkbox" name="showPoints" id="showPoints" checked
                               title="Show or hide the points on the chart"/>
                    </label>

                    <label className="btn_option">Smooth
                        <input type="checkbox" name="smoothChart" id="smoothChart" checked
                               title="Make the line chart smoother"/>
                    </label>

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
                        <input type="checkbox" id="showTitleChart" checked title="Show or hide the title on the chart"/>
                        <input type="text" id="textBoxTitleChart" value="My track elevation profile"
                               title="Change the chart title"/>
                        <input type="color" id="colorPickerTitleChart" value="#000000"
                               title="Change chart title color"/>
                        <input type="number" id="fontSizeTitleChart" value="20" min="4" max="70"
                               title="Change chart title font size"/>
                    </label>
                </div>

                <div className="dataLabelsContainer" id="dataLabelsContainer">
                    <input className="btn_option" type="button" id="btnAddDataLabel" value="Add Data Label"
                           title="Create a new label to position on the chart"/>
                </div>
            </section>

            <section className="section-5 hidden_on_start" id="section-5">
                <div className="chart_container">
                    <canvas id="elevationChartCanvas"></canvas>
                </div>

                <input type="button" className="btn" id="btnDownloadChartImage" value="Download Chart"
                       title="Download Image in .pgn format"/>
            </section>

            <section className="section-7 hidden_on_start" id="section-7">
                <div className="img-container">
                    <img className="shirt-img" src="images/reference-shirt.jpg" alt="shirt image" title="example"/>
                    <div className="img-overlay">
                        <img className="chart-on-shirt-img" src="" title="chart on the shirt example"
                             alt="chart on the shirt" id="chartOnShirt"/>
                    </div>
                </div>
            </section>
        </main>
    )
}