const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const pathToPhaser = path.join(__dirname, "/node_modules/phaser/");
const phaser = path.join(pathToPhaser, "dist/phaser.js");

const OUTPUT_DIR = process.env.OUTPUT_DIR || "build";

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, OUTPUT_DIR),
        filename: "bundle.js",
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader", exclude: "/node_modules/" },
            { test: /phaser\.js$/, loader: "expose-loader?Phaser" },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            phaser,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.template.html",
            filename: "index.html",
            inject: "head",
        }),
        new CopyPlugin({
            patterns: [{ from: "assets", to: "assets" }],
        }),
    ],
};
