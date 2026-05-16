declare module "gpxparser" {
  type GpxPoint = {
    ele: number;
  };

  type GpxTrackOrRoute = {
    name: string;
    points: GpxPoint[];
    elevation: {
      max: number;
      min: number;
      pos: number;
      neg: number;
    };
    distance: {
      total: number;
      cumul?: number[];
    };
  };

  class GpxParser {
    tracks: GpxTrackOrRoute[];
    routes: GpxTrackOrRoute[];
    metadata?: {
      desc?: string;
      author?: string;
    };

    parse(input: string): void;
  }

  export default GpxParser;
}
