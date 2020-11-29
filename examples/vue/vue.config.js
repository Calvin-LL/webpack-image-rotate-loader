module.exports = {
  publicPath: ".",
  chainWebpack: (config) => {
    config.module
      .rule("images-rotate")
      .test(/\.(png|jpe?g|webp|tiff?)$/i)
      .use("rotate")
      .loader("webpack-image-rotate-loader")
      .options({
        angle: 90,
      });

    // config.module
    //   .rule("images")
    //   .test(/\.(png|jpe?g|webp|tiff?)$/i)
    //   // if the import url looks like "some.png?rotate..."
    //   .oneOf("rotate")
    //   .resourceQuery(/rotate/)
    //   .use("file-loader")
    //   .loader(config.module.rule("images").use("url-loader").get("loader"))
    //   .options(config.module.rule("images").use("url-loader").get("options"))
    //   .end()
    //   .use("rotate")
    //   .loader("webpack-image-rotate-loader")
    //   .options({
    //     angle: 90,
    //   })
    //   .end()
    //   .end()
    //   // if no previous resourceQuery match
    //   .oneOf("normal")
    //   .use("normal")
    //   .loader(config.module.rule("images").use("url-loader").get("loader"))
    //   .options(config.module.rule("images").use("url-loader").get("options"));

    // config.module.rule("images").uses.delete("url-loader");
  },
};
