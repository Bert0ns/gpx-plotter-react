import { useCallback, useState } from "react";
import { TrackGpx, GpxSummaryData } from "@/lib/types/gpx";
import { readFile } from "@/lib/fileUtils";
import {
  extractTrackParsedData,
  getDataPointsAxis,
  parseGPX,
} from "@/lib/gpxUtils";
import { generateUniqueKey } from "@/lib/chartUtils";
import { FileCardListRef } from "@/app/components/FileCardList/index.types";
import { RefObject } from "react";

export function useGpxFiles(
  fileCardListRef: RefObject<FileCardListRef | null>,
) {
  const [tracksGpx, setTracksGpx] = useState<TrackGpx[]>([]);
  const [elevationPoints, setElevationPoints] = useState<number[]>([
    100, 150, 400, 50, 50,
  ]);
  const [distancePoints, setDistancePoints] = useState<number[]>([
    55, 1000, 3000, 3333, 4444,
  ]);
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
  const [isButtonPlotElevationVisible, setIsButtonPlotElevationVisible] =
    useState<boolean>(false);

  const addTrackGpx = (track: TrackGpx): void => {
    setTracksGpx((prev) => [...prev, track]);
  };

  const removeFileGpxParsed = (fileKeyToRemove: number): void => {
    setTracksGpx((prev) => {
      const newTracks = prev.filter((track) => track.key !== fileKeyToRemove);
      if (newTracks.length === 0) {
        setIsButtonPlotElevationVisible(false);
        setIsChartVisible(false);
      }
      return newTracks;
    });
  };

  const handleSelectedFiles = async (files: FileList | null): Promise<void> => {
    if (!files || files.length === 0) {
      return;
    }

    let newlyAdded = false;
    for (let i = 0; i < files.length; i++) {
      try {
        const fileString = await readFile(files[i]);
        if (!fileString) {
          continue;
        }
        const fileParsed = parseGPX(fileString);
        if (!fileParsed) {
          console.error("Could not parse file");
          continue;
        }

        // Add all tracks
        for (let j = 0; j < fileParsed.tracks.length; j++) {
          const trackGpx: TrackGpx = {
            key: generateUniqueKey(),
            fileParsed,
            type: "track",
            index: j,
          };
          addTrackGpx(trackGpx);
          const trackData = extractTrackParsedData(trackGpx);
          if (fileCardListRef.current) {
            fileCardListRef.current.addFileCardData(trackData);
          }
          newlyAdded = true;
        }

        // Add all routes
        for (let k = 0; k < fileParsed.routes.length; k++) {
          const routeGpx: TrackGpx = {
            key: generateUniqueKey(),
            fileParsed,
            type: "route",
            index: k,
          };
          addTrackGpx(routeGpx);
          const routeData = extractTrackParsedData(routeGpx);
          if (fileCardListRef.current) {
            fileCardListRef.current.addFileCardData(routeData);
          }
          newlyAdded = true;
        }
      } catch (err) {
        console.error("Error processing file:", err);
      }
    }

    if (newlyAdded) {
      setIsButtonPlotElevationVisible(true);
    }
  };

  const updateDataInChart = useCallback((tracks: TrackGpx[]) => {
    if (tracks.length === 0) return;
    const { elevPoints, distPoints } = getDataPointsAxis(tracks);
    setElevationPoints(elevPoints);
    setDistancePoints(distPoints);
  }, []);

  const handleButtonPlotElevationClick = () => {
    if (!tracksGpx || tracksGpx.length === 0) {
      return;
    }
    updateDataInChart(tracksGpx);
    setIsChartVisible(true);
  };

  const handleOrderChange = (newOrder: GpxSummaryData[]) => {
    if (newOrder.length !== tracksGpx.length) {
      console.error("Arrays must have the same length.");
      return;
    }

    const orderMap = new Map();
    const key = "key";
    for (let i = 0; i < newOrder.length; i++) {
      orderMap.set(newOrder[i][key], i);
    }

    const reorderedTracks = new Array(tracksGpx.length);
    for (let i = 0; i < tracksGpx.length; i++) {
      const index = orderMap.get(tracksGpx[i][key]);
      if (index === undefined) {
        throw new Error(
          `Key '${tracksGpx[i][key]}' not found in the first array.`,
        );
      }
      reorderedTracks[index] = tracksGpx[i];
    }

    setTracksGpx(reorderedTracks);
    if (isChartVisible) {
      updateDataInChart(reorderedTracks);
    }
  };

  return {
    filesGpxParsed: tracksGpx, // Exported as filesGpxParsed to avoid changing the page component
    elevationPoints,
    distancePoints,
    isChartVisible,
    isButtonPlotElevationVisible,
    handleSelectedFiles,
    removeFileGpxParsed,
    handleOrderChange,
    handleButtonPlotElevationClick,
  };
}
