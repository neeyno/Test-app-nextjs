import styled from "styled-components"
import { ICoin } from "@/utils/fetchData"

interface IConverterOptionProps {
    id: string
    index: number
    currencyList: ICoin[]
    onCurrencyChange: (value: number, selector: string) => void
}

function ConverterOption({
    id,
    index,
    currencyList,
    onCurrencyChange,
}: IConverterOptionProps) {
    return (
        <Select
            id={id}
            value={index.toString()}
            onChange={(e) =>
                onCurrencyChange(parseFloat(e.target.value), e.target.id)
            }
        >
            {currencyList &&
                currencyList.map((item, itemId) => (
                    <option key={itemId + item.symbol} value={itemId}>
                        {`${item.symbol} - ${item.name}`}
                    </option>
                ))}
        </Select>
    )
}

const Select = styled.select`
    line-height: 1.6;
    font-size: 1.125rem;
    padding-top: 0.24rem;
    padding-bottom: 0.24rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    background-color: #f1f5f9;

    border-width: 0px;
    border-radius: 0.25rem;

    width: 100%;
    height: 2.5rem;

    &:hover {
        box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0 0 0 / 0.1),
            0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    &:focus {
    }
`

export default ConverterOption
