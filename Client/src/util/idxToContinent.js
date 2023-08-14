export const arrContinent = [
    'Fresh',
    'First Owner',
    'Second Owner',
    'Third Owner',
]

export const continentToIdx = (continent) => {
    return arrContinent.findIndex((cont) => cont === continent)
}

export const idxToContinent = (idx) => {
    return (arrContinent.filter((_, index) => index === Number(idx)))[0]
}