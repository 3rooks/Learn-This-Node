import { ALL_OPERATORS } from '#constants/operators.js';
import { InvalidInputError } from '#errors/invalidInputError.js';

export const getOperator = (standarizeInput) => {
    let operator;

    for (const allowedOperator of ALL_OPERATORS) {
        if (standarizeInput.includes(allowedOperator)) {
            if (
                operator ||
                standarizeInput.indexOf(allowedOperator) !==
                    standarizeInput.lastIndexOf(allowedOperator)
            )
                throw new InvalidInputError();
            operator = allowedOperator;
        }
    }

    return operator;
};
