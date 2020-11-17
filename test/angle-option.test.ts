import { toMatchImageSnapshot } from "jest-image-snapshot";
import webpack from "webpack";

import compile from "./helpers/compile";
import convertToPng from "./helpers/convertToPng";
import getCompiler from "./helpers/getCompiler";
import readAsset from "./helpers/readAsset";

expect.extend({ toMatchImageSnapshot });

describe.each([4, 5] as const)('v%d "angle" option', (webpackVersion) => {
  test("should work with 132 deg", async () => {
    const compiler = getCompiler(webpackVersion, { angle: 132 }, "index.js");
    const stats = await compile(webpackVersion, compiler);

    expect(
      await convertToPng(
        readAsset(
          "Macaca_nigra_self-portrait_large.jpg",
          compiler,
          stats as webpack.Stats,
          true
        )
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "132-deg",
    });
  });

  test("should work with -132 deg", async () => {
    const compiler = getCompiler(webpackVersion, { angle: -132 }, "index.js");
    const stats = await compile(webpackVersion, compiler);

    expect(
      await convertToPng(
        readAsset(
          "Macaca_nigra_self-portrait_large.jpg",
          compiler,
          stats as webpack.Stats,
          true
        )
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "negative-132-deg",
    });
  });

  test("should work with orientation: 6 = Rotate 90 CW", async () => {
    const compiler = getCompiler(
      webpackVersion,
      {},
      "index.js",
      'require("./Macaca_nigra_self-portrait_large-orientation-6.jpg")'
    );
    const stats = await compile(webpackVersion, compiler);

    expect(
      await convertToPng(
        readAsset(
          "Macaca_nigra_self-portrait_large-orientation-6.jpg",
          compiler,
          stats as webpack.Stats,
          true
        )
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "90-deg",
    });
  });

  test("should work with orientation: 7 = Mirror horizontal and rotate 90 CW", async () => {
    const compiler = getCompiler(
      webpackVersion,
      {},
      "index.js",
      'require("./Macaca_nigra_self-portrait_large-orientation-7.jpg")'
    );
    const stats = await compile(webpackVersion, compiler);

    expect(
      await convertToPng(
        readAsset(
          "Macaca_nigra_self-portrait_large-orientation-7.jpg",
          compiler,
          stats as webpack.Stats,
          true
        )
      )
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "90-deg-mirrored",
    });
  });
});
