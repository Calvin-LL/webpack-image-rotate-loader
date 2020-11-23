import path from "path";

import {
  CompileOptions,
  WebpackTestBundle,
  WebpackTestCompiler,
} from "@calvin-l/webpack-loader-test-util";

interface WIRLCompileOptions extends Omit<CompileOptions, "entryFilePath"> {
  entryFileName?: string;
  loaderOptions?: any;
}

export default class WIRLWebpackTestCompiler extends WebpackTestCompiler {
  compile(options: WIRLCompileOptions = {}): Promise<WebpackTestBundle> {
    const {
      loaderOptions = {},
      entryFileName = "index.js",
      fileContentOverride,
    } = options;
    const fixturesDir = path.resolve(__dirname, "..", "fixtures");

    this.webpackConfig = {
      context: fixturesDir,
      outputPath: path.resolve(__dirname, "..", "outputs"),
      rules: [
        {
          test: /\.(png|jpg|svg)/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
            {
              loader: path.resolve(__dirname, "..", "..", "dist", "cjs.js"),
              options: loaderOptions,
            },
          ],
        },
      ],
    };

    return super.compile({
      entryFilePath: path.resolve(fixturesDir, entryFileName),
      fileContentOverride,
    });
  }
}
