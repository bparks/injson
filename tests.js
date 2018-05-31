/// <reference path="node_modules/@types/mocha/index.d.ts" />
/// <reference path="node_modules/@types/chai/index.d.ts" />

const expect = require('chai').expect;
const injson = require('.').default;

describe("Some basic tests", () => {
    it("should return empty object for empty object", () => {
        expect(JSON.stringify(injson.inflate({}))).to.equal("{}");
    })

    it("should return empty object from string", () => {
        expect(JSON.stringify(injson.inflate("{}"))).to.equal("{}");
    })

    it("should create a new built-in type", () => {
        expect(injson.inflate("{\"$type\":\"Array\"}")).to.be.instanceof(Array);
    })
})

describe("Nested objects", () => {
    function TestClass() {

    }
    function OtherTestClass() {

    }
    it("should return proper nested objects", () => {
        var initial = {
            $type: "TestClass",
            text: "Test",
            'data-data': {
                $type: "OtherTestClass",
                name: "an event"
            }
        }
        var actual = injson.inflate(initial);
        expect(actual).to.be.instanceof(TestClass);
    })
})