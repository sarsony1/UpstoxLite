interface Stock {
    symbol: string
    quantity: number
    ltp: number 
    avgPrice: number
    close: number
}

interface UserHolding {
    userHolding: Stock[]
}

interface StockResponse {
    data: UserHolding
}

interface StocksSummary {
    currentValue: number
    investement: number
    currentPnl: number
    pnl: number
}

export  {
    Stock,
    UserHolding,
    StockResponse,
    StocksSummary
}