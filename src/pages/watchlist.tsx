import styled from "styled-components"

import { getFromATH, getToATH } from "@/utils/getFromToATH"
import useCurrency from "@/utils/useCurrency"

export default function WatchlistPage() {
    const { currencyList, formatDecimals } = useCurrency()
    if (!currencyList) {
        return <h2>Loading...</h2>
    }
    return (
        <Container>
            <List>
                <Item key={999}>
                    <span>Name</span>
                    <span>Price USD</span>
                    <span>Market Cap.</span>
                    <span>Circulating</span>
                    <span>Supply</span>
                    <span>Category</span>
                    <span className="short">from ATH</span>
                    <span className="short">to ATH</span>
                </Item>
                {currencyList &&
                    currencyList.map((item, index) => (
                        <Item key={index}>
                            <span>{item.name}</span>
                            <span>{"$ " + formatDecimals(item.price.USD)}</span>
                            <span>{"$ " + item.marketCap}</span>
                            <span>
                                {item.symbol + " " + item.availableSupply}
                            </span>
                            <span>{item.symbol + " " + item.totalSupply}</span>
                            <span>{item.category}</span>
                            <span className="fromath short">
                                {getFromATH(item.athPrice.USD, item.price.USD) +
                                    "%"}
                            </span>
                            <span className="toath short">
                                {getToATH(item.athPrice.USD, item.price.USD) +
                                    "%"}
                            </span>
                        </Item>
                    ))}
            </List>
        </Container>
    )
}

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;

    padding: 2rem 0.5rem;
    max-width: 100rem;
`
const List = styled.ul`
    overflow-x: auto;
    border-radius: 0.25rem;
    list-style: none;
    padding: 1rem;
    background-color: #e2e8f0;

    width: 100%;
    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
`
const Item = styled.li`
    font-size: 0.95em;

    min-width: 100%;
    padding: 0.4rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    min-width: 67rem;

    border-top: 1px solid #cbd5e1;

    &:first-child {
        font-size: 1em;
        font-weight: 700;
        border-top-width: 0px;
    }

    &:hover {
        border-radius: 0.25rem;
        background-color: #cbd5e1;
    }

    > span {
        padding: 0.5rem 0.2rem;
        flex-basis: 10%;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-child {
            flex-basis: 15%;
        }

        &.fromath {
            color: #dc2626;
        }
        &.toath {
            color: #16a34a;
        }
        &.short {
            flex-basis: 7.5%;
        }
    }
`
