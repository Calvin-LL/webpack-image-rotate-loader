import { toMatchImageSnapshot } from "jest-image-snapshot";

import WIRLWebpackTestCompiler from "./helpers/WIRLWebpackTestCompiler";

expect.extend({ toMatchImageSnapshot });

describe.each([4, 5] as const)('v%d "background" option', (webpackVersion) => {
  test("should work with red", async () => {
    const compiler = new WIRLWebpackTestCompiler({ webpackVersion });
    const bundle = await compiler.compile({
      loaderOptions: { angle: 40, background: "red" },
    });

    expect(
      await bundle.readAssetAsPNG("Macaca_nigra_self-portrait_large.jpg")
    ).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0 },
      customSnapshotIdentifier: "40-deg-red-background",
    });
  });
});
