const testApi = "https://tstapi.cryptorank.io/v0/coins/bitcoin"
const currencyListApi = `https://api.cryptorank.io/v1/currencies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&currency=USD`

/* api v1
export interface Currency {
    id: number
    rank: number
    slug: string
    symbol: string
    name: string
    type: string
    category: string
    values: {
        USD: {
            price: number
            marketCap: number
        }
    }
    circulatingSupply?: number
    totalSupply?: number
    maxSupply?: number
}
export interface CurrencyData {
    data: Currency[]
}

export async function fetchCurrencyData(): Promise<CurrencyData> {
    const response = await fetchData(currencyListApi, {
        method: "GET",
    })

    return response.json()
}
*/

// api v0
export interface ICoin {
    rank: number
    key: string
    symbol: string
    name: string
    type: string
    category: string
    unlimitedSupply: boolean
    maxSupply?: number
    totalSupply?: number
    availableSupply?: number
    marketCap?: number
    price: { USD: number }
    athPrice: { USD: number }
}

interface CoinData {
    data: ICoin[]
}

export async function fetchCoins(keys?: string): Promise<CoinData> {
    const API = `https://api.cryptorank.io/v0/coins?limit=17&currency=USD`
    const response = await fetchData(API, {
        method: "GET",
    })

    return response.json()
}

export async function fetchData(reqInput: RequestInfo, reqInit?: RequestInit) {
    const response = await fetch(reqInput, reqInit)

    if (response.ok) {
        return response
    } else {
        const errorBody = await response.json()
        const errorMsg = errorBody.error

        throw new Error(
            "Request failed with status: " +
                response.status +
                "\nMessage:" +
                errorMsg
        )
    }
}
