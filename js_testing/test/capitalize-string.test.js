"use strict";
import * as assert from "assert";
import capitalizeString from "../capitalize-string.js";

describe('Capitalize string', () => {
    it("works", () => {
        assert.equal("Foobar", capitalizeString("foobar"));
    });
    it("works with long strings", () => {
        assert.equal("Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            capitalizeString("lorem ipsum dolor sit amet, consectetur adipiscing elit."));
    });
    it("ignores numbers", () => {
        assert.equal("123", capitalizeString("123"));
    });
    it("ignores punctuation", () => {
        assert.equal(".gitignore", capitalizeString(".gitignore"));
    });
    it("works with non-latin strings", () => {
        assert.equal("日本語も大丈夫！", capitalizeString("日本語も大丈夫！"));
    });
});