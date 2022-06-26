import { BINARY_REGEX, SINGLE_REGEX } from '#constants/regex.js';
import { InvalidInputError } from '#errors/invalidInputError.js';

export const extractByRegex = (standarizeInput) => {
    const binaryResult = BINARY_REGEX.exec(standarizeInput)?.slice(1);
    const singleResult = SINGLE_REGEX.exec(standarizeInput)?.slice(1);

    let firstOperating, operator, secondOperating;

    if (binaryResult)
        [firstOperating, operator, secondOperating] = binaryResult;
    else if (singleResult) [operator, firstOperating] = singleResult;
    else throw new InvalidInputError();

    firstOperating = Number(firstOperating);
    secondOperating = Number(secondOperating);

    if (isNaN(firstOperating) || !isFinite(firstOperating))
        throw new InvalidInputError();
    if (binaryResult && (isNaN(secondOperating) || !isFinite(secondOperating)))
        throw new InvalidInputError();

    return [firstOperating, operator, secondOperating];
};
