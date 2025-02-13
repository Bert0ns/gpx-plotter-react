import GpxParser from "gpxparser"

export interface GpxSummaryData {
    key: number
    fileGpxParsed: GpxParser | undefined
    filename: string
    author: string | number
    description: string
    whatIsShown: string
    totalDistance: number
    minElevation: number
    maxElevation: number
    diffAltitude: number
    posElevationDiff: number
    negElevationDiff: number
}

export type FileGpx = {
    key: number;
    fileParsed: GpxParser;
}