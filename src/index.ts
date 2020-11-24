import loaderUtils from "loader-utils";
import { validate } from "schema-utils";
import { Schema } from "schema-utils/declarations/validate";
import sharp from "sharp";
import { loader } from "webpack";

import schema from "./options.json";

export interface OPTIONS {
  background?: string | Record<string, unknown>;
  angle?: number;
}

export const raw = true;

export default function (
  this: loader.LoaderContext,
  content: ArrayBuffer
): void {
  const callback = this.async();
  const options = loaderUtils.getOptions(this) as Readonly<OPTIONS> | null;
  const queryObject = this.resourceQuery
    ? (loaderUtils.parseQuery(this.resourceQuery) as Partial<OPTIONS>)
    : undefined;
  const fullOptions = {
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
): Promise<Buffer> {
  let sharpImage = sharp(Buffer.from(content));

  if (background) sharpImage = sharpImage.rotate(angle, { background });
  else sharpImage = sharpImage.rotate(angle);

  return await sharpImage.toBuffer();
}

function attemptToConvertValuesToNumbers(
  object: any | undefined
): Record<string, unknown> {
  const result = { ...object };

  Object.keys(result).forEach((key) => {
    if (isNumeric(result[key])) {
      result[key] = Number(result[key]);
    }
  });

  return result;
}

// https://stackoverflow.com/a/175787
function isNumeric(string: string): boolean {
  if (typeof string !== "string") return false;
  // @ts-expect-error using isNaN to test string, works but typescript doesn't like
  return !isNaN(string) && !isNaN(parseFloat(string));
}
