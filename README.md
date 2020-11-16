# webpack-image-rotate-loader

[![npm](https://img.shields.io/npm/v/webpack-image-rotate-loader?style=flat)](https://www.npmjs.com/package/webpack-image-rotate-loader) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](https://opensource.org/licenses/MIT)

This loader resize the given images to the desired size.

Supports JPEG, PNG, WebP, and, TIFF images.

## Install

Install with npm:

```bash
npm install webpack-image-rotate-loader --save-dev
```

Install with yarn:

```bash
yarn add webpack-image-rotate-loader --dev
```

## Usage

Note: if you only want to rotate some but not all images, check out [webpack-query-loader](https://github.com/CoolCyberBrain/webpack-query-loader) or use webpack's `resourceQuery`.

This library supports JPEG, PNG, WebP, TIFF and RAW files.

#### webpack.config.js

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp|tiff?)/i,
        use: [
          "file-loader",
          {
            loader: "webpack-image-rotate-loader",
            options: {
              angle: -90,
              background: "#ffffff"
            },
          },
        ],
      },
    ],
  },
};

```

##### Or use with [`webpack-image-resize-loader`](https://github.com/Calvin-LL/webpack-image-resize-loader)

```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|webp|tiff?)/i,
        use: [
          {
            loader: "webpack-image-resize-loader",
            options: {
              width: 1000,
            },
          },
          "webpack-image-rotate-loader",
        ],
      },
    ],
  },
};

```

#### You can override options with queries

```javascript
import placeholderUrl from "./some_pic.png?angle=90";
```

or

```javascript
import placeholderUrl from './some_pic.png?{"angle":90}';
```

## Options

| Name                            | Type             | Default     | Description                                                                                              |
| ------------------------------- | ---------------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| **[`angle`](#angle)**           | `number`         | `undefined` | The angle to rotate the input image.                                                                     |
| **[`background`](#background)** | `string\|object` | `"#000000"` | The background color of the output image if the image is rotated by an angle other than multiples of 90. |

### `angle`

The angle to rotate the input image.

When set to `undefined`, the loader will use the EXIF `Orientation` tag.

This is passed as the first argument to [sharp's `resize` function](https://sharp.pixelplumbing.com/api-operation#rotate).

### `background`

example: `"#7743CE"`, `"rgb(255, 255, 255)"`, `{r:0,g:0,b:0,alpha:1}`

The background color of the output image if the image is rotated by an angle other than multiples of 90.

This is passed as `background` in the [`options` of the parameters of sharp's `resize` function](https://sharp.pixelplumbing.com/api-operation#rotate)
