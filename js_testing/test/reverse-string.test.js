"use strict";
import * as assert from "assert";
import reverseString from "../reverse-string.js";

describe('Reverse string', () => {
    it("works", () => {
        assert.equal("raboof", reverseString("foobar"));
    });
    it("preserves case", () => {
        assert.equal("rabooF", reverseString("Foobar"));
    });
    it("preserves puctuation", () => {
        assert.equal("...raboof", reverseString("foobar..."));
    });
    it("works with non-latin strings", () => {
        assert.equal("！夫丈大も語本日", reverseString("日本語も大丈夫！"));
    });
});