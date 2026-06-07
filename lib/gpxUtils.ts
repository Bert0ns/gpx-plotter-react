import GpxParser from "gpxparser";
import { GpxSummaryData, TrackGpx } from "@/lib/types/gpx";

/**
 * parses the text string given using the GPX format
 * @param fileGPX {string}
 */
export function parseGPX(fileGPX: string): GpxParser | null {
  if (!fileGPX) {
    console.warn("FileGPX is undefined.");
    return null;
  }

  const parsed = new GpxParser(); //Create gpxParser Object
  parsed.parse(fileGPX); //parse gpx file from string data
  return parsed;
}

export function extractTrackParsedData(trackGpx: TrackGpx): GpxSummaryData {
  let maxElevation = 0,
    minElevation = 0,
    posElevationDiff = 0,
    negElevationDiff = 0,
    totalDistance = 0;
  let whatIsShown = "",
    filename = "";

  const { fileParsed, type, index, key } = trackGpx;

  if (type === "track" && fileParsed.tracks.length > index) {
    const track = fileParsed.tracks[index];
    totalDistance = track.distance.total;
    maxElevation = track.elevation.max;
    minElevation = track.elevation.min;
    posElevationDiff = track.elevation.pos;
    negElevationDiff = track.elevation.neg;
    whatIsShown = "Track records: ";
    filename = track.name || `Track ${index + 1}`;
  } else if (type === "route" && fileParsed.routes.length > index) {
    const route = fileParsed.routes[index];
    totalDistance = route.distance.total;
    maxElevation = route.elevation.max;
    minElevation = route.elevation.min;
    posElevationDiff = route.elevation.pos;
    negElevationDiff = route.elevation.neg;
    whatIsShown = "Route records: ";
    filename = route.name || `Route ${index + 1}`;
  } else {
    console.error("Could not extract track/route data.");
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
      whatIsShown: "",
    };
  }

  let description = "",
    author: string | number = "";
  if (fileParsed.metadata) {
    description = fileParsed.metadata.desc ?? "";
    author = fileParsed.metadata.author ?? "";
  }

  return {
    key,
    fileGpxParsed: fileParsed,
    filename,
    author,
    description,
    whatIsShown,
    totalDistance,
    minElevation,
    maxElevation,
    diffAltitude: maxElevation - minElevation,
    posElevationDiff,
    negElevationDiff,
  };
}

function getElevationPoints(trackGpx: TrackGpx): number[] {
  const { fileParsed, type, index } = trackGpx;
  if (type === "track") {
    return fileParsed.tracks[index].points.map((p) => p.ele);
  } else {
    return fileParsed.routes[index].points.map((p) => p.ele);
  }
}

function getDistancePoints(trackGpx: TrackGpx): number[] {
  const { fileParsed, type, index } = trackGpx;
  if (type === "track") {
    // @ts-expect-error library type error
    return fileParsed.tracks[index].distance.cumul;
  } else {
    // @ts-expect-error library type error
    return fileParsed.routes[index].distance.cumul;
  }
}

export function getDataPointsAxis(tracksGpx: TrackGpx[]) {
  let yAxisPoints: number[] = [];
  let xAxisPoints: number[] = [];

  for (let i = 0; i < tracksGpx.length; i++) {
    const trackGpx = tracksGpx[i];

    // plot the elevations
    yAxisPoints = yAxisPoints.concat(getElevationPoints(trackGpx));

    // plot the distances, offsetting by the previous max distance so they connect sequentially
    const currentDistances = getDistancePoints(trackGpx);
    const dp = currentDistances.map((p: number) => {
      if (xAxisPoints.length < 1) {
        return p;
      }
      return p + xAxisPoints[xAxisPoints.length - 1];
    });
    xAxisPoints = xAxisPoints.concat(dp);
  }

  xAxisPoints = xAxisPoints.map((p) => Number(p.toFixed(1)));
  return { elevPoints: yAxisPoints, distPoints: xAxisPoints };
}
