import { getFromATH, getToATH } from "../src/utils/getFromToATH"
import "@testing-library/jest-dom"
// import { render, screen } from "@testing-library/react"

describe("ATH function test", function () {
    let priceAth: number
    let currentPrice: number

    describe("From ATH", () => {
        it("calculates from ATH and returns string", () => {
            priceAth = 68671.75049734
            currentPrice = 20543.02158588643

            const fromAth = getFromATH(priceAth, currentPrice)

            expect(fromAth).toStrictEqual("-70.1")
        })

        it("returns exception `-.-` if `priceAth` less or equal zero", () => {
            priceAth = -1
            currentPrice = 100
            const fromAthCase1 = getFromATH(priceAth, currentPrice)

            priceAth = 0
            currentPrice = 100
            const fromAthCase2 = getFromATH(priceAth, currentPrice)

            expect(fromAthCase1).toStrictEqual("-.-")
            expect(fromAthCase2).toStrictEqual("-.-")
        })

        it("calculates from ATH when `currentPrice` less or equal zero", () => {
            priceAth = 100
            currentPrice = -1
            const fromAthCase1 = getFromATH(priceAth, currentPrice)

            priceAth = 100
            currentPrice = 0
            const fromAthCase2 = getFromATH(priceAth, currentPrice)

            expect(fromAthCase1).toStrictEqual("-101.0")
            expect(fromAthCase2).toStrictEqual("-100.0")
        })

        it("returns `ATH` when currentPrice greater than `priceAth`", () => {
            priceAth = 100
            currentPrice = 101
            const fromAth = getFromATH(priceAth, currentPrice)

            expect(fromAth).toStrictEqual("ATH")
        })

        it("returns `0.0` if `currentPrice` equals `priceAth`", () => {
            priceAth = 100
            currentPrice = 100
            const fromAth = getFromATH(priceAth, currentPrice)

            expect(fromAth).toStrictEqual("0.0")
        })
    })

    describe("To ATH", () => {
        it("calculates to ATH and returns string", () => {
            priceAth = 0.74982732
            currentPrice = 0.066275715451

            const toAth = getToATH(priceAth, currentPrice)

            expect(toAth).toStrictEqual("1031.4")
        })

        it("returns exception `-.-` if `currentPrice` less or equal zero", () => {
            priceAth = 100
            currentPrice = -1
            const toAthCase1 = getToATH(priceAth, currentPrice)

            priceAth = 100
            currentPrice = 0
            const toAthCase2 = getToATH(priceAth, currentPrice)

            expect(toAthCase1).toStrictEqual("-.-")
            expect(toAthCase2).toStrictEqual("-.-")
        })

        it("returns `0.0` if `currentPrice` equals `priceAth`", () => {
            priceAth = 100
            currentPrice = 100
            const fromAth = getToATH(priceAth, currentPrice)

            expect(fromAth).toStrictEqual("0.0")
        })

        it("returns 'ATH' if currentPrice greater than priceAth", () => {
            priceAth = -100
            currentPrice = 1
            const toAth = getToATH(priceAth, currentPrice)

            expect(toAth).toStrictEqual("ATH")
        })
    })

    describe("Extreme value difference", () => {
        it("To ATH - significant difference", () => {
            priceAth = 123
            currentPrice = 0.0000000000000001
            const toAth = getToATH(priceAth, currentPrice)

            expect(toAth).toStrictEqual("123000000000000000000.0")
        })
        it("From ATH - significant difference", () => {
            priceAth = 123
            currentPrice = 0.0000000000000001
            const toAth = getFromATH(priceAth, currentPrice)

            expect(toAth).toStrictEqual("-100.0")
        })
        it("To ATH - insignificant difference", () => {
            priceAth = 1000.1
            currentPrice = 1000.0
            const toAthCase1 = getToATH(priceAth, currentPrice)

            priceAth = 100.1
            currentPrice = 100.0
            const toAthCase2 = getToATH(priceAth, currentPrice)

            expect(toAthCase1).toStrictEqual("0.0")
            expect(toAthCase2).toStrictEqual("0.1")
        })
        it("From ATH - insignificant difference", () => {
            priceAth = 1000.1
            currentPrice = 1000.0
            const fromAthCase1 = getFromATH(priceAth, currentPrice)

            priceAth = 100.1
            currentPrice = 100.0
            const fromAthCase2 = getFromATH(priceAth, currentPrice)

            expect(fromAthCase1).toStrictEqual("-0.0")
            expect(fromAthCase2).toStrictEqual("-0.1")
        })
    })
})
