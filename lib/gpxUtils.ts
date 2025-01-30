import GpxParser from "gpxparser" // Assuming this is the correct import
import {GpxSummaryData} from "@/lib/types/gpx";

 /**
 * parses the text string given using the GPX format
 * @param fileGPX {string}
 */
 export function parseGPX(fileGPX: string) : GpxParser | null {
    if (fileGPX === null) {
        console.warn('FileGPX is undefined.');
        return null;
    }

    const parsed = new GpxParser(); //Create gpxParser Object
    parsed.parse(fileGPX); //parse gpx file from string data
    return parsed;
}

export function extractFileParsedData(fileGpxParsed : GpxParser, key : number) : GpxSummaryData {
    let maxElevation = 0, minElevation = 0, posElevationDiff = 0, negElevationDiff = 0, totalDistance = 0;
    let whatIsShown = '', filename = '';
    if (fileGpxParsed.tracks.length > 0) {
        for (let i = 0; i < fileGpxParsed.tracks.length; i++) {
            totalDistance += fileGpxParsed.tracks[i].distance.total;
        }
        maxElevation = fileGpxParsed.tracks[0].elevation.max;
        minElevation = fileGpxParsed.tracks[0].elevation.min;
        posElevationDiff = fileGpxParsed.tracks[0].elevation.pos;
        negElevationDiff = fileGpxParsed.tracks[0].elevation.neg;
        whatIsShown = 'Track records: '
        filename = fileGpxParsed.tracks[0].name;
    } else if (fileGpxParsed.routes.length > 0) {
        totalDistance = 0;
        for (let i = 0; i < fileGpxParsed.routes.length; i++) {
            totalDistance += fileGpxParsed.routes[i].distance.total;
        }
        maxElevation = fileGpxParsed.routes[0].elevation.max;
        minElevation = fileGpxParsed.routes[0].elevation.min;
        posElevationDiff = fileGpxParsed.routes[0].elevation.pos;
        negElevationDiff = fileGpxParsed.routes[0].elevation.neg;
        whatIsShown = 'Route records: '
        filename = fileGpxParsed.routes[0].name;
    } else {
        console.error('Could not parse file, maybe corrupted?');
        return {
            author: "",
            description: "",
            diffAltitude: 0,
            fileGpxParsed: undefined,
            filename: "",
            key,
            maxElevation: 0,
            minElevation: 0,
            negElevationDiff: 0,
            posElevationDiff: 0,
            totalDistance: 0,
            whatIsShown: ""
        };
    }

    let description = '', author: string | number = '';
    if (fileGpxParsed.metadata) {
        description = fileGpxParsed.metadata.desc;
        author = fileGpxParsed.metadata.author;
    }

    return {
        key,
        fileGpxParsed,
        filename,
        author,
        description,
        whatIsShown,
        totalDistance,
        minElevation,
        maxElevation,
        diffAltitude: (maxElevation - minElevation),
        posElevationDiff,
        negElevationDiff,
    };
}


