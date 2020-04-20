"use strict";
import chai from "chai";
const assert = chai.assert;
const expect = chai.expect;

import analyze from "../array-analysis.js";

describe('Array Analysis', () => {
    it("average works", () => {
        assert.propertyVal(analyze([1, 8, 3, 4, 2, 6]), "average", 4);
    });
    it("min works", () => {
        assert.propertyVal(analyze([1, 8, 3, 4, 2, 6]), "min", 1);
    });
    it("max works", () => {
        assert.propertyVal(analyze([1, 8, 3, 4, 2, 6]), "max", 8);
    });
    it("length works", () => {
        assert.propertyVal(analyze([1, 8, 3, 4, 2, 6]), "length", 6);
    });
    it("throws on empty array", () => {
        assert.throws(() => analyze([]), "empty array!");
    });
    it("throws on arrays containing non-numeric values", () => {
        assert.throws(() => analyze(["foo", "bar"]), "array contains non-numeric values!");
    });
});