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
  },
};
