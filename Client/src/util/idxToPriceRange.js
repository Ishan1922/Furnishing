export const arrPriceRanges = [
    "0-5000",
    "5000-50000",
    "50000-100000",
    "100000-500000",
    "500000-1000000"
]

export const priceRangeToIndex = (priceRange) => {
   const index = arrPriceRanges.findIndex(priceRg => priceRg === priceRange)

   return index
}