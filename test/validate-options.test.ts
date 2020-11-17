import webpack from "webpack";

import compile from "./helpers/compile";
import getCompiler from "./helpers/getCompiler";

describe.each([4, 5] as const)("v%d validate options", (webpackVersion) => {
  const tests = {
    background: {
      success: ["#FFF", "rgb(2,4,99)", { r: 255, g: 255, b: 255 }],
      failure: [false, 9],
    },
    angle: {
      success: [undefined, 90, -90, -190],
      failure: [false, "false"],
    },
  };

  function createTestCase(
    key: string,
    value: any,
    type: "success" | "failure"
  ) {
    test(`should ${
      type === "success" ? "successfully validate" : "throw an error on"
    } the "${key}" option with ${JSON.stringify(value)} value`, async () => {
      const compiler = getCompiler(webpackVersion, {
        [key]: value,
      });

      let stats;

      try {
        stats = await compile(webpackVersion, compiler);
      } finally {
        if (type === "success") {
          expect((stats as webpack.Stats).hasErrors()).toBe(false);
        } else if (type === "failure") {
          const {
            compilation: { errors },
          } = stats as any;

          expect(errors).toHaveLength(1);
          expect(() => {
            throw new Error(errors[0].error.message);
          }).toThrowErrorMatchingSnapshot();
        }
      }
    }, 60000);
  }

  for (const [key, values] of Object.entries(tests)) {
    for (const type of Object.keys(values) as ("success" | "failure")[]) {
      for (const value of values[type]) {
        createTestCase(key, value, type);
      }
    }
  }
});
