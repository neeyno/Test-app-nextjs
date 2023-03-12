// % Price Drop Since ATH
export function getFromATH(priceATH: number, currentPrice: number): string {
    if (priceATH <= 0) return "-.-" // exception
    if (currentPrice > priceATH) return "ATH"

    const fromATH = ((currentPrice - priceATH) * 100) / priceATH

    return fromATH.toFixed(1)
}

// % to High
export function getToATH(priceATH: number, currentPrice: number): string {
    if (currentPrice <= 0) return "-.-" // exception
    if (currentPrice > priceATH) return "ATH"

    const toAth = ((priceATH - currentPrice) * 100) / currentPrice

    return toAth.toFixed(1)
}
