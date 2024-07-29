import { TransformFnParams } from 'class-transformer'
import bcrypt from 'bcrypt'

export function transformToNumber(params: TransformFnParams) {
    if (!isNaN(Number(params.value))) {
        return Number(params.value)
    }
    return params.value
}

export function transformToInt(params: TransformFnParams) {
    if (!isNaN(Number.parseInt(params.value))) {
        return Number.parseInt(params.value)
    }
    return params.value
}

export function transformToDate(params: TransformFnParams) {
    if (!isNaN(Date.parse(params.value))) {
        return new Date(Date.parse(params.value))
    }
    return params.value
}

export function transformToBcryptHash(params: TransformFnParams) {
    return bcrypt.hashSync(params.value, 10)
}

export function transformToNumberArray(delimiter: string) {
    return (params: TransformFnParams) => {
        if ((/^[0-9,]+$/).test(params.value)) {
            return params.value.split(delimiter).map((value: string) => Number(value))
        }
        return params.value
    }
}

export function transformToStringArray(delimiter: string) {
    return (params: TransformFnParams) => {
        if (typeof params.value === 'string' && (/^[a-zA-Z0-9,]+$/).test(params.value)) {
            return params.value.split(delimiter).map((value: string) => value)
        }
        return params.value
    }
}