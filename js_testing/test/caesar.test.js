"use strict";
import * as assert from "assert";
import { encode, decode } from "../caesar.js";

describe("Caesar", () => {
    describe('encode', () => {
        it("works", () => {
            assert.equal("gppcbs", encode("foobar"));
        });
        it("works for capital letters", () => {
            assert.equal("GpPcBs", encode("FoObAr"));
        });
        it("wraps around from z to a", () => {
            assert.equal("aaa", encode("zzz"));
        });
        it("ignores non-alpha characters", () => {
            assert.equal("123..!!", encode("123..!!"));
        });
    });

    describe('decode', () => {
        it("works", () => {
            assert.equal("foobar", decode("gppcbs"));
        });
        it("works for capital letters", () => {
            assert.equal("FoObAr", decode("GpPcBs"));
        });
        it("wraps around from a to z", () => {
            assert.equal("zzz", decode("aaa"));
        });
        it("ignores non-alpha characters", () => {
            assert.equal("123..!!", decode("123..!!"));
        });
    });
});