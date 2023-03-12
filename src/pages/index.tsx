import { useState } from "react"
import styled from "styled-components"

import ConverterOption from "../components/ConverterOption"
import useCurrency from "@/utils/useCurrency"

interface IPair {
    idA: number
    idB: number
}

export default function ConverterPage() {
    const { currencyList, isLoading, formatDecimals } = useCurrency()

    const [pair, setPair] = useState<IPair>({ idA: 0, idB: 0 })
    const [inputValue, setInputValue] = useState("--.--")

    function convertValue(
        value: string,
        priceA: number,
        priceB: number
    ): string {
        if (value === "") value = "1"
        const floatValue = parseFloat(value)
        if (floatValue <= 0 || priceA <= 0 || priceB <= 0) return "0"

        const result = (floatValue * priceA) / priceB

        return formatDecimals(result)
    }

    function handleInputChanged(value: string) {
        if (value === "") value = "1"

        setInputValue(() => {
            return value
        })
    }

    function handleSelectChange(id: number, slector: string) {
        if (slector === "selectA") {
            setPair((prev: IPair) => {
                return {
                    ...prev,
                    idA: id,
                }
            })
        } else {
            setPair((prev: IPair) => {
                return {
                    ...prev,
                    idB: id,
                }
            })
        }
    }

    if (!currencyList) {
        return <h2>Loading...</h2>
    }

    if (currencyList && inputValue === "--.--") {
        const len = currencyList.length - 1
        const newPair: IPair = {
            idA: 0,
            idB: len,
        }
        setPair(() => {
            return newPair
        })
        setInputValue("1")
    }

    return (
        <Container>
            <Grid>
                <div>
                    <ConverterOption
                        id={"selectA"}
                        index={pair.idA}
                        currencyList={currencyList}
                        onCurrencyChange={handleSelectChange}
                    />
                </div>
                <div>
                    <ConverterOption
                        id={"selectB"}
                        index={pair.idB}
                        currencyList={currencyList}
                        onCurrencyChange={handleSelectChange}
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <Input
                        type="number"
                        min={0}
                        id="inputAmount"
                        placeholder="Enter number"
                        onChange={(event) => {
                            event.preventDefault()
                            handleInputChanged(event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Display>
                        <p>
                            {inputValue +
                                " " +
                                currencyList[pair.idA].symbol +
                                " to"}
                        </p>
                        <h1>
                            {isLoading
                                ? "... " + currencyList[pair.idB].symbol
                                : convertValue(
                                      inputValue,
                                      currencyList[pair.idA].price.USD,
                                      currencyList[pair.idB].price.USD
                                  ) +
                                  " " +
                                  currencyList[pair.idB].symbol}
                        </h1>
                    </Display>
                </div>
            </Grid>
        </Container>
    )
}

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;

    padding: 2rem 0.5rem;
    max-width: 100rem;
`

const Grid = styled.div`
    font-size: 1.8rem;
    display: grid;
    gap: 0.5rem;

    border-radius: 0.25rem;
    background-color: #e2e8f0;

    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    width: 100%;

    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    max-width: 45rem;
    grid-template-rows: repeat(1, minmax(0, 1fr));
    grid-auto-flow: row dense;

    > div {
        font-size: 16px;
        padding: 1rem;
        grid-column: span 1 / span 1;
        > label {
            padding-left: 1rem;
        }
    }
`

const Input = styled.input`
    outline: 2px solid transparent;
    outline-offset: 1px;

    line-height: 1.6;
    font-size: 1.2rem;
    padding-top: 0.24rem;
    padding-bottom: 0.24rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    background-color: #f1f5f9;

    border-color: transparent;

    border-width: 2px;
    border-radius: 0.25rem;
    width: 100%;

    &:focus {
        box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
`
const Display = styled.div`
    padding-right: 0;
    font-size: 1.125rem;
    line-height: 1.6;
    color: #0f172a;

    > p {
        justify-content: flex-end;
        display: flex;
    }
    > h1 {
        justify-content: flex-end;
        display: flex;
        font-size: 1.6rem;
        line-height: 2rem;
        font-weight: 500;

        text-decoration-line: underline;
        text-underline-offset: 5px;
        text-decoration-thickness: 1px;
    }
`
