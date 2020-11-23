import { toMatchImageSnapshot } from "jest-image-snapshot";

import WIRLWebpackTestCompiler from "./helpers/WIRLWebpackTestCompiler";

expect.extend({ toMatchImageSnapshot });

describe.each([4, 5] as const)("v%d queries", (webpackVersion) => {
  test("should be overridden by query", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({
      loaderOptions: { angle: 90 },
      fileContentOverride:
        'require("./Macaca_nigra_self-portrait_large.jpg?angle=-190")',
    });

    expect(
      await bundle.readAssetAsPNG("Macaca_nigra_self-portrait_large.jpg")
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "negative-190-deg",
    });
  });

  test("should be overridden by json query", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({
      loaderOptions: { angle: 90 },
      fileContentOverride: `require('./Macaca_nigra_self-portrait_large.jpg?{"angle": 120,"background": "blue"}')`,
    });

    expect(
      await bundle.readAssetAsPNG("Macaca_nigra_self-portrait_large.jpg")
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "120-deg-blue-background",
    });
  });
});
