import { toMatchImageSnapshot } from "jest-image-snapshot";

import WIRLWebpackTestCompiler from "./helpers/WIRLWebpackTestCompiler";

expect.extend({ toMatchImageSnapshot });

describe.each([4, 5] as const)('v%d "angle" option', (webpackVersion) => {
  test("should work with 132 deg", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({ loaderOptions: { angle: 132 } });

    expect(
      await bundle.readAssetAsPNG("Macaca_nigra_self-portrait_large.jpg")
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "132-deg",
    });
  });

  test("should work with -132 deg", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({ loaderOptions: { angle: -132 } });

    expect(
      await bundle.readAssetAsPNG("Macaca_nigra_self-portrait_large.jpg")
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "negative-132-deg",
    });
  });

  test("should work with orientation: 6 = Rotate 90 CW", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({
      fileContent:
        'require("./Macaca_nigra_self-portrait_large-orientation-6.jpg")',
    });

    expect(
      await bundle.readAssetAsPNG(
        "Macaca_nigra_self-portrait_large-orientation-6.jpg"
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "90-deg",
    });
  });

  test("should work with orientation: 7 = Mirror horizontal and rotate 90 CW", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({
      fileContent:
        'require("./Macaca_nigra_self-portrait_large-orientation-7.jpg")',
    });

    expect(
      await bundle.readAssetAsPNG(
        "Macaca_nigra_self-portrait_large-orientation-7.jpg"
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "90-deg-mirrored",
    });
  });
});
