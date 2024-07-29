import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator'

import { StoryPriceHistoryService } from '../api/storyPriceHistory/storyPriceHistory.service'

export function IsInteger(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberContraint implements ValidatorConstraintInterface {
        validate(value: any, args: ValidationArguments) {
            if ((/^\d+$/).test(value instanceof Number ? value.toString() : value)) {
                return true
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return 'Text ($value) is not a number string!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isInteger',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberContraint
        })
    }
}

export function Min(property: number, validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class MinContraint implements ValidatorConstraintInterface {
        validate(value: any, args: ValidationArguments) {
            const [propertyValue] = args.constraints
            return typeof value === 'string' && typeof propertyValue === 'number' && Number(value) >= propertyValue
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return ''
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'min',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: MinContraint
        })
    }
}

export function IsFloat(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberContraint implements ValidatorConstraintInterface {
        validate(value: any, args: ValidationArguments) {
            if (!isNaN(Number(value))) {
                return true
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return 'Text ($value) is not a number string!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFloat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberContraint
        })
    }
}

export function IsDateOrDateString(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberContraint implements ValidatorConstraintInterface {
        validate(value: any, args: ValidationArguments) {
            if (value instanceof Date || value instanceof String || !isNaN(Date.parse(value))) {
                return true
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return 'Text ($value) is not a date or a date string!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isDateOrDateString',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberContraint
        })
    }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberContraint implements ValidatorConstraintInterface {
        validate(value: any, args: ValidationArguments) {
            if (value instanceof Date || value instanceof String || !isNaN(Date.parse(value))) {
                const inputTime = value instanceof Date ? value.getTime() : Date.parse(value)
                const currentTime = Date.now()
                return inputTime > currentTime ? true : false
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return 'Text ($value) is not a future date!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFutureDate',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberContraint
        })
    }
}

export function IsExistedPriceStoryStartTime(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberContraint implements ValidatorConstraintInterface {
        async validate(value: any, args: ValidationArguments) {
            if (value instanceof Date || value instanceof String || !isNaN(Date.parse(value))) {
                const startTime = new Date(value instanceof Date ? value : Date.parse(value))
                const storyPriceHistories = await StoryPriceHistoryService.findStoryPriceHistoryByStartTime(startTime)
                if (storyPriceHistories.count > 0) {
                        return false
                }
                return true
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return 'Text ($value) is existed!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isExistedPriceStoryStartTime',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberContraint
        })
    }
}

export function IsNumberStringArray(validationOptions?: ValidationOptions) {
    @ValidatorConstraint({ async: true })
    class IsNumberStringArray implements ValidatorConstraintInterface {
        validate(values: any, args: ValidationArguments) {
            if (values instanceof Array ) {
                for (let value of values) {
                    if (!(typeof value === 'string') || !(/^\d+$/).test(value)) {
                        return false
                    }
                }
                return true
            }
            return false
        }

        defaultMessage(validationArguments?: ValidationArguments | undefined): string {
            return '($value) is not a number string array!';
        }
    }

    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isNumberStringArray',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: IsNumberStringArray
        })
    }
}