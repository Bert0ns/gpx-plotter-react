export default function Home() {
    return (
        <div>
            <main>
                <section className="section-1">
                    <div>
                        <h1>GPX PLOTTER</h1>
                    </div>
                </section>
                <section className="section-2">
                    <div className="upload_file">
                        <label title="Click here to upload one or more .gpx files">Upload a GPX File
                            <input type="file" id="fileInput" accept=".gpx" multiple/>
                        </label>
                    </div>

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

            <footer>
                <div>
                    <p >Made by Bertons</p>
                </div>
            </footer>
        </div>
    )
}