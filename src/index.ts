import fileLoader from "file-loader";
import loaderUtils from "loader-utils";
import { validate } from "schema-utils";
import { Schema } from "schema-utils/declarations/validate";
import sharp from "sharp";
import { RawSourceMap } from "source-map";
import { loader } from "webpack";

import schema from "./options.json";

export interface OPTIONS {
  background?: string | object;
  angle?: number;
}

export const raw = true;

export default function (
  this: loader.LoaderContext,
  content: ArrayBuffer,
  sourceMap?: RawSourceMap
) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) as Readonly<OPTIONS> | null;
  const queryObject = this.resourceQuery
    ? (loaderUtils.parseQuery(this.resourceQuery) as Partial<OPTIONS>)
    : undefined;
  const fullOptions = {
    toFile: true,
    ...options,
    ...attemptToConvertValuesToNumbers(queryObject),
  };

  validate(schema as Schema, fullOptions, {
    name: "Image Rotate Loader",
    baseDataPath: "options",
  });

  processImage(content, fullOptions)
    .then((result) => {
      callback?.(null, result);
    })
    .catch((e) => {
      throw e;
    });
}

async function processImage(
  content: ArrayBuffer,
  { background, angle }: Readonly<OPTIONS>
) {
  let sharpImage = sharp(Buffer.from(content));

  if (background) sharpImage = sharpImage.rotate(angle, { background });
  else sharpImage = sharpImage.rotate(angle);

  return await sharpImage.toBuffer();
}

function attemptToConvertValuesToNumbers(object: any | undefined) {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    if (/^\d+$/.test(result[key])) {
      result[key] = Number(result[key]);
    }
  });

  return result;
}
