"use strict";
import chai from "chai";
const assert = chai.assert;
const expect = chai.expect;

import Calculator from "../calculator.js";

describe('Calculator', () => {
    describe("add", () => {
        it("works", () => {
            assert.equal(3, Calculator.add(1, 2));
        });
        it("works with negative numbers", () => {
            assert.equal(1, Calculator.add(-1, 2));
        });
        it("works with big numbers", () => {
            assert.equal(100000000002, Calculator.add(100000000000, 2));
        });
        it("works with floats", () => {
            assert.equal(3.5, Calculator.add(1.0, 2.5));
        });
    });

    describe("subtract", () => {
        it("works", () => {
            assert.equal(1, Calculator.subtract(2, 1));
        });
        it("works with negative numbers", () => {
            assert.equal(-3, Calculator.subtract(-1, 2));
        });
        it("works with big numbers", () => {
            assert.equal(99999999998, Calculator.subtract(100000000000, 2));
        });
        it("works with floats", () => {
            assert.equal(4.5, Calculator.subtract(7.0, 2.5));
        });
    });

    describe("divide", () => {
        it("works", () => {
            assert.equal(2, Calculator.divide(2, 1));
        });
        it("works with floats", () => {
            assert.equal(2.5, Calculator.divide(5.0, 2.0));
        });
        it("works with mixed ints and floats", () => {
            assert.equal(4, Calculator.divide(2, 0.5));
        });
        it("works values that are not evenly divisible", () => {
            expect(Calculator.divide(7, 3)).to.be.closeTo(2.333333333, 0.000000001);
        });
    });

    describe("multiply", () => {
        it("works", () => {
            assert.equal(2, Calculator.multiply(2, 1));
        });
        it("works with negative numbers", () => {
            assert.equal(-2, Calculator.multiply(-1, 2));
        });
        it("works with big numbers", () => {
            assert.equal(200000000000, Calculator.multiply(100000000000, 2));
        });
        it("works with floats", () => {
            assert.equal(17.5, Calculator.multiply(7.0, 2.5));
        });
    });
});