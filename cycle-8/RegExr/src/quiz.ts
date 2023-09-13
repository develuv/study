const trimRegEx = /[^.\d-+*/()]/g

const trim = (v: String): String => v.replace(trimRegEx, "")

const repMtoPM = (v: String): String => v.replace(/-/g, "+-")

const groupMD = /([+-]?[.\d]+)([*/])([+-]?[.\d]+)/gim

const plus = /([+-]?[.\d]+)/gim

const bracket = /\(([^)]+)\)/gim

const reduceBracket = (val: String) => {
    return trim(val).replace(bracket, calc)
}

const reduceMD = (val: String) => {
    return val.replace(groupMD, calc)
}

export const calc = (val: String) => {
    const repMtoPMVal = repMtoPM(val)

    let captures: RegExpExecArray | null
    let resultArray: Array<Number> = []

    // @ts-ignore
    while ((captures = groupMD.exec(repMtoPMVal)) !== null) {
        const [_, left, op, right] = captures
        console.log(_, left, op, right)

        const leftValue = parseFloat(left)
        const rightValue = parseFloat(right)

        let result = 0;
        switch (op) {
            case "*": {
                result = leftValue * rightValue
                break
            }
            case "/": {
                result = leftValue / rightValue
                break
            }
            default: {
                throw new Error(`invalid operator ${op}`)
            }
        }

        resultArray.push(result)
    }

    return resultArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0.0)
}

export const calculator = (val: String) => {
    const normalize = reduceBracket(val)
    const reduceMDVal = reduceMD(normalize)

    console.log(reduceMDVal)

    let captures: RegExpExecArray | null
    let resultArray: Array<Number> = []
    while ((captures = plus.exec(reduceMDVal)) !== null) {
        const [_, target] = captures
        resultArray.push(parseFloat(target))
    }

    return resultArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0.0)

}

