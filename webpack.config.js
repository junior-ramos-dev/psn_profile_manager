const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  watch: true,
  entry: "./src/index.tsx",
  output: {
    filename: "index_bundle.js",
    path: path.resolve(__dirname, "/bundle"),
    publicPath: "/",
  },
  devServer: {
    port: 8001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, // a regular expression that catches .js files
        exclude: /node_modules/,
        loader: "url-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i, // a regular expression that catches .js files
        exclude: /node_modules/,
        type: "url-loader",
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: "@svgr/webpack", options: { icon: true } }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      //   filename: "./src/index.html",
    }),
  ],
};
