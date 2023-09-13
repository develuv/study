const trimRegEx = /[^.\d-+*/]/g

const trim = (v: String): String => v.replace(trimRegEx, "")

const repMtoPM = (v: String): String => v.replace(/-/g, "+-")

const groupMD = /((?:\+|\+-)?[.\d]+)([*/])((?:\+|\+-)?[.\d]+)/gim

export const calc = (val: String) => {
    const trimVal = trim(val)

    const repMtoPMVal = repMtoPM(trimVal)


    let captures: RegExpExecArray | null
    let resultArray: Array<Number> = []
    // @ts-ignore
    while ((captures = groupMD.exec(repMtoPMVal)) !== null) {
        const [_, left, op, right] = captures

        const leftValue = parseFloat(left.replace("+", ""))
        const rightValue = parseFloat(right.replace("+", ""))

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

