import {
  parseGPX,
  extractTrackParsedData,
  getDataPointsAxis,
} from "../../lib/gpxUtils";
import { describe, it, expect } from "vitest";
import { TrackGpx } from "../../lib/types/gpx";

describe("gpxUtils", () => {
  it("parseGPX should return null for empty string", () => {
    expect(parseGPX("")).toBeNull();
  });

  it("parseGPX should return a GpxParser object for valid gpx", () => {
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="40.0" lon="-105.0"><ele>1000</ele></trkpt>
      <trkpt lat="40.1" lon="-105.1"><ele>1100</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const parsed = parseGPX(validGPX);
    expect(parsed).not.toBeNull();
    expect(parsed?.tracks.length).toBe(1);
    expect(parsed?.tracks[0].name).toBe("Test Track");
  });

  it("extractTrackParsedData should work for track", () => {
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="40.0" lon="-105.0"><ele>1000</ele></trkpt>
      <trkpt lat="40.1" lon="-105.1"><ele>1100</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const fileParsed = parseGPX(validGPX)!;
    const trackGpx: TrackGpx = { fileParsed, type: "track", index: 0, key: 1 };
    const data = extractTrackParsedData(trackGpx);
    expect(data.filename).toBe("Test Track");
    expect(data.whatIsShown).toBe("Track records: ");
  });

  it("extractTrackParsedData should work for route", () => {
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <rte>
    <name>Test Route</name>
    <rtept lat="40.0" lon="-105.0"><ele>1000</ele></rtept>
    <rtept lat="40.1" lon="-105.1"><ele>1100</ele></rtept>
  </rte>
</gpx>`;
    const fileParsed = parseGPX(validGPX)!;
    const trackGpx: TrackGpx = { fileParsed, type: "route", index: 0, key: 2 };
    const data = extractTrackParsedData(trackGpx);
    expect(data.filename).toBe("Test Route");
    expect(data.whatIsShown).toBe("Route records: ");
  });

  it("extractTrackParsedData should return fallback for invalid type", () => {
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="40.0" lon="-105.0"><ele>1000</ele></trkpt>
      <trkpt lat="40.1" lon="-105.1"><ele>1100</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const fileParsed = parseGPX(validGPX)!;
    // @ts-expect-error forcing invalid type
    const trackGpx: TrackGpx = {
      fileParsed,
      type: "invalid",
      index: 0,
      key: 1,
    };
    const data = extractTrackParsedData(trackGpx);
    expect(data.filename).toBe("");
    expect(data.totalDistance).toBe(0);
  });

  it("getDataPointsAxis should return correct axis points", () => {
    const validGPX = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Test">
  <trk>
    <name>Test Track</name>
    <trkseg>
      <trkpt lat="40.0" lon="-105.0"><ele>1000</ele></trkpt>
      <trkpt lat="40.1" lon="-105.1"><ele>1100</ele></trkpt>
    </trkseg>
  </trk>
</gpx>`;
    const fileParsed = parseGPX(validGPX)!;
    const trackGpx: TrackGpx = { fileParsed, type: "track", index: 0, key: 1 };

    // In gpxparser, we need to ensure the library actually parsed the points into elevation
    const axisData = getDataPointsAxis([trackGpx]);
    expect(axisData).toHaveProperty("elevPoints");
    expect(axisData).toHaveProperty("distPoints");
  });
});
