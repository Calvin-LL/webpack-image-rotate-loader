import webpack from "webpack";

import WIRLWebpackTestCompiler from "./helpers/WIRLWebpackTestCompiler";

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
  ): void {
    it(`should ${
      type === "success" ? "successfully validate" : "throw an error on"
    } the "${key}" option with ${JSON.stringify(value)} value`, async () => {
      const compiler = new WIRLWebpackTestCompiler({ webpackVersion });

      let stats: webpack.Stats | undefined;

      try {
        stats = (
          await compiler.compile({
            loaderOptions: {
              [key]: value,
            },
            throwOnError: false,
          })
        ).stats;
      } finally {
        if (type === "success") {
          expect(stats!.hasErrors()).toBe(false);
        } else if (type === "failure") {
          const errors = stats!.compilation.errors;

          expect(errors).toHaveLength(1);
          expect(errors[0].error.message).toMatchSnapshot();
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
