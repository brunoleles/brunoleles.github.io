"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById("canvas");
var engine = new BABYLON.Engine(canvas, true);
window.addEventListener("resize", () => {
    engine.resize();
});
exports.default = engine;