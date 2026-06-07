import { useCallback, useState } from "react";
import { FileGpx, GpxSummaryData } from "@/lib/types/gpx";
import { readFile } from "@/lib/fileUtils";
import {
  extractFileParsedData,
  getDataPointsAxis,
  parseGPX,
} from "@/lib/gpxUtils";
import { generateUniqueKey } from "@/lib/chartUtils";
import { FileCardListRef } from "@/app/components/FileCardList/index.types";
import { RefObject } from "react";

export function useGpxFiles(
  fileCardListRef: RefObject<FileCardListRef | null>,
) {
  const [filesGpxParsed, setFilesGpxParsed] = useState<FileGpx[]>([]);
  const [elevationPoints, setElevationPoints] = useState<number[]>([
    100, 150, 400, 50, 50,
  ]);
  const [distancePoints, setDistancePoints] = useState<number[]>([
    55, 1000, 3000, 3333, 4444,
  ]);
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);
  const [isButtonPlotElevationVisible, setIsButtonPlotElevationVisible] =
    useState<boolean>(false);

  const addFileGpxParsed = (file: FileGpx): void => {
    setFilesGpxParsed((prev) => [...prev, file]);
  };

  const removeFileGpxParsed = (fileKeyToRemove: number): void => {
    setFilesGpxParsed((prev) => {
      const newFiles = prev.filter((file) => file.key !== fileKeyToRemove);
      if (newFiles.length === 0) {
        setIsButtonPlotElevationVisible(false);
        setIsChartVisible(false);
      }
      return newFiles;
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
        const fileGpx: FileGpx = {
          fileParsed: fileParsed,
          key: generateUniqueKey(),
        };
        addFileGpxParsed(fileGpx);
        const fileData = extractFileParsedData(fileGpx.fileParsed, fileGpx.key);

        if (fileCardListRef.current) {
          fileCardListRef.current.addFileCardData(fileData);
        }
        newlyAdded = true;
      } catch (err) {
        console.error("Error processing file:", err);
      }
    }

    if (newlyAdded) {
      setIsButtonPlotElevationVisible(true);
    }
  };

  const updateDataInChart = useCallback((files: FileGpx[]) => {
    if (files.length === 0) return;
    const { elevPoints, distPoints } = getDataPointsAxis(
      files.map((file) => file.fileParsed),
    );
    setElevationPoints(elevPoints);
    setDistancePoints(distPoints);
  }, []);

  const handleButtonPlotElevationClick = () => {
    if (!filesGpxParsed || filesGpxParsed.length === 0) {
      return;
    }
    updateDataInChart(filesGpxParsed);
    setIsChartVisible(true);
  };

  const handleOrderChange = (newOrder: GpxSummaryData[]) => {
    if (newOrder.length !== filesGpxParsed.length) {
      console.error("Arrays must have the same length.");
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
        throw new Error(
          `Key '${filesGpxParsed[i][key]}' not found in the first array.`,
        );
      }
      reorderedFilesGpxParsed[index] = filesGpxParsed[i];
    }

    setFilesGpxParsed(reorderedFilesGpxParsed);
    if (isChartVisible) {
      updateDataInChart(reorderedFilesGpxParsed);
    }
  };

  return {
    filesGpxParsed,
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
