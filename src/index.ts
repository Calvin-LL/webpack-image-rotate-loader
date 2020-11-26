import { validate } from "schema-utils";
import { Schema } from "schema-utils/declarations/validate";
import sharp from "sharp";
import { loader } from "webpack";

import { getOptions } from "@calvin-l/webpack-loader-util";

import schema from "./options.json";

export interface Options {
  readonly background?: string | Record<string, unknown>;
  readonly angle?: number;
}

export const raw = true;

export default function (
  this: loader.LoaderContext,
  content: ArrayBuffer
): void {
  const callback = this.async() as loader.loaderCallback;
  const options = getOptions<Options>(this, true, true);

  validate(schema as Schema, options, {
    name: "Image Rotate Loader",
    baseDataPath: "options",
  });

  processImage(content, options)
    .then((result) => {
      callback(null, result);
    })
    .catch((e) => {
      throw e;
    });
}

async function processImage(
  content: ArrayBuffer,
  { background, angle }: Options
): Promise<Buffer> {
  let sharpImage = sharp(Buffer.from(content));

  if (background) sharpImage = sharpImage.rotate(angle, { background });
  else sharpImage = sharpImage.rotate(angle);

  return await sharpImage.toBuffer();
}
