"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Stats = require("stats.js");
var stats = new Stats();
stats.setMode(0);
exports.default = {
    begin: stats.begin,
    end: stats.end
};