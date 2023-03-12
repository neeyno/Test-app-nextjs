import { fetchCoins, ICoin } from "@/utils/fetchData"
import { useState, useEffect } from "react"

const usdFiat: ICoin = {
    rank: 0,
    key: "usd",
    symbol: "USD",
    name: "US Dollar",
    type: "fiat",
    category: "Currency",
    unlimitedSupply: true,
    price: {
        USD: 1.0,
    },
    athPrice: {
        USD: 1.0,
    },
}

export default function useCurrency() {
    const [isLoading, setIsLoading] = useState(true)
    const [currencyList, setCurrencyList] = useState<ICoin[] | null>(null)

    function formatDecimals(value: number, decimals: number = 2): string {
        for (; decimals < 8; ) {
            if (value > 100 / 10 ** decimals) {
                break
            }
            decimals++
        }

        return value.toFixed(decimals)
    }

    async function fetchCurrencyList() {
        try {
            setIsLoading(true)

            const currenciesRaw: ICoin[] = (await fetchCoins()).data
            currenciesRaw.push(usdFiat)

            setCurrencyList(currenciesRaw)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log("init timer")

        fetchCurrencyList()

        const interval = setInterval(() => {
            console.log("api call")
            fetchCurrencyList()
        }, 60000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return {
        currencyList,
        isLoading,
        formatDecimals,
    }
}
