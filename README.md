# GPX Plotter

Plot your tracks and see the elevation profile!
Works with tracks and/or routes.

Deployed here: [https://gpx-plotter-react.vercel.app/](https://gpx-plotter-react.vercel.app)

## Getting Started

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser

## TODO

- [ ] Improve chart visualization
  - [ ] Make a standard chart size
  - [ ] Make the downloaded image always of the same size
- [ ] find bugs
- [ ] Improve chart performance
  - [x] Disable chart animations when dataset surpasses a certain size
  - [ ] Add a way to trim data at the ends of the chart
- [x] Create a cool landing page
  - [ ] Make it more colorful
- [ ] Add a dark/white mode

## Learn More

About GPX schema: [https://www.topografix.com/gpx.asp](https://www.topografix.com/gpx.asp)

More on [Wikipedia](https://en.wikipedia.org/wiki/GPS_Exchange_Format)

## Releasing a New Version

We use GitHub Actions and `electron-builder` to automatically build, package, and publish the desktop application for macOS, Linux, and Windows.

To release a new version:

1. Update the version number in `package.json` (e.g., `"version": "1.0.1"`).
2. Commit your changes.
3. Create and push a git tag starting with `v` that matches your version:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

GitHub Actions will automatically trigger, build the binaries on native operating systems, and publish them as a new [GitHub Release](https://github.com/Bert0ns/gpx-plotter-react/releases)!
