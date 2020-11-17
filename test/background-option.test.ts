import { toMatchImageSnapshot } from "jest-image-snapshot";
import webpack from "webpack";

import compile from "./helpers/compile";
import convertToPng from "./helpers/convertToPng";
import getCompiler from "./helpers/getCompiler";
import readAsset from "./helpers/readAsset";

expect.extend({ toMatchImageSnapshot });

describe.each([4, 5] as const)('v%d "background" option', (webpackVersion) => {
  test("should work with red", async () => {
    const compiler = getCompiler(webpackVersion, {
      angle: 40,
      background: "red",
    });
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
      customSnapshotIdentifier: "40-deg-red-background",
    });
  });
});
